import Image from "next/image";
import Link from "next/link";
import type { InventoryAlert } from "@/lib/partner/types";

export function InventoryAlerts({ alerts }: { alerts: InventoryAlert[] }) {
  const featured = alerts.find((item) => item.status === "low") ?? alerts[0];

  if (!featured) {
    return (
      <section className="px-4">
        <h2 className="text-[18px] font-bold text-kowi-ink">Inventory</h2>
        <p className="mt-2 text-[14px] text-kowi-muted">Inventory looks healthy.</p>
      </section>
    );
  }

  return (
    <section className="px-4">
      <div className="flex items-end justify-between">
        <h2 className="text-[18px] font-bold text-kowi-ink">Inventory</h2>
        <Link href="/partner/inventory" className="text-[12px] font-semibold text-kowi-muted">
          View all
        </Link>
      </div>
      <div className="mt-3 flex items-stretch gap-3 overflow-hidden rounded-[20px] border border-kowi-line bg-white p-3">
        {featured.image ? (
          <div className="relative aspect-square shrink-0 self-stretch overflow-hidden rounded-[10px] bg-[#f4f5f7]">
            <Image src={featured.image} alt="" fill className="object-cover" sizes="72px" />
          </div>
        ) : null}
        <p className="min-w-0 flex-1 self-center">
          <span className="block truncate text-[13px] font-bold leading-4 text-kowi-ink">
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
        <Link
          href="/partner/inventory"
          className="shrink-0 self-center rounded-lg bg-kowi-ink px-2.5 py-1.5 text-[11px] font-bold leading-none text-white"
        >
          Update Stock
        </Link>
      </div>
    </section>
  );
}
