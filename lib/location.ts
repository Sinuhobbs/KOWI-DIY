"use client";

import { useEffect, useState } from "react";

export type SavedLocation = {
  id: string;
  area: string;
  short: string;
  full: string;
};

export const CURRENT_GPS_LOCATION: SavedLocation = {
  id: "gps",
  area: "Prem Nagar II",
  short: "B295, Shankar Vihar, Prem Nagar II",
  full: "B295, Shankar Vihar, Block U, Prem Nagar II, Prem Nagar, New Delhi, Delhi, 110086, India",
};

export const DEFAULT_LOCATION: SavedLocation = {
  id: "niti-vihar",
  area: "Niti Vihar",
  short: "35, 70 Feet Rd, Block I, Niti Vihar",
  full: "35, 70 Feet Rd, Block I, Niti Vihar, New Delhi, Delhi, 110034, India",
};

export const SERVICEABLE_AREAS: SavedLocation[] = [
  DEFAULT_LOCATION,
  CURRENT_GPS_LOCATION,
  {
    id: "cp",
    area: "Connaught Place",
    short: "Connaught Place, New Delhi",
    full: "Connaught Place, New Delhi, Delhi, 110001, India",
  },
  {
    id: "dwarka",
    area: "Dwarka",
    short: "Sector 12, Dwarka",
    full: "Sector 12, Dwarka, New Delhi, Delhi, 110078, India",
  },
  {
    id: "gurgaon",
    area: "Gurugram",
    short: "Sector 29, Gurugram",
    full: "Sector 29, Gurugram, Haryana, 122001, India",
  },
  {
    id: "noida",
    area: "Noida",
    short: "Sector 18, Noida",
    full: "Sector 18, Noida, Uttar Pradesh, 201301, India",
  },
  {
    id: "rohini",
    area: "Rohini",
    short: "Sector 9, Rohini",
    full: "Sector 9, Rohini, New Delhi, Delhi, 110085, India",
  },
  {
    id: "saket",
    area: "Saket",
    short: "Saket, New Delhi",
    full: "Saket, New Delhi, Delhi, 110017, India",
  },
];

const LOCATION_KEY = "kowi.location";
const ADDRESS_BOOK_KEY = "kowi.addresses";
const LOCATION_EVENT = "kowi-location";

const SEEDED_ADDRESSES = [DEFAULT_LOCATION, CURRENT_GPS_LOCATION];

export function readLocation(): SavedLocation {
  if (typeof window === "undefined") return DEFAULT_LOCATION;
  const raw = sessionStorage.getItem(LOCATION_KEY);
  if (!raw) return DEFAULT_LOCATION;
  try {
    return JSON.parse(raw) as SavedLocation;
  } catch {
    return DEFAULT_LOCATION;
  }
}

export function saveLocation(location: SavedLocation) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  upsertAddress(location);
  window.dispatchEvent(new Event(LOCATION_EVENT));
}

export function readAddressBook(): SavedLocation[] {
  if (typeof window === "undefined") return SEEDED_ADDRESSES;
  try {
    const parsed = JSON.parse(
      sessionStorage.getItem(ADDRESS_BOOK_KEY) ?? "[]",
    ) as SavedLocation[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return SEEDED_ADDRESSES;
    }
    return parsed;
  } catch {
    return SEEDED_ADDRESSES;
  }
}

function writeAddressBook(addresses: SavedLocation[]) {
  sessionStorage.setItem(ADDRESS_BOOK_KEY, JSON.stringify(addresses));
  window.dispatchEvent(new Event(LOCATION_EVENT));
}

export function upsertAddress(location: SavedLocation) {
  if (typeof window === "undefined") return;
  const book = readAddressBook();
  writeAddressBook([
    location,
    ...book.filter((item) => item.id !== location.id),
  ]);
}

export function removeAddress(id: string) {
  const remaining = readAddressBook().filter((item) => item.id !== id);
  const next = remaining.length ? remaining : SEEDED_ADDRESSES;
  writeAddressBook(next);
  const current = readLocation();
  if (current.id === id) {
    sessionStorage.setItem(LOCATION_KEY, JSON.stringify(next[0]));
    window.dispatchEvent(new Event(LOCATION_EVENT));
  }
}

export function useAddressBook() {
  const [addresses, setAddresses] = useState<SavedLocation[]>(SEEDED_ADDRESSES);
  const [current, setCurrent] = useState<SavedLocation>(DEFAULT_LOCATION);

  useEffect(() => {
    function sync() {
      setAddresses(readAddressBook());
      setCurrent(readLocation());
    }
    sync();
    window.addEventListener(LOCATION_EVENT, sync);
    return () => window.removeEventListener(LOCATION_EVENT, sync);
  }, []);

  return { addresses, current };
}

export function searchAreas(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return SERVICEABLE_AREAS;
  return SERVICEABLE_AREAS.filter(
    (area) =>
      area.area.toLowerCase().includes(q) ||
      area.short.toLowerCase().includes(q) ||
      area.full.toLowerCase().includes(q),
  );
}

export function deliveryMinutes(location: SavedLocation) {
  const seed = [...(location.id || location.area)].reduce(
    (n, ch) => n + ch.charCodeAt(0),
    0,
  );
  return 20 + (seed % 16);
}

export function locationArea(location: SavedLocation) {
  if (location.area?.trim()) return location.area.trim();
  const parts = location.short
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1];
    if (/delhi|india|ncr/i.test(last)) return parts[parts.length - 2] ?? last;
    return last;
  }
  return location.short;
}

export function locationPin(location: SavedLocation) {
  const area = locationArea(location);
  const house = location.short
    .split(",")
    .map((part) => part.trim())
    .find(Boolean);
  if (house && house.toLowerCase() !== area.toLowerCase()) {
    return `${house}, ${area}`;
  }
  return area;
}
