import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProviderCard from "./provider-card";
import { IconCategories } from "../icons";
import { getServiceProvidersGroupedByCategories } from "@/lib/api/service-providers";
import HomeServiceProvidersItems from "./home-service-providers-items";

export default async function HomeServiceProviders() {
  const serviceCategories =
    (await getServiceProvidersGroupedByCategories()) || { servicesCategories: [], serviceProviders: {} };
  if (!serviceCategories.servicesCategories.length) {
    return <div>{"لا توجد خدمات في الوقت الحالي"}</div>;
  }

  return <HomeServiceProvidersItems {...serviceCategories} />;
}
