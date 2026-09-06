"use client";

import { useCallback, useLayoutEffect, useRef, type UIEvent } from "react";
import { usePathname } from "next/navigation";
import {
  getChromeNavHeight,
  setChromeProgress,
} from "@/lib/partner/chromeScroll";

const REVEAL_MS = 320;
const DOWN_START = 3;
const DOWN_CANCEL = 8;
const FALLBACK_UNIT = 64;
const BOTTOM_BOUNCE = 72;

export function useScrollLinkedHeader() {
  const lastY = useRef(0);
  const hidden = useRef(0);
  const height = useRef(0);
  const animating = useRef(false);
  const raf = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const apply = useCallback(() => {
    const h = height.current;
    const px = hidden.current;
    if (headerRef.current) {
      headerRef.current.style.top = `${-px}px`;
    }
    if (stickRef.current) {
      stickRef.current.style.top = `${Math.max(0, h - px)}px`;
    }
    const unit = h || getChromeNavHeight() || FALLBACK_UNIT;
    setChromeProgress(unit ? px / unit : 0);
  }, []);

  const stopReveal = useCallback(() => {
    animating.current = false;
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  const revealFully = useCallback(() => {
    if (hidden.current <= 0.5) {
      hidden.current = 0;
      apply();
      return;
    }
    if (animating.current) return;
    animating.current = true;
    const start = hidden.current;
    const started = performance.now();
    const tick = (now: number) => {
      if (!animating.current) return;
      const t = Math.min(1, (now - started) / REVEAL_MS);
      const ease = 1 - (1 - t) ** 3;
      hidden.current = start * (1 - ease);
      apply();
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      hidden.current = 0;
      apply();
      animating.current = false;
    };
    raf.current = requestAnimationFrame(tick);
  }, [apply]);

  const measure = useCallback(() => {
    const node = headerRef.current;
    if (!node) return;
    height.current = node.offsetHeight;
    apply();
  }, [apply]);

  useLayoutEffect(() => {
    lastY.current = 0;
    hidden.current = 0;
    stopReveal();
    apply();
  }, [pathname, apply, stopReveal]);

  useLayoutEffect(() => {
    measure();
    const node = headerRef.current;
    if (!node || typeof ResizeObserver === "undefined") {
      return () => stopReveal();
    }
    const observer = new ResizeObserver(() => measure());
    observer.observe(node);
    return () => {
      observer.disconnect();
      stopReveal();
    };
  }, [measure, stopReveal]);

  const onScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      const el = event.currentTarget;
      const y = Math.max(0, el.scrollTop);
      const dy = y - lastY.current;
      lastY.current = y;
      const h = height.current || getChromeNavHeight() || FALLBACK_UNIT;
      if (!h) return;

      if (y <= 2) {
        stopReveal();
        hidden.current = 0;
        apply();
        return;
      }

      const maxY = Math.max(0, el.scrollHeight - el.clientHeight);
      const fromBottom = maxY - Math.min(y, maxY);
      if (fromBottom < BOTTOM_BOUNCE) {
        if (animating.current) {
          stopReveal();
          hidden.current = h;
          apply();
        }
        if (dy > DOWN_START) {
          hidden.current = Math.min(h, hidden.current + dy);
          apply();
        }
        return;
      }

      if (height.current && y < height.current) {
        if (hidden.current > 0) revealFully();
        return;
      }

      if (animating.current) {
        if (dy > DOWN_CANCEL) {
          stopReveal();
          hidden.current = Math.min(h, hidden.current + dy);
          apply();
        }
        return;
      }

      if (dy > DOWN_START) {
        hidden.current = Math.min(h, hidden.current + dy);
        apply();
        return;
      }

      if (dy < -1) {
        revealFully();
      }
    },
    [apply, revealFully, stopReveal],
  );

  return { headerRef, stickRef, onScroll };
}
