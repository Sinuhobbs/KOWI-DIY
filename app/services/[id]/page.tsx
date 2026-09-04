import { ServiceListing } from "@/components/ServiceListing";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ServiceListing serviceId={id} />;
}
