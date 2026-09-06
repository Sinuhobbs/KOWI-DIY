"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { InventoryAlert } from "@/lib/partner/types";

const IGNORE_KEY = "kowi.partner.inventoryIgnored";

export function InventoryAlerts({ alerts }: { alerts: InventoryAlert[] }) {
  const [ignored, setIgnored] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(IGNORE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.every((id) => typeof id === "string")) {
        setIgnored(parsed);
      }
    } catch {
      /* keep defaults */
    }
  }, []);

  const visible = alerts.filter((item) => !ignored.includes(item.id));
  const featured = visible.find((item) => item.status === "low") ?? visible[0];

  if (!featured) {
    return (
      <section className="px-4">
        <h2 className="text-[18px] font-bold text-kowi-ink">Inventory</h2>
        <p className="mt-2 text-[14px] text-kowi-muted">Inventory looks healthy.</p>
      </section>
    );
  }

  function ignoreFeatured() {
    const next = [...ignored, featured.id];
    setIgnored(next);
    window.localStorage.setItem(IGNORE_KEY, JSON.stringify(next));
  }

  return (
    <section className="px-4">
      <div className="flex items-end justify-between">
        <h2 className="text-[18px] font-bold text-kowi-ink">Inventory</h2>
        <Link href="/partner/inventory" className="text-[12px] font-semibold text-kowi-muted">
          View all
        </Link>
      </div>
      <div className="mt-3 overflow-hidden rounded-[20px] border border-kowi-line bg-white p-3">
        <div className="flex items-center gap-3">
          {featured.image ? (
            <div className="relative size-[72px] shrink-0 overflow-hidden rounded-[10px] bg-[#f4f5f7]">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>
          ) : null}
          <p className="min-w-0 flex-1">
            <span className="block text-[13px] font-bold leading-4 text-kowi-ink">
              {featured.name}
            </span>
            <span className="mt-0.5 block text-[12px] font-semibold leading-4 text-kowi-ink">
              {featured.status === "out"
                ? "Out of stock"
                : `${featured.quantity} ${featured.unit} left`}
            </span>
            {featured.threshold ? (
              <span className="mt-0.5 block text-[11px] leading-4 text-kowi-muted">
                Reorder when below {featured.threshold}
              </span>
            ) : null}
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={ignoreFeatured}
            className="rounded-lg bg-[#f4f5f7] px-3 py-2.5 text-[12px] font-bold leading-none text-kowi-ink"
          >
            Ignore
          </button>
          <Link
            href="/partner/inventory"
            className="flex items-center justify-center rounded-lg bg-kowi-ink px-3 py-2.5 text-[12px] font-bold leading-none text-white"
          >
            Update Stock
          </Link>
        </div>
      </div>
    </section>
  );
}
