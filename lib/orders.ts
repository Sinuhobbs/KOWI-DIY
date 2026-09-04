import type { CartLine } from "@/lib/cart";

const ORDERS_KEY = "kowi.pastOrders";

export type PastOrder = {
  id: string;
  items: CartLine[];
  total: number;
  address: string;
};

export function readPastOrders(): PastOrder[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(ORDERS_KEY) ?? "[]") as PastOrder[];
  } catch {
    return [];
  }
}

export function savePastOrder(order: PastOrder) {
  const next = [order, ...readPastOrders()].slice(0, 10);
  sessionStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  sessionStorage.setItem("kowi.lastOrder", JSON.stringify(order));
}
