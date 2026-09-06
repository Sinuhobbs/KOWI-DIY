"use client";

import { useEffect, useMemo, useState } from "react";
import { MOCK_DASHBOARD } from "@/lib/partner/mockDashboard";
import { ORDERS_TABS, ordersInTab, type OrdersTab } from "@/lib/partner/orders";
import type { ActiveOrder, StoreStatus } from "@/lib/partner/types";
import { DashboardHeader } from "@/components/partner/DashboardHeader";
import { OrderCard } from "@/components/partner/orders/OrderCard";

const STATUS_KEY = "kowi.partner.storeOpen";

const EMPTY: Record<OrdersTab, string> = {
  NEW: "No new orders right now.",
  PREPARING: "Nothing is being prepared.",
  OUT: "No dispatched orders right now.",
};

export function OrdersPage() {
  const [tab, setTab] = useState<OrdersTab>("NEW");
  const [status, setStatus] = useState<StoreStatus>(MOCK_DASHBOARD.store.status);
  const [orders, setOrders] = useState<ActiveOrder[]>(() =>
    structuredClone(MOCK_DASHBOARD.activeOrders),
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(STATUS_KEY);
    setStatus(saved === "closed" ? "closed" : saved === "open" ? "open" : MOCK_DASHBOARD.store.status);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setOrders((current) =>
        current.map((order) =>
          order.status === "PREPARING" && (order.readyInSec ?? 0) > 0
            ? { ...order, readyInSec: (order.readyInSec ?? 0) - 1 }
            : order,
        ),
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const counts = useMemo(
    () => ({
      NEW: ordersInTab(orders, "NEW").length,
      PREPARING: ordersInTab(orders, "PREPARING").length,
      OUT: ordersInTab(orders, "OUT").length,
    }),
    [orders],
  );
  const visible = ordersInTab(orders, tab);

  function handleAction(order: ActiveOrder) {
    setOrders((current) => {
      if (order.status === "NEW") {
        return current.map((item) =>
          item.id === order.id
            ? {
                ...item,
                status: "PREPARING",
                readyInSec: 20 * 60,
                prepTotalSec: 20 * 60,
              }
            : item,
        );
      }
      if (order.status === "PREPARING") {
        return current.map((item) =>
          item.id === order.id ? { ...item, status: "READY", readyInSec: 0 } : item,
        );
      }
      return current.filter((item) => item.id !== order.id);
    });
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
        <DashboardHeader
          store={MOCK_DASHBOARD.store}
          status={status}
          notifications={MOCK_DASHBOARD.notifications}
        />
        <div className="sticky top-0 z-20 grid grid-cols-3 border-b border-kowi-line bg-white px-2 pb-1 pt-2">
          {ORDERS_TABS.map((item) => {
            const active = tab === item.id;
            const count = counts[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`relative flex items-center justify-center gap-1 px-1 py-1 text-[12px] font-bold leading-4 outline-none ${
                  active ? "text-kowi-ink" : "text-kowi-muted"
                }`}
              >
                <span className="text-center">{item.label}</span>
                {count ? (
                  <span
                    className={`min-w-5 rounded-full px-1.5 text-center text-[10px] font-bold leading-5 ${
                      active ? "bg-kowi-lime text-kowi-ink" : "bg-[#f4f5f7] text-kowi-muted"
                    }`}
                  >
                    {count}
                  </span>
                ) : null}
                {active ? (
                  <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-kowi-lime" />
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 px-4 py-4">
          {visible.length === 0 ? (
            <p className="py-10 text-center text-[14px] text-kowi-muted">{EMPTY[tab]}</p>
          ) : (
            visible.map((order) => (
              <OrderCard key={order.id} order={order} onAction={() => handleAction(order)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
