import {
  PRODUCTS,
  productTitle,
  type Product,
  type ProductArt,
} from "@/lib/catalog";
import type {
  InventoryAvailability,
  InventoryCategoryState,
  InventoryChangeRequest,
  InventoryDraft,
  InventoryItem,
} from "@/lib/partner/types";

export const INVENTORY_KEY = "kowi.partner.inventoryRequests";
export const INVENTORY_CATEGORY_KEY = "kowi.partner.inventoryCategories";

const LIVE: Record<string, Partial<InventoryDraft> & { quantity?: number }> = {
  "pi-elbow": { quantity: 0, availability: "unavailable" },
  "el-2527": { quantity: 0 },
  "to-drill": { quantity: 3 },
  "el-ecolink-led": { quantity: 4 },
  "pt-tractor": { quantity: 4 },
};

function defaultQty(product: Product) {
  if (LIVE[product.id]?.quantity != null) return LIVE[product.id].quantity as number;
  return Math.max(2, 18 - product.price.toString().length * 2);
}

function defaultThreshold(product: Product) {
  return Math.max(2, Math.round(defaultQty(product) * 0.35));
}

export function toInventoryItem(product: Product): InventoryItem {
  const live = LIVE[product.id] ?? {};
  return {
    id: product.id,
    categoryId: product.categoryId,
    subcategoryId: product.subcategoryId,
    brand: product.brand,
    name: product.name,
    sku: product.sku,
    description: `${productTitle(product)}. Admin-assigned catalog SKU for this store.`,
    unit: product.unit,
    pack: product.pack,
    quantity: live.quantity ?? defaultQty(product),
    rate: live.rate ?? product.price,
    mrp: product.mrp,
    availability: live.availability ?? "available",
    image: product.image,
    art: product.art,
    options: product.options,
    lowThreshold: defaultThreshold(product),
  };
}

export const INVENTORY_ITEMS: InventoryItem[] = PRODUCTS.map(toInventoryItem);

export const SEEDED_REQUESTS: InventoryChangeRequest[] = [
  {
    id: "req-drill",
    itemId: "to-drill",
    status: "pending",
    submittedAt: "Today, 9:40 AM",
    changes: { quantity: 8, rate: 2390 },
  },
  {
    id: "req-elbow",
    itemId: "pi-elbow",
    status: "pending",
    submittedAt: "Yesterday, 6:12 PM",
    changes: { quantity: 50, availability: "available" },
  },
];

export function itemArt(item: InventoryItem): ProductArt {
  return item.art as ProductArt;
}

export function getInventoryItem(id: string) {
  return INVENTORY_ITEMS.find((item) => item.id === id);
}

export function itemsInCategory(categoryId: string, subcategoryId = "all") {
  const inCategory = INVENTORY_ITEMS.filter((item) => item.categoryId === categoryId);
  if (subcategoryId === "all") return inCategory;
  return inCategory.filter((item) => item.subcategoryId === subcategoryId);
}

export function itemStockLabel(item: InventoryItem) {
  if (item.quantity <= 0) return "Out of stock";
  if (item.lowThreshold && item.quantity <= item.lowThreshold) {
    return `Low · ${item.quantity} ${item.unit}`;
  }
  return `${item.quantity} ${item.unit}`;
}

export function draftFromItem(item: InventoryItem): InventoryDraft {
  return {
    quantity: item.quantity,
    rate: item.rate,
    description: item.description,
    availability: item.availability,
  };
}

export function applyDraft(item: InventoryItem, draft: Partial<InventoryDraft>): InventoryDraft {
  return {
    quantity: draft.quantity ?? item.quantity,
    rate: draft.rate ?? item.rate,
    description: draft.description ?? item.description,
    availability: draft.availability ?? item.availability,
  };
}

export function diffDraft(live: InventoryDraft, next: InventoryDraft): Partial<InventoryDraft> {
  const changes: Partial<InventoryDraft> = {};
  if (next.quantity !== live.quantity) changes.quantity = next.quantity;
  if (next.rate !== live.rate) changes.rate = next.rate;
  if (next.description.trim() !== live.description.trim()) {
    changes.description = next.description.trim();
  }
  if (next.availability !== live.availability) changes.availability = next.availability;
  return changes;
}

