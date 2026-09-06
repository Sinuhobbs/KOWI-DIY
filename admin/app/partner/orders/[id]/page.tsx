export default async function PartnerOrderPlaceholderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="bg-[linear-gradient(180deg,#d8f59a_0%,#ffffff_100%)] px-4 pb-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <p className="text-[13px] font-bold text-kowi-ink">Orders</p>
        <h1 className="mt-0.5 text-[26px] font-extrabold tracking-tight text-kowi-ink">
          Order
        </h1>
      </header>
      <div className="px-4 py-8 text-center">
        <p className="text-[15px] text-kowi-muted">
          Order detail is not built yet. Reference: {id}
        </p>
      </div>
    </div>
  );
}
