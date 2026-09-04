"use client";

import { useCallback, useEffect, useRef, useState, type UIEvent } from "react";

const IDLE_MS = 650;

function useScrollHideState() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef<number>(0);

  const fromScrollTop = useCallback((y: number) => {
    const delta = y - lastY.current;
    lastY.current = y;
    window.clearTimeout(idleTimer.current);

    if (y < 24) {
      setHidden(false);
      return;
    }

    if (Math.abs(delta) > 4) {
      setHidden(true);
    }

    idleTimer.current = window.setTimeout(() => {
      setHidden(false);
    }, IDLE_MS);
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(idleTimer.current);
  }, []);

  return { hidden, fromScrollTop };
}

export function useScrollChrome() {
  const { hidden, fromScrollTop } = useScrollHideState();

  const onScroll = useCallback(
    (event: UIEvent<HTMLElement>) => {
      fromScrollTop(event.currentTarget.scrollTop);
    },
    [fromScrollTop],
  );

  return { hidden, onScroll };
}

export function useGlobalScrollHide() {
  const { hidden, fromScrollTop } = useScrollHideState();

  useEffect(() => {
    function onScroll(event: Event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.scrollHeight <= target.clientHeight + 1) return;
      fromScrollTop(target.scrollTop);
    }

    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => document.removeEventListener("scroll", onScroll, true);
  }, [fromScrollTop]);

  return hidden;
}

export const chromeHideClass =
  "pointer-events-none duration-200 ease-in";
export const chromeShowClass = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";
