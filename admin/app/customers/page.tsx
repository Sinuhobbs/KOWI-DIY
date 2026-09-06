import { AdminShell } from "@/components/AdminShell";

export default function CustomersPage() {
  return (
    <AdminShell title="Customers">
      <div className="rounded-2xl border border-dashed border-kowi-line bg-white p-8 text-[14px] text-kowi-muted">
        Customer accounts will go here.
      </div>
    </AdminShell>
  );
}
