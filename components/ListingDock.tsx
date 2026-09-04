"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/catalog";
import { TruckIcon } from "@/components/icons";
import { ProductThumb } from "@/components/ProductThumb";

export function ListingDock() {
  const { count, remaining, freeDelivery, lines } = useCart();
  const first = lines[0] ? getProduct(lines[0].productId) : undefined;

  return (
    <div className="sticky bottom-0 z-20 flex shrink-0 items-center gap-2 bg-white px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2">
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-[#b7e3c2] bg-[#e7f8ea] px-2.5 py-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
          <TruckIcon />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-bold text-[#1aa34a]">
            {freeDelivery ? "Free delivery unlocked" : "Unlock free delivery"}
          </span>
          <span className="block truncate text-[11px] text-kowi-muted">
            {freeDelivery
              ? "No delivery fee on this order"
              : `Shop for ₹${remaining} more`}
          </span>
        </span>
      </div>
      {count > 0 ? (
        <Link
          href="/checkout"
          className="flex shrink-0 items-center gap-2 rounded-full bg-[#1D1D1F] py-2 pl-2 pr-4 text-white"
        >
          {first ? (
            <span className="h-8 w-8 overflow-hidden rounded-full bg-white">
              <ProductThumb art={first.art} size="sm" />
            </span>
          ) : null}
          <span>
            <span className="block text-[13px] font-bold leading-4">Cart</span>
            <span className="block text-[11px] text-white/70">
              {count} {count === 1 ? "item" : "items"}
            </span>
          </span>
        </Link>
      ) : null}
    </div>
  );
}
