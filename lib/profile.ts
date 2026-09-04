"use client";

import { useEffect, useState } from "react";
import { readPhone } from "@/lib/session";

const PROFILE_KEY = "kowi.profile";
const PROFILE_EVENT = "kowi-profile";

export const DEMO_NAME = "Suraj Singh";
export const DEMO_PHONE = "8287425991";

export type Profile = {
  name: string;
  email: string;
  photo: string;
};

const DEFAULT_PROFILE: Profile = { name: DEMO_NAME, email: "", photo: "" };

export function formatPhone(digits: string) {
  const clean = digits.replace(/\D/g, "").slice(-10);
  if (clean.length !== 10) return `+91-${DEMO_PHONE}`;
  return `+91-${clean}`;
}

export function readProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const parsed = JSON.parse(
      sessionStorage.getItem(PROFILE_KEY) ?? "",
    ) as Profile;
    return {
      name: parsed.name?.trim() || DEMO_NAME,
      email: parsed.email ?? "",
      photo: parsed.photo ?? "",
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    PROFILE_KEY,
    JSON.stringify({
      name: profile.name.trim() || DEMO_NAME,
      email: profile.email.trim(),
      photo: profile.photo ?? "",
    }),
  );
  window.dispatchEvent(new Event(PROFILE_EVENT));
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [phone, setPhone] = useState(DEMO_PHONE);

  useEffect(() => {
    function sync() {
      setProfile(readProfile());
      setPhone(readPhone() || DEMO_PHONE);
    }
    sync();
    window.addEventListener(PROFILE_EVENT, sync);
    return () => window.removeEventListener(PROFILE_EVENT, sync);
  }, []);

  return { ...profile, phone };
}

export function compressPhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please choose a photo."));
      return;
    }
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      const size = 320;
      const scale = Math.max(size / image.width, size / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Could not read that photo."));
        return;
      }
      ctx.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that photo."));
    };
    image.src = url;
  });
}
