import type { Category } from "@/lib/catalog";

const TONES: Record<Category["art"], string> = {
  cement: "bg-[#f1ece1]",
  tile: "bg-[#e7eef1]",
  paint: "bg-[#e6eef8]",
  wood: "bg-[#f3e9dc]",
  glue: "bg-[#e7eef8]",
  electrical: "bg-[#f4efd6]",
  bath: "bg-[#eee6dc]",
  hinge: "bg-[#eceef2]",
  lock: "bg-[#f2ecd8]",
  tool: "bg-[#e6eef6]",
  pipe: "bg-[#eceff2]",
  waterproof: "bg-[#f5e9e1]",
  steel: "bg-[#e8eaee]",
  brick: "bg-[#f3e6df]",
  door: "bg-[#f0e6d8]",
  safety: "bg-[#f5f0d4]",
};

function Tile({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
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

function SteelArt() {
  return (
    <Tile>
      <div className="mb-1 flex items-end gap-1">
        <div className="h-10 w-2.5 rounded-sm bg-[#9ca3af]" />
        <div className="h-12 w-2.5 rounded-sm bg-[#6b7280]" />
        <div className="h-9 w-2.5 rounded-sm bg-[#d1d5db]" />
        <div className="h-11 w-2.5 rounded-sm bg-[#4b5563]" />
      </div>
    </Tile>
  );
}

function BrickArt() {
  return (
    <Tile>
      <div className="mb-1 flex flex-col gap-0.5">
        <div className="flex gap-0.5">
          <div className="h-4 w-7 rounded-[2px] bg-[#c45c3e]" />
          <div className="h-4 w-5 rounded-[2px] bg-[#a94432]" />
        </div>
        <div className="flex gap-0.5">
          <div className="h-4 w-5 rounded-[2px] bg-[#b4533a]" />
          <div className="h-4 w-7 rounded-[2px] bg-[#d97757]" />
        </div>
      </div>
    </Tile>
  );
}

function DoorArt() {
  return (
    <Tile>
      <div className="relative mb-1 h-14 w-10 rounded-sm bg-[#a56a32]">
        <div className="absolute right-1 top-1/2 h-2 w-2 rounded-full bg-[#d2a05c]" />
      </div>
    </Tile>
  );
}

function SafetyArt() {
  return (
    <Tile>
      <div className="mb-1 h-10 w-14 rounded-t-full bg-[#facc15]" />
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
  steel: SteelArt,
  brick: BrickArt,
  door: DoorArt,
  safety: SafetyArt,
};

export function CategoryArt({
  art,
  image,
}: {
  art: Category["art"];
  image?: string;
}) {
  if (image) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-[#f4f5f7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  const Art = ART[art];
  return (
    <div
      className={`relative flex aspect-square w-full items-end justify-center overflow-hidden rounded-[18px] px-1.5 pb-1.5 ${TONES[art]}`}
    >
      <Art />
    </div>
  );
}
