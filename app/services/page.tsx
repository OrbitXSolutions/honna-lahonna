import ServiceProvidersTemplate from "@/components/templates/service-providers-template";
import { NextPageParams } from "@/lib/utils/next-page-types";

export default function ServicesPage({ searchParams, params }: NextPageParams) {
  return (
    <ServiceProvidersTemplate searchParams={searchParams} params={params} />
  );
}
