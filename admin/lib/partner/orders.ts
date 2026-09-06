import { MOCK_DASHBOARD } from "./mockDashboard";
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

export function getMockOrder(id: string) {
  return MOCK_DASHBOARD.activeOrders.find((order) => order.id === id);
}

export function orderStatusLabel(order: ActiveOrder) {
  if (order.status === "NEW") return "NEW";
  if (order.status === "PREPARING") return "PREPARING";
  return "DISPATCHED";
}

export function orderStatusClass(order: ActiveOrder) {
  if (order.status === "NEW") return "bg-kowi-lime text-kowi-ink";
  if (order.status === "PREPARING") return "bg-[#eef8c4] text-kowi-ink";
  return "bg-[#f4f5f7] text-kowi-muted";
}

export function orderCtaParts(order: ActiveOrder) {
  if (order.status === "NEW") return { label: "Accept Order" as const };
  if (order.status === "PREPARING") {
    const left = order.readyInSec ?? 0;
    if (left > 0) return { label: "Mark Ready in" as const, timer: formatReadyIn(left) };
    return { label: "Mark Ready" as const };
  }
  return { label: "Mark Delivered" as const };
}

export function orderCtaLabel(order: ActiveOrder) {
  const parts = orderCtaParts(order);
  return parts.timer ? `${parts.label} ${parts.timer}` : parts.label;
}

export function mapsDirectionsUrl(area: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(area)}`;
}

export function lineTotal(qty: number, price = 0) {
  return qty * price;
}

