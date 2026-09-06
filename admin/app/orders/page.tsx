import { AdminShell } from "@/components/AdminShell";

export default function OrdersPage() {
  return (
    <AdminShell title="Orders">
      <div className="rounded-2xl border border-dashed border-kowi-line bg-white p-8 text-[14px] text-kowi-muted">
        Order list and status updates will go here.
      </div>
    </AdminShell>
  );
}
