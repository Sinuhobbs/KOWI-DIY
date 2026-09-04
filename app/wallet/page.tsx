"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/MobileShell";
import { ReceiptIcon, WalletHeroIcon } from "@/components/icons";
import { addMoney, useWallet } from "@/lib/wallet";

const AMOUNTS = [200, 500, 1000, 2000];

export default function WalletPage() {
  const router = useRouter();
  const { balance, transactions } = useWallet();
  const [adding, setAdding] = useState(false);
  const [amount, setAmount] = useState(500);

  function confirmAdd() {
    addMoney(amount);
    setAdding(false);
  }

  return (
    <MobileShell className="overflow-hidden">
      <div className="flex min-h-dvh flex-col bg-[#f7f7f7]">
        <section className="relative flex flex-[0.92] flex-col bg-[linear-gradient(180deg,#e4f04a_0%,#eef66a_55%,#f4f88a_100%)] px-5 pb-6 pt-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-kowi-ink shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white/45">
              <WalletHeroIcon />
            </div>
            <p className="mt-5 text-[13px] font-bold tracking-[0.12em] text-[#7a5e22]">
              YOUR BALANCE
            </p>
            <p className="mt-1 text-[42px] font-bold leading-none text-kowi-ink">
              ₹{balance}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAdding(true)}
            className="w-full rounded-2xl bg-kowi-lime py-3.5 text-[17px] font-bold text-kowi-ink"
          >
            Add Money
          </button>
        </section>

        <section className="flex min-h-0 flex-1 flex-col bg-white px-5 pt-5">
          <h2 className="text-[18px] font-bold text-kowi-ink">Transactions</h2>
          {transactions.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center pb-10">
              <ReceiptIcon />
              <p className="mt-3 text-[14px] text-[#b0b4ba]">
                No transactions yet
              </p>
            </div>
          ) : (
            <ul className="mt-3 min-h-0 flex-1 overflow-y-auto pb-8">
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-center justify-between border-b border-[#f0f1f3] py-3.5"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-kowi-ink">
                      {tx.label}
                    </p>
                    <p className="mt-0.5 text-[12px] text-kowi-muted">
                      {formatWhen(tx.at)}
                    </p>
                  </div>
                  <p className="text-[15px] font-bold text-[#1aa34a]">
                    +₹{tx.amount}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {adding ? (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close add money"
            onClick={() => setAdding(false)}
          />
          <div className="relative z-10 rounded-t-[28px] bg-white px-5 pb-8 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-kowi-ink">Add money</h2>
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[22px] text-kowi-muted"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="mt-1 grid grid-cols-4 gap-2">
              {AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={`rounded-xl py-2.5 text-[14px] font-semibold ${
                    amount === value
                      ? "bg-kowi-lime text-kowi-ink"
                      : "bg-[#f4f5f7] text-kowi-ink"
                  }`}
                >
                  ₹{value}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={confirmAdd}
              className="mt-5 w-full rounded-2xl bg-kowi-lime py-3.5 text-[17px] font-bold text-kowi-ink"
            >
              Add ₹{amount}
            </button>
          </div>
        </div>
      ) : null}
    </MobileShell>
  );
}

function formatWhen(at: number) {
  return new Date(at).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}
