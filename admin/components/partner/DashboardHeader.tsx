"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import type { PartnerNotification, PartnerStore, StoreStatus } from "@/lib/partner/types";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 20a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardHeader({
  store,
  status,
  notifications,
}: {
  store: PartnerStore;
  status: StoreStatus;
  notifications: PartnerNotification[];
}) {
  return (
    <header className="bg-[linear-gradient(180deg,#d8f59a_0%,#ffffff_100%)] px-4 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold leading-4 text-kowi-ink/70">
            {greeting()} 👋
          </p>
          <p className="truncate text-[18px] font-extrabold leading-6 tracking-tight text-kowi-ink">
            {store.name}
          </p>
          <p className="mt-0.5 truncate text-[12px] leading-4 text-kowi-muted">
            Let’s keep your store running today.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <NotificationButton notifications={notifications} />
          <ProfileMenu store={store} status={status} />
        </div>
      </div>
    </header>
  );
}

function NotificationButton({
  notifications,
}: {
  notifications: PartnerNotification[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((item) => item.unread).length;
  const labelId = useId();

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-labelledby={labelId}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-kowi-ink"
      >
        <BellIcon />
        <span id={labelId} className="sr-only">
          Notifications{unread ? `, ${unread} unread` : ""}
        </span>
        {unread ? (
          <span className="absolute right-0.5 top-0.5 min-w-4 rounded-full bg-kowi-ink px-1 text-center text-[10px] font-bold leading-4 text-white">
            {unread}
          </span>
        ) : null}
      </button>
      {open ? (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,20rem)] overflow-hidden rounded-2xl border border-kowi-line bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
        >
          <p className="border-b border-kowi-line px-4 py-2.5 text-[13px] font-bold">
            Notifications
          </p>
          <ul>
            {notifications.map((item) => (
              <li key={item.id} className="border-b border-kowi-line last:border-0">
                <p className="px-4 py-3">
                  <span className="block text-[13px] font-semibold text-kowi-ink">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[12px] text-kowi-muted">
                    {item.body}
                  </span>
                  <span className="mt-1 block text-[11px] text-kowi-muted">
                    {item.time}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function ProfileMenu({
  store,
  status,
}: {
  store: PartnerStore;
  status: StoreStatus;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const initial = store.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Store profile menu"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-0.5 rounded-full bg-white/70 py-1 pl-1 pr-2 text-kowi-ink"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kowi-lime text-[12px] font-bold">
          {initial[0]}
        </span>
        <ChevronDown />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-kowi-line bg-white py-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
        >
          <div className="border-b border-kowi-line px-4 pb-2">
            <p className="text-[14px] font-bold">{store.name}</p>
            <p className="text-[12px] text-kowi-muted">Store ID {store.storeId}</p>
            <p className="mt-1 text-[12px] font-medium">
              {status === "open" ? "Open" : "Closed"}
            </p>
          </div>
          <Link role="menuitem" href="/partner/store" className={menuItemClass}>
            Store Settings
          </Link>
          <Link role="menuitem" href="/partner/more" className={menuItemClass}>
            Staff
          </Link>
          <Link role="menuitem" href="/partner/more" className={menuItemClass}>
            Help & Support
          </Link>
          <Link role="menuitem" href="/" className={menuItemClass}>
            Log out
          </Link>
        </div>
      ) : null}
    </div>
  );
}

const menuItemClass =
  "block px-4 py-2.5 text-[13px] text-kowi-ink hover:bg-[#f4f5f7] focus-visible:bg-[#f4f5f7] focus-visible:outline-none";
