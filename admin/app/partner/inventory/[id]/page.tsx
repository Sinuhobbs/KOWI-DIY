import { InventoryCategoryListing } from "@/components/partner/inventory/InventoryCategoryListing";

export default async function PartnerInventoryCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InventoryCategoryListing initialCategoryId={id} />;
}
