"use client";

import { useMemo, useState } from "react";
import {
  CURRENT_GPS_LOCATION,
  saveLocation,
  searchAreas,
  type SavedLocation,
} from "@/lib/location";
import {
  ChevronRight,
  CrosshairIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";

type Mode = "pick" | "add";

export function LocationSheet({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (location: SavedLocation) => void;
}) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("pick");
  const [custom, setCustom] = useState({ house: "", street: "", area: "" });

  const results = useMemo(() => searchAreas(query), [query]);
  const searching = query.trim().length > 0;

  if (!open) return null;

  function choose(location: SavedLocation) {
    saveLocation(location);
    onSelect(location);
    setQuery("");
    setMode("pick");
    onClose();
  }

  function saveCustom() {
    const area = custom.area.trim() || "New Delhi";
    const short = [custom.house, custom.street, area].filter(Boolean).join(", ");
    choose({
      id: `custom-${Date.now()}`,
      area,
      short: short || area,
      full: `${short}, India`,
    });
    setCustom({ house: "", street: "", area: "" });
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close location picker"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[78%] overflow-y-auto rounded-t-[28px] bg-white px-5 pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-kowi-ink">
            {mode === "add" ? "Add new location" : "Select delivery location"}
          </h2>
          <button
            type="button"
            onClick={() => {
              setMode("pick");
              onClose();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[22px] text-kowi-muted"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {mode === "add" ? (
          <div className="space-y-3">
            <p className="text-[13px] text-[#1aa34a]">
              Delivering to all areas
            </p>
            <input
              value={custom.house}
              onChange={(event) =>
                setCustom((c) => ({ ...c, house: event.target.value }))
              }
              placeholder="House / flat / shop"
              className="w-full rounded-2xl border border-kowi-line px-4 py-3 text-[15px] outline-none"
            />
            <input
              value={custom.street}
              onChange={(event) =>
                setCustom((c) => ({ ...c, street: event.target.value }))
              }
              placeholder="Street name"
              className="w-full rounded-2xl border border-kowi-line px-4 py-3 text-[15px] outline-none"
            />
            <input
              value={custom.area}
              onChange={(event) =>
                setCustom((c) => ({ ...c, area: event.target.value }))
              }
              placeholder="Area / locality"
              className="w-full rounded-2xl border border-kowi-line px-4 py-3 text-[15px] outline-none"
            />
            <button
              type="button"
              onClick={saveCustom}
              className="w-full rounded-2xl bg-kowi-lime py-3.5 text-[16px] font-semibold text-kowi-ink"
            >
              Deliver here
            </button>
            <button
              type="button"
              onClick={() => setMode("pick")}
              className="w-full py-2 text-[14px] text-kowi-muted"
            >
              Back
            </button>
          </div>
        ) : (
          <>
            <label className="mb-4 flex items-center gap-2 rounded-2xl border border-kowi-line px-3 py-3">
              <SearchIcon className="text-kowi-ink" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for area, street name..."
                className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#b0b4ba]"
              />
            </label>

            {searching ? (
              <div className="overflow-hidden rounded-2xl border border-kowi-line">
                {results.length === 0 ? (
                  <p className="px-4 py-5 text-[14px] text-kowi-muted">
                    No exact match. Every area is deliverable — add it as a
                    new location.
                  </p>
                ) : (
                  results.map((area, index) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => choose(area)}
                      className={`flex w-full items-start gap-3 px-4 py-3.5 text-left ${
                        index > 0 ? "border-t border-kowi-line" : ""
                      }`}
                    >
                      <PinIcon />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold text-kowi-ink">
                          {area.short}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-kowi-muted">
                          {area.full}
                        </span>
                        <span className="mt-1 block text-[12px] font-medium text-[#1aa34a]">
                          Delivering now
                        </span>
                      </span>
                      <ChevronRight className="mt-1 text-[#c5c8ce]" />
                    </button>
                  ))
                )}
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-kowi-line">
                <button
                  type="button"
                  onClick={() => choose(CURRENT_GPS_LOCATION)}
                  className="flex w-full items-start gap-3 px-4 py-4 text-left"
                >
                  <CrosshairIcon />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold text-[#1aa34a]">
                      Use your current location
                    </span>
                    <span className="mt-1 block text-[12px] leading-4 text-kowi-muted">
                      {CURRENT_GPS_LOCATION.full}
                    </span>
                  </span>
                  <ChevronRight className="mt-1 text-[#c5c8ce]" />
                </button>
                <button
                  type="button"
                  onClick={() => setMode("add")}
                  className="flex w-full items-center gap-3 border-t border-kowi-line px-4 py-4 text-left"
                >
                  <PlusIcon />
                  <span className="flex-1 text-[15px] font-semibold text-[#1aa34a]">
                    Add new location
                  </span>
                  <ChevronRight className="text-[#c5c8ce]" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
