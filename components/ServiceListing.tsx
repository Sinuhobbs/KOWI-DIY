"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/MobileShell";
import { SubpageHeader } from "@/components/SubpageHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { getService } from "@/lib/services";
import { useBookings } from "@/lib/bookings";

export function ServiceListing({ serviceId }: { serviceId: string }) {
  const router = useRouter();
  const service = getService(serviceId);
  const bookings = useBookings();
  const count = bookings.filter((item) => item.serviceId === serviceId).length;

  if (!service) {
    return (
      <MobileShell>
        <div className="flex min-h-dvh flex-col items-center justify-center px-6">
          <p className="text-[16px] text-kowi-muted">Service not found.</p>
          <Link href="/home" className="mt-4 font-semibold text-[#1aa34a]">
            Back to home
          </Link>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell className="overflow-hidden">
      <div className="flex min-h-dvh flex-col bg-white">
        <SubpageHeader title={service.name} />
        <p className="px-4 text-[13px] text-[#1aa34a]">
          Available in your area
        </p>
        <p className="px-4 pt-1 text-[13px] text-kowi-muted">{service.blurb}</p>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-24 pt-4">
          <div className="grid grid-cols-2 gap-3">
            {service.packages.map((pkg) => (
              <ServiceCard key={pkg.id} service={service} pkg={pkg} />
            ))}
          </div>
        </div>

        {count > 0 ? (
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <button
              type="button"
              onClick={() => router.push("/home")}
              className="w-full rounded-full bg-[#1D1D1F] py-3 text-[15px] font-bold text-white"
            >
              {count} {count === 1 ? "service" : "services"} requested
            </button>
          </div>
        ) : null}
      </div>
    </MobileShell>
  );
}
