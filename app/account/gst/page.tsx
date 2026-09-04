"use client";

import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { SubpageHeader } from "@/components/SubpageHeader";
import { DocIcon } from "@/components/icons";
import {
  addGstAccount,
  removeGstAccount,
  setDefaultGst,
  useGstAccounts,
} from "@/lib/gst";

export default function GstPage() {
  const accounts = useGstAccounts();
  const [adding, setAdding] = useState(false);
  const [gstin, setGstin] = useState("");
  const [legalName, setLegalName] = useState("");
  const cleanGstin = gstin.replace(/\s/g, "").toUpperCase();
  const canSave = cleanGstin.length === 15 && legalName.trim().length > 1;

  function save() {
    if (!canSave) return;
    addGstAccount(cleanGstin, legalName);
    setGstin("");
    setLegalName("");
    setAdding(false);
  }

  return (
    <MobileShell className="overflow-hidden">
      <div className="flex min-h-dvh flex-col bg-white px-4 pb-8">
        <SubpageHeader title="GST accounts" />

        {accounts.length === 0 && !adding ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span className="text-kowi-muted">
              <DocIcon />
            </span>
            <p className="mt-3 text-[15px] font-semibold text-kowi-ink">
              No GST accounts yet
            </p>
            <p className="mt-1 max-w-[240px] text-[13px] text-kowi-muted">
              Add a GSTIN for invoices. This stays on this device for now.
            </p>
          </div>
        ) : (
          <ul className="flex-1 space-y-3 pt-2">
            {accounts.map((account) => (
              <li
                key={account.id}
                className={`rounded-2xl border px-4 py-3.5 ${
                  account.isDefault
                    ? "border-[#1aa34a] bg-[#e7f8ea]"
                    : "border-kowi-line"
                }`}
              >
                <p className="text-[15px] font-semibold text-kowi-ink">
                  {account.legalName}
                </p>
                <p className="mt-0.5 font-mono text-[13px] tracking-wide text-kowi-muted">
                  {account.gstin}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  {account.isDefault ? (
                    <span className="text-[12px] font-semibold text-[#1aa34a]">
                      Default for invoices
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDefaultGst(account.id)}
                      className="text-[12px] font-medium text-[#1aa34a]"
                    >
                      Make default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeGstAccount(account.id)}
                    className="text-[12px] font-medium text-kowi-muted"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-4 w-full rounded-2xl bg-kowi-lime py-3.5 text-[17px] font-bold text-kowi-ink"
        >
          Add GSTIN
        </button>
      </div>

      {adding ? (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close add GSTIN"
            onClick={() => setAdding(false)}
          />
          <div className="relative z-10 rounded-t-[28px] bg-white px-5 pb-8 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-kowi-ink">Add GSTIN</h2>
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[22px] text-kowi-muted"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <input
              value={gstin}
              onChange={(event) =>
                setGstin(event.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 15))
              }
              placeholder="15-character GSTIN"
              autoCapitalize="characters"
              className="w-full rounded-2xl border border-kowi-line px-4 py-3.5 text-[15px] outline-none"
            />
            <input
              value={legalName}
              onChange={(event) => setLegalName(event.target.value)}
              placeholder="Legal business name"
              className="mt-3 w-full rounded-2xl border border-kowi-line px-4 py-3.5 text-[15px] outline-none"
            />
            <button
              type="button"
              disabled={!canSave}
              onClick={save}
              className={`mt-5 w-full rounded-2xl py-3.5 text-[17px] font-bold ${
                canSave
                  ? "bg-kowi-lime text-kowi-ink"
                  : "bg-kowi-disabled text-white"
              }`}
            >
              Save GSTIN
            </button>
          </div>
        </div>
      ) : null}
    </MobileShell>
  );
}
