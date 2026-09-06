export function DashboardSkeleton() {
  return (
    <div className="space-y-4 px-4 py-4" aria-hidden>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-32 animate-pulse rounded-[20px] bg-[#f4f5f7]" />
        <div className="h-32 animate-pulse rounded-[20px] bg-[#f4f5f7]" />
      </div>
      <div className="h-16 animate-pulse rounded-[20px] bg-[#f4f5f7]" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-16 animate-pulse rounded-[20px] bg-[#f4f5f7]" />
        <div className="h-16 animate-pulse rounded-[20px] bg-[#f4f5f7]" />
      </div>
      <div className="h-40 animate-pulse rounded-[22px] bg-[#f4f5f7]" />
      <p className="sr-only">Loading your dashboard</p>
    </div>
  );
}
