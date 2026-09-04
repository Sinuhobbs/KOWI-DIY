import type { Category } from "@/lib/catalog";

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[78px] w-full items-end justify-center overflow-hidden rounded-xl bg-[#f4f5f7] px-1 pb-1">
      {children}
    </div>
  );
}

function CementArt() {
  return (
    <Tile>
      <div className="absolute bottom-2 left-2 h-12 w-8 rotate-[-8deg] rounded-sm bg-[#c9a24d]" />
      <div className="absolute bottom-2 right-2 h-12 w-8 rotate-[8deg] rounded-sm bg-[#e2c56a]" />
      <div className="absolute bottom-1 left-1/2 h-14 w-9 -translate-x-1/2 rounded-sm bg-[#d6b25a] shadow-sm" />
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

function WoodArt() {
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

function GlueArt() {
  return (
    <Tile>
      <div className="absolute bottom-2 left-3 h-11 w-10 rounded-md bg-[#2563eb]" />
      <div className="absolute bottom-2 right-3 h-10 w-10 rounded-md bg-[#1d4ed8]" />
    </Tile>
  );
}

function ElectricalArt() {
  return (
    <Tile>
      <div className="absolute bottom-3 left-3 h-7 w-7 rounded-full bg-[#f5e08a] ring-2 ring-[#e8c84a]" />
      <div className="absolute bottom-2 right-3 h-8 w-8 rounded-sm bg-white ring-1 ring-black/10" />
    </Tile>
  );
}

function BathArt() {
  return (
    <Tile>
      <div className="absolute bottom-2 left-2 h-3 w-10 rounded-full bg-[#1f2937]" />
      <div className="absolute bottom-2 right-2 h-8 w-10 rounded-[18px] bg-[#e7d5c4]" />
    </Tile>
  );
}

function HingeArt() {
  return (
    <Tile>
      <div className="mb-2 h-8 w-14 rounded-sm bg-[#9aa3ad]" />
    </Tile>
  );
}

function LockArt() {
  return (
    <Tile>
      <div className="mb-2 h-10 w-8 rounded-md bg-[#c9a227]" />
    </Tile>
  );
}

function ToolArt() {
  return (
    <Tile>
      <div className="absolute bottom-3 left-3 h-8 w-10 rounded-sm bg-[#2563eb]" />
      <div className="absolute bottom-2 right-3 h-6 w-6 rounded-full bg-[#f59e0b]" />
    </Tile>
  );
}

function PipeArt() {
  return (
    <Tile>
      <div className="mb-2 h-4 w-16 rounded-full bg-[#d6d3d1]" />
      <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-[#e5e7eb]" />
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

const ART = {
  cement: CementArt,
  tile: TileArt,
  paint: PaintArt,
  wood: WoodArt,
  glue: GlueArt,
  electrical: ElectricalArt,
  bath: BathArt,
  hinge: HingeArt,
  lock: LockArt,
  tool: ToolArt,
  pipe: PipeArt,
  waterproof: WaterproofArt,
};

export function CategoryArt({ art }: { art: Category["art"] }) {
  const Art = ART[art];
  return <Art />;
}
