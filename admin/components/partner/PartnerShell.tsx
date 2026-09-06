"use client";

import { useEffect } from "react";

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

export function PartnerShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    syncThemeColor(HEADER_LIME);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#d8f59a]">
      <div className="relative mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-[#d8f59a]">
        {children}
      </div>
    </div>
  );
}
