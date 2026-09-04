import type { ProductArt } from "@/lib/catalog";

export function ProductThumb({
  art,
  size = "md",
  image,
  alt = "",
}: {
  art: ProductArt;
  size?: "sm" | "md" | "well" | "rail";
  image?: string;
  alt?: string;
}) {
  const compact = size === "sm";
  const well = size === "well";
  const rail = size === "rail";
  const wellClass = `flex items-center justify-center overflow-hidden rounded-xl ${
    compact
      ? "h-10 w-10 rounded-full bg-[#f5f6f8]"
      : rail
        ? "h-8 w-8 bg-transparent"
        : well
          ? "h-[136px] w-full bg-transparent"
          : "h-[132px] w-full bg-white ring-1 ring-black/[0.06]"
  }`;

  if (image) {
    return (
      <div className={wellClass}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          className={`h-full w-full ${compact ? "object-cover" : "object-contain"}`}
        />
      </div>
    );
  }

  return (
    <div className={wellClass}>
      {art === "switch" && (
        <div className="h-16 w-12 rounded-md bg-white ring-1 ring-black/10">
          <div className="mx-auto mt-5 h-6 w-3 rounded-full bg-[#d1d5db]" />
        </div>
      )}
      {art === "adapter" && (
        <div className="relative h-14 w-16 rounded-md bg-white ring-1 ring-black/10">
          <div className="absolute left-2 top-3 h-3 w-3 rounded-full bg-[#9ca3af]" />
          <div className="absolute right-2 top-3 h-3 w-3 rounded-full bg-[#9ca3af]" />
          <div className="absolute bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#9ca3af]" />
        </div>
      )}
      {art === "mcb" && (
        <div className="flex h-16 w-10 flex-col rounded-sm bg-[#f3f4f6] ring-1 ring-black/10">
          <div className="h-4 bg-[#facc15]" />
          <div className="mx-auto mt-2 h-5 w-4 rounded-sm bg-white" />
        </div>
      )}
      {art === "holder" && (
        <div className="h-12 w-12 rounded-full bg-white ring-4 ring-[#e5e7eb]" />
      )}
      {art === "bulb" && (
        <div className="h-14 w-10 rounded-t-full bg-[#fde68a] ring-1 ring-[#f5d76e]" />
      )}
      {art === "heater" && (
        <div className="h-16 w-10 rounded-2xl bg-white ring-1 ring-black/10">
          <div className="mx-auto mt-3 h-6 w-6 rounded-full bg-[#e5e7eb]" />
        </div>
      )}
      {art === "strip" && (
        <div className="h-8 w-20 rounded-md bg-white ring-1 ring-black/10">
          <div className="mt-2 flex justify-around px-2">
            <span className="h-3 w-3 rounded-sm bg-[#d1d5db]" />
            <span className="h-3 w-3 rounded-sm bg-[#d1d5db]" />
            <span className="h-3 w-3 rounded-sm bg-[#d1d5db]" />
          </div>
        </div>
      )}
      {art === "doorbell" && (
        <div className="h-12 w-12 rounded-lg bg-[#1d4ed8]" />
      )}
      {art === "fan" && (
        <div className="h-14 w-14 rounded-full border-4 border-[#d1d5db]" />
      )}
      {art === "paint" && (
        <div className="h-14 w-10 rounded-sm bg-white ring-1 ring-black/10">
          <div className="h-3 bg-[#1d4ed8]" />
        </div>
      )}
      {art === "cement" && (
        <div className="relative h-[88px] w-[62px] overflow-hidden rounded-sm bg-[#f0c230] shadow-sm">
          <div className="h-5 bg-[#c41e3a]" />
          <div className="mx-auto mt-3 h-8 w-8 rounded-full bg-white/85" />
        </div>
      )}
      {art === "plaster" && (
        <div className="relative h-[88px] w-[62px] overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-black/10">
          <div className="h-5 bg-[#e8a0b4]" />
          <div className="mx-auto mt-3 h-8 w-8 rounded-full bg-[#f3d0da]" />
        </div>
      )}
      {art === "whiteCement" && (
        <div className="h-14 w-10 rounded-sm bg-white ring-1 ring-[#93c5fd]">
          <div className="h-3 bg-[#2563eb]" />
        </div>
      )}
      {art === "grout" && (
        <div className="grid grid-cols-2 gap-0.5">
          <div className="h-6 w-6 bg-[#d6d3d1]" />
          <div className="h-6 w-6 bg-[#a8a29e]" />
          <div className="h-6 w-6 bg-[#e7e5e4]" />
          <div className="h-6 w-6 bg-[#78716c]" />
        </div>
      )}
      {art === "wood" && (
        <div className="flex gap-0.5">
          <div className="h-12 w-4 bg-[#c28a4a]" />
          <div className="h-12 w-4 bg-[#a56a32]" />
          <div className="h-12 w-4 bg-[#d2a05c]" />
        </div>
      )}
      {art === "glue" && (
        <div className="h-12 w-9 rounded-md bg-[#2563eb]" />
      )}
      {art === "bath" && (
        <div className="h-8 w-12 rounded-full bg-[#e7d5c4]" />
      )}
      {art === "hinge" && (
        <div className="h-8 w-12 rounded-sm bg-[#9aa3ad]" />
      )}
      {art === "lock" && (
        <div className="h-10 w-8 rounded-md bg-[#c9a227]" />
      )}
      {art === "tool" && (
        <div className="h-8 w-12 rounded-sm bg-[#2563eb]" />
      )}
      {art === "pipe" && (
        <div className="h-4 w-16 rounded-full bg-[#d6d3d1]" />
      )}
      {art === "waterproof" && (
        <div className="h-14 w-8 rounded-sm bg-[#dc2626]" />
      )}
      {art === "steel" && (
        <div className="flex items-end gap-1">
          <div className="h-10 w-2 rounded-sm bg-[#9ca3af]" />
          <div className="h-14 w-2 rounded-sm bg-[#6b7280]" />
          <div className="h-12 w-2 rounded-sm bg-[#d1d5db]" />
        </div>
      )}
      {art === "brick" && (
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-0.5">
            <div className="h-5 w-8 rounded-[2px] bg-[#c45c3e]" />
            <div className="h-5 w-6 rounded-[2px] bg-[#a94432]" />
          </div>
          <div className="flex gap-0.5">
            <div className="h-5 w-6 rounded-[2px] bg-[#b4533a]" />
            <div className="h-5 w-8 rounded-[2px] bg-[#d97757]" />
          </div>
        </div>
      )}
      {art === "door" && (
        <div className="relative h-16 w-10 rounded-sm bg-[#a56a32]">
          <div className="absolute right-1 top-1/2 h-2 w-2 rounded-full bg-[#d2a05c]" />
        </div>
      )}
      {art === "helmet" && (
        <div className="h-10 w-14 rounded-t-full bg-[#facc15]" />
      )}
      {art === "generic" && (
        <div className="h-12 w-12 rounded-md bg-[#e5e7eb]" />
      )}
    </div>
  );
}
