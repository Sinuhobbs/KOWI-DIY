"use client";

import { useEffect, useState } from "react";
import {
  bookPackage,
  cancelBooking,
  isBooked,
} from "@/lib/bookings";
import type { Service, ServicePackage } from "@/lib/services";
import { ServiceArt } from "@/components/ServiceArt";

export function ServiceCard({
  service,
  pkg,
}: {
  service: Service;
  pkg: ServicePackage;
}) {
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    function sync() {
      setBooked(isBooked(pkg.id));
    }
    sync();
    window.addEventListener("kowi-bookings", sync);
    return () => window.removeEventListener("kowi-bookings", sync);
  }, [pkg.id]);

  return (
    <article className="pb-4">
      <div className="relative">
        <ServiceArt art={service.art} />
        {booked ? (
          <button
            type="button"
            onClick={() => cancelBooking(pkg.id)}
            className="absolute bottom-2 right-2 rounded-lg border border-[#c6e400] bg-white px-3 py-1 text-[12px] font-bold text-[#6b8c00]"
          >
            Booked
          </button>
        ) : (
          <button
            type="button"
            onClick={() => bookPackage(service.id, pkg.id)}
            className="absolute bottom-2 right-2 rounded-lg border border-[#c6e400] bg-white px-3 py-1 text-[12px] font-bold text-[#6b8c00]"
          >
            BOOK
          </button>
        )}
      </div>
      <p className="mt-2 text-[16px] font-bold text-kowi-ink">
        ₹{pkg.price}
        {pkg.mrp > pkg.price ? (
          <span className="ml-1 text-[12px] font-normal text-[#9aa0a8] line-through">
            ₹{pkg.mrp}
          </span>
        ) : null}
      </p>
      <p className="text-[12px] text-kowi-muted">{pkg.duration}</p>
      <p className="mt-1 text-[13px] leading-4 text-kowi-ink">{pkg.name}</p>
    </article>
  );
}
