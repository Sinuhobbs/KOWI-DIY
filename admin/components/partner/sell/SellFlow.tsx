"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { rupees } from "@/lib/partner/dashboardApi";
import {
  SELL_CATALOG,
  findBySku,
  getSellProduct,
  getSellVariant,
  hasVariants,
  productInStock,
  searchSellCatalog,
  type SellProduct,
  type SellVariant,
} from "@/lib/partner/sellCatalog";

const DRAFT_KEY = "kowi.partner.sellBill";

type Line = { productId: string; variantId?: string; qty: number };
type PayMethod = "cash" | "upi";
type Stage = "bill" | "pay" | "done";

function lineKey(line: Pick<Line, "productId" | "variantId">) {
  return `${line.productId}:${line.variantId ?? ""}`;
}

function loadDraft(): Line[] {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const row = item as Record<string, unknown>;
      const qty = Number(row.qty);
      if (!(qty > 0)) return [];
      if (typeof row.productId === "string") {
        return [
          {
            productId: row.productId,
            variantId: typeof row.variantId === "string" ? row.variantId : undefined,
            qty,
          },
        ];
      }
      if (typeof row.id === "string") {
        return [{ productId: row.id, qty }];
      }
      return [];
    });
  } catch {
    return [];
  }
}

export function SellFlow() {
  const [query, setQuery] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [sku, setSku] = useState("");
  const [stage, setStage] = useState<Stage>("bill");
  const [method, setMethod] = useState<PayMethod>("cash");
  const [picker, setPicker] = useState<SellProduct | null>(null);
  const [receipt, setReceipt] = useState<{ total: number; count: number; method: PayMethod } | null>(
    null,
  );
  const [toast, setToast] = useState("");
  const [stuck, setStuck] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines(loadDraft());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = scrollRef.current;
    if (!sentinel || !root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { root, threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const results = useMemo(() => searchSellCatalog(query), [query]);
  const searching = query.trim().length > 0;
  const bill = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = getSellProduct(line.productId);
        if (!product) return [];
        const variant = getSellVariant(product, line.variantId);
        if (line.variantId && !variant) return [];
        return [{ ...line, product, variant }];
      }),
    [lines],
  );
  const itemCount = bill.reduce((sum, line) => sum + line.qty, 0);
  const total = bill.reduce(
    (sum, line) => sum + (line.variant?.price ?? line.product.price) * line.qty,
    0,
  );

  function addLine(product: SellProduct, variant?: SellVariant) {
    const next: Line = { productId: product.id, variantId: variant?.id, qty: 1 };
    setLines((current) => {
      const existing = current.find((line) => lineKey(line) === lineKey(next));
      if (existing) {
        return current.map((line) =>
          lineKey(line) === lineKey(next) ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...current, next];
    });
    setQuery("");
    setPicker(null);
    setToast(variant ? `Added ${product.name} · ${variant.label}` : `Added ${product.name}`);
  }

  function selectProduct(product: SellProduct) {
    if (hasVariants(product)) {
      setPicker(product);
      return;
    }
    addLine(product);
  }

  function setQty(target: Line, qty: number) {
    const key = lineKey(target);
    setLines((current) =>
      qty <= 0
        ? current.filter((line) => lineKey(line) !== key)
        : current.map((line) => (lineKey(line) === key ? { ...line, qty } : line)),
    );
  }

  function startScan() {
    setSku("");
    setScanning(true);
  }

  function applySku() {
    const match = findBySku(sku);
    if (!match) {
      setToast("No product for that SKU");
      return;
    }
    if (match.variant) {
      addLine(match.product, match.variant);
    } else {
      selectProduct(match.product);
    }
    setScanning(false);
    setSku("");
  }

  function finishSale() {
    setReceipt({ total, count: itemCount, method });
    setLines([]);
    window.localStorage.removeItem(DRAFT_KEY);
    setStage("done");
  }

  function newSale() {
    setReceipt(null);
    setStage("bill");
    setMethod("cash");
    setQuery("");
  }

  if (stage === "done" && receipt) {
    return (
      <div className="flex min-h-full flex-col bg-white px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-kowi-lime text-[22px] font-extrabold text-kowi-ink">
            ✓
          </span>
          <h1 className="mt-4 text-[24px] font-extrabold tracking-tight text-kowi-ink">
            Sale recorded
          </h1>
          <p className="mt-1 text-[15px] text-kowi-muted">
            {receipt.count} {receipt.count === 1 ? "item" : "items"} · {receipt.method === "upi" ? "UPI" : "Cash"}
          </p>
          <p className="mt-3 text-[32px] font-extrabold tracking-tight text-kowi-ink">
            {rupees(receipt.total)}
          </p>
        </div>
        <button
          type="button"
          onClick={newSale}
          className="w-full rounded-2xl bg-kowi-lime py-3.5 text-[16px] font-bold text-kowi-ink"
        >
          New sale
        </button>
        <Link
          href="/partner/dashboard"
          className="mt-2 py-3 text-center text-[14px] font-semibold text-kowi-muted"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="h-full min-h-0 overflow-y-auto overscroll-y-contain bg-white"
    >
      <div className="bg-[linear-gradient(180deg,#d8f59a_0%,#ffffff_100%)] px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/partner/dashboard"
            className="justify-self-start py-1 text-[14px] font-semibold text-kowi-ink"
          >
            ‹ Home
          </Link>
          <h1 className="text-[18px] font-extrabold tracking-tight text-kowi-ink">
            Offline sales
          </h1>
          <span />
        </div>
      </div>

      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      <div
        className={`relative sticky z-20 bg-white px-4 pb-4 ${
          stuck ? "shadow-[0_8px_20px_rgba(0,0,0,0.06)]" : ""
        }`}
        style={{ top: "env(safe-area-inset-top)" }}
      >
        {stuck ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -translate-y-full bg-white"
            style={{ height: "env(safe-area-inset-top)" }}
            aria-hidden
          />
        ) : null}
        <div className={stuck ? "pt-3" : "pt-2"}>
          <label className="flex min-w-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 outline outline-1 outline-[#c6e400]">
            <span className="sr-only">Search products</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="6.75" stroke="#1D1D1F" strokeWidth="1.8" />
              <path d="M16.2 16.2L21 21" stroke="#1D1D1F" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or SKU"
              className="min-w-0 flex-1 bg-transparent text-[14px] text-kowi-ink outline-none placeholder:text-[#9aa0a8]"
            />
          </label>
        </div>
      </div>

      <div className="flex min-h-[calc(100%+6rem)] flex-col gap-4 px-4 pb-[8.5rem] pt-2">
        {bill.length > 0 ? (
          <section>
            <h2 className="mb-2 text-[13px] font-bold text-kowi-muted">This bill</h2>
            <ul className="overflow-hidden rounded-[20px] border border-kowi-line">
              {bill.map((line, index) => {
                const price = line.variant?.price ?? line.product.price;
                return (
                  <li
                    key={lineKey(line)}
                    className={`flex items-center gap-3 px-3 py-3 ${index ? "border-t border-kowi-line" : ""}`}
                  >
                    <Image
                      src={line.variant?.image ?? line.product.image}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-xl bg-[#f4f5f7] object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-bold text-kowi-ink">
                        {line.product.brand} {line.product.name}
                      </p>
                      <p className="text-[12px] text-kowi-muted">
                        {line.variant ? `${line.variant.label} · ` : ""}
                        {rupees(price)} / {line.product.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty(line, line.qty - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f5f7] text-[16px] font-bold"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-[14px] font-bold">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(line, line.qty + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-kowi-lime text-[16px] font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() => setLines([])}
              className="mt-2 w-full py-2 text-center text-[14px] font-semibold text-kowi-muted"
            >
              Cancel
            </button>
          </section>
        ) : null}

        {searching ? (
          <section>
            <h2 className="mb-2 text-[13px] font-bold text-kowi-muted">Results</h2>
            {results.length === 0 ? (
              <p className="text-[14px] text-kowi-muted">No products match that search.</p>
            ) : (
              <ul className="overflow-hidden rounded-[20px] bg-[#f4f5f7]">
                {results.map((product, index) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    divided={index > 0}
                    onSelect={() => selectProduct(product)}
                  />
                ))}
              </ul>
            )}
          </section>
        ) : null}

        {!searching ? (
          <section>
            <h2 className="mb-2 text-[13px] font-bold text-kowi-muted">Quick add</h2>
            <div className="flex flex-wrap gap-2">
              {SELL_CATALOG.filter(productInStock).map((product) => {
                const inBag = lines.some((line) => line.productId === product.id);
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => selectProduct(product)}
                    className={`flex max-w-full items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 text-left text-[12px] font-semibold ${
                      inBag ? "bg-kowi-lime text-kowi-ink" : "bg-[#f4f5f7] text-kowi-ink"
                    }`}
                  >
                    <Image
                      src={product.image}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 shrink-0 rounded-full bg-white object-cover"
                    />
                    <span className="max-w-[9.5rem] truncate">{product.name}</span>
                    {hasVariants(product) ? <ChevronIcon /> : null}
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>

      <button
        type="button"
        onClick={startScan}
        className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-kowi-ink px-5 py-3 text-[14px] font-bold text-kowi-lime shadow-[0_10px_28px_rgba(0,0,0,0.18)]"
      >
        <ScanIcon />
        Scan product
      </button>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-kowi-line bg-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        <button
          type="button"
          disabled={total === 0}
          onClick={() => setStage("pay")}
          className="flex w-full items-center justify-between rounded-2xl bg-kowi-ink px-4 py-3.5 text-white disabled:opacity-40"
        >
          <span className="text-[14px] font-semibold">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
          <span className="text-[16px] font-extrabold">Charge {rupees(total)}</span>
        </button>
      </div>

      {scanning ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-[#1D1D1F]/45 p-4 sm:items-center"
          data-no-ptr
        >
          <div className="w-full max-w-[380px] rounded-[28px] bg-white px-5 py-6">
            <p className="text-center text-[18px] font-extrabold text-kowi-ink">Scan product</p>
            <p className="mt-1 text-center text-[13px] text-kowi-muted">
              Camera scan comes next. Enter a SKU for now.
            </p>
            <label className="mt-4 block text-[12px] font-semibold text-kowi-muted">
              SKU
              <input
                value={sku}
                onChange={(event) => setSku(event.target.value)}
                placeholder="e.g. 2527"
                className="mt-1.5 w-full rounded-2xl border border-kowi-line px-3 py-3 text-[15px] text-kowi-ink outline-none"
                autoFocus
              />
            </label>
            <button
              type="button"
              onClick={applySku}
              className="mt-4 w-full rounded-2xl bg-kowi-lime py-3 text-[15px] font-bold text-kowi-ink"
            >
              Add to bill
            </button>
            <button
              type="button"
              onClick={() => {
                const fallback = SELL_CATALOG.find(productInStock);
                if (fallback) selectProduct(fallback);
                setScanning(false);
              }}
              className="mt-2 w-full py-2 text-[13px] font-semibold text-kowi-muted"
            >
              Simulate a scan
            </button>
            <button
              type="button"
              onClick={() => setScanning(false)}
              className="mt-1 w-full py-2 text-[13px] font-semibold text-kowi-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {picker ? (
        <VariantSheet
          product={picker}
          onClose={() => setPicker(null)}
          onPick={(variant) => addLine(picker, variant)}
        />
      ) : null}

      {stage === "pay" ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-[#1D1D1F]/45 p-4 sm:items-center"
          data-no-ptr
        >
          <div className="w-full max-w-[380px] rounded-[28px] bg-white px-5 py-6">
            <p className="text-center text-[13px] font-semibold text-kowi-muted">Collect</p>
            <p className="text-center text-[28px] font-extrabold tracking-tight text-kowi-ink">
              {rupees(total)}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod("cash")}
                className={`rounded-2xl py-3 text-[14px] font-bold ${
                  method === "cash" ? "bg-kowi-ink text-white" : "bg-[#f4f5f7] text-kowi-ink"
                }`}
              >
                Cash
              </button>
              <button
                type="button"
                onClick={() => setMethod("upi")}
                className={`rounded-2xl py-3 text-[14px] font-bold ${
                  method === "upi" ? "bg-kowi-ink text-white" : "bg-[#f4f5f7] text-kowi-ink"
                }`}
              >
                UPI
              </button>
            </div>
            <button
              type="button"
              onClick={finishSale}
              className="mt-4 w-full rounded-2xl bg-kowi-lime py-3.5 text-[16px] font-bold text-kowi-ink"
            >
              Confirm {method === "upi" ? "UPI" : "cash"} sale
            </button>
            <button
              type="button"
              onClick={() => setStage("bill")}
              className="mt-2 w-full py-2 text-[14px] font-semibold text-kowi-muted"
            >
              Back to bill
            </button>
          </div>
        </div>
      ) : null}

      {toast ? (
        <p
          role="status"
          className="fixed bottom-[9.5rem] left-1/2 z-[70] -translate-x-1/2 rounded-full bg-kowi-ink px-4 py-2 text-[13px] font-medium text-white"
        >
          {toast}
        </p>
      ) : null}
    </div>
  );
}

function VariantSheet({
  product,
  onClose,
  onPick,
}: {
  product: SellProduct;
  onClose: () => void;
  onPick: (variant: SellVariant) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-[#1D1D1F]/45 sm:items-center sm:p-4"
      data-no-ptr
    >
      <button type="button" className="absolute inset-0" aria-label="Close options" onClick={onClose} />
      <div className="relative w-full max-w-[430px] rounded-t-[28px] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:rounded-[28px]">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#d8dbe0]" aria-hidden />
        <div className="flex items-center gap-3 px-1 pb-3">
          <Image
            src={product.image}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-2xl bg-[#f4f5f7] object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-[16px] font-extrabold text-kowi-ink">
              {product.brand} {product.name}
            </p>
            <p className="text-[13px] text-kowi-muted">Choose an option</p>
          </div>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto">
          {(product.variants ?? []).map((variant) => {
            const available = variant.stock > 0;
            return (
              <li key={variant.id} className="border-t border-kowi-line">
                <button
                  type="button"
                  disabled={!available}
                  onClick={() => onPick(variant)}
                  className="flex w-full items-center gap-3 py-3 text-left disabled:opacity-40"
                >
                  <Image
                    src={variant.image ?? product.image}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-xl bg-[#f4f5f7] object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-bold text-kowi-ink">{variant.label}</span>
                    <span className="block text-[12px] text-kowi-muted">
                      {variant.sku} · {available ? `${variant.stock} in stock` : "Out of stock"}
                    </span>
                  </span>
                  <span className="text-[14px] font-extrabold text-kowi-ink">{rupees(variant.price)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function ProductRow({
  product,
  divided,
  onSelect,
}: {
  product: SellProduct;
  divided: boolean;
  onSelect: () => void;
}) {
  const variants = hasVariants(product);
  return (
    <li className={divided ? "border-t border-white" : ""}>
      <button type="button" onClick={onSelect} className="flex w-full items-center gap-3 px-3 py-3 text-left">
        <Image
          src={product.image}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 rounded-xl bg-white object-cover"
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-bold text-kowi-ink">
            {product.brand} {product.name}
          </span>
          <span className="block text-[12px] text-kowi-muted">
            {variants ? `${product.variants?.length} options · from ${rupees(product.price)}` : `${product.sku} · ${rupees(product.price)}`}
            {!productInStock(product) ? " · Out of stock" : ""}
          </span>
        </span>
        <span className="flex items-center gap-1 text-[13px] font-bold text-kowi-ink">
          {variants ? "Choose" : "Add"}
          {variants ? <ChevronIcon /> : null}
        </span>
      </button>
    </li>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 8V5H8M16 5H19V8M19 16V19H16M8 19H5V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M7 12H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
