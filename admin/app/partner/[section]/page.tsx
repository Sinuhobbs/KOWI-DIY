import Link from "next/link";

const LABELS: Record<string, { title: string; copy: string }> = {
  orders: {
    title: "Orders",
    copy: "Full order management is next. New, packing, and ready orders are on Home for now.",
  },
  inventory: {
    title: "Inventory",
    copy: "Stock management is next. Low-stock alerts are on Home for now.",
  },
  payments: {
    title: "Payments",
    copy: "Settlements and payouts are next.",
  },
  store: {
    title: "Store",
    copy: "Hours, staff, and store settings are next.",
  },
  sell: {
    title: "Sell",
    copy: "Offline billing is next. Use this to record a counter sale.",
  },
  scan: {
    title: "Scan Product",
    copy: "Camera scan is next. You’ll use this to find and update a product.",
  },
  more: {
    title: "More",
    copy: "Store tools, payments, and help live here next.",
  },
};

const MORE_LINKS = [
  { href: "/partner/payments", label: "Payments" },
  { href: "/partner/store", label: "Store settings" },
  { href: "/", label: "Log out" },
];

export default async function PartnerSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const screen = LABELS[section] ?? {
    title: "Partner",
    copy: "This screen is next.",
  };

  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="bg-[linear-gradient(180deg,#d8f59a_0%,#ffffff_100%)] px-4 pb-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <p className="text-[13px] font-bold text-kowi-ink">kowi</p>
        <h1 className="mt-0.5 text-[26px] font-extrabold tracking-tight text-kowi-ink">
          {screen.title}
        </h1>
      </header>
      <div className="px-4 py-6">
        <p className="text-center text-[15px] text-kowi-muted">{screen.copy}</p>
        {section === "more" ? (
          <ul className="mt-6 overflow-hidden rounded-[20px] bg-[#f4f5f7]">
            {MORE_LINKS.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-kowi-ink ${
                    index ? "border-t border-white" : ""
                  }`}
                >
                  {item.label}
                  <span className="text-kowi-muted">›</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
