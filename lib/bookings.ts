"use client";

import { useEffect, useState } from "react";

const BOOKING_KEY = "kowi.bookings";
const BOOKING_EVENT = "kowi-bookings";

export type Booking = {
  id: string;
  serviceId: string;
  packageId: string;
  at: number;
};

export function readBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(sessionStorage.getItem(BOOKING_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeBookings(bookings: Booking[]) {
  sessionStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event(BOOKING_EVENT));
}

export function isBooked(packageId: string) {
  return readBookings().some((item) => item.packageId === packageId);
}

export function bookPackage(serviceId: string, packageId: string) {
  if (isBooked(packageId)) return;
  writeBookings([
    {
      id: `bk-${Date.now()}`,
      serviceId,
      packageId,
      at: Date.now(),
    },
    ...readBookings(),
  ]);
}

export function cancelBooking(packageId: string) {
  writeBookings(readBookings().filter((item) => item.packageId !== packageId));
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    function sync() {
      setBookings(readBookings());
    }
    sync();
    window.addEventListener(BOOKING_EVENT, sync);
    return () => window.removeEventListener(BOOKING_EVENT, sync);
  }, []);

  return bookings;
}
