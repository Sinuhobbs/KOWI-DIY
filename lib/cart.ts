"use client";

import { useEffect, useState } from "react";
import { FREE_DELIVERY_MIN, getProduct } from "@/lib/catalog";

const CART_KEY = "kowi.cart";

export type CartLine = {
  productId: string;
  qty: number;
};

export function readLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY) ?? "[]") as CartLine[];
  } catch {
    return [];
  }
}

function writeLines(lines: CartLine[]) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("kowi-cart"));
}

export function getQty(productId: string) {
  return readLines().find((line) => line.productId === productId)?.qty ?? 0;
}

export function addItem(productId: string) {
  const lines = readLines();
  const existing = lines.find((line) => line.productId === productId);
  if (existing) existing.qty += 1;
  else lines.push({ productId, qty: 1 });
  writeLines(lines);
}

export function removeItem(productId: string) {
  writeLines(
    readLines()
      .map((line) =>
        line.productId === productId ? { ...line, qty: line.qty - 1 } : line,
      )
      .filter((line) => line.qty > 0),
  );
}

export function removeLine(productId: string) {
  writeLines(readLines().filter((line) => line.productId !== productId));
}

export function clearCart() {
  writeLines([]);
}

export function cartCount(lines = readLines()) {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export function cartSubtotal(lines = readLines()) {
  return lines.reduce((sum, line) => {
    const product = getProduct(line.productId);
    return sum + (product?.price ?? 0) * line.qty;
  }, 0);
}

export function cartMrpTotal(lines = readLines()) {
  return lines.reduce((sum, line) => {
    const product = getProduct(line.productId);
    return sum + (product?.mrp ?? 0) * line.qty;
  }, 0);
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    function sync() {
      setLines(readLines());
    }
    sync();
    window.addEventListener("kowi-cart", sync);
    return () => window.removeEventListener("kowi-cart", sync);
  }, []);

  const count = cartCount(lines);
  const subtotal = cartSubtotal(lines);
  const mrpTotal = cartMrpTotal(lines);
  const remaining = Math.max(0, FREE_DELIVERY_MIN - subtotal);
  const freeDelivery = remaining === 0 && subtotal > 0;

  return { lines, count, subtotal, mrpTotal, remaining, freeDelivery };
}
