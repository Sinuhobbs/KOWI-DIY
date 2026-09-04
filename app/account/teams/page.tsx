"use client";

import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { SubpageHeader } from "@/components/SubpageHeader";
import { TeamsIcon } from "@/components/icons";
import { addTeamMember, removeTeamMember, useTeam } from "@/lib/teams";

export default function TeamsPage() {
  const members = useTeam();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const canInvite = name.trim().length > 1 && phone.replace(/\D/g, "").length === 10;

  function invite() {
    if (!canInvite) return;
    addTeamMember(name, phone);
    setName("");
    setPhone("");
    setAdding(false);
  }

  return (
    <MobileShell className="overflow-hidden">
      <div className="flex min-h-dvh flex-col bg-white px-4 pb-8">
        <SubpageHeader title="Teams" />
        <p className="pb-3 text-[13px] text-kowi-muted">
          Teammates can place orders on this account. Invite is local for now.
        </p>

        <ul className="flex-1 space-y-3 pt-1">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-3 rounded-2xl border border-kowi-line px-4 py-3.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-kowi-ink">
                  <TeamsIcon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-kowi-ink">
                    {member.name}
                    {member.id === "you" ? " (You)" : ""}
                  </span>
                  <span className="block text-[12px] text-kowi-muted">
                    {member.phone} · {member.role}
                  </span>
                </span>
                {member.id !== "you" ? (
                  <button
                    type="button"
                    onClick={() => removeTeamMember(member.id)}
                    className="text-[12px] font-medium text-kowi-muted"
                  >
                    Remove
                  </button>
                ) : null}
              </li>
            ))}
          </ul>

        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-4 w-full rounded-2xl bg-kowi-lime py-3.5 text-[17px] font-bold text-kowi-ink"
        >
          Invite teammate
        </button>
      </div>

      {adding ? (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close invite"
            onClick={() => setAdding(false)}
          />
          <div className="relative z-10 rounded-t-[28px] bg-white px-5 pb-8 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-kowi-ink">
                Invite teammate
              </h2>
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[22px] text-kowi-muted"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="w-full rounded-2xl border border-kowi-line px-4 py-3.5 text-[15px] outline-none"
            />
            <label className="mt-3 flex items-center rounded-2xl border border-kowi-line px-4 py-3.5">
              <span className="pr-3 text-[15px] font-medium">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Phone number"
                className="w-full bg-transparent text-[15px] outline-none"
              />
            </label>
            <button
              type="button"
              disabled={!canInvite}
              onClick={invite}
              className={`mt-5 w-full rounded-2xl py-3.5 text-[17px] font-bold ${
                canInvite
                  ? "bg-kowi-lime text-kowi-ink"
                  : "bg-kowi-disabled text-white"
              }`}
            >
              Send invite
            </button>
          </div>
        </div>
      ) : null}
    </MobileShell>
  );
}
