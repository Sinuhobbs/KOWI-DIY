"use client";

import Image from "next/image";

export function KowiLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/kowi-wordmark.jpg"
      alt="Kowi.pro"
      width={440}
      height={120}
      priority
      className={`h-auto w-[220px] object-contain ${className}`}
    />
  );
}
