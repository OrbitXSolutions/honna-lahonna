import { getServiceProviderByUserId } from "@/app/_actions/service-provider/profile/profile-fetch.action";
import ServiceProviderProfileTemplate from "@/components/templates/service-provider-profile-template";
import { ROUTES } from "@/lib/constants/routes";

import { createSsrClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function ServiceProviderProfilePage() {
  const supabase = await createSsrClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(ROUTES.LOGIN);
  }
  if (!user.user_metadata?.is_service_provider) {
    redirect(ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM);
  }

  const serviceProvider = await getServiceProviderByUserId(user);
  if (!serviceProvider) {
    notFound();
  }

  return (
    <>
      <ServiceProviderProfileTemplate serviceProvider={serviceProvider} />
    </>
  );
}
