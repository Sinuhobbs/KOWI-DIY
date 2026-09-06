import type { ActivityItem as Activity } from "@/lib/partner/types";

export function ActivityFeed({ items }: { items: Activity[] }) {
  const rows = items.slice(0, 3);

  return (
    <section className="px-4 pb-2">
      <h2 className="mb-2 text-[18px] font-bold text-kowi-ink">Today</h2>
      {rows.length === 0 ? (
        <p className="text-[14px] text-kowi-muted">No activity yet today.</p>
      ) : (
        <ol className="overflow-hidden rounded-[18px] bg-[#f4f5f7] px-4">
          {rows.map((item, index) => (
            <li
              key={item.id}
              className={`py-3 ${index ? "border-t border-white" : ""}`}
            >
              <p className="text-[11px] font-medium text-kowi-muted">{item.time}</p>
              <p className="text-[13px] font-medium leading-4 text-kowi-ink">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
