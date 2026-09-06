import { OrderDetail } from "@/components/partner/orders/OrderDetail";

export default async function PartnerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetail id={id} />;
}
