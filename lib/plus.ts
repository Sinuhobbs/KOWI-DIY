"use client";

import { useEffect, useState } from "react";

const PLUS_KEY = "kowi.plus";
const PLUS_EVENT = "kowi-plus";

export const PLUS_PRICE = 99;

export function isPlusMember() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(PLUS_KEY) === "member";
}

export function joinPlus() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PLUS_KEY, "member");
  window.dispatchEvent(new Event(PLUS_EVENT));
}

export function usePlus() {
  const [member, setMember] = useState(false);

  useEffect(() => {
    function sync() {
      setMember(isPlusMember());
    }
    sync();
    window.addEventListener(PLUS_EVENT, sync);
    return () => window.removeEventListener(PLUS_EVENT, sync);
  }, []);

  return member;
}
