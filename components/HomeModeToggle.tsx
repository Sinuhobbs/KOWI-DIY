"use client";

import type { HomeMode } from "@/lib/homeMode";

export function HomeModeToggle({
  mode,
  onChange,
}: {
  mode: HomeMode;
  onChange: (mode: HomeMode) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Products or services"
      className="grid grid-cols-2 rounded-full bg-[#f1f2f4] p-1"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === "products"}
        onClick={() => onChange("products")}
        className={`rounded-full py-2.5 text-[14px] font-medium transition-colors ${
          mode === "products"
            ? "bg-kowi-ink text-white shadow-sm"
            : "text-kowi-muted"
        }`}
      >
        Products
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "services"}
        onClick={() => onChange("services")}
        className={`rounded-full py-2.5 text-[14px] font-medium transition-colors ${
          mode === "services"
            ? "bg-kowi-ink text-white shadow-sm"
            : "text-kowi-muted"
        }`}
      >
        Services
      </button>
    </div>
  );
}
