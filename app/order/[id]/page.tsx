"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MobileShell } from "@/components/MobileShell";
import { KowiLogo } from "@/components/KowiLogo";
import type { PastOrder } from "@/lib/orders";

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<PastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("kowi.lastOrder");
      if (raw) setOrder(JSON.parse(raw) as PastOrder);
    } catch {
      setOrder(null);
    }
  }, []);

  const count =
    order?.items.reduce((sum, item) => sum + item.qty, 0) ?? 0;

  return (
    <MobileShell>
      <div className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
        <KowiLogo />
        <h1 className="mt-8 text-[24px] font-bold">Order placed</h1>
        <p className="mt-2 text-[15px] text-kowi-muted">
          {order
            ? `${count} item${count === 1 ? "" : "s"} · ₹${order.total}`
            : "Your mock order is confirmed."}
        </p>
        <p className="mt-1 text-[13px] text-kowi-muted">
          #{params.id} · {order?.address ?? "Delivering in your area"}
        </p>
        <p className="mt-4 text-[13px] font-medium text-[#1aa34a]">
          Available in your area · arriving soon
        </p>
        <Link
          href="/orders"
          className="mt-8 w-full rounded-2xl bg-kowi-lime py-3.5 text-[16px] font-semibold text-kowi-ink"
        >
          Order again
        </Link>
        <Link href="/home" className="mt-3 text-[14px] text-kowi-muted">
          Back to home
        </Link>
      </div>
    </MobileShell>
  );
}
