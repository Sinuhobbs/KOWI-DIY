import Image from "next/image";
import Link from "next/link";
import { rupees } from "@/lib/partner/dashboardApi";
import {
  formatReadyIn,
  mapsDirectionsUrl,
  orderCtaParts,
  orderNumber,
  orderStatusClass,
  orderStatusLabel,
} from "@/lib/partner/orders";
import type { ActiveOrder } from "@/lib/partner/types";

const MAX_IMAGES = 4;

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 8V12.2L14.6 13.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DirectionsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L21 12L12 21L3 12L12 3Z"
        fill="#c6e400"
        stroke="#1D1D1F"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 14V10.5H14"
        stroke="#1D1D1F"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 8.8L14.6 10.5L12.2 12.2"
        stroke="#1D1D1F"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrderCard({
  order,
  onAction,
}: {
  order: ActiveOrder;
  onAction: () => void;
}) {
  const showViewAll = order.itemCount > 4;
  const preview = order.items.slice(0, showViewAll ? MAX_IMAGES - 1 : MAX_IMAGES);
  const extra = showViewAll ? Math.max(0, order.itemCount - preview.length) : 0;
  const readyLeft = order.readyInSec ?? 0;
  const total = order.prepTotalSec || 1;
  const progress =
    order.status === "PREPARING" ? Math.min(100, Math.max(0, ((total - readyLeft) / total) * 100)) : 0;
  const cta = orderCtaParts(order);

  return (
    <article className="relative rounded-[20px] border border-kowi-line bg-white p-3.5">
      <Link
        href={`/partner/orders/${order.id}`}
        className="absolute inset-0 z-0 rounded-[20px]"
        aria-label={`View ${orderNumber(order.displayId)} details`}
      />
      <div className="relative z-10 flex items-start justify-between gap-3 pointer-events-none">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="text-[22px] font-extrabold leading-none tracking-tight text-kowi-ink">
            {orderNumber(order.displayId)}
          </h2>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold leading-4 ${orderStatusClass(order)}`}
          >
            {orderStatusLabel(order)}
          </span>
        </div>
        <p className="shrink-0 text-[12px] text-kowi-muted">{order.time}</p>
      </div>

      <div className="relative z-10 mt-2.5 flex items-center gap-2 text-[13px] font-bold text-kowi-ink pointer-events-none">
        <span>{rupees(order.value)}</span>
        <span className="h-3 w-px bg-kowi-line" aria-hidden />
        <span className="font-semibold text-kowi-muted">
          {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
        </span>
        {order.status === "PREPARING" ? (
          <>
            <span className="h-3 w-px bg-kowi-line" aria-hidden />
            <span className="inline-flex items-center gap-1 font-semibold text-[#377e22]">
              <ClockIcon />
              Ready in {formatReadyIn(readyLeft)}
            </span>
          </>
        ) : null}
      </div>

      <div className="relative z-10 mt-3 grid grid-cols-4 gap-2 pointer-events-none">
        {preview.map((item) => (
          <div key={item.id} className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-[12px] bg-[#f4f5f7]">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="72px" />
            </div>
            <p className="mt-1 line-clamp-2 text-[10px] leading-3 text-kowi-muted">
              {item.name}
            </p>
            <p className="mt-0.5 text-[10px] font-bold text-kowi-ink">x {item.qty}</p>
          </div>
        ))}
        {showViewAll ? (
          <Link
            href={`/partner/orders/${order.id}`}
            className="pointer-events-auto flex aspect-square w-full flex-col items-center justify-center self-start rounded-[12px] bg-[#f4f5f7] px-1 text-center"
          >
            <span className="text-[11px] font-bold leading-4 text-kowi-ink">+{extra} more</span>
            <span className="mt-0.5 text-[11px] font-semibold text-[#377e22]">View all →</span>
          </Link>
        ) : null}
      </div>

      <div className="relative z-10 mt-3 grid grid-cols-2 gap-2 border-t border-dashed border-kowi-line pt-3">
        <a
          href={mapsDirectionsUrl(order.area)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${order.area}`}
          className="flex min-w-0 items-center gap-2"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4f5f7]">
            <DirectionsIcon />
          </span>
          <span className="min-w-0 line-clamp-2 text-[11px] font-semibold uppercase leading-4 tracking-[0.02em] text-kowi-muted">
            {order.area}
          </span>
        </a>
        <button
          type="button"
          onClick={onAction}
          className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl px-3 py-2.5 text-[12px] font-bold leading-none ${
            order.status === "NEW"
              ? "bg-kowi-lime text-kowi-ink"
              : "border border-kowi-lime text-kowi-ink"
          }`}
        >
          {order.status === "PREPARING" ? (
            <span
              className="absolute inset-y-0 left-0 bg-[#eef8c4]"
              style={{ width: `${progress}%` }}
              aria-hidden
            />
          ) : order.status === "READY" ? (
            <span className="absolute inset-0 bg-[#eef8c4]" aria-hidden />
          ) : null}
          <span className="relative whitespace-nowrap text-center">
            {cta.label}
            {cta.timer ? (
              <>
                {" "}
                <span className="text-[10px] font-bold tabular-nums">{cta.timer}</span>
              </>
            ) : null}
          </span>
        </button>
      </div>
    </article>
  );
}
