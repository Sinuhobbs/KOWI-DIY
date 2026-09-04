"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/catalog";
import { ChevronRight, TruckIcon } from "@/components/icons";
import { EmptyDeliveryCard } from "@/components/FreeDeliveryBar";
import { ProductThumb } from "@/components/ProductThumb";
import { chromeHideClass, chromeShowClass, useGlobalScrollHide } from "@/lib/scrollChrome";

function rupees(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function ListingDock({
  hidden = false,
  offset = "page",
  lift,
}: {
  hidden?: boolean;
  offset?: "page" | "nav";
  lift?: boolean;
}) {
  const { count, remaining, freeDelivery, subtotal, lines } = useCart();
  const first = lines[0] ? getProduct(lines[0].productId) : undefined;
  const aboveNav = offset === "nav";
  const raised = lift ?? aboveNav;
  const scrollHidden = useGlobalScrollHide();
  const away = hidden || scrollHidden;

  const cardClass =
    "pointer-events-auto flex h-[60px] w-fit items-center gap-2.5 rounded-full py-2.5 pl-2.5 pr-4";
  const iconWell =
    "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white";

  return (
    <div
      className={`pointer-events-none z-30 flex justify-center bg-transparent px-4 transition-transform will-change-transform ${
        aboveNav
          ? `fixed left-1/2 w-full max-w-[430px] pb-2 ${
              raised
                ? "bottom-[calc(3.75rem+env(safe-area-inset-bottom)+16px)]"
                : "bottom-[calc(3.75rem+env(safe-area-inset-bottom))]"
            }`
          : `absolute inset-x-0 bottom-0 ${
              raised
                ? "pb-[max(42px,calc(env(safe-area-inset-bottom)+32px))]"
                : "pb-[max(26px,calc(env(safe-area-inset-bottom)+16px))]"
            }`}
      } ${
        away
          ? chromeHideClass
          : chromeShowClass
      } ${
        aboveNav
          ? ""
          : away
            ? raised
              ? "translate-y-[calc(100%+28px)]"
              : "translate-y-[calc(100%+12px)]"
            : "translate-y-0"
      }`}
      style={
        aboveNav
          ? {
              transform: away
                ? `translateX(-50%) translateY(calc(100% + ${raised ? 28 : 12}px))`
                : "translateX(-50%) translateY(0)",
            }
          : undefined
      }
    >
        {count === 0 ? (
          <EmptyDeliveryCard />
        ) : (
          <Link
            href="/checkout"
            className={`${cardClass} max-w-[min(100%,340px)] bg-[#c6e400] text-[#1D1D1F] shadow-[0_10px_28px_rgba(198,228,0,0.45)]`}
          >
            <span className={iconWell}>
              {first ? (
                <ProductThumb
                  art={first.art}
                  size="sm"
                  image={first.image}
                  alt=""
                />
              ) : (
                <TruckIcon size={26} />
              )}
            </span>
            <span className="min-w-0">
              <span className="block whitespace-nowrap text-[14px] font-bold leading-5">
                Cart · {count} · {rupees(subtotal)}
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-[10px] font-semibold leading-[13px] text-[#1D1D1F]/70">
                {freeDelivery
                  ? "Free delivery unlocked"
                  : `${rupees(remaining)} more for free delivery`}
              </span>
            </span>
            <ChevronRight className="shrink-0 text-[#1D1D1F]" />
          </Link>
        )}
      </div>
  );
}
