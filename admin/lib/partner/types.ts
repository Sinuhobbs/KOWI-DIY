export type StoreStatus = "open" | "closed";

export type OrderStatus = "NEW" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";

export type AttentionKind = "new_orders" | "low_stock" | "out_of_stock" | "store_issue";

export type ActivityType =
  | "order_accepted"
  | "order_completed"
  | "stock_added"
  | "settlement"
  | "store_status";

export type NotificationKind = "order" | "stock" | "settlement" | "product";

export type PartnerStore = {
  id: string;
  name: string;
  storeId: string;
  status: StoreStatus;
  hours: string;
};

export type OverviewMetrics = {
  ordersToday: number;
  ordersTodayChange: number;
  ordersOnline: number;
  ordersOffline: number;
  salesToday: number;
  salesTodayChange: number;
  salesOnline: number;
  salesOffline: number;
  pendingOrders: number;
  itemsToPack: number;
};

export type AttentionItem = {
  id: string;
  kind: AttentionKind;
  title: string;
  description: string;
  count: number;
  href: string;
  actionLabel: string;
};

export type OrderLine = {
  id: string;
  name: string;
  image: string;
  qty: number;
  sku?: string;
  price?: number;
  unit?: string;
};

export type ActiveOrder = {
  id: string;
  displayId: string;
  time: string;
  itemCount: number;
  area: string;
  value: number;
  status: Extract<OrderStatus, "NEW" | "PREPARING" | "READY">;
  items: OrderLine[];
  readyInSec?: number;
  prepTotalSec?: number;
  customer?: string;
  phone?: string;
  payment?: "UPI" | "Cash" | "Online";
  note?: string;
};

export type InventoryAvailability = "available" | "unavailable";

export type InventoryApprovalStatus = "pending" | "approved" | "rejected";

export type InventoryCategory = {
  id: string;
  name: string;
};

export type InventoryItem = {
  id: string;
  categoryId: string;
  subcategoryId: string;
  brand: string;
  name: string;
  sku: string;
  description: string;
  unit: string;
  pack?: string;
  quantity: number;
  rate: number;
  mrp: number;
  availability: InventoryAvailability;
  image?: string;
  art: string;
  options?: number;
  lowThreshold?: number;
};

export type InventoryDraft = {
  quantity: number;
  rate: number;
  description: string;
  availability: InventoryAvailability;
};

export type InventoryChangeRequest = {
  id: string;
  itemId: string;
  status: InventoryApprovalStatus;
  submittedAt: string;
  changes: Partial<InventoryDraft>;
};

export type InventoryCategoryState = {
  live: InventoryAvailability;
  pending?: InventoryAvailability;
};

export type InventoryAlert = {
  id: string;
  name: string;
  sku?: string;
  quantity: number;
  unit: string;
  status: "out" | "low";
  threshold?: number;
  suggestedReorder?: number;
  image?: string;
};

export type ActivityItem = {
  id: string;
  time: string;
  type: ActivityType;
  description: string;
  ref?: string;
};

export type PartnerNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export type DashboardInsight = {
  id: string;
  title: string;
  body: string;
  href: string;
  actionLabel: string;
};

export type DashboardData = {
  store: PartnerStore;
  overview: OverviewMetrics;
  attentionItems: AttentionItem[];
  activeOrders: ActiveOrder[];
  inventoryAlerts: InventoryAlert[];
  recentActivity: ActivityItem[];
  notifications: PartnerNotification[];
  insight: DashboardInsight;
};
