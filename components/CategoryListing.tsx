"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/MobileShell";
import { ProductCard } from "@/components/ProductCard";
import { ProductThumb } from "@/components/ProductThumb";
import { ListingDock } from "@/components/ListingDock";
import { SearchIcon } from "@/components/icons";
import {
  getCategory,
  getProducts,
  getSubcategories,
} from "@/lib/catalog";

export function CategoryListing({ categoryId }: { categoryId: string }) {
  const router = useRouter();
  const category = getCategory(categoryId);
  const subcategories = getSubcategories(categoryId);
  const [activeSub, setActiveSub] = useState(subcategories[0]?.id ?? "all");
  const products = useMemo(
    () => getProducts(categoryId, activeSub),
    [categoryId, activeSub],
  );

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

  return (
    <MobileShell className="h-dvh max-h-dvh overflow-hidden">
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
        <header className="sticky top-0 z-20 flex shrink-0 items-center gap-3 bg-white px-3 py-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center text-kowi-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold text-kowi-ink">
            {category.name}
          </h1>
          <Link
            href={`/search?category=${categoryId}`}
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center text-kowi-ink"
          >
            <SearchIcon />
          </Link>
        </header>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="w-[78px] shrink-0 overflow-y-auto overscroll-y-contain border-r border-[#f0f1f3]">
            {subcategories.map((sub) => {
              const selected = sub.id === activeSub;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setActiveSub(sub.id)}
                  className="relative flex w-full flex-col items-center px-1 py-3"
                >
                  {selected ? (
                    <span className="absolute right-0 top-2 h-[52px] w-[3px] rounded-l bg-kowi-lime" />
                  ) : null}
                  <span
                    className={`overflow-hidden rounded-full ${
                      selected ? "ring-2 ring-kowi-lime" : ""
                    }`}
                  >
                    <ProductThumb art={sub.art} size="sm" />
                  </span>
                  <span
                    className={`mt-1 text-center text-[10px] leading-3 ${
                      selected ? "font-semibold text-kowi-ink" : "text-kowi-muted"
                    }`}
                  >
                    {sub.name}
                  </span>
                </button>
              );
            })}
          </aside>

          <div className="min-w-0 flex-1 overflow-y-auto overscroll-y-contain px-3 pb-3">
            {products.length === 0 ? (
              <p className="pt-10 text-center text-[14px] text-kowi-muted">
                Products for this aisle are coming next.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        <ListingDock />
      </div>
    </MobileShell>
  );
}
