"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CATEGORIES,
  categoryImage,
  categoryLabel,
  getCategory,
} from "@/lib/catalog";
import { CategoryArt } from "@/components/catalog/CategoryArt";
import {
  categoryIsActive,
  categoryIsPending,
  itemsInCategory,
  loadCategoryState,
  loadInventoryRequests,
  pendingForItem,
  saveCategoryState,
  saveInventoryRequests,
  setCategoryAvailability,
  setItemAvailability,
} from "@/lib/partner/inventory";
import { useScrollLinkedHeader } from "@/lib/partner/useScrollLinkedHeader";
import type { InventoryCategoryState, InventoryChangeRequest } from "@/lib/partner/types";
import { ActiveSwitch } from "@/components/partner/inventory/ActiveSwitch";
import { InventoryProductCard } from "@/components/partner/inventory/InventoryProductCard";

type SortKey = "popular" | "low" | "high";

export function InventoryCategoryListing({
  initialCategoryId,
}: {
  initialCategoryId?: string;
}) {
  const startId =
    initialCategoryId && getCategory(initialCategoryId)
      ? initialCategoryId
      : CATEGORIES[0]?.id ?? "cement";
  const { onScroll } = useScrollLinkedHeader();
  const [categoryId, setCategoryId] = useState(startId);
  const [sort, setSort] = useState<SortKey>("popular");
  const [requests, setRequests] = useState<InventoryChangeRequest[]>([]);
  const [categories, setCategories] = useState<Record<string, InventoryCategoryState>>({});

  useEffect(() => {
    setRequests(loadInventoryRequests());
    setCategories(loadCategoryState());
  }, []);

  useEffect(() => {
    if (initialCategoryId && getCategory(initialCategoryId)) {
      setCategoryId(initialCategoryId);
    }
  }, [initialCategoryId]);

  const category = getCategory(categoryId);
  const categoryActive = categoryIsActive(categories, categoryId);
  const categoryPending = categoryIsPending(categories, categoryId);
  const products = useMemo(() => itemsInCategory(categoryId), [categoryId]);
  const visible = useMemo(() => {
    const list = [...products];
    if (sort === "low") list.sort((a, b) => a.rate - b.rate);
    if (sort === "high") list.sort((a, b) => b.rate - a.rate);
    return list;
  }, [products, sort]);

  function toggleCategory(next: boolean) {
    const updated = setCategoryAvailability(
      categories,
      categoryId,
      next ? "available" : "unavailable",
    );
    setCategories(updated);
    saveCategoryState(updated);
  }

  function toggleItem(id: string, next: boolean) {
    const item = products.find((entry) => entry.id === id);
    if (!item) return;
    const updated = setItemAvailability(requests, item, next ? "available" : "unavailable");
    setRequests(updated);
    saveInventoryRequests(updated);
  }

  function selectCategory(id: string) {
    setCategoryId(id);
  }

  if (!category) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-6">
        <p className="text-[16px] text-kowi-muted">Category not found.</p>
      </div>
    );
  }

  const sortLabel =
    sort === "low" ? "Price: Low" : sort === "high" ? "Price: High" : "Sort";

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <header className="sticky top-0 z-20 flex min-h-[70px] w-full shrink-0 items-center justify-between gap-2 border-b border-[#eeeeee] bg-white px-3 py-3.5 pt-[max(0.875rem,env(safe-area-inset-top))]">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[16px] font-bold leading-5 text-[#363636]">
            {category.name}
          </h1>
          <p className="mt-px text-[13px] font-normal leading-4 text-[#377e22]">
            {categoryActive ? "Category active" : "Category inactive"}
            {categoryPending ? " · pending admin" : ""}
          </p>
        </div>
        <ActiveSwitch
          on={categoryActive}
          onChange={toggleCategory}
          label={categoryActive ? "Active" : "Inactive"}
        />
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="relative z-[1] w-[78px] shrink-0 overflow-y-auto overscroll-y-contain bg-white [box-shadow:1px_0_3px_rgba(0,0,0,0.05)]">
          {CATEGORIES.map((entry) => {
            const selected = entry.id === categoryId;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => selectCategory(entry.id)}
                className="relative flex w-full flex-col items-center px-1 py-2.5"
              >
                {selected ? (
                  <span className="absolute right-0 top-1/2 h-14 w-[5px] -translate-y-1/2 rounded-l-full bg-[#1aa34a]" />
                ) : null}
                <span
                  className={`flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full ${
                    selected ? "bg-[#eaf6ec]" : "bg-[#f7f7f7]"
                  }`}
                >
                  <span className="block h-[52px] w-[52px] scale-110">
                    <CategoryArt art={entry.art} image={categoryImage(entry)} />
                  </span>
                </span>
                <span
                  className={`mt-1 w-full px-0.5 text-center text-[10px] leading-[12px] ${
                    selected ? "font-bold text-[#1c1c1c]" : "font-normal text-[#757575]"
                  }`}
                >
                  {categoryLabel(entry)}
                </span>
              </button>
            );
          })}
        </aside>

        <div
          className="min-w-0 flex-1 overflow-y-auto overscroll-y-contain px-3 pb-4"
          onScroll={onScroll}
        >
          <div className="sticky top-0 z-20 -mx-3 mb-2 flex gap-2 overflow-x-auto bg-white px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Chip
              icon={<SortIcon />}
              label={sortLabel}
              onClick={() =>
                setSort((current) =>
                  current === "popular" ? "low" : current === "low" ? "high" : "popular",
                )
              }
            />
            <Chip label="Brand" />
          </div>
          {!categoryActive ? (
            <p className="mb-3 rounded-2xl bg-[#f4f5f7] px-3 py-2 text-[12px] font-semibold leading-4 text-kowi-muted">
              This category is inactive. Items stay hidden from customers until admin approves turning it on.
            </p>
          ) : null}
          {visible.length === 0 ? (
            <p className="pt-10 text-center text-[14px] text-kowi-muted">
              No items in this aisle.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-5">
              {visible.map((item) => (
                <InventoryProductCard
                  key={item.id}
                  item={item}
                  request={pendingForItem(requests, item.id)}
                  categoryActive={categoryActive}
                  onToggle={(active) => toggleItem(item.id, active)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({
  icon,
  label,
  onClick,
}: {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-1 rounded-2xl border border-[#e5e7eb] bg-white px-2.5 py-1.5 text-[12px] font-semibold text-kowi-ink"
    >
      {icon}
      {label}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 9L12 15L18 9"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function SortIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 6V18M8 6L5 9M8 6L11 9M16 18V6M16 18L13 15M16 18L19 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
