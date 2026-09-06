import Link from "next/link";

function NoteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4H15L19 8V20H7V4Z"
        fill="#1D1D1F"
        stroke="#1D1D1F"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M15 4V8H19" stroke="#c6e400" strokeWidth="1.4" />
      <path d="M10 12H16M10 15.5H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BoxPlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8L12 4L20 8V16L12 20L4 16V8Z"
        fill="#c6e400"
        stroke="#1D1D1F"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 10V16M9 13H15" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function QuickActions() {
  return (
    <section className="px-4">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/partner/inventory"
          className="flex items-center gap-3 rounded-[20px] bg-[#f4f5f7] px-3 py-3"
        >
          <BoxPlusIcon />
          <span>
            <span className="block text-[13px] font-bold text-kowi-ink">Add Stock</span>
            <span className="block text-[11px] text-kowi-muted">Update inventory</span>
          </span>
        </Link>
        <Link
          href="/partner/sell"
          className="flex items-center gap-3 rounded-[20px] bg-kowi-lime px-3 py-3"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-kowi-ink">
            <NoteIcon />
          </span>
          <span>
            <span className="block text-[13px] font-bold text-kowi-ink">Sell</span>
            <span className="block text-[11px] text-kowi-ink/70">Record a sale</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
