import { getServiceProviderByUserId } from "@/app/_actions/service-provider/profile/profile-fetch.action";
import ServiceProviderProfileTemplate from "@/components/templates/service-provider-profile-template";
import { ROUTES } from "@/lib/constants/routes";
import { getServerUser } from "@/lib/api/server-auth";
import { notFound, redirect } from "next/navigation";

export default async function ServiceProviderProfilePage() {
  const user = await getServerUser();
  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  const serviceProvider = await getServiceProviderByUserId(user);
  if (!serviceProvider) {
    redirect(ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM);
  }

  return (
    <>
      <ServiceProviderProfileTemplate serviceProvider={serviceProvider} />
    </>
  );
}
