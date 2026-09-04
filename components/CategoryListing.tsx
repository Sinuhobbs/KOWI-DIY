"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/MobileShell";
import { ProductCard } from "@/components/ProductCard";
import { ProductThumb } from "@/components/ProductThumb";
import { ListingDock } from "@/components/ListingDock";
import { LocationSheet } from "@/components/LocationSheet";
import {
  ChevronDown,
  SearchIcon,
  ShareIcon,
  SlidersIcon,
  SortIcon,
} from "@/components/icons";
import {
  getCategory,
  getProducts,
  getSubcategories,
} from "@/lib/catalog";
import {
  DEFAULT_LOCATION,
  locationPin,
  readLocation,
  type SavedLocation,
} from "@/lib/location";
import { chromeHideClass, chromeShowClass, useScrollChrome } from "@/lib/scrollChrome";

type SortKey = "popular" | "low" | "high";

export function CategoryListing({ categoryId }: { categoryId: string }) {
  const router = useRouter();
  const category = getCategory(categoryId);
  const subcategories = getSubcategories(categoryId);
  const [activeSub, setActiveSub] = useState(subcategories[0]?.id ?? "all");
  const [sort, setSort] = useState<SortKey>("popular");
  const [location, setLocation] = useState<SavedLocation>(DEFAULT_LOCATION);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { hidden: chromeHidden, onScroll } = useScrollChrome();
  const products = useMemo(
    () => getProducts(categoryId, activeSub),
    [categoryId, activeSub],
  );
  const visible = useMemo(() => {
    const list = [...products];
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, sort]);

  useEffect(() => {
    setLocation(readLocation());
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const { overflow: htmlOverflow } = html.style;
    const { overflow: bodyOverflow } = document.body.style;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, []);

  if (!category) {
    return (
      <MobileShell>
        <div className="flex min-h-dvh flex-col items-center justify-center px-6">
          <p className="text-[16px] text-kowi-muted">Category not found.</p>
          <Link href="/home" className="mt-4 font-semibold text-[#1aa34a]">
            Back to home
          </Link>
        </div>
      </MobileShell>
    );
  }

  const categoryName = category.name;

  function cycleSort() {
    setSort((current) =>
      current === "popular" ? "low" : current === "low" ? "high" : "popular",
    );
  }

  async function shareCategory() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: categoryName, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user cancelled */
    }
  }

  const sortLabel =
    sort === "low" ? "Price: Low" : sort === "high" ? "Price: High" : "Sort";

  const deliveryPlace = locationPin(location) || "your area";

  return (
    <MobileShell className="h-dvh max-h-dvh overflow-hidden">
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
        <header className="sticky top-0 z-20 flex min-h-[70px] w-full shrink-0 items-center justify-between gap-2 border-b border-[#eeeeee] bg-white px-3 py-3.5">
          <div className="flex min-w-0 flex-1 items-center gap-0.5">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="flex h-11 w-11 shrink-0 items-center justify-center text-[#363636]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 19L8 12L15 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-[16px] font-bold leading-5 text-[#363636]">
                {category.name}
              </h1>
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="mt-px flex max-w-full items-center gap-0.5"
              >
                <span className="min-w-0 truncate text-[13px] font-normal leading-4 text-[#377e22]">
                  Delivering to {deliveryPlace}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 10 10"
                  className="shrink-0 text-[#377e22]"
                  aria-hidden
                >
                  <path d="M1.8 3.2L5 7.2L8.2 3.2Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-[#333333]">
            <button
              type="button"
              onClick={shareCategory}
              aria-label="Share"
              className="flex h-9 w-9 items-center justify-center"
            >
              <ShareIcon />
            </button>
            <Link
              href={`/search?category=${categoryId}`}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center"
            >
              <SearchIcon size={22} />
            </Link>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="relative z-[1] w-[78px] shrink-0 overflow-y-auto overscroll-y-contain bg-white [box-shadow:1px_0_3px_rgba(0,0,0,0.05)]">
            {subcategories.map((sub) => {
              const selected = sub.id === activeSub;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setActiveSub(sub.id)}
                  className="relative flex w-full flex-col items-center px-1 py-2.5"
                >
                  {selected ? (
                    <span className="absolute right-0 top-1/2 h-14 w-[5px] -translate-y-1/2 rounded-l-full bg-[#1aa34a]" />
                  ) : null}
                  <span
                    className={`flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full ${
                      selected ? "bg-[#eaf6ec]" : "bg-[#f7f7f7]"
                    }`}
                  >
                    <ProductThumb art={sub.art} size="rail" />
                  </span>
                  <span
                    className={`mt-1 w-full px-0.5 text-center text-[10px] leading-[12px] ${
                      selected
                        ? "font-bold text-[#1c1c1c]"
                        : "font-normal text-[#757575]"
                    }`}
                  >
                    {sub.name}
                  </span>
                </button>
              );
            })}
          </aside>

          <div
            className="min-w-0 flex-1 overflow-y-auto overscroll-y-contain px-3 pb-20"
            onScroll={onScroll}
          >
            <div
              className={`sticky top-0 z-20 -mx-3 mb-2 flex gap-2 overflow-x-auto bg-white px-3 py-2 transition-transform will-change-transform ${
                chromeHidden
                  ? chromeHideClass + " -translate-y-[120%]"
                  : chromeShowClass + " translate-y-0"
              }`}
            >
              <Chip icon={<SlidersIcon />} label="Filters" />
              <Chip icon={<SortIcon />} label={sortLabel} onClick={cycleSort} />
              <Chip label="Brand" />
            </div>
            {visible.length === 0 ? (
              <p className="pt-10 text-center text-[14px] text-kowi-muted">
                Products for this aisle are coming next.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                {visible.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <ListingDock hidden={chromeHidden} />
        <LocationSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onSelect={setLocation}
        />
      </div>
    </MobileShell>
  );
}

function Chip({
  icon,
  label,
  onClick,
}: {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-1 rounded-2xl border border-[#e5e7eb] bg-white px-2.5 py-1.5 text-[12px] font-semibold text-kowi-ink"
    >
      {icon}
      {label}
      <ChevronDown />
    </button>
  );
}
