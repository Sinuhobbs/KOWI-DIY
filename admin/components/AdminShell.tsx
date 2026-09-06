import Link from "next/link";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/catalog", label: "Catalog" },
  { href: "/orders", label: "Orders" },
  { href: "/customers", label: "Customers" },
] as const;

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-[#f4f5f7]">
      <aside className="flex w-56 shrink-0 flex-col border-r border-kowi-line bg-white px-4 py-5">
        <p className="px-2 text-[18px] font-extrabold tracking-tight">
          <span className="text-kowi-ink">kowi</span>
          <span className="text-kowi-muted"> admin</span>
        </p>
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[14px] font-medium text-kowi-ink hover:bg-[#f4f5f7]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="mt-auto rounded-lg px-3 py-2 text-[13px] text-kowi-muted hover:bg-[#f4f5f7]"
        >
          Sign out
        </Link>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="border-b border-kowi-line bg-white px-6 py-4">
          <h1 className="text-[20px] font-bold">{title}</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
