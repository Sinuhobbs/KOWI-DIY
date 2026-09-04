import { CategoryListing } from "@/components/CategoryListing";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CategoryListing categoryId={id} />;
}
