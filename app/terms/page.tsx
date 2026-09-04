import { MobileShell } from "@/components/MobileShell";
import Link from "next/link";

export default function TermsPage() {
  return (
    <MobileShell>
      <div className="px-6 py-8">
        <Link href="/" className="text-[14px] font-medium text-kowi-muted">
          Back
        </Link>
        <h1 className="mt-6 text-[24px] font-semibold">Terms of Service</h1>
        <p className="mt-4 text-[15px] leading-6 text-kowi-muted">
          Placeholder terms for the Kowi DIY UI preview. Real legal copy
          will be added later.
        </p>
      </div>
    </MobileShell>
  );
}
