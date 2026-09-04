"use client";

import { MobileShell } from "@/components/MobileShell";
import { BottomNav } from "@/components/BottomNav";
import Link from "next/link";

export function PlaceholderScreen({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <MobileShell>
      <div className="flex min-h-dvh flex-col bg-white">
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <h1 className="text-[22px] font-bold text-kowi-ink">{title}</h1>
          <p className="mt-2 text-[14px] leading-5 text-kowi-muted">{detail}</p>
          <Link
            href="/home"
            className="mt-6 rounded-2xl bg-kowi-lime px-5 py-3 text-[14px] font-semibold text-kowi-ink"
          >
            Back to home
          </Link>
        </div>
        <BottomNav />
      </div>
    </MobileShell>
  );
}
