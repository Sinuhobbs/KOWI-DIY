"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MobileShell } from "@/components/MobileShell";
import { LocationSheet } from "@/components/LocationSheet";
import { ProductThumb } from "@/components/ProductThumb";
import {
  addItem,
  clearCart,
  removeItem,
  removeLine,
  useCart,
} from "@/lib/cart";
import {
  discountPercent,
  getProduct,
  productTitle,
} from "@/lib/catalog";
import { savePastOrder } from "@/lib/orders";
import {
  DEFAULT_LOCATION,
  readLocation,
  type SavedLocation,
} from "@/lib/location";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, count, subtotal, mrpTotal } = useCart();
  const [location, setLocation] = useState<SavedLocation>(DEFAULT_LOCATION);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [step, setStep] = useState<"review" | "address">("review");

  useEffect(() => {
    setLocation(readLocation());
  }, []);

  function placeOrder() {
    const id = `KWI${Date.now().toString().slice(-6)}`;
    savePastOrder({
      id,
      items: lines,
      total: subtotal,
      address: location.short,
    });
    clearCart();
    router.push(`/order/${id}`);
  }

  return (
    <MobileShell className="overflow-hidden">
      <div className="flex min-h-dvh flex-col bg-[#eef1f4]">
        <header className="flex items-center bg-white px-3 py-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold">Checkout</h1>
          <span className="w-9" />
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3 pb-28">
          <div className="rounded-2xl bg-[#e7f8ea] px-4 py-3">
            <p className="text-[15px] font-bold text-[#1aa34a]">
              Available in your area
            </p>
            <p className="mt-0.5 text-[12px] text-kowi-muted">
              Delivering to all areas · {location.short}
            </p>
          </div>

          {count === 0 ? (
            <div className="rounded-2xl bg-white px-4 py-10 text-center">
              <p className="font-semibold">Your cart is empty</p>
              <Link href="/home" className="mt-3 inline-block text-[#1aa34a]">
                Continue shopping
              </Link>
            </div>
          ) : (
            lines.map((line) => {
              const product = getProduct(line.productId);
              if (!product) return null;
              const off = discountPercent(product.price, product.mrp);
              return (
                <article
                  key={line.productId}
                  className="rounded-2xl bg-white p-3"
                >
                  <div className="flex gap-3">
                    <div className="h-[72px] w-[72px] overflow-hidden rounded-xl">
                      <ProductThumb
                        art={product.art}
                        image={product.image}
                        alt={productTitle(product)}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-bold leading-5">
                        {productTitle(product)}
                      </p>
                      <p className="mt-2 text-[15px] font-bold">
                        ₹{product.price}
                        <span className="text-[12px] font-medium text-kowi-muted">
                          /{product.unit}
                        </span>
                      </p>
                      <p className="text-[12px] text-[#9aa0a8] line-through">
                        ₹{product.mrp}
                      </p>
                      {off > 0 ? (
                        <p className="text-[12px] font-bold text-[#1aa34a]">
                          {off}% OFF
                        </p>
                      ) : null}
                      {product.bulkPrice ? (
                        <p className="mt-1 inline-block rounded-md bg-[#e7f8ea] px-2 py-0.5 text-[11px] font-semibold text-[#1aa34a]">
                          Unlock ₹{product.bulkPrice} Bulk Price
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <div className="flex items-center rounded-lg border border-[#c6e400] text-[14px] font-bold text-[#6b8c00]">
                        <button
                          type="button"
                          className="px-2 py-1"
                          onClick={() => removeItem(product.id)}
                        >
                          −
                        </button>
                        <span className="min-w-4 text-center">{line.qty}</span>
                        <button
                          type="button"
                          className="px-2 py-1"
                          onClick={() => addItem(product.id)}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-right">
                        {product.mrp * line.qty > product.price * line.qty ? (
                          <span className="block text-[11px] text-[#9aa0a8] line-through">
                            ₹{product.mrp * line.qty}
                          </span>
                        ) : null}
                        <span className="text-[16px] font-bold">
                          ₹{product.price * line.qty}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(product.id)}
                    className="mt-3 flex items-center gap-1 text-[13px] text-kowi-muted"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 7H19M10 7V5H14V7M8 7L9 19H15L16 7"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                    Remove
                  </button>
                </article>
              );
            })
          )}

          {count > 0 ? (
            <div className="rounded-2xl bg-white p-4 text-[14px]">
              <div className="flex justify-between">
                <span>Item total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-[#1aa34a]">FREE</span>
              </div>
              {mrpTotal > subtotal ? (
                <div className="mt-2 flex justify-between text-[#1aa34a]">
                  <span>You save</span>
                  <span>₹{mrpTotal - subtotal}</span>
                </div>
              ) : null}
              <div className="mt-3 flex justify-between border-t border-kowi-line pt-3 text-[16px] font-bold">
                <span>To pay</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
          ) : null}
        </div>

        {count > 0 ? (
          <div className="bg-white px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3">
            {step === "review" ? (
              <button
                type="button"
                onClick={() => {
                  setSheetOpen(true);
                  setStep("address");
                }}
                className="w-full rounded-2xl bg-kowi-lime py-3.5 text-[16px] font-semibold text-kowi-ink"
              >
                Select address at next step
              </button>
            ) : (
              <button
                type="button"
                onClick={placeOrder}
                className="w-full rounded-2xl bg-kowi-lime py-3.5 text-[16px] font-semibold text-kowi-ink"
              >
                Place order · ₹{subtotal}
              </button>
            )}
          </div>
        ) : null}
      </div>

      <LocationSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSelect={(next) => {
          setLocation(next);
          setSheetOpen(false);
          setStep("address");
        }}
      />
    </MobileShell>
  );
}

