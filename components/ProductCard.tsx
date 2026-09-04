"use client";

import { useEffect, useState } from "react";
import { addItem, getQty, removeItem } from "@/lib/cart";
import { discountPercent, productTitle, type Product } from "@/lib/catalog";
import { haptic } from "@/lib/haptics";
import { ProductThumb } from "@/components/ProductThumb";

export function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(0);
  const off = discountPercent(product.price, product.mrp);

  useEffect(() => {
    function sync() {
      setQty(getQty(product.id));
    }
    sync();
    window.addEventListener("kowi-cart", sync);
    return () => window.removeEventListener("kowi-cart", sync);
  }, [product.id]);

  return (
    <article>
      <div className="relative pb-4">
        <div className="overflow-hidden rounded-[24px] border border-[#eaeaea] bg-[#f8fafc]">
          <ProductThumb
            art={product.art}
            size="well"
            image={product.image}
            alt={productTitle(product)}
          />
        </div>

        <div className="absolute bottom-1.5 right-1.5 z-[1]">
          {qty === 0 ? (
            <button
              type="button"
              onPointerDown={() => haptic()}
              onClick={() => addItem(product.id)}
              className="min-w-[72px] touch-manipulation overflow-hidden rounded-xl border border-[#377e22] bg-white text-center shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-transform duration-75 ease-out active:scale-95"
            >
              <span
                className={`block text-[12px] font-bold uppercase leading-4 text-[#377e22] ${
                  product.options ? "px-3.5 pt-1.5 pb-1" : "px-3.5 py-[7px]"
                }`}
              >
                ADD
              </span>
              {product.options ? (
                <span className="block bg-[#e8f6e6] px-1.5 py-[3px] text-[10px] font-medium leading-3 text-[#333333]">
                  {product.options} options
                </span>
              ) : null}
            </button>
          ) : (
            <div className="min-w-[72px] overflow-hidden rounded-xl bg-[#377e22] text-center shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-transform duration-75 ease-out active:scale-95">
              <div
                className={`flex items-center justify-between text-[12px] font-bold text-white ${
                  product.options ? "px-1.5 pt-1.5 pb-1" : "px-1.5 py-[7px]"
                }`}
              >
                <button
                  type="button"
                  className="px-2 touch-manipulation"
                  onPointerDown={() => haptic()}
                  onClick={() => removeItem(product.id)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-4 text-center">{qty}</span>
                <button
                  type="button"
                  className="px-2 touch-manipulation"
                  onPointerDown={() => haptic()}
                  onClick={() => addItem(product.id)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              {product.options ? (
                <span className="block bg-[#e8f6e6] px-1.5 py-[3px] text-[10px] font-medium leading-3 text-[#333333]">
                  {product.options} options
                </span>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <p className="flex flex-wrap items-baseline gap-x-1">
        <span className="text-[16px] font-bold leading-5 text-[#343c46]">
          ₹{product.price}
        </span>
        <span className="text-[12px] font-normal leading-4 text-[#677489]">
          /{product.unit}
        </span>
        {product.mrp > product.price ? (
          <span className="text-[12px] font-normal leading-4 text-[#677489] line-through">
            ₹{product.mrp}
          </span>
        ) : null}
      </p>
      {off > 0 ? (
        <p className="mt-0.5 text-[12px] font-bold leading-4 text-[#377e22]">
          {off}% OFF
        </p>
      ) : null}
      <p className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-[17px] text-[#333333]">
        {productTitle(product)}
      </p>
    </article>
  );
}
