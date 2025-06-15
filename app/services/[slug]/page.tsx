import ServiceProviderTemplate from "@/components/templates/service-provider-template";
import {
  getServiceProviderBySlug,
  getServiceProvidersByGovernorate,
} from "@/lib/data/prisma/service-providers";
import { NextPageParams } from "@/lib/utils/next-page-types";
import { notFound } from "next/navigation";

export default async function Page({ params }: NextPageParams) {
  const { slug } = await params;
  const serviceProvider = await getServiceProviderBySlug(slug);
  if (!serviceProvider) {
    notFound();
  }

  return (
    <>
      <ServiceProviderTemplate serviceProvider={serviceProvider} />
    </>
  );
}
