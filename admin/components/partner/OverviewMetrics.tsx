import Link from "next/link";
import { rupees } from "@/lib/partner/dashboardApi";
import type { OverviewMetrics as Overview } from "@/lib/partner/types";

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="13" width="3.2" height="7" rx="0.8" fill="#c6e400" />
      <rect x="10.4" y="8" width="3.2" height="12" rx="0.8" fill="#1D1D1F" />
      <rect x="16.8" y="4" width="3.2" height="16" rx="0.8" fill="#c6e400" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7H19L18 17H7L5 7Z"
        fill="#c6e400"
        stroke="#1D1D1F"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="19.2" r="1.2" fill="#1D1D1F" />
      <circle cx="16" cy="19.2" r="1.2" fill="#1D1D1F" />
    </svg>
  );
}

export function OverviewMetrics({ overview }: { overview: Overview }) {
  return (
    <section className="grid grid-cols-2 gap-3 px-4">
      <Link
        href="/partner/payments"
        className="rounded-[20px] bg-[#f4f5f7] p-3.5"
      >
        <ChartIcon />
        <p className="mt-3 text-[12px] font-medium text-kowi-muted">Today’s Sales</p>
        <p className="mt-0.5 text-[22px] font-extrabold tracking-tight text-kowi-ink">
          {rupees(overview.salesToday)}
        </p>
        <p className="mt-1 text-[10px] leading-4 text-kowi-muted">
          Kowi {rupees(overview.salesOnline)} · Offline {rupees(overview.salesOffline)}
        </p>
      </Link>
      <Link href="/partner/orders" className="rounded-[20px] bg-[#f4f5f7] p-3.5">
        <CartIcon />
        <p className="mt-3 text-[12px] font-medium text-kowi-muted">Orders Today</p>
        <p className="mt-0.5 text-[22px] font-extrabold tracking-tight text-kowi-ink">
          {overview.ordersToday}
        </p>
        <p className="mt-1 text-[10px] leading-4 text-kowi-muted">
          Kowi {overview.ordersOnline} · Offline {overview.ordersOffline}
        </p>
      </Link>
    </section>
  );
}
