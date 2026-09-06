"use client";

import { usePullToRefresh } from "@/lib/pullToRefresh";

export function PullReload({ children }: { children: React.ReactNode }) {
  const {
    rootRef,
    indicator,
    refreshing,
    armed,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = usePullToRefresh(() => {
    window.location.reload();
  });

  return (
    <div
      ref={rootRef}
      className="relative h-full"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[80] flex items-center justify-center overflow-hidden"
        style={{ height: indicator }}
        aria-hidden={!refreshing && indicator === 0}
      >
        <span
          className={`h-6 w-6 rounded-full border-2 border-[#377e22]/25 border-t-[#377e22] ${
            refreshing || armed ? "animate-spin" : ""
          }`}
        />
      </div>
      {children}
    </div>
  );
}