export function changeSummary(item: InventoryItem, changes: Partial<InventoryDraft>) {
  const parts: string[] = [];
  if (changes.quantity != null) {
    parts.push(`${item.quantity} → ${changes.quantity} ${item.unit}`);
  }
  if (changes.rate != null) {
    parts.push(`₹${item.rate.toLocaleString("en-IN")} → ₹${changes.rate.toLocaleString("en-IN")}`);
  }
  if (changes.availability) {
    parts.push(changes.availability === "available" ? "Make available" : "Hide from catalog");
  }
  if (changes.description != null) parts.push("Description updated");
  return parts;
}

export function pendingForItem(requests: InventoryChangeRequest[], itemId: string) {
  return requests.find((item) => item.itemId === itemId && item.status === "pending");
}

export function itemIsActive(
  item: InventoryItem,
  request?: InventoryChangeRequest,
  categoryActive = true,
) {
  if (!categoryActive) return false;
  const next = request?.changes.availability ?? item.availability;
  return next === "available";
}

export function setItemAvailability(
  requests: InventoryChangeRequest[],
  item: InventoryItem,
  availability: InventoryAvailability,
) {
  const existing = pendingForItem(requests, item.id);
  const merged = { ...existing?.changes, availability };
  if (availability === item.availability) {
    delete merged.availability;
  }
  if (Object.keys(merged).length === 0) {
    return requests.filter((entry) => entry.id !== existing?.id);
  }
  return upsertPendingRequest(requests, item.id, merged);
}

type CategoryMap = Record<string, InventoryCategoryState>;

function isCategoryState(value: unknown): value is InventoryCategoryState {
  if (!value || typeof value !== "object") return false;
  const state = value as InventoryCategoryState;
  return state.live === "available" || state.live === "unavailable";
}

export function loadCategoryState(): CategoryMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(INVENTORY_CATEGORY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const next: CategoryMap = {};
    for (const [id, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (isCategoryState(value)) next[id] = value;
    }
    return next;
  } catch {
    return {};
  }
}

export function saveCategoryState(state: CategoryMap) {
  window.localStorage.setItem(INVENTORY_CATEGORY_KEY, JSON.stringify(state));
}

export function categoryIsActive(state: CategoryMap, categoryId: string) {
  const entry = state[categoryId];
  if (!entry) return true;
  return (entry.pending ?? entry.live) === "available";
}

export function categoryIsPending(state: CategoryMap, categoryId: string) {
  const entry = state[categoryId];
  return Boolean(entry?.pending && entry.pending !== entry.live);
}

export function setCategoryAvailability(
  state: CategoryMap,
  categoryId: string,
  availability: InventoryAvailability,
) {
  const live = state[categoryId]?.live ?? "available";
  const next: InventoryCategoryState =
    availability === live ? { live } : { live, pending: availability };
  return { ...state, [categoryId]: next };
}

export function searchInventory(items: InventoryItem[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q),
  );
}

function isRequest(value: unknown): value is InventoryChangeRequest {
  if (!value || typeof value !== "object") return false;
  const request = value as InventoryChangeRequest;
  return (
    typeof request.id === "string" &&
    typeof request.itemId === "string" &&
    (request.status === "pending" || request.status === "approved" || request.status === "rejected") &&
    typeof request.submittedAt === "string" &&
    Boolean(request.changes) &&
    typeof request.changes === "object"
  );
}

export function loadInventoryRequests(): InventoryChangeRequest[] {
  if (typeof window === "undefined") return structuredClone(SEEDED_REQUESTS);
  try {
    const raw = window.localStorage.getItem(INVENTORY_KEY);
    if (!raw) return structuredClone(SEEDED_REQUESTS);
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || !parsed.every(isRequest)) {
      return structuredClone(SEEDED_REQUESTS);
    }
    return parsed;
  } catch {
    return structuredClone(SEEDED_REQUESTS);
  }
}

export function saveInventoryRequests(requests: InventoryChangeRequest[]) {
  window.localStorage.setItem(INVENTORY_KEY, JSON.stringify(requests));
}

export function upsertPendingRequest(
  requests: InventoryChangeRequest[],
  itemId: string,
  changes: Partial<InventoryDraft>,
) {
  const submittedAt = new Date().toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const existing = pendingForItem(requests, itemId);
  const next: InventoryChangeRequest = {
    id: existing?.id ?? `req-${itemId}-${Date.now()}`,
    itemId,
    status: "pending",
    submittedAt: `Today, ${submittedAt}`,
    changes,
  };
  const without = requests.filter((item) => item.id !== next.id);
  return [next, ...without];
}

export type { InventoryAvailability };
