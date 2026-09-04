"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import { CategoryArt } from "@/components/CategoryArt";
import { ServiceArt } from "@/components/ServiceArt";
import { MobileShell } from "@/components/MobileShell";
import { BottomNav } from "@/components/BottomNav";
import { StoreHeader } from "@/components/StoreHeader";
import { FreeDeliveryBar } from "@/components/FreeDeliveryBar";
import { HomeModeToggle } from "@/components/HomeModeToggle";
import { usePlus } from "@/lib/plus";
import { useHomeMode } from "@/lib/homeMode";
import { SERVICES } from "@/lib/services";

export default function HomePage() {
  const plusMember = usePlus();
  const { mode, select } = useHomeMode();
  const showingServices = mode === "services";

  return (
    <MobileShell className="overflow-hidden">
      <div className="flex min-h-dvh flex-col bg-white">
        <StoreHeader
          collapsible
          searchHref={showingServices ? "/search?mode=services" : "/search"}
          searchPlaceholder={
            showingServices
              ? "Search for services..."
              : "What do you need today?"
          }
        />

        <section className="px-4 pb-6 pt-2">
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
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="text-center"
                >
                  <div className="relative">
                    <CategoryArt art={category.art} />
                    {category.isNew ? (
                      <span className="absolute right-0 top-0 rounded-sm bg-[#e11d2a] px-1 py-px text-[8px] font-bold uppercase text-white">
                        New
                      </span>
                    ) : null}
                  </div>
                  <span className="mt-1.5 block text-[11px] leading-4 text-kowi-ink">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <div className="mt-auto px-4 pb-4 pt-2">
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

        {showingServices ? (
          <FreeDeliveryBar
            title="Pros available in your area"
            detail="Electrician to waterproofing, all open"
          />
        ) : (
          <FreeDeliveryBar />
        )}

        <BottomNav />
      </div>
    </MobileShell>
  );
}
