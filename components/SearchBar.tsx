import type { ReactNode } from "react";
import { MicIcon, SearchIcon } from "@/components/icons";

export const searchBarClass =
  "flex items-center gap-2.5 rounded-full bg-white px-4 py-3 text-[14px] text-[#9aa0a8] outline outline-1 outline-[#c6e400]";

export function SearchBarContent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SearchIcon className="shrink-0 text-kowi-ink" />
      {children}
      <span className="h-5 w-px shrink-0 bg-[#1D1D1F]/15" aria-hidden />
      <MicIcon className="shrink-0 text-kowi-ink" />
    </>
  );
}
