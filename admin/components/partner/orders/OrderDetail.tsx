"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { rupees } from "@/lib/partner/dashboardApi";
import {
  formatReadyIn,
  getMockOrder,
  lineTotal,
  mapsDirectionsUrl,
  orderCtaParts,
  orderNumber,
  orderStatusClass,
  orderStatusLabel,
} from "@/lib/partner/orders";
import type { ActiveOrder } from "@/lib/partner/types";
import { useScrollLinkedHeader } from "@/lib/partner/useScrollLinkedHeader";

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4H10L11.5 8L9.5 9.5C10.5 11.5 12.5 13.5 14.5 14.5L16 12.5L20 14V17C20 18 19 19 18 19C10.5 19 5 13.5 5 6C5 5 6 4 7 4Z"
        fill="#c6e400"
        stroke="#1D1D1F"
        strokeWidth="1.4"
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

function advanceOrder(order: ActiveOrder): ActiveOrder | null {
  if (order.status === "NEW") {
    return {
      ...order,
      status: "PREPARING",
      readyInSec: 20 * 60,
      prepTotalSec: 20 * 60,
    };
  }
  if (order.status === "PREPARING") {
    return { ...order, status: "READY", readyInSec: 0 };
  }
  return null;
}

export function OrderDetail({ id }: { id: string }) {
  const router = useRouter();
  const { headerRef, onScroll } = useScrollLinkedHeader();
  const [order, setOrder] = useState<ActiveOrder | null>(() => {
    const found = getMockOrder(id);
    return found ? structuredClone(found) : null;
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setOrder((current) =>
        current?.status === "PREPARING" && (current.readyInSec ?? 0) > 0
          ? { ...current, readyInSec: (current.readyInSec ?? 0) - 1 }
          : current,
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!order) {
    return (
      <div className="flex min-h-full flex-col bg-white px-4 py-8">
        <Link href="/partner/orders" className="text-[13px] font-bold text-kowi-ink">
          ← Orders
        </Link>
        <p className="mt-8 text-center text-[15px] text-kowi-muted">This order was not found.</p>
      </div>
    );
  }

  const readyLeft = order.readyInSec ?? 0;
  const total = order.prepTotalSec || 1;
  const progress =
    order.status === "PREPARING" ? Math.min(100, Math.max(0, ((total - readyLeft) / total) * 100)) : 0;
  const itemsTotal = order.items.reduce(
    (sum, item) => sum + lineTotal(item.qty, item.price ?? 0),
    0,
  );
  const cta = orderCtaParts(order);

  function onAction() {
    if (!order) return;
    const next = advanceOrder(order);
    if (!next) {
      router.push("/partner/orders");
      return;
    }
    setOrder(next);
  }

  const header = (
    <header className="bg-[linear-gradient(180deg,#d8f59a_0%,#ffffff_100%)] px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="flex items-center gap-2">
        <Link
          href="/partner/orders"
          aria-label="Back to orders"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-kowi-ink"
        >
          <BackIcon />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <div className="flex items-center gap-2">
            <h1 className="text-[24px] font-extrabold leading-none tracking-tight text-kowi-ink">
              {orderNumber(order.displayId)}
            </h1>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold leading-4 ${orderStatusClass(order)}`}
            >
              {orderStatusLabel(order)}
            </span>
          </div>
          <p className="text-[12px] leading-none text-kowi-muted">
            {order.time}
            {order.status === "PREPARING" ? ` · Ready in ${formatReadyIn(readyLeft)}` : ""}
          </p>
        </div>
      </div>
    </header>
  );

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
        onScroll={onScroll}
      >
        <div ref={headerRef} className="sticky top-0 z-30">
          {header}
        </div>
        <div className="px-4 pb-4">
        <section className="grid grid-cols-3 gap-2">
          <div className="rounded-[16px] bg-[#f4f5f7] px-3 py-3">
            <p className="text-[11px] text-kowi-muted">Amount</p>
            <p className="mt-1 text-[16px] font-extrabold text-kowi-ink">{rupees(order.value)}</p>
          </div>
          <div className="rounded-[16px] bg-[#f4f5f7] px-3 py-3">
            <p className="text-[11px] text-kowi-muted">Items</p>
            <p className="mt-1 text-[16px] font-extrabold text-kowi-ink">{order.itemCount}</p>
          </div>
          <div className="rounded-[16px] bg-[#f4f5f7] px-3 py-3">
            <p className="text-[11px] text-kowi-muted">Payment</p>
            <p className="mt-1 text-[16px] font-extrabold text-kowi-ink">{order.payment ?? "UPI"}</p>
          </div>
        </section>

        {order.customer ? (
          <section className="mt-4 rounded-[20px] border border-kowi-line p-3.5">
            <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-kowi-muted">
              Customer
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-kowi-ink">{order.customer}</p>
                {order.phone ? (
                  <p className="mt-0.5 text-[13px] text-kowi-muted">{order.phone}</p>
                ) : null}
              </div>
              {order.phone ? (
                <a
                  href={`tel:${order.phone}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4f5f7]"
                  aria-label={`Call ${order.customer}`}
                >
                  <PhoneIcon />
                </a>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="mt-3 rounded-[20px] border border-kowi-line p-3.5">
          <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-kowi-muted">
            Delivery
          </p>
          <a
            href={mapsDirectionsUrl(order.area)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-3"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4f5f7]">
              <DirectionsIcon />
            </span>
            <span className="min-w-0 text-[13px] font-semibold uppercase leading-5 text-kowi-ink">
              {order.area}
            </span>
          </a>
          {order.note ? (
            <p className="mt-3 rounded-xl bg-[#eef8c4] px-3 py-2 text-[12px] leading-5 text-kowi-ink">
              {order.note}
            </p>
          ) : null}
        </section>

        <section className="mt-3 overflow-hidden rounded-[20px] border border-kowi-line">
          <div className="flex items-end justify-between px-3.5 py-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-kowi-muted">
              Items
            </p>
            <p className="text-[12px] font-semibold text-kowi-muted">
              {order.items.length} listed
            </p>
          </div>
          <ul>
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 border-t border-kowi-line px-3.5 py-3"
              >
                <div className="relative size-14 shrink-0 overflow-hidden rounded-[12px] bg-[#f4f5f7]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold leading-4 text-kowi-ink">{item.name}</p>
                  <p className="mt-0.5 text-[11px] text-kowi-muted">
                    {item.sku ? `${item.sku} · ` : ""}x {item.qty}
                    {item.price ? ` · ${rupees(item.price)}` : ""}
                  </p>
                </div>
                {item.price ? (
                  <p className="shrink-0 text-[13px] font-bold text-kowi-ink">
                    {rupees(lineTotal(item.qty, item.price))}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="border-t border-kowi-line px-3.5 py-3">
            {itemsTotal ? (
              <div className="flex items-center justify-between text-[13px] text-kowi-muted">
                <span>Items total</span>
                <span>{rupees(itemsTotal)}</span>
              </div>
            ) : null}
            <div className="mt-1 flex items-center justify-between text-[15px] font-extrabold text-kowi-ink">
              <span>Bill total</span>
              <span>{rupees(order.value)}</span>
            </div>
          </div>
        </section>
        </div>
      </div>

      <div className="shrink-0 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <button
          type="button"
          onClick={onAction}
          className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl px-3 py-3 text-[12px] font-bold leading-none ${
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
          <span className="relative whitespace-nowrap">
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
    </div>
  );
}
