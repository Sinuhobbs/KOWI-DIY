"use client";

import { useRef } from "react";
import { ProfileIcon } from "@/components/icons";

export function ProfileAvatar({
  photo,
  size = 80,
  editable = false,
  onPick,
  caption,
}: {
  photo: string;
  size?: number;
  editable?: boolean;
  onPick?: (file: File) => void;
  caption?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const avatar = (
    <span
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f3f4f6] text-kowi-ink"
      style={{ width: size, height: size }}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt="" className="h-full w-full object-cover" />
      ) : (
        <ProfileIcon size={Math.round(size * 0.45)} />
      )}
      {editable ? (
        <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-kowi-ink text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 8H7L8.5 5.5H15.5L17 8H20V19H4V8Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </span>
      ) : null}
    </span>
  );

  if (!editable || !onPick) return avatar;

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) onPick(file);
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center rounded-full"
        aria-label={caption ?? "Upload profile photo"}
      >
        {avatar}
        {caption ? (
          <span className="mt-3 text-[13px] font-medium text-kowi-ink">
            {caption}
          </span>
        ) : null}
      </button>
    </>
  );
}
