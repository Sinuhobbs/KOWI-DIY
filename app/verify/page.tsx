"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MobileShell } from "@/components/MobileShell";
import { readPhone, savePhone, saveVerifiedSession } from "@/lib/session";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"] as const;

const LETTERS: Record<string, string> = {
  "2": "ABC",
  "3": "DEF",
  "4": "GHI",
  "5": "JKL",
  "6": "MNO",
  "7": "PQRS",
  "8": "TUV",
  "9": "WXYZ",
};

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <MobileShell>
          <div className="min-h-dvh" />
        </MobileShell>
      }
    >
      <VerifyScreen />
    </Suspense>
  );
}

function VerifyScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const hiddenRef = useRef<HTMLInputElement>(null);
  const isComplete = code.length === 6;

  useEffect(() => {
    const fromQuery = (searchParams.get("phone") ?? "").replace(/\D/g, "").slice(0, 10);
    const stored = readPhone();
    const nextPhone = fromQuery || stored;
    if (!nextPhone) {
      router.replace("/");
      return;
    }
    if (fromQuery) savePhone(fromQuery);
    setPhone(nextPhone);
  }, [router, searchParams]);

  function appendDigit(digit: string) {
    setCode((current) => (current.length >= 6 ? current : current + digit));
  }

  function removeDigit() {
    setCode((current) => current.slice(0, -1));
  }

  function onPaste(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    if (digits) setCode(digits);
  }

  function verify() {
    if (!isComplete) return;
    saveVerifiedSession(phone);
    router.push("/home");
  }

  return (
    <MobileShell>
      <div className="flex min-h-dvh flex-col">
        <header className="relative flex items-center justify-center px-5 pb-2 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="absolute left-5 flex h-9 w-9 items-center justify-center rounded-full bg-kowi-skip text-kowi-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-[17px] font-semibold text-kowi-ink">
            Verify your number
          </h1>
        </header>

        <div className="flex flex-1 flex-col items-center px-6 pt-8">
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-kowi-bubble">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 6.5C5 5.67 5.67 5 6.5 5H17.5C18.33 5 19 5.67 19 6.5V14.5C19 15.33 18.33 16 17.5 16H9L5 19.5V6.5Z"
                stroke="#9cc000"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="10.5" r="1" fill="#9cc000" />
              <circle cx="12" cy="10.5" r="1" fill="#9cc000" />
              <circle cx="15" cy="10.5" r="1" fill="#9cc000" />
            </svg>
          </div>

          <p className="mt-6 text-[15px] text-kowi-muted">
            We&apos;ve sent a 6-digit code to
          </p>
          <p className="mt-1 text-[18px] font-semibold tracking-wide text-kowi-ink">
            +91 {phone}
          </p>

          <input
            ref={hiddenRef}
            type="tel"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(event) => onPaste(event.target.value)}
            className="sr-only"
            aria-label="6-digit verification code"
          />

          <button
            type="button"
            onClick={() => hiddenRef.current?.focus()}
            className="mt-7 flex w-full justify-between gap-2"
            aria-label="Enter verification code"
          >
            {Array.from({ length: 6 }).map((_, index) => {
              const filled = Boolean(code[index]);
              const active = index === code.length || (isComplete && index === 5);
              return (
                <span
                  key={index}
                  className={`flex h-[52px] w-[48px] items-center justify-center rounded-xl border text-[22px] font-semibold ${
                    active
                      ? "border-kowi-lime"
                      : "border-kowi-line"
                  }`}
                >
                  {filled ? (
                    code[index]
                  ) : active ? (
                    <span className="h-[2px] w-4 bg-kowi-lime" />
                  ) : null}
                </span>
              );
            })}
          </button>

          <p className="mt-3 text-[12px] text-kowi-muted">
            Tap the boxes to enter or paste your code
          </p>

          <button
            type="button"
            disabled={!isComplete}
            onClick={verify}
            className={`mt-8 w-full rounded-2xl py-3.5 text-[17px] font-semibold ${
              isComplete
                ? "bg-kowi-lime text-kowi-ink"
                : "bg-kowi-disabled text-[#6b7280]"
            }`}
          >
            {isComplete ? "Continue" : "Enter 6-digit code"}
          </button>
        </div>

        <div className="mt-6 rounded-t-3xl bg-[#ececef] px-3 pb-4 pt-3">
          <div className="grid grid-cols-3 gap-2">
            {KEYS.map((key, index) => {
              if (key === "") {
                return <span key={`empty-${index}`} />;
              }
              if (key === "back") {
                return (
                  <button
                    key="back"
                    type="button"
                    onClick={removeDigit}
                    className="flex h-12 items-center justify-center"
                    aria-label="Delete"
                  >
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <path
                        d="M7.2 1H19C20.1 1 21 1.9 21 3V13C21 14.1 20.1 15 19 15H7.2C6.6 15 6.1 14.7 5.8 14.2L1.2 8.7C0.9 8.3 0.9 7.7 1.2 7.3L5.8 1.8C6.1 1.3 6.6 1 7.2 1Z"
                        stroke="#1D1D1F"
                        strokeWidth="1.4"
                      />
                      <path d="M9.5 5L14.5 11M14.5 5L9.5 11" stroke="#1D1D1F" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                );
              }
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => appendDigit(key)}
                  className="flex h-12 flex-col items-center justify-center rounded-lg bg-white"
                >
                  <span className="text-[22px] font-medium leading-none">{key}</span>
                  {LETTERS[key] ? (
                    <span className="mt-0.5 text-[8px] tracking-[0.18em] text-kowi-muted">
                      {LETTERS[key]}
                    </span>
                  ) : (
                    <span className="mt-0.5 h-[10px]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
