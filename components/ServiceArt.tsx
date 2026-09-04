import type { ReactNode } from "react";
import type { ServiceArt } from "@/lib/services";

function Tile({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-[78px] w-full items-end justify-center overflow-hidden rounded-xl bg-[#f4f5f7] px-1 pb-1">
      {children}
    </div>
  );
}

function ElectricianArt() {
  return (
    <Tile>
      <div className="absolute bottom-3 left-3 h-7 w-7 rounded-full bg-[#f5e08a] ring-2 ring-[#e8c84a]" />
      <div className="absolute bottom-2 right-3 h-8 w-8 rounded-sm bg-white ring-1 ring-black/10" />
    </Tile>
  );
}

function PlumberArt() {
  return (
    <Tile>
      <div className="mb-2 h-4 w-16 rounded-full bg-[#93c5fd]" />
      <div className="absolute bottom-3 right-3 h-8 w-8 rotate-45 rounded-sm bg-[#64748b]" />
    </Tile>
  );
}

function CarpenterArt() {
  return (
    <Tile>
      <div className="mb-1 flex gap-1">
        <div className="h-12 w-5 rounded-sm bg-[#c28a4a]" />
        <div className="h-12 w-5 rounded-sm bg-[#a56a32]" />
        <div className="h-12 w-5 rounded-sm bg-[#d2a05c]" />
      </div>
    </Tile>
  );
}

function AcArt() {
  return (
    <Tile>
      <div className="mb-2 h-10 w-16 rounded-md bg-white ring-1 ring-black/10">
        <div className="mx-auto mt-2 h-4 w-10 rounded-sm bg-[#e5e7eb]" />
      </div>
    </Tile>
  );
}

function PaintArt() {
  return (
    <Tile>
      <div className="absolute bottom-2 left-3 h-11 w-8 rounded-sm bg-white ring-1 ring-black/10">
        <div className="h-3 bg-[#e11d2a]" />
      </div>
      <div className="absolute bottom-2 right-3 h-12 w-8 rounded-sm bg-white ring-1 ring-black/10">
        <div className="h-3 bg-[#1d4ed8]" />
      </div>
    </Tile>
  );
}

function RoArt() {
  return (
    <Tile>
      <div className="mb-1 h-12 w-8 rounded-t-full bg-[#38bdf8]" />
      <div className="absolute bottom-2 right-3 h-8 w-8 rounded-md bg-white ring-1 ring-black/10" />
    </Tile>
  );
}

function TileArt() {
  return (
    <Tile>
      <div className="mb-1 grid grid-cols-2 gap-1">
        <div className="h-8 w-8 rounded-sm bg-[#cfc7b8]" />
        <div className="h-8 w-8 rounded-sm bg-[#b7c4c0]" />
        <div className="h-8 w-8 rounded-sm bg-[#d9cbb6]" />
        <div className="h-8 w-8 rounded-sm bg-[#9aa9a4]" />
      </div>
    </Tile>
  );
}

function WaterproofArt() {
  return (
    <Tile>
      <div className="absolute bottom-2 left-3 h-12 w-8 rounded-sm bg-[#dc2626]" />
      <div className="absolute bottom-2 right-3 h-10 w-8 rounded-sm bg-[#ea580c]" />
    </Tile>
  );
}

const ART: Record<ServiceArt, () => ReactNode> = {
  electrician: ElectricianArt,
  plumber: PlumberArt,
  carpenter: CarpenterArt,
  ac: AcArt,
  paint: PaintArt,
  ro: RoArt,
  tile: TileArt,
  waterproof: WaterproofArt,
};

export function ServiceArt({ art }: { art: ServiceArt }) {
  const Art = ART[art];
  return <Art />;
}
