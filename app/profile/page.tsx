"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/MobileShell";
import {
  ChevronRight,
  DocIcon,
  GlobeIcon,
  HelpCircleIcon,
  MenuReceiptIcon,
  ProfileIcon,
  TeamsIcon,
  WalletIcon,
} from "@/components/icons";
import { formatPhone, useProfile } from "@/lib/profile";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { usePlus } from "@/lib/plus";

const HELP_URL = "https://wa.me/919999999999";

export default function SettingsPage() {
  const router = useRouter();
  const profile = useProfile();
  const plusMember = usePlus();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <MobileShell>
      <div className="flex min-h-dvh flex-col bg-white px-4 pb-8">
        <header className="relative flex items-center py-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="absolute left-0 flex h-9 w-9 items-center justify-center text-kowi-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="w-full text-center text-[18px] font-bold text-kowi-ink">
            Settings
          </h1>
        </header>

        <div className="overflow-hidden rounded-2xl bg-[#f3f4f6]">
          <div className="flex items-center gap-3 px-4 py-4">
            <ProfileAvatar photo={ready ? profile.photo : ""} size={48} />
            <div className="min-w-0">
              <p className="truncate text-[16px] font-bold text-kowi-ink">
                {ready ? profile.name : " "}
              </p>
              <p className="mt-0.5 text-[13px] text-kowi-muted">
                {ready ? formatPhone(profile.phone) : " "}
              </p>
            </div>
          </div>
          <Link
            href="/plus"
            className="flex items-center gap-3 bg-[#1D1D1F] px-4 py-3"
          >
            <span className="shrink-0 text-[14px] font-extrabold tracking-tight">
              <span className="text-kowi-lime">kowi</span>
              <span className="text-white"> plus</span>
            </span>
            <span className="flex-1 text-[14px] font-semibold text-white">
              {plusMember ? "Your Kowi Plus" : "Join Kowi Plus"}
            </span>
            <span className="text-[18px] font-bold text-kowi-lime">›</span>
          </Link>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <Link
            href="/orders"
            className="flex items-center gap-3 rounded-2xl bg-[#f3f4f6] px-4 py-4 text-kowi-ink"
          >
            <MenuReceiptIcon />
            <span className="text-[14px] font-semibold">Your orders</span>
          </Link>
          <a
            href={HELP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-[#f3f4f6] px-4 py-4 text-kowi-ink"
          >
            <HelpCircleIcon />
            <span className="text-[14px] font-semibold">Need help?</span>
          </a>
        </div>

        <h2 className="mb-1 mt-6 text-[18px] font-bold text-kowi-ink">
          Account
        </h2>
        <div>
          <AccountLink href="/account/profile" icon={<ProfileIcon size={22} />} label="Profile" />
          <AccountLink href="/account/addresses" icon={<GlobeIcon />} label="Addresses" />
          <AccountLink href="/orders" icon={<MenuReceiptIcon />} label="Orders" />
          <AccountLink href="/wallet" icon={<WalletIcon size={22} />} label="Wallet" />
          <AccountLink href="/account/gst" icon={<DocIcon />} label="GST accounts" />
          <AccountLink href="/account/teams" icon={<TeamsIcon />} label="Teams" />
        </div>
      </div>
    </MobileShell>
  );
}

function AccountLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 py-3.5 text-kowi-ink"
    >
      {icon}
      <span className="flex-1 text-[15px]">{label}</span>
      <ChevronRight className="text-[#c5c8ce]" />
    </Link>
  );
}
