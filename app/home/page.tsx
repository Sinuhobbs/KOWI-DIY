"use client";

import Link from "next/link";
import {
  HOME_CATEGORY_IDS,
  HOME_NEW_PRODUCT_IDS,
  categoryImage,
  getCategory,
  getProduct,
} from "@/lib/catalog";
import { BRANDS, brandLogo } from "@/lib/brands";
import { CategoryArt } from "@/components/CategoryArt";
import { ServiceArt } from "@/components/ServiceArt";
import { MobileShell } from "@/components/MobileShell";
import { BottomNav } from "@/components/BottomNav";
import { StoreHeader } from "@/components/StoreHeader";
import { ListingDock } from "@/components/ListingDock";
import { HomeModeToggle } from "@/components/HomeModeToggle";
import { ProductCard } from "@/components/ProductCard";
import { usePlus } from "@/lib/plus";
import { useHomeMode } from "@/lib/homeMode";
import { SERVICES } from "@/lib/services";

const homeCategories = HOME_CATEGORY_IDS.flatMap((id) => {
  const category = getCategory(id);
  return category ? [category] : [];
});
const newProducts = HOME_NEW_PRODUCT_IDS.flatMap((id) => {
  const product = getProduct(id);
  return product ? [product] : [];
});

export default function HomePage() {
  const plusMember = usePlus();
  const { mode, select } = useHomeMode();
  const showingServices = mode === "services";

  return (
    <MobileShell className="h-dvh max-h-dvh overflow-hidden">
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain">
          <StoreHeader
            collapsible
            searchHref={showingServices ? "/search?mode=services" : "/search"}
            searchPlaceholder={
              showingServices
                ? "Search for services..."
                : "What do you need today?"
            }
          />

          <section className="px-4 pb-2 pt-2">
            <HomeModeToggle mode={mode} onChange={select} />
            <h2 className="mb-3 mt-4 text-[18px] font-bold text-kowi-ink">
              {showingServices ? "Book a service" : "Shop by Categories"}
            </h2>
            {showingServices ? (
              <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                {SERVICES.map((service) => (
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
            ) : (
              <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                {homeCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="text-center"
                  >
                    <div className="relative">
                      <CategoryArt art={category.art} image={categoryImage(category)} />
                      {category.isNew ? (
                        <span className="absolute right-0 top-0 rounded-sm bg-[#e11d2a] px-1 py-px text-[8px] font-bold uppercase text-white">
                          New
                        </span>
                      ) : null}
                    </div>
                    <span className="mt-1.5 block line-clamp-2 text-[11px] leading-4 text-kowi-ink">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {showingServices ? null : (
            <>
              <section className="px-4 pb-2 pt-5">
                <h2 className="mb-3 text-[18px] font-bold text-kowi-ink">
                  Brands
                </h2>
                <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                  {BRANDS.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/search?q=${encodeURIComponent(brand.query ?? brand.name)}`}
                      className="text-center"
                    >
                      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[18px] bg-[#f4f5f7]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={brandLogo(brand.id)}
                          alt={brand.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="mt-1.5 block line-clamp-2 text-[11px] leading-4 text-kowi-ink">
                        {brand.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="pb-2 pt-5">
                <h2 className="mb-3 px-4 text-[18px] font-bold text-kowi-ink">
                  New Products
                </h2>
                <div className="flex w-full gap-3 overflow-x-auto px-4 pb-2">
                  {newProducts.map((product) => (
                    <div key={product.id} className="w-[160px] shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>

              <div className="px-4 pb-6 pt-4">
                <Link
                  href="/plus"
                  className="flex items-center gap-3 rounded-2xl bg-[#1D1D1F] px-4 py-3"
                >
                  <span className="shrink-0 text-[16px] font-extrabold tracking-tight">
                    <span className="text-kowi-lime">kowi</span>
                    <span className="text-white"> plus</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-white">
                      {plusMember ? "Your Kowi Plus" : "Join Kowi Plus"}
                    </span>
                    <span className="block text-[11px] text-white/70">
                      {plusMember
                        ? "Cashback and free delivery are on"
                        : "Cashback, Free Delivery and more"}
                    </span>
                  </span>
                  <span className="text-kowi-lime">›</span>
                </Link>
              </div>
            </>
          )}
        </div>

        <ListingDock offset="nav" />

        <BottomNav />
      </div>
    </MobileShell>
  );
}
