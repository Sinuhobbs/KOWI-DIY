"use client";

import { MobileShell } from "@/components/MobileShell";
import { SubpageHeader } from "@/components/SubpageHeader";
import { joinPlus, PLUS_PRICE, usePlus } from "@/lib/plus";

const BENEFITS = [
  {
    title: "Free delivery",
    detail: "No delivery fee on every order, in every area.",
  },
  {
    title: "Extra cashback",
    detail: "Earn more back on cement, paint, and electricals.",
  },
  {
    title: "Priority help",
    detail: "Faster WhatsApp support for sites and contractors.",
  },
];

export default function PlusPage() {
  const member = usePlus();

  return (
    <MobileShell>
      <div className="flex min-h-dvh flex-col bg-white px-4 pb-8">
        <SubpageHeader title="Kowi Plus" />

        <div className="mt-2 rounded-3xl bg-[#1D1D1F] px-5 py-6">
          <p className="text-[22px] font-extrabold tracking-tight">
            <span className="text-kowi-lime">kowi</span>
            <span className="text-white"> plus</span>
          </p>
          <p className="mt-2 text-[14px] leading-5 text-white/70">
            Cashback, free delivery, and priority support for your site
            orders.
          </p>
          {member ? (
            <p className="mt-4 text-[14px] font-semibold text-kowi-lime">
              You are a Plus member
            </p>
          ) : (
            <p className="mt-4 text-[14px] font-semibold text-white">
              ₹{PLUS_PRICE} / month
            </p>
          )}
        </div>

        <ul className="mt-5 space-y-3">
          {BENEFITS.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-kowi-line px-4 py-3.5"
            >
              <p className="text-[15px] font-semibold text-kowi-ink">
                {item.title}
              </p>
              <p className="mt-0.5 text-[13px] text-kowi-muted">{item.detail}</p>
            </li>
          ))}
        </ul>

        {member ? (
          <p className="mt-auto pt-8 text-center text-[13px] text-kowi-muted">
            Membership is saved on this device. Payment comes later.
          </p>
        ) : (
          <button
            type="button"
            onClick={joinPlus}
            className="mt-auto w-full rounded-2xl bg-kowi-lime py-3.5 text-[17px] font-bold text-kowi-ink"
          >
            Join Kowi Plus · ₹{PLUS_PRICE}
          </button>
        )}
      </div>
    </MobileShell>
  );
}
