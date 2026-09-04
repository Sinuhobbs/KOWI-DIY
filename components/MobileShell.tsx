"use client";

import { usePullToRefresh } from "@/lib/pullToRefresh";

export function MobileShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
    <div className="min-h-dvh bg-[#e8e8e8]">
      <div
        ref={rootRef}
        className={`relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white ${className}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[70] flex items-center justify-center overflow-hidden"
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
    </div>
  );
}
