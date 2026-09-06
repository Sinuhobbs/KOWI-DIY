import { PartnerMain } from "@/components/partner/PartnerMain";
import { PartnerShell } from "@/components/partner/PartnerShell";

export default function PartnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PartnerShell>
      <PartnerMain>{children}</PartnerMain>
    </PartnerShell>
  );
}
