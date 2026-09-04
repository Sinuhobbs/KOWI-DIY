"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KowiLogo } from "@/components/KowiLogo";
import { MobileShell } from "@/components/MobileShell";
import { savePhone, saveGuestSession } from "@/lib/session";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const isValid = phone.length === 10;

  function continueWithPhone() {
    if (!isValid) return;
    savePhone(phone);
    router.push(`/verify?phone=${phone}`);
  }

  function skipLogin() {
    saveGuestSession();
    router.push("/home");
  }

  return (
    <MobileShell>
      <Link href="/home" prefetch aria-hidden className="hidden" />
      <Link href="/verify" prefetch aria-hidden className="hidden" />
      <div className="flex min-h-dvh flex-col px-5 pb-8 pt-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={skipLogin}
            className="rounded-full bg-kowi-skip px-3.5 py-1.5 text-[13px] font-medium text-kowi-ink"
          >
            Skip login
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center pt-[18vh]">
          <KowiLogo />
          <h1 className="mt-8 text-[22px] font-medium tracking-tight text-kowi-ink">
            Sign up or Log in
          </h1>

          <label className="mt-7 flex w-full items-center rounded-2xl border border-kowi-line px-4 py-3.5">
            <span className="pr-3 text-[16px] font-medium text-kowi-ink">
              +91
            </span>
            <span className="mr-3 h-5 w-px bg-kowi-line" />
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Enter phone number"
              value={phone}
              onChange={(event) => setPhone(digitsOnly(event.target.value))}
              className="w-full bg-transparent text-[16px] text-kowi-ink outline-none placeholder:text-[#b0b4ba]"
            />
          </label>

          <button
            type="button"
            disabled={!isValid}
            onClick={continueWithPhone}
            className={`mt-4 w-full rounded-2xl py-3.5 text-[17px] font-semibold transition-colors ${
              isValid
                ? "bg-kowi-lime text-kowi-ink"
                : "bg-kowi-disabled text-white"
            }`}
          >
            Continue
          </button>
        </div>

        <p className="px-4 text-center text-[12px] leading-5 text-kowi-muted">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-kowi-lime underline decoration-kowi-lime">
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link
            href="/privacy"
            className="text-kowi-lime underline decoration-kowi-lime"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </MobileShell>
  );
}
