"use client";

import { PartnerBottomNav } from "@/components/partner/PartnerBottomNav";
import { useScrollLinkedHeader } from "@/lib/partner/useScrollLinkedHeader";

export function PartnerMain({ children }: { children: React.ReactNode }) {
  const { onScroll } = useScrollLinkedHeader();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <div
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain"
        onScroll={onScroll}
      >
        {children}
      </div>
      <PartnerBottomNav />
    </div>
  );
}
