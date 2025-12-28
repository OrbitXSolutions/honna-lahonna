import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProviderCard from "./provider-card";
import { IconCategories } from "../icons";
import type { CategoryDto, ServiceProviderListDto } from "@/lib/api/types";
import { getCategoryIconUrl } from "@/lib/api/types";

const ListProviderCards = ({
  providers,
}: {
  providers?: ServiceProviderListDto[];
}) => {
  if (!providers || providers.length === 0) {
    return <p>{"لا يوجد مقدمي خدمات في الوقت الحالي"}</p>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} providerData={provider as any} />
      ))}
    </div>
  );
};

interface Props {
  servicesCategories: CategoryDto[];
  serviceProviders: {
    // Grouped by category slug
    [key: string]: ServiceProviderListDto[];
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
        {servicesCategories.map(({ icon, name, id, slug }) => {
          const iconUrl = getCategoryIconUrl(icon);
          return (
            <TabsTrigger key={id} value={slug ?? id.toString()}>
              {iconUrl && (
                <Image
                  src={iconUrl}
                  alt={name}
                  width={20}
                  unoptimized
                  height={20}
                  className="rounded-full brightness-0 invert group-data-[state=inactive]:filter-none"
                />
              )}
              {name}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value="all">
        <ListProviderCards providers={serviceProviders["all"]} />
      </TabsContent>
      {servicesCategories.map(({ id, slug }) => (
        <TabsContent key={id} value={slug ?? id.toString()}>
          <ListProviderCards providers={serviceProviders[slug ?? id.toString()]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
