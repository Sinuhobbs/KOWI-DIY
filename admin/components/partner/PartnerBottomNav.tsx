"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardNavIcon,
  InventoryNavIcon,
  MoreNavIcon,
  OrdersNavIcon,
  SellPlusIcon,
} from "@/components/partner/navIcons";
import { MOCK_DASHBOARD } from "@/lib/partner/mockDashboard";
import { registerChromeNav, resetChromeProgress } from "@/lib/partner/chromeScroll";

const orderBadge = MOCK_DASHBOARD.activeOrders.filter(
  (order) => order.status === "NEW",
).length;

const morph = "duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]";

export function PartnerBottomNav() {
  const pathname = usePathname();
  const onSell = pathname === "/partner/sell" || pathname.startsWith("/partner/sell/");
  const home = pathname === "/partner/dashboard" || pathname === "/dashboard";
  const compact = !home;
  const orders = pathname === "/partner/orders" || pathname.startsWith("/partner/orders/");
  const inventory =
    pathname === "/partner/inventory" || pathname.startsWith("/partner/inventory/");
  const more =
    pathname === "/partner/more" ||
    pathname.startsWith("/partner/store") ||
    pathname.startsWith("/partner/payments");

  const spacerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (onSell) {
      registerChromeNav(null, null);
      resetChromeProgress();
      return;
    }
    registerChromeNav(slideRef.current, spacerRef.current);
    resetChromeProgress();
    return () => registerChromeNav(null, null);
  }, [onSell, compact, pathname]);

  if (onSell) return null;

  return (
    <>
      <div
        ref={spacerRef}
        className={`shrink-0 ${
          compact
            ? "h-[calc(3.75rem+env(safe-area-inset-bottom))]"
            : "h-[calc(4.25rem+env(safe-area-inset-bottom))]"
        }`}
        aria-hidden
      />
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2">
        <div ref={slideRef}>
          <nav
            className={`grid grid-cols-5 border-t border-kowi-line bg-white px-1 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 ${
              compact ? "items-center" : "items-end"
            }`}
          >
            <NavLink href="/partner/dashboard" label="Home" active={home}>
              <DashboardNavIcon active={home} />
            </NavLink>
            <NavLink href="/partner/orders" label="Orders" active={orders} badge={orderBadge}>
              <OrdersNavIcon active={orders} />
            </NavLink>
            <SellNavButton compact={compact} />
            <NavLink href="/partner/inventory" label="Inventory" active={inventory}>
              <InventoryNavIcon active={inventory} />
            </NavLink>
            <NavLink href="/partner/more" label="More" active={more}>
              <MoreNavIcon active={more} />
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
}

function SellNavButton({ compact }: { compact: boolean }) {
  return (
    <Link
      href="/partner/sell"
      aria-label="Sell"
      className="relative flex flex-col items-center justify-center"
    >
      <span
        className={`flex items-center justify-center overflow-hidden bg-kowi-lime text-kowi-ink transition-all ${morph} ${
          compact
            ? "mt-0 h-10 w-[4.6rem] gap-1 rounded-full px-3 shadow-none"
            : "-mt-7 h-14 w-14 gap-0 rounded-full px-0 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
        }`}
      >
        <span
          className={`flex shrink-0 items-center justify-center transition-all ${morph} ${
            compact ? "h-[18px] w-[18px]" : "h-7 w-7"
          }`}
        >
          <SellPlusIcon className="h-full w-full" />
        </span>
        <span
          className="grid min-w-0 transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{ gridTemplateColumns: compact ? "1fr" : "0fr" }}
        >
          <span className="overflow-hidden">
            <span
              className={`block whitespace-nowrap text-[12px] font-bold leading-none transition-opacity duration-200 ${
                compact ? "opacity-100" : "opacity-0"
              }`}
            >
              Sell
            </span>
          </span>
        </span>
      </span>
      <span
        className={`overflow-hidden text-[11px] leading-none text-kowi-muted transition-all ${morph} ${
          compact ? "mt-0 h-0 opacity-0" : "mt-1 h-[11px] opacity-100"
        }`}
        aria-hidden={compact}
      >
        Sell
      </span>
    </Link>
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
