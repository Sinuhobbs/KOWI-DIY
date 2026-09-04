"use client";

import { useEffect, useState } from "react";

const GST_KEY = "kowi.gst";
const GST_EVENT = "kowi-gst";

export type GstAccount = {
  id: string;
  gstin: string;
  legalName: string;
  isDefault: boolean;
};

export function readGstAccounts(): GstAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(sessionStorage.getItem(GST_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeGstAccounts(accounts: GstAccount[]) {
  sessionStorage.setItem(GST_KEY, JSON.stringify(accounts));
  window.dispatchEvent(new Event(GST_EVENT));
}

export function addGstAccount(gstin: string, legalName: string) {
  const accounts = readGstAccounts();
  const next: GstAccount = {
    id: `gst-${Date.now()}`,
    gstin: gstin.replace(/\s/g, "").toUpperCase(),
    legalName: legalName.trim(),
    isDefault: accounts.length === 0,
  };
  writeGstAccounts([next, ...accounts]);
}

export function setDefaultGst(id: string) {
  writeGstAccounts(
    readGstAccounts().map((item) => ({
      ...item,
      isDefault: item.id === id,
    })),
  );
}

export function removeGstAccount(id: string) {
  const remaining = readGstAccounts().filter((item) => item.id !== id);
  if (remaining.length && !remaining.some((item) => item.isDefault)) {
    remaining[0].isDefault = true;
  }
  writeGstAccounts(remaining);
}

export function useGstAccounts() {
  const [accounts, setAccounts] = useState<GstAccount[]>([]);

  useEffect(() => {
    function sync() {
      setAccounts(readGstAccounts());
    }
    sync();
    window.addEventListener(GST_EVENT, sync);
    return () => window.removeEventListener(GST_EVENT, sync);
  }, []);

  return accounts;
}
