import ServiceProviderTemplate from "@/components/templates/service-provider-template";
import { getServiceProviderBySlug } from "@/lib/api/service-providers";
import { NextPageParams } from "@/lib/utils/next-page-types";
import { notFound } from "next/navigation";

export default async function Page({ params }: NextPageParams) {
  const { slug } = await params;

  try {
    const response = await getServiceProviderBySlug(slug);

    if (!response.success || !response.data) {
      notFound();
    }

    return (
      <>
        <ServiceProviderTemplate serviceProvider={response.data as any} />
      </>
    );
  } catch (error) {
    // If API returns 404 or any error, show friendly not found page
    console.error("Error fetching service provider:", error);
    notFound();
  }
}
