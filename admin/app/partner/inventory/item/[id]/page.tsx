import { InventoryEdit } from "@/components/partner/inventory/InventoryEdit";

export default async function PartnerInventoryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InventoryEdit id={id} />;
}
