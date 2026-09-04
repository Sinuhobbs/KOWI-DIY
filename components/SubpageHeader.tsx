"use client";

import { useRouter } from "next/navigation";

export function SubpageHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <header className="relative flex items-center py-3">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="absolute left-0 flex h-9 w-9 items-center justify-center text-kowi-ink"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 19L8 12L15 5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="w-full text-center text-[18px] font-bold text-kowi-ink">
        {title}
      </h1>
    </header>
  );
}
