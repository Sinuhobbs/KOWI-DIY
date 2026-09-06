"use client";

import Link from "next/link";
import { discountPercent } from "@/lib/catalog";
import { ProductThumb } from "@/components/catalog/ProductThumb";
import { ActiveSwitch } from "@/components/partner/inventory/ActiveSwitch";
import {
  changeSummary,
  itemArt,
  itemIsActive,
  itemStockLabel,
} from "@/lib/partner/inventory";
import type { InventoryChangeRequest, InventoryItem } from "@/lib/partner/types";

export function InventoryProductCard({
  item,
  request,
  categoryActive,
  onToggle,
}: {
  item: InventoryItem;
  request?: InventoryChangeRequest;
  categoryActive: boolean;
  onToggle: (active: boolean) => void;
}) {
  const active = itemIsActive(item, request, categoryActive);
  const pending = request?.status === "pending";
  const requested = pending ? changeSummary(item, request.changes) : [];
  const off = discountPercent(item.rate, item.mrp);

  return (
    <article className={active ? undefined : "opacity-70"}>
      <div className="relative pb-4">
        <div className="overflow-hidden rounded-[24px] border border-[#eaeaea] bg-[#f8fafc]">
          <ProductThumb
            art={itemArt(item)}
            size="well"
            image={item.image}
            alt={`${item.brand} ${item.name}`}
          />
        </div>
        {pending ? (
          <span className="absolute left-2 top-2 rounded-sm bg-kowi-lime px-1.5 py-0.5 text-[9px] font-bold uppercase text-kowi-ink">
            Pending
          </span>
        ) : null}
        <div className="absolute bottom-1.5 right-1.5 z-[1]">
          <Link
            href={`/partner/inventory/item/${item.id}`}
            className="inline-flex h-7 shrink-0 items-center justify-center rounded-md border border-[#377e22] bg-white px-1 text-[10px] font-bold uppercase leading-none text-[#377e22] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            Modify
          </Link>
        </div>
      </div>
      <p className="flex flex-wrap items-baseline gap-x-1">
        <span className="text-[16px] font-bold leading-5 text-[#343c46]">₹{item.rate}</span>
        <span className="text-[12px] font-normal leading-4 text-[#677489]">/{item.unit}</span>
        {item.mrp > item.rate ? (
          <span className="text-[12px] font-normal leading-4 text-[#677489] line-through">
            ₹{item.mrp}
          </span>
        ) : null}
      </p>
      {off > 0 ? (
        <p className="mt-0.5 text-[12px] font-bold leading-4 text-[#377e22]">{off}% OFF</p>
      ) : null}
      <p className={`text-[12px] font-bold leading-4 ${off > 0 ? "mt-0.5 text-kowi-muted" : "mt-0.5 text-[#377e22]"}`}>
        {itemStockLabel(item)}
      </p>
      <p className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-[17px] text-[#333333]">
        {item.brand} {item.name}
        {item.pack ? ` (${item.pack})` : ""}
      </p>
      <div className="mt-2">
        <ActiveSwitch
          size="sm"
          on={active}
          disabled={!categoryActive}
          onChange={onToggle}
          label={active ? "Active" : "Inactive"}
        />
      </div>
      {requested.length ? (
        <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-kowi-ink">
          {requested.join(" · ")}
        </p>
      ) : null}
    </article>
  );
}
