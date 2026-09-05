"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePullToRefresh } from "@/lib/pullToRefresh";

const HEADER_LIME = "#d8f59a";

function syncThemeColor(color: string) {
  const metas = document.querySelectorAll('meta[name="theme-color"]');
  if (metas.length === 0) {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    meta.setAttribute("content", color);
    document.head.appendChild(meta);
    return;
  }
  metas.forEach((meta) => meta.setAttribute("content", color));
}

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
  const pathname = usePathname();
  const limeTop =
    pathname === "/home" ||
    pathname === "/orders" ||
    pathname === "/categories" ||
    pathname === "/wallet";

  useEffect(() => {
    syncThemeColor(limeTop ? HEADER_LIME : "#ffffff");
  }, [limeTop]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#d8f59a]">
      <div
        ref={rootRef}
        className={`relative mx-auto flex h-full w-full max-w-[430px] flex-col overflow-y-auto overscroll-y-contain ${
          limeTop ? "bg-[#d8f59a]" : "bg-white"
        } ${className}`}
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
