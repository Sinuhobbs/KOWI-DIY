"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MobileShell } from "@/components/MobileShell";
import { ProductCard } from "@/components/ProductCard";
import { ListingDock } from "@/components/ListingDock";
import { groupProductsByCategory, searchCatalog } from "@/lib/catalog";
import { searchServices } from "@/lib/services";
import { ServiceArt } from "@/components/ServiceArt";
import Link from "next/link";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <MobileShell>
          <div className="min-h-dvh bg-white" />
        </MobileShell>
      }
    >
      <SearchScreen />
    </Suspense>
  );
}

function SearchScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") ?? undefined;
  const serviceMode = searchParams.get("mode") === "services";
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(true);

  const groups = useMemo(() => {
    const products = searchCatalog(query, categoryId);
    return groupProductsByCategory(products);
  }, [query, categoryId]);
  const serviceHits = useMemo(
    () => (serviceMode ? searchServices(query) : []),
    [query, serviceMode],
  );

  const showHint = !query.trim() && !categoryId && !serviceMode;

  return (
    <MobileShell className="h-dvh max-h-dvh overflow-hidden">
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#fbf8ee]">
        <header className="sticky top-0 z-20 shrink-0 bg-[#fbf8ee] px-3 pb-2 pt-3">
          <label className="flex items-center gap-1 rounded-full border border-[#e4e2d8] bg-white px-1.5 py-1.5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="flex h-9 w-9 shrink-0 items-center justify-center text-kowi-ink"
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
            <input
              autoFocus
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder={
                serviceMode
                  ? "Search for services..."
                  : "Search for products, categories..."
              }
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#b0b4ba] [&::-webkit-search-cancel-button]:hidden"
            />
          </label>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-white px-3 pb-6">
          {showHint ? (
            <p className="px-2 pt-6 text-[14px] text-kowi-muted">
              Try cement, paint, switch, pipe, or a brand name.
            </p>
          ) : serviceMode ? (
            serviceHits.length === 0 ? (
              <p className="px-2 pt-6 text-[14px] text-kowi-muted">
                No services match “{query}”. Every area is still open —
                try electrician, plumber, or AC.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-x-2 gap-y-4 pt-4">
                {serviceHits.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="text-center"
                  >
                    <ServiceArt art={service.art} />
                    <span className="mt-1.5 block text-[11px] leading-4 text-kowi-ink">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </div>
            )
          ) : groups.length === 0 ? (
            <p className="px-2 pt-6 text-[14px] text-kowi-muted">
              No products match “{query}”. Every area is still deliverable —
              try another name.
            </p>
          ) : (
            groups.map((group) => (
              <section key={group.category.id} className="pt-4">
                <h2 className="mb-3 px-1 text-[18px] font-bold text-kowi-ink">
                  {group.category.name}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {group.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        {searchFocused || serviceMode ? null : <ListingDock />}
      </div>
    </MobileShell>
  );
}
