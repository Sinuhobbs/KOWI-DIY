"use client";

import { useEffect, useMemo, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { StoreHeader } from "@/components/StoreHeader";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { ListingDock } from "@/components/ListingDock";
import { getProduct } from "@/lib/catalog";
import { readPastOrders } from "@/lib/orders";

const BEST_SELLER_IDS = ["cm-ut-ppc", "cm-birla-w", "pt-tractor", "el-led-12"];

export default function OrdersPage() {
  const [pastIds, setPastIds] = useState<string[]>([]);

  useEffect(() => {
    const ids = readPastOrders().flatMap((order) =>
      order.items.map((item) => item.productId),
    );
    setPastIds([...new Set(ids)]);
  }, []);

  const reorderProducts = useMemo(
    () => pastIds.map((id) => getProduct(id)).filter(Boolean),
    [pastIds],
  );
  const bestSellers = BEST_SELLER_IDS.map((id) => getProduct(id)).filter(
    Boolean,
  );

  return (
    <MobileShell>
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <StoreHeader />

          {reorderProducts.length === 0 ? (
            <section className="px-4 py-5">
              <h2 className="text-[18px] font-bold text-kowi-ink">
                Reordering will be easy
              </h2>
              <p className="mt-1 text-[13px] leading-5 text-kowi-muted">
                Items you order will show up here so you can buy them again
                easily.
              </p>
            </section>
          ) : (
            <section className="px-4 pt-5">
              <h2 className="mb-3 text-[18px] font-bold text-kowi-ink">
                Buy again
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {reorderProducts.map((product) =>
                  product ? (
                    <div key={product.id} className="w-[160px] shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ) : null,
                )}
              </div>
            </section>
          )}

          <section className="pb-4 pt-5">
            <h2 className="mb-3 px-4 text-[18px] font-bold text-kowi-ink">
              Best sellers
            </h2>
            <div className="flex w-full gap-3 overflow-x-auto px-4 pb-2">
              {bestSellers.map((product) =>
                product ? (
                  <div key={product.id} className="w-[160px] shrink-0">
                    <ProductCard product={product} />
                  </div>
                ) : null,
              )}
            </div>
          </section>
        </div>

        <ListingDock offset="nav" />
        <BottomNav />
      </div>
    </MobileShell>
  );
}
