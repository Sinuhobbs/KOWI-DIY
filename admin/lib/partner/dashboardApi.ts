import { MOCK_DASHBOARD } from "./mockDashboard";
import type { DashboardData } from "./types";

const LOAD_MS = 450;

export async function fetchPartnerDashboard(): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, LOAD_MS));
  return structuredClone(MOCK_DASHBOARD);
}

export function rupees(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function signedPercent(value: number) {
  const abs = Math.abs(value);
  if (value > 0) return `+${abs}% vs yesterday`;
  if (value < 0) return `−${abs}% vs yesterday`;
  return "Same as yesterday";
}
