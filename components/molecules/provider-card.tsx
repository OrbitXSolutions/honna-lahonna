import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import AppButton from "../atoms/app-button";
import AppLink from "../atoms/app-link";

// Support both old ServiceProviderVM and new API types
interface ProviderData {
  id: number | string;
  slug?: string | null;
  service_name?: string | null;
  serviceName?: string | null;
  years_of_experience?: number | null;
  yearsOfExperience?: number | null;
  logo_image?: string | null;
  logoImage?: string | null;
  logoImageUrl?: string | null;
  governorates?: { name: string } | null;
  governorateName?: string | null;
  service_categories?: { name: string } | null;
  categoryName?: string | null;
  users?: { first_name?: string | null; last_name?: string | null; avatar?: string | null } | null;
  providerFirstName?: string | null;
  providerLastName?: string | null;
}

interface Props {
  providerData: ProviderData;
  [key: string]: any;
}

export default function ProviderCard({ providerData, ...props }: Props) {
  // Handle both old (snake_case) and new (camelCase) field names
  const serviceName = providerData.serviceName ?? providerData.service_name ?? "عنوان الخدمة غير متوفر";
  const yearsOfExperience = providerData.yearsOfExperience ?? providerData.years_of_experience ?? 0;
  const location = providerData.governorateName ?? providerData.governorates?.name ?? "غير محدد";
  const categoryName = providerData.categoryName ?? providerData.service_categories?.name ?? "غير محدد";

  // Handle image URL - use pre-mapped URL if available, otherwise use legacy path
  const logoImage = (providerData as any).logoImageUrl ??
    (providerData.logoImage ?? providerData.logo_image ?? "");

  // Handle provider name
  const providerFirstName = providerData.providerFirstName ?? providerData.users?.first_name ?? "";
  const providerLastName = providerData.providerLastName ?? providerData.users?.last_name ?? "";
  const providerName = `${providerFirstName} ${providerLastName}`.trim() || "مجهول";

  const serviceData = {
    title: serviceName,
    location: location,
    experience: `+${yearsOfExperience} خبرة`,
    serviceType: categoryName,
    providerName: providerName,
    providerImage: providerData.users?.avatar ?? "",
    mainImage: logoImage,
  };

  return (
    <div className="p-3 border bg-white rounded-xl space-y-2 transition-all hover:border-primary hover:shadow-lg shadow-primary hover:scale-105 ">
      <figure className="flex flex-col gap-2 bg-background object-cover overflow-hidden rounded-xl">
        {serviceData.mainImage && (
          <Image
            src={serviceData.mainImage}
            alt={serviceData.title ?? ""}
            height={200}
            width={200}
            className="mx-auto rounded-xl w-full object-cover aspect-square"
          />
        )}
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
