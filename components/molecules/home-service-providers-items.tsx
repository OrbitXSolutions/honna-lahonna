import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { SupabasePaths } from "@/lib/constants/supabase";
import { ServiceProviderVM } from "@/lib/data/models/vm/service-provider";
import ProviderCard from "./provider-card";
import { IconCategories } from "../icons";
import { getServiceProvidersGroupedByCategories } from "@/lib/data/prisma/service-providers";
import { service_categories } from "@/lib/generated/prisma";

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

interface Props {
  servicesCategories: service_categories[];
  serviceProviders: {
    // Grouped by category slug
    [key: string]: ServiceProviderVM[];
  };
}

export default function HomeServiceProvidersItems({
  servicesCategories,
  serviceProviders,
}: Props) {
  if (!servicesCategories.length) {
    return <div>{"لا توجد خدمات في الوقت الحالي"}</div>;
  }

  return (
    <Tabs
      defaultValue="all"
      className="mx-auto container max-w-[1000px] space-y-5 max-sm:pt-5"
    >
      <TabsList dir="rtl" className="mx-auto">
        <TabsTrigger value="all">
          <IconCategories className="rounded-full " />
          {"الكل"}
        </TabsTrigger>
        {servicesCategories.map(({ icon, name, id, slug }) => (
          <TabsTrigger key={id} value={slug ?? id}>
            <Image
              src={`${SupabasePaths.SERVICE_CATEGORIES}/${icon}`}
              alt={name}
              width={20}
              unoptimized
              height={20}
              className="rounded-full brightness-0 invert group-data-[state=inactive]:filter-none"
            />

            {name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="all">
        <ListProviderCards providers={serviceProviders["all"]} />
      </TabsContent>
      {servicesCategories.map(({ id, slug }) => (
        <TabsContent key={id} value={slug ?? id}>
          <ListProviderCards providers={serviceProviders[slug ?? id]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
