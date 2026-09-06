import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <p className="text-[22px] font-extrabold tracking-tight">
          kowi <span className="font-semibold text-kowi-muted">partner</span>
        </p>
        <p className="mt-1 text-[14px] text-kowi-muted">
          Partner sign-in is a placeholder. Continue to the store dashboard.
        </p>
        <label className="mt-6 block text-[13px] font-medium">
          Phone or email
          <input
            className="mt-1.5 w-full rounded-xl border border-kowi-line px-3 py-3 text-[15px] outline-none"
            placeholder="admin@kowi.pro"
          />
        </label>
        <Link
          href="/partner/dashboard"
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-kowi-lime py-3 text-[15px] font-semibold text-kowi-ink"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
