import { PartnerBottomNav } from "@/components/partner/PartnerBottomNav";
import { PartnerShell } from "@/components/partner/PartnerShell";

export default function PartnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PartnerShell>
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain">
          {children}
        </div>
        <PartnerBottomNav />
      </div>
    </PartnerShell>
  );
}
