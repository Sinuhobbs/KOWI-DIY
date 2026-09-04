"use client";

import { useEffect, useState } from "react";

const WALLET_KEY = "kowi.wallet";
const WALLET_EVENT = "kowi-wallet";

export type WalletTx = {
  id: string;
  amount: number;
  label: string;
  at: number;
};

export type WalletState = {
  balance: number;
  transactions: WalletTx[];
};

const EMPTY: WalletState = { balance: 0, transactions: [] };

export function readWallet(): WalletState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const parsed = JSON.parse(
      sessionStorage.getItem(WALLET_KEY) ?? "",
    ) as WalletState;
    if (typeof parsed.balance !== "number" || !Array.isArray(parsed.transactions)) {
      return EMPTY;
    }
    return parsed;
  } catch {
    return EMPTY;
  }
}

function writeWallet(state: WalletState) {
  sessionStorage.setItem(WALLET_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(WALLET_EVENT));
}

export function addMoney(amount: number) {
  const current = readWallet();
  const next: WalletState = {
    balance: current.balance + amount,
    transactions: [
      {
        id: `tx-${Date.now()}`,
        amount,
        label: "Money added",
        at: Date.now(),
      },
      ...current.transactions,
    ],
  };
  writeWallet(next);
  return next;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>(EMPTY);

  useEffect(() => {
    function sync() {
      setState(readWallet());
    }
    sync();
    window.addEventListener(WALLET_EVENT, sync);
    return () => window.removeEventListener(WALLET_EVENT, sync);
  }, []);

  return state;
}
