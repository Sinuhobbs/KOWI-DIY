"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getCategory } from "@/lib/catalog";
import { ProductThumb } from "@/components/catalog/ProductThumb";
import { rupees } from "@/lib/partner/dashboardApi";
import {
  applyDraft,
  changeSummary,
  diffDraft,
  draftFromItem,
  getInventoryItem,
  itemArt,
  loadInventoryRequests,
  pendingForItem,
  saveInventoryRequests,
  upsertPendingRequest,
} from "@/lib/partner/inventory";
import { useScrollLinkedHeader } from "@/lib/partner/useScrollLinkedHeader";
import type { InventoryAvailability, InventoryDraft } from "@/lib/partner/types";

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InventoryEdit({ id }: { id: string }) {
  const item = getInventoryItem(id);
  const { headerRef, onScroll } = useScrollLinkedHeader();
  const [draft, setDraft] = useState<InventoryDraft | null>(() =>
    item ? draftFromItem(item) : null,
  );
  const [submitted, setSubmitted] = useState(false);
  const [pendingAt, setPendingAt] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!item) return;
    const requests = loadInventoryRequests();
    const pending = pendingForItem(requests, item.id);
    setDraft(pending ? applyDraft(item, pending.changes) : draftFromItem(item));
    setPendingAt(pending?.submittedAt ?? null);
  }, [item]);

  const live = item ? draftFromItem(item) : null;
  const changes = useMemo(() => {
    if (!live || !draft) return {};
    return diffDraft(live, draft);
  }, [draft, live]);
  const dirty = Object.keys(changes).length > 0;
  const summary = item && dirty ? changeSummary(item, changes) : [];

  function set<K extends keyof InventoryDraft>(key: K, value: InventoryDraft[K]) {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
    setSubmitted(false);
  }

  function submit() {
    if (!item || !draft || !dirty) return;
    const next = upsertPendingRequest(loadInventoryRequests(), item.id, changes);
    saveInventoryRequests(next);
    const pending = pendingForItem(next, item.id);
    setPendingAt(pending?.submittedAt ?? "Just now");
    setSubmitted(true);
  }

  if (!item || !draft || !live) {
    return (
      <div className="flex min-h-full flex-col bg-white px-4 py-8">
        <Link href="/partner/inventory" className="text-[13px] font-bold text-kowi-ink">
          ← Inventory
        </Link>
        <p className="mt-8 text-center text-[15px] text-kowi-muted">This item was not found.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain" onScroll={onScroll}>
        <div ref={headerRef} className="sticky top-0 z-30">
          <header className="bg-[linear-gradient(180deg,#d8f59a_0%,#ffffff_100%)] px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
            <div className="flex items-center gap-2">
              <Link
                href="/partner/inventory"
                aria-label="Back to category"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-kowi-ink"
              >
                <BackIcon />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
                <h1 className="truncate text-[24px] font-extrabold leading-none tracking-tight text-kowi-ink">
                  {item.name}
                </h1>
                <p className="text-[12px] leading-none text-kowi-muted">
                  {getCategory(item.categoryId)?.name ?? "Catalog"} · {item.sku}
                </p>
              </div>
            </div>
          </header>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 rounded-[20px] border border-kowi-line p-3">
            <div className="flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#f8fafc]">
              <ProductThumb
                art={itemArt(item)}
                size="well"
                image={item.image}
                alt={item.name}
              />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-kowi-ink">{item.brand}</p>
              <p className="mt-0.5 text-[12px] text-kowi-muted">Live: {rupees(item.rate)}</p>
              <p className="text-[12px] text-kowi-muted">
                {item.quantity} {item.unit} ·{" "}
                {item.availability === "available" ? "Available" : "Hidden"}
              </p>
            </div>
          </div>

          {pendingAt ? (
            <p className="mt-3 rounded-[16px] bg-[#eef8c4] px-3 py-2.5 text-[12px] font-semibold leading-5 text-kowi-ink">
              Waiting on admin approval
              <span className="block font-medium text-kowi-ink/70">{pendingAt}</span>
            </p>
          ) : (
            <p className="mt-3 text-[12px] leading-5 text-kowi-muted">
              Quantity, rate, description, and availability are sent to admin before they go live.
            </p>
          )}

          <section className="mt-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-kowi-muted">
              Availability
            </p>
            <div className="mt-2 grid grid-cols-2 rounded-[16px] bg-[#f4f5f7] p-1">
              {(["available", "unavailable"] as InventoryAvailability[]).map((value) => {
                const active = draft.availability === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set("availability", value)}
                    className={`rounded-[12px] py-2.5 text-[12px] font-bold ${
                      active ? "bg-white text-kowi-ink shadow-[0_1px_4px_rgba(0,0,0,0.06)]" : "text-kowi-muted"
                    }`}
                  >
                    {value === "available" ? "Available" : "Unavailable"}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-kowi-muted">
              Quantity
            </p>
            <div className="mt-2 flex items-center justify-between rounded-[16px] border border-kowi-line px-3 py-2">
              <button
                type="button"
                onClick={() => set("quantity", Math.max(0, draft.quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f5f7] text-[20px] font-medium text-kowi-ink"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <div className="text-center">
                <input
                  inputMode="numeric"
                  value={String(draft.quantity)}
                  onChange={(event) => {
                    const next = Number(event.target.value.replace(/[^\d]/g, ""));
                    set("quantity", Number.isFinite(next) ? next : 0);
                  }}
                  className="w-20 bg-transparent text-center text-[22px] font-extrabold text-kowi-ink outline-none"
                />
                <p className="text-[11px] text-kowi-muted">{item.unit}</p>
              </div>
              <button
                type="button"
                onClick={() => set("quantity", draft.quantity + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-kowi-lime text-[20px] font-medium text-kowi-ink"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </section>

          <section className="mt-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-kowi-muted">
              Rate
            </p>
            <label className="mt-2 flex items-center gap-2 rounded-[16px] border border-kowi-line px-3 py-3">
              <span className="text-[16px] font-bold text-kowi-muted">₹</span>
              <input
                inputMode="numeric"
                value={String(draft.rate)}
                onChange={(event) => {
                  const next = Number(event.target.value.replace(/[^\d]/g, ""));
                  set("rate", Number.isFinite(next) ? next : 0);
                }}
                className="min-w-0 flex-1 bg-transparent text-[16px] font-bold text-kowi-ink outline-none"
              />
            </label>
          </section>

          <section className="mt-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-kowi-muted">
              Description
            </p>
            <textarea
              value={draft.description}
              onChange={(event) => set("description", event.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-[16px] border border-kowi-line px-3 py-3 text-[13px] leading-5 text-kowi-ink outline-none"
            />
          </section>

          {summary.length ? (
            <ul className="mt-4 rounded-[16px] bg-[#f4f5f7] px-3 py-3 text-[12px] leading-5 text-kowi-ink">
              {summary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="shrink-0 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <button
          type="button"
          onClick={submit}
          disabled={!dirty}
          className={`flex w-full items-center justify-center rounded-xl px-3 py-3 text-[12px] font-bold leading-none ${
            dirty ? "bg-kowi-lime text-kowi-ink" : "bg-[#f4f5f7] text-kowi-muted"
          }`}
        >
          {submitted
            ? "Sent for approval"
            : pendingAt
              ? "Update approval request"
              : "Submit for approval"}
        </button>
      </div>
    </div>
  );
}
