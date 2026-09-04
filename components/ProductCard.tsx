"use client";

import { useEffect, useState } from "react";
import { addItem, getQty, removeItem } from "@/lib/cart";
import { discountPercent, productTitle, type Product } from "@/lib/catalog";
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
    <article className="py-1">
      <div className="relative">
        <ProductThumb art={product.art} />
        {qty === 0 ? (
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="absolute bottom-2 right-2 rounded-lg border border-[#c6e400] bg-white px-3 py-1 text-[12px] font-bold text-[#6b8c00]"
          >
            ADD
            {product.options ? (
              <span className="mt-0.5 block rounded-sm bg-[#fdf6d8] px-1 text-[9px] font-semibold leading-3 text-[#c4a017]">
                {product.options} options
              </span>
            ) : null}
          </button>
        ) : (
          <div className="absolute bottom-2 right-2 flex items-center overflow-hidden rounded-lg border border-[#c6e400] bg-white text-[13px] font-bold text-[#6b8c00]">
            <button
              type="button"
              className="px-2 py-1"
              onClick={() => removeItem(product.id)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-5 text-center">{qty}</span>
            <button
              type="button"
              className="px-2 py-1"
              onClick={() => addItem(product.id)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
      {product.bulkPrice ? (
        <p className="mt-2 w-fit rounded-full bg-[#1aa34a] px-2.5 py-[3px] text-[11px] font-semibold leading-4 text-white">
          Unlock ₹{product.bulkPrice} Bulk Price
        </p>
      ) : null}
      <p className="mt-1 text-[16px] font-bold text-kowi-ink">
        ₹{product.price}
        <span className="text-[13px] font-medium text-kowi-muted">
          /{product.unit}
        </span>
        {product.mrp > product.price ? (
          <span className="ml-1 text-[12px] font-normal text-[#9aa0a8] line-through">
            ₹{product.mrp}
          </span>
        ) : null}
      </p>
      {off > 0 ? (
        <p className="text-[13px] font-bold text-[#1aa34a]">{off}% OFF</p>
      ) : null}
      <p className="mt-1 text-[13px] leading-4 text-kowi-ink">
        {productTitle(product)}
      </p>
    </article>
  );
}
