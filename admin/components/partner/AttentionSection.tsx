import Link from "next/link";
import type { AttentionItem } from "@/lib/partner/types";

function BoxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8L12 4L20 8V16L12 20L4 16V8Z"
        fill="#1D1D1F"
        stroke="#1D1D1F"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M4 8L12 12L20 8M12 12V20" stroke="#c6e400" strokeWidth="1.4" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4L21 20H3L12 4Z"
        fill="#c6e400"
        stroke="#1D1D1F"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 10V14" stroke="#1D1D1F" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="16.8" r="0.9" fill="#1D1D1F" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" fill="#1D1D1F" />
      <path d="M9 9L15 15M15 9L9 15" stroke="#c6e400" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function AttentionSection({ items }: { items: AttentionItem[] }) {
  const visible = items.filter((item) => item.count > 0);

  if (visible.length === 0) {
    return (
      <p className="px-4 text-[14px] text-kowi-muted">You’re all caught up.</p>
    );
  }

  return (
    <section>
      <div className="mb-2 flex items-end justify-between px-4">
        <h2 className="text-[18px] font-bold text-kowi-ink">Needs your attention</h2>
        <Link href="/partner/orders" className="text-[12px] font-semibold text-kowi-muted">
          View all
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {visible.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="w-[148px] shrink-0 rounded-[20px] bg-[#f4f5f7] p-3"
          >
            {item.kind === "new_orders" ? (
              <BoxIcon />
            ) : item.kind === "low_stock" ? (
              <WarnIcon />
            ) : (
              <CrossIcon />
            )}
            <p className="mt-3 text-[13px] font-bold text-kowi-ink">{item.title}</p>
            <p className="mt-0.5 text-[22px] font-extrabold leading-7 text-kowi-ink">
              {item.count}
            </p>
            <p className="text-[11px] leading-4 text-kowi-muted">{item.description}</p>
            <span className="mt-3 block text-[12px] font-semibold text-kowi-ink">
              {item.actionLabel} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
