"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BagIcon, GridIcon, HomeIcon } from "@/components/icons";

const ITEMS = [
  { href: "/home", label: "Home", id: "home" },
  { href: "/orders", label: "Order Again", id: "orders" },
  { href: "/categories", label: "Categories", id: "categories" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <div
        className="h-[calc(3.75rem+env(safe-area-inset-bottom))] shrink-0"
        aria-hidden
      />
      <nav className="fixed bottom-0 left-1/2 z-40 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-4 border-t border-kowi-line bg-white px-1 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2">
      {ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center gap-1"
          >
            {item.id === "home" ? (
              <HomeIcon active={active} />
            ) : item.id === "orders" ? (
              <BagIcon active={active} />
            ) : (
              <GridIcon />
            )}
            <span
              className={`text-[11px] ${active ? "font-semibold text-kowi-ink" : "text-kowi-muted"}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1"
      >
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#25D366] text-[11px] font-bold text-white">
          W
        </span>
        <span className="text-[11px] text-kowi-muted">Need help?</span>
      </a>
    </nav>
    </>
  );
}
