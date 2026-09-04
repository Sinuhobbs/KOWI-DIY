"use client";

import { useEffect, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { SubpageHeader } from "@/components/SubpageHeader";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import {
  compressPhoto,
  formatPhone,
  saveProfile,
  useProfile,
} from "@/lib/profile";

export default function ProfilePage() {
  const stored = useProfile();
  const [name, setName] = useState(stored.name);
  const [email, setEmail] = useState(stored.email);
  const [photo, setPhoto] = useState(stored.photo);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(stored.name);
    setEmail(stored.email);
    setPhoto(stored.photo);
  }, [stored.name, stored.email, stored.photo]);

  function persist(nextPhoto = photo) {
    saveProfile({ name, email, photo: nextPhoto });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  async function onPick(file: File) {
    setError("");
    try {
      const next = await compressPhoto(file);
      setPhoto(next);
      saveProfile({ name, email, photo: next });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not use that photo.");
    }
  }

  function removePhoto() {
    setPhoto("");
    saveProfile({ name, email, photo: "" });
  }

  return (
    <MobileShell>
      <div className="flex min-h-dvh flex-col bg-white px-4 pb-8">
        <SubpageHeader title="Profile" />

        <div className="mt-4 flex flex-col items-center">
          <ProfileAvatar
            photo={photo}
            size={88}
            editable
            onPick={onPick}
            caption={photo ? "Change photo" : "Add photo"}
          />
          {photo ? (
            <button
              type="button"
              onClick={removePhoto}
              className="mt-1 text-[13px] text-kowi-muted"
            >
              Remove
            </button>
          ) : (
            <p className="mt-1 text-[12px] text-kowi-muted">
              Choose from your gallery
            </p>
          )}
          {error ? (
            <p className="mt-2 text-[12px] text-[#e11d2a]">{error}</p>
          ) : null}
        </div>

        <label className="mt-8 block text-[13px] font-semibold text-kowi-muted">
          Name
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setSaved(false);
            }}
            className="mt-2 w-full rounded-2xl border border-kowi-line px-4 py-3.5 text-[16px] text-kowi-ink outline-none"
          />
        </label>

        <label className="mt-4 block text-[13px] font-semibold text-kowi-muted">
          Phone
          <input
            readOnly
            value={formatPhone(stored.phone)}
            className="mt-2 w-full rounded-2xl border border-kowi-line bg-[#f7f7f7] px-4 py-3.5 text-[16px] text-kowi-ink"
          />
        </label>

        <label className="mt-4 block text-[13px] font-semibold text-kowi-muted">
          Email
          <input
            type="email"
            inputMode="email"
            placeholder="Optional"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSaved(false);
            }}
            className="mt-2 w-full rounded-2xl border border-kowi-line px-4 py-3.5 text-[16px] text-kowi-ink outline-none placeholder:text-[#b0b4ba]"
          />
        </label>

        <button
          type="button"
          onClick={() => persist()}
          className="mt-8 w-full rounded-2xl bg-kowi-lime py-3.5 text-[17px] font-bold text-kowi-ink"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </MobileShell>
  );
}
