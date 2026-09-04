"use client";

import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { SubpageHeader } from "@/components/SubpageHeader";
import { LocationSheet } from "@/components/LocationSheet";
import { PinIcon } from "@/components/icons";
import {
  removeAddress,
  saveLocation,
  useAddressBook,
} from "@/lib/location";

export default function AddressesPage() {
  const { addresses, current } = useAddressBook();
  const [adding, setAdding] = useState(false);

  return (
    <MobileShell className="overflow-hidden">
      <div className="flex min-h-dvh flex-col bg-white px-4 pb-8">
        <SubpageHeader title="Addresses" />
        <p className="pb-3 text-[13px] text-[#1aa34a]">
          Delivering to all areas
        </p>

        <ul className="flex-1 space-y-3">
          {addresses.map((address) => {
            const selected = address.id === current.id;
            return (
              <li
                key={address.id}
                className={`rounded-2xl border px-4 py-3.5 ${
                  selected ? "border-[#1aa34a] bg-[#e7f8ea]" : "border-kowi-line"
                }`}
              >
                <button
                  type="button"
                  onClick={() => saveLocation(address)}
                  className="flex w-full items-start gap-3 text-left"
                >
                  <PinIcon />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold text-kowi-ink">
                      {address.short}
                    </span>
                    <span className="mt-1 block text-[12px] leading-4 text-kowi-muted">
                      {address.full}
                    </span>
                    {selected ? (
                      <span className="mt-1 block text-[12px] font-semibold text-[#1aa34a]">
                        Delivery address
                      </span>
                    ) : null}
                  </span>
                </button>
                {addresses.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeAddress(address.id)}
                    className="mt-2 w-full text-right text-[12px] font-medium text-kowi-muted"
                  >
                    Remove
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-4 w-full rounded-2xl bg-kowi-lime py-3.5 text-[17px] font-bold text-kowi-ink"
        >
          Add address
        </button>
      </div>

      <LocationSheet
        open={adding}
        onClose={() => setAdding(false)}
        onSelect={() => setAdding(false)}
      />
    </MobileShell>
  );
}
