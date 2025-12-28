import ServiceProviderProfileTemplate from "@/components/templates/service-provider-profile-template";
import { ROUTES } from "@/lib/constants/routes";
import { getServerUser } from "@/lib/api/server-auth";
import { getMyServiceProviderProfileServer } from "@/lib/api/server-service-providers";
import { transformBackendToUnified } from "@/lib/data/models/unified-service-provider";
import { redirect } from "next/navigation";

export default async function ServiceProviderProfilePage() {
  const user = await getServerUser();
  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  // Fetch profile from backend API
  const backendProfile = await getMyServiceProviderProfileServer();

  if (!backendProfile) {
    redirect(ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM);
  }

  // Transform backend DTO to unified format for template
  const serviceProvider = transformBackendToUnified(backendProfile);

  return (
    <>
      <ServiceProviderProfileTemplate serviceProvider={serviceProvider} />
    </>
  );
}
