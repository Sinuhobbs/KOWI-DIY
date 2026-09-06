"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchPartnerDashboard } from "@/lib/partner/dashboardApi";
import type { DashboardData, StoreStatus } from "@/lib/partner/types";
import { DashboardHeader } from "@/components/partner/DashboardHeader";
import { OverviewMetrics } from "@/components/partner/OverviewMetrics";
import { QuickActions } from "@/components/partner/QuickActions";
import { AttentionSection } from "@/components/partner/AttentionSection";
import { InventoryAlerts } from "@/components/partner/InventoryAlerts";
import { InsightBanner } from "@/components/partner/InsightBanner";
import { DashboardSkeleton } from "@/components/partner/DashboardSkeleton";

const STATUS_KEY = "kowi.partner.storeOpen";

export function PartnerDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState<StoreStatus>("open");

  const load = useCallback(async () => {
    setError(false);
    setData(null);
    try {
      if (window.location.search.includes("error=1")) {
        throw new Error("dashboard");
      }
      const next = await fetchPartnerDashboard();
      setData(next);
      const saved = window.localStorage.getItem(STATUS_KEY);
      setStatus(
        saved === "closed" ? "closed" : saved === "open" ? "open" : next.store.status,
      );
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-16 text-center">
        <p className="text-[18px] font-bold text-kowi-ink">Something went wrong.</p>
        <p className="mt-1 text-[14px] text-kowi-muted">
          Unable to load your dashboard right now.
        </p>
        <button
          type="button"
          onClick={() => void load()}
          className="mt-4 rounded-xl bg-kowi-lime px-4 py-2.5 text-[14px] font-bold text-kowi-ink"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white">
        <div className="h-36 bg-[linear-gradient(180deg,#d8f59a_0%,#ffffff_100%)]" />
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <>
      <DashboardHeader
        store={data.store}
        status={status}
        notifications={data.notifications}
      />
      <div className="flex flex-col gap-5 bg-white pb-4 pt-1">
        <OverviewMetrics overview={data.overview} />
        <QuickActions />
        <AttentionSection items={data.attentionItems} />
        <InventoryAlerts alerts={data.inventoryAlerts} />
        <InsightBanner insight={data.insight} />
      </div>
    </>
  );
}
