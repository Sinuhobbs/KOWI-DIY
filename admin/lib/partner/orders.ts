import type { ActiveOrder } from "./types";

export type OrdersTab = "NEW" | "PREPARING" | "OUT";

export const ORDERS_TABS: { id: OrdersTab; label: string }[] = [
  { id: "NEW", label: "New" },
  { id: "PREPARING", label: "Preparing" },
  { id: "OUT", label: "Dispatched" },
];

export function tabStatus(tab: OrdersTab): ActiveOrder["status"] {
  return tab === "OUT" ? "READY" : tab;
}

export function orderNumber(displayId: string) {
  return `#${displayId.replace(/^KW-/, "")}`;
}

export function formatReadyIn(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

export function ordersInTab(orders: ActiveOrder[], tab: OrdersTab) {
  const status = tabStatus(tab);
  return orders.filter((order) => order.status === status);
}
