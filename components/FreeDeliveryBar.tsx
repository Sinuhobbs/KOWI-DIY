import { TruckIcon } from "@/components/icons";
import { FREE_DELIVERY_MIN } from "@/lib/catalog";

function rupees(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function EmptyDeliveryCard({
  title = `Add items worth ${rupees(FREE_DELIVERY_MIN)}`,
  detail = "to get free delivery",
}: {
  title?: string;
  detail?: string;
}) {
  return (
    <div className="pointer-events-auto flex h-[60px] w-fit items-center gap-2.5 rounded-full border border-[#b7e3c2] bg-[#e7f8ea]/95 py-2.5 pl-2.5 pr-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
        <TruckIcon size={26} />
      </span>
      <span className="min-w-0 text-[#1aa34a]">
        <span className="block whitespace-nowrap text-[12px] font-semibold leading-4">
          {title}
        </span>
        <span className="block whitespace-nowrap text-[11px] font-normal leading-4">
          {detail}
        </span>
      </span>
    </div>
  );
}
