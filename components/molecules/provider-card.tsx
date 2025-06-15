import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SupabasePaths } from "@/lib/constants/supabase";
import { ServiceProviderVM } from "@/lib/data/models/vm/service-provider";
import AppButton from "../atoms/app-button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import GridBackground from "./grid-background";
import AppLink from "../atoms/app-link";

interface Props {
  providerData: ServiceProviderVM;
  [key: string]: any; // Allow additional props if needed
}

export default function ProviderCard({ providerData, ...props }: Props) {
  // Data for the service card
  const serviceData = {
    title: providerData.service_name,
    location: providerData.governorates?.name || "غير محدد",
    experience: `+${providerData.years_of_experience} خبرة`,
    serviceType: providerData.service_categories?.name || "غير محدد",
    providerName: `${providerData.users?.first_name || ""} ${
      providerData.users?.last_name || ""
    }`,
    providerImage: `${SupabasePaths.USERS}/${providerData.users?.avatar || ""}`,
    mainImage: `${SupabasePaths.SERVICE_PROVIDERS}/${
      providerData.logo_image || ""
    }`,
  };

  return (
    <div className="p-3 border bg-white rounded-xl space-y-2 transition-all hover:border-primary hover:shadow-lg shadow-primary hover:scale-105 ">
      <figure className="flex flex-col gap-2 bg-background object-cover overflow-hidden rounded-xl">
        <Image
          src={serviceData.mainImage}
          alt={serviceData.title ?? ""}
          height={200}
          width={200}
          className="mx-auto rounded-xl w-full object-cover aspect-square"
        />
      </figure>
      <h2 className=" font-bold">
        {serviceData.title || "عنوان الخدمة غير متوفر"}
      </h2>
      <p className="text-xs text-gray-500">
        {[
          serviceData.location,
          serviceData.experience,
          serviceData.serviceType,
        ].join(" • ")}
      </p>
      <div className="flex gap-2 w-full items-center">
        <Avatar className="w-6 h-6">
          <AvatarImage
            src={serviceData.providerImage}
            alt={serviceData.providerName}
            className="object-cover"
          />
          <AvatarFallback>{serviceData.providerName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="text-xs font-bold">{serviceData.providerName}</div>
      </div>

      <AppButton asChild>
        <AppLink
          loaderClassName="text-white"
          href={`${ROUTES.SERVICES}/${providerData.slug}`}
          className="w-full text-center"
        >
          {"عرض تفاصيل"}
        </AppLink>
      </AppButton>
    </div>
  );
}
