"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardNavIcon,
  InventoryNavIcon,
  MoreNavIcon,
  OrdersNavIcon,
} from "@/components/partner/navIcons";
import { MOCK_DASHBOARD } from "@/lib/partner/mockDashboard";

const orderBadge = MOCK_DASHBOARD.activeOrders.filter(
  (order) => order.status === "NEW",
).length;

export function PartnerBottomNav() {
  const pathname = usePathname();
  const onSell = pathname === "/partner/sell" || pathname.startsWith("/partner/sell/");
  const home = pathname === "/partner/dashboard" || pathname === "/dashboard";
  const orders = pathname === "/partner/orders" || pathname.startsWith("/partner/orders/");
  const inventory =
    pathname === "/partner/inventory" || pathname.startsWith("/partner/inventory/");
  const more =
    pathname === "/partner/more" ||
    pathname.startsWith("/partner/store") ||
    pathname.startsWith("/partner/payments");

  if (onSell) return null;

  return (
    <>
      <div
        className="h-[calc(4.25rem+env(safe-area-inset-bottom))] shrink-0"
        aria-hidden
      />
      <nav className="fixed bottom-0 left-1/2 z-40 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 items-end border-t border-kowi-line bg-white px-1 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2">
        <NavLink href="/partner/dashboard" label="Home" active={home}>
          <DashboardNavIcon active={home} />
        </NavLink>
        <NavLink href="/partner/orders" label="Orders" active={orders} badge={orderBadge}>
          <OrdersNavIcon active={orders} />
        </NavLink>
        <Link href="/partner/sell" className="relative flex flex-col items-center">
          <span className="-mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-kowi-lime text-[28px] font-medium leading-none text-kowi-ink shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
            +
          </span>
          <span
            className="mt-1 text-[11px] leading-none text-kowi-muted"
          >
            Sell
          </span>
        </Link>
        <NavLink href="/partner/inventory" label="Inventory" active={inventory}>
          <InventoryNavIcon active={inventory} />
        </NavLink>
        <NavLink href="/partner/more" label="More" active={more}>
          <MoreNavIcon active={more} />
        </NavLink>
      </nav>
    </>
  );
}

function NavLink({
  href,
  label,
  active,
  badge,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  badge?: number;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="relative flex flex-col items-center gap-1">
      {children}
      {badge ? (
        <span className="absolute right-[18%] top-[-4px] min-w-4 rounded-full bg-kowi-ink px-1 text-center text-[10px] font-bold leading-4 text-white">
          {badge > 9 ? "9+" : badge}
        </span>
      ) : null}
      <span
        className={`text-[11px] leading-none ${
          active ? "font-semibold text-kowi-ink" : "text-kowi-muted"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
