"use client";

import { useCallback, useRef, useState, type TouchEvent } from "react";

const THRESHOLD = 58;
const MAX_PULL = 92;

function isVerticalScroller(node: HTMLElement) {
  const overflowY = window.getComputedStyle(node).overflowY;
  return (
    (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
    node.scrollHeight > node.clientHeight + 1
  );
}

function scrollersAtTop(root: HTMLElement) {
  const nodes = root.querySelectorAll<HTMLElement>("*");
  for (const node of nodes) {
    if (node.closest("[data-no-ptr]")) continue;
    if (isVerticalScroller(node) && node.scrollTop > 2) return false;
  }
  return true;
}

export function usePullToRefresh(refresh: () => void | Promise<void>) {
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const tracking = useRef(false);
  const offsetRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;

  const onTouchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (refreshing) return;
      const root = rootRef.current;
      const target = event.target;
      if (
        !root ||
        (target instanceof Element && target.closest("[data-no-ptr]"))
      ) {
        tracking.current = false;
        return;
      }
      if (!scrollersAtTop(root)) {
        tracking.current = false;
        return;
      }
      tracking.current = true;
      startY.current = event.touches[0].clientY;
    },
    [refreshing],
  );

  const onTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!tracking.current || refreshing) return;
      const root = rootRef.current;
      if (!root || !scrollersAtTop(root)) {
        tracking.current = false;
        offsetRef.current = 0;
        setOffset(0);
        return;
      }
      const dy = event.touches[0].clientY - startY.current;
      if (dy <= 0) {
        offsetRef.current = 0;
        setOffset(0);
        return;
      }
      const next = Math.min(MAX_PULL, dy * 0.42);
      offsetRef.current = next;
      setOffset(next);
    },
    [refreshing],
  );

  const onTouchEnd = useCallback(async () => {
    if (!tracking.current) return;
    tracking.current = false;
    const pulled = offsetRef.current;
    if (pulled >= THRESHOLD && !refreshing) {
      setRefreshing(true);
      setOffset(52);
      await new Promise((resolve) => window.setTimeout(resolve, 450));
      await Promise.resolve(refreshRef.current());
      setRefreshing(false);
    }
    offsetRef.current = 0;
    setOffset(0);
  }, [refreshing]);

  const indicator = refreshing ? 52 : offset;
  const armed = offset >= THRESHOLD || refreshing;

  return {
    rootRef,
    indicator,
    refreshing,
    armed,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
