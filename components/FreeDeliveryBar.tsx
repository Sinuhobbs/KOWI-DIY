import { TruckIcon } from "@/components/icons";

export function FreeDeliveryBar({
  title = "Unlock free delivery",
  detail = "Shop for ₹2000",
}: {
  title?: string;
  detail?: string;
}) {
  return (
    <>
      <div className="h-16 shrink-0" aria-hidden />
      <div className="fixed bottom-[calc(3.75rem+env(safe-area-inset-bottom))] left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-4 pb-2">
        <div className="flex items-center gap-3 rounded-full border border-[#b7e3c2] bg-[#e7f8ea] px-3 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
            <TruckIcon />
          </span>
          <span>
            <span className="block text-[14px] font-bold text-[#1aa34a]">
              {title}
            </span>
            <span className="block text-[12px] text-kowi-muted">{detail}</span>
          </span>
        </div>
      </div>
    </>
  );
}
