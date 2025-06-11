import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { SupabasePaths } from "@/lib/constants/supabase";
import { ServiceProviderVM } from "@/lib/data/models/vm/service-provider";
import ProviderCard from "./provider-card";
import { IconCategories } from "../icons";
import { getServiceProvidersGroupedByCategories } from "@/lib/data/prisma/service-providers";
import HomeServiceProvidersItems from "./home-service-providers-items";

const ListProviderCards = ({
  providers,
}: {
  providers?: ServiceProviderVM[];
}) => {
  if (!providers || providers.length === 0) {
    return <p>{"لا يوجد مقدمي خدمات في الوقت الحالي"}</p>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} providerData={provider} /> // Spread operator to pass additional props if needed
      ))}
    </div>
  );
};

export default async function HomeServiceProviders() {
  const serviceCategories =
    (await getServiceProvidersGroupedByCategories()) || [];
  if (!serviceCategories.servicesCategories.length) {
    return <div>{"لا توجد خدمات في الوقت الحالي"}</div>;
  }

  return <HomeServiceProvidersItems {...serviceCategories} />;
}
