"use client";

import { useEffect, useState } from "react";

const MODE_KEY = "kowi.homeMode";
const MODE_EVENT = "kowi-home-mode";

export type HomeMode = "products" | "services";

export function readHomeMode(): HomeMode {
  if (typeof window === "undefined") return "products";
  return sessionStorage.getItem(MODE_KEY) === "services"
    ? "services"
    : "products";
}

export function saveHomeMode(mode: HomeMode) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(MODE_KEY, mode);
  window.dispatchEvent(new Event(MODE_EVENT));
}

export function useHomeMode() {
  const [mode, setMode] = useState<HomeMode>("products");

  useEffect(() => {
    function sync() {
      setMode(readHomeMode());
    }
    sync();
    window.addEventListener(MODE_EVENT, sync);
    return () => window.removeEventListener(MODE_EVENT, sync);
  }, []);

  function select(next: HomeMode) {
    saveHomeMode(next);
    setMode(next);
  }

  return { mode, select };
}
