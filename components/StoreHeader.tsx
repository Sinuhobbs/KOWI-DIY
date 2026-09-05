"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LocationSheet } from "@/components/LocationSheet";
import {
  ChevronDown,
  MicIcon,
  ProfileIcon,
  SearchIcon,
  WalletIcon,
} from "@/components/icons";
import {
  DEFAULT_LOCATION,
  deliveryMinutes,
  readLocation,
  type SavedLocation,
} from "@/lib/location";
import { useProfile } from "@/lib/profile";

function nearestScroller(node: HTMLElement | null) {
  let current = node?.parentElement ?? null;
  while (current && current !== document.body) {
    const overflowY = window.getComputedStyle(current).overflowY;
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

export function StoreHeader({
  searchHref = "/search",
  searchPlaceholder = "What do you need today?",
}: {
  searchHref?: string;
  searchPlaceholder?: string;
}) {
  const [location, setLocation] = useState<SavedLocation>(DEFAULT_LOCATION);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { photo } = useProfile();

  useEffect(() => {
    setLocation(readLocation());
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const root = nearestScroller(sentinel);
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { root, threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const searchBarClass =
    "flex items-center gap-2.5 rounded-full border border-white bg-white/40 px-4 py-3 text-[14px] text-[#9aa0a8] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_0_0_1px_rgba(29,29,31,0.12),0_2px_8px_rgba(29,29,31,0.06)] backdrop-blur-xl";

  return (
    <>
      <div className="bg-[linear-gradient(180deg,#d8f59a_0%,#f3fbe0_55%,#ffffff_100%)] px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="min-w-0 flex-1 text-left"
          >
            <p className="text-[13px] font-bold leading-4 text-kowi-ink">
              Kowi in
            </p>
            <p className="mt-0.5 text-[28px] font-extrabold leading-8 tracking-tight text-kowi-ink">
              {deliveryMinutes(location)} minutes
            </p>
            <p className="mt-1 flex items-center gap-1 truncate text-[13px] font-semibold text-kowi-ink">
              <span className="truncate">{location.short || location.area}</span>
              <ChevronDown />
            </p>
          </button>
          <div className="flex gap-2 pt-1">
            <Link
              href="/wallet"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-kowi-ink"
              aria-label="Wallet"
            >
              <WalletIcon />
            </Link>
            <Link
              href="/profile"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/70 text-kowi-ink"
              aria-label="Profile"
            >
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="" className="h-full w-full object-cover" />
              ) : (
                <ProfileIcon />
              )}
            </Link>
          </div>
        </div>
      </div>

      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      <div
        className={`sticky z-20 px-4 pb-2.5 pt-4 ${
          stuck
            ? "bg-[#d8f59a] shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
        style={{ top: "env(safe-area-inset-top)" }}
      >
        {stuck ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -translate-y-full bg-[#d8f59a]"
            style={{ height: "env(safe-area-inset-top)" }}
            aria-hidden
          />
        ) : null}
        <Link href={searchHref} className={`relative ${searchBarClass}`}>
          <SearchIcon className="shrink-0 text-kowi-ink" />
          <span className="min-w-0 flex-1 truncate">{searchPlaceholder}</span>
          <span className="h-5 w-px shrink-0 bg-[#1D1D1F]/15" aria-hidden />
          <MicIcon className="shrink-0 text-kowi-ink" />
        </Link>
      </div>

      <LocationSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSelect={setLocation}
      />
    </>
  );
}
