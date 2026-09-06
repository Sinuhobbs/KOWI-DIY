"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { DashboardInsight } from "@/lib/partner/types";

const DISMISS_KEY = "kowi.partner.insightDismissed";

export function InsightBanner({ insight }: { insight: DashboardInsight }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(window.localStorage.getItem(DISMISS_KEY) === insight.id);
  }, [insight.id]);

  if (hidden) return null;

  return (
    <aside className="relative mx-4 rounded-[22px] bg-[#eef8c4] px-4 py-3.5">
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          window.localStorage.setItem(DISMISS_KEY, insight.id);
          setHidden(true);
        }}
        className="absolute right-3 top-3 text-[16px] leading-none text-kowi-ink/50"
      >
        ×
      </button>
      <p className="pr-6 text-[14px] font-bold text-kowi-ink">{insight.title}</p>
      <p className="mt-1 pr-6 text-[12px] leading-5 text-kowi-ink/70">{insight.body}</p>
      <Link
        href={insight.href}
        className="mt-3 inline-flex rounded-xl bg-white px-3 py-1.5 text-[12px] font-bold text-kowi-ink"
      >
        {insight.actionLabel}
      </Link>
    </aside>
  );
}
