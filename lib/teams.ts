"use client";

import { useEffect, useState } from "react";
import { DEMO_NAME, formatPhone, readProfile } from "@/lib/profile";
import { readPhone } from "@/lib/session";

const TEAMS_KEY = "kowi.teams";
const TEAMS_EVENT = "kowi-teams";

export type TeamMember = {
  id: string;
  name: string;
  phone: string;
  role: "Admin" | "Member";
};

function ownerMember(): TeamMember {
  const profile = readProfile();
  return {
    id: "you",
    name: profile.name || DEMO_NAME,
    phone: formatPhone(readPhone()),
    role: "Admin",
  };
}

export function readTeam(): TeamMember[] {
  if (typeof window === "undefined") return [ownerMember()];
  try {
    const parsed = JSON.parse(sessionStorage.getItem(TEAMS_KEY) ?? "[]");
    const members = Array.isArray(parsed) ? (parsed as TeamMember[]) : [];
    const others = members.filter((item) => item.id !== "you");
    return [ownerMember(), ...others];
  } catch {
    return [ownerMember()];
  }
}

function writeOthers(members: TeamMember[]) {
  sessionStorage.setItem(
    TEAMS_KEY,
    JSON.stringify(members.filter((item) => item.id !== "you")),
  );
  window.dispatchEvent(new Event(TEAMS_EVENT));
}

export function addTeamMember(name: string, phone: string) {
  const others = readTeam().filter((item) => item.id !== "you");
  writeOthers([
    {
      id: `tm-${Date.now()}`,
      name: name.trim() || "Teammate",
      phone: formatPhone(phone),
      role: "Member",
    },
    ...others,
  ]);
}

export function removeTeamMember(id: string) {
  if (id === "you") return;
  writeOthers(readTeam().filter((item) => item.id !== id && item.id !== "you"));
}

export function useTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    function sync() {
      setMembers(readTeam());
    }
    sync();
    window.addEventListener(TEAMS_EVENT, sync);
    window.addEventListener("kowi-profile", sync);
    return () => {
      window.removeEventListener(TEAMS_EVENT, sync);
      window.removeEventListener("kowi-profile", sync);
    };
  }, []);

  return members;
}
