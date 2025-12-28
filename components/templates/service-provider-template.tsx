import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React from "react";
import AppButton from "../atoms/app-button";
import {
  IconBio,
  IconCall,
  IconContact,
  IconFacebook,
  IconInstagram,
  IconLocation,
  IconMedalStar,
  IconVerified,
  IconWeb,
  IconWhatsapp,
} from "../icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getProviderImageUrl } from "@/lib/api/types";

// Unified interface supporting both old (snake_case) and new (camelCase) API formats
interface ServiceProviderData {
  // New API (camelCase)
  serviceName?: string | null;
  serviceDescription?: string | null;
  bio?: string | null;
  logoImage?: string | null;
  coverImage?: string | null;
  yearsOfExperience?: number | null;
  categoryName?: string | null;
  governorateName?: string | null;
  phone?: string | null;
  address?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  whatsappUrl?: string | null;
  officialUrl?: string | null;
  otherUrls?: string | null;
  services?: string | null;
  providerFirstName?: string | null;
  providerLastName?: string | null;

  // Old Prisma types (snake_case) - for backward compatibility
  service_name?: string | null;
  service_description?: string | null;
  logo_image?: string | null;
  cover_image?: string | null;
  years_of_experience?: number | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  whatsapp_url?: string | null;
  official_url?: string | null;
  other_urls?: string | null;
  users?: { first_name?: string | null; last_name?: string | null; avatar?: string | null } | null;
  service_categories?: { name?: string | null } | null;
  governorates?: { name?: string | null } | null;
}

interface Props {
  serviceProvider: ServiceProviderData;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// Helper to get value from both old and new formats
function getValue<T>(newValue: T | null | undefined, oldValue: T | null | undefined): T | null {
  return newValue ?? oldValue ?? null;
}

const UserAvatar = ({ serviceProvider }: Props): React.ReactNode => {
  const firstName = getValue(serviceProvider.providerFirstName, serviceProvider.users?.first_name) || "";
  const avatarUrl = serviceProvider.users?.avatar || "";

  return (
    <Avatar className="w-27 h-27 text-6xl  bg-gray-200 border-3 border-primary">
      <AvatarImage src={avatarUrl} alt={firstName} className="object-cover" />
      <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
const SocialButton = ({
  icon,
  url,
  type = "url",
}: {
  icon: React.ReactNode;
  url: string;
  type?: "email" | "phone" | "url";
}) => {
  let href = url;
  if (type === "email") {
    href = `mailto:${url}`;
  } else if (type === "phone") {
    href = `tel:${url}`;
  } else if (type === "url") {
    href = url.startsWith("http") ? url : `https://${url}`;
  }
  return (
    <AppButton
      asChild
      variant={"ghost"}
      size={"sm"}
      className="rounded-full bg-gray-100 border-primary border !px-0 w-8 h-8"
    >
      <a
        className="text-primary hover:underline"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon}
      </a>
    </AppButton>
  );
};

const UserSocialMediaButtons = ({
  serviceProvider,
}: {
  serviceProvider: ServiceProviderData;
}) => {
  const instagram_url = getValue(serviceProvider.instagramUrl, serviceProvider.instagram_url);
  const facebook_url = getValue(serviceProvider.facebookUrl, serviceProvider.facebook_url);
  const whatsapp_url = getValue(serviceProvider.whatsappUrl, serviceProvider.whatsapp_url);
  const official_url = getValue(serviceProvider.officialUrl, serviceProvider.official_url);
  const phone = serviceProvider.phone;

  return (
    <div className="flex gap-2 items-center justify-start">
      {instagram_url && (
        <SocialButton
          url={instagram_url}
          icon={<IconInstagram className="w-6 h-6" />}
        />
      )}
      {facebook_url && (
        <SocialButton
          url={facebook_url}
          icon={<IconFacebook className="w-6 h-6" />}
        />
      )}
      {whatsapp_url && (
        <SocialButton
          url={whatsapp_url}
          icon={<IconWhatsapp className="w-6 h-6" />}
        />
      )}
      {official_url && (
        <SocialButton
          url={official_url}
          icon={<IconWeb className="w-6 h-6" />}
        />
      )}
      {phone && (
        <SocialButton
          url={phone}
          type="phone"
          icon={<IconCall className="w-6 h-6" />}
        />
      )}
    </div>
  );
};

const UserNameAndCategory = ({
  serviceProvider,
}: {
  serviceProvider: ServiceProviderData;
}) => {
  const firstName = getValue(serviceProvider.providerFirstName, serviceProvider.users?.first_name) || "";
  const lastName = getValue(serviceProvider.providerLastName, serviceProvider.users?.last_name) || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const category = getValue(serviceProvider.categoryName, serviceProvider.service_categories?.name);
  const serviceName = getValue(serviceProvider.serviceName, serviceProvider.service_name);
  let categoryNameServiceName;
  if (category && serviceName) {
    categoryNameServiceName = `${category} - ${serviceName}`;
  } else {
    categoryNameServiceName = category || serviceName || "غير محدد";
  }
  return (
    <div className="text-start pt-7 space-y-2">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span>{fullName}</span>
        <span>
          <IconVerified className="text-[#3897F0]" />
        </span>
      </h2>
      <p className="text-sm text-gray-500">{categoryNameServiceName}</p>
      <UserSocialMediaButtons serviceProvider={serviceProvider} />
    </div>
  );
};

const ContactContainer = ({
  url,
  type = "url",
  icon,
}: {
  url?: string | null;
  type?: "email" | "phone" | "url";
  icon: React.ReactNode;
}) => {
  let href = url;
  if (type === "email") {
    href = `mailto:${url}`;
  } else if (type === "phone") {
    href = `tel:${url}`;
  } else if (type === "url") {
    href = url?.startsWith("http") ? url : `https://${url}`;
  }

  return (
    <a
      className="text-primary hover:underline"
      href={href ?? ""}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex gap-2 w-full p-4 border border-gray-300 rounded-2xl items-center justify-start bg-white">
        <span>{icon}</span>
        <span className="text-sm">{url}</span>
      </div>
    </a>
  );
};

export default function ServiceProviderTemplate({
  serviceProvider,
  children,
  className,
  ...props
}: Props) {
  const otherUrls = getValue(serviceProvider.otherUrls, serviceProvider.other_urls)?.split(",") || [];
  const bio = serviceProvider.bio;
  const serviceDescription = getValue(serviceProvider.serviceDescription, serviceProvider.service_description);
  const yearsOfExperience = getValue(serviceProvider.yearsOfExperience, serviceProvider.years_of_experience);
  const services = serviceProvider.services;
  const facebookUrl = getValue(serviceProvider.facebookUrl, serviceProvider.facebook_url);
  const instagramUrl = getValue(serviceProvider.instagramUrl, serviceProvider.instagram_url);
  const officialUrl = getValue(serviceProvider.officialUrl, serviceProvider.official_url);
  const whatsappUrl = getValue(serviceProvider.whatsappUrl, serviceProvider.whatsapp_url);
  const phone = serviceProvider.phone;
  const address = serviceProvider.address;

  return (
    <div
      className={`service-provider-template ${className} container mx-auto relative mt-5 mb-10`}
      {...props}
    >
      <div className="relative  h-23 w-full">
        <Image
          src={"/cover.png"}
          alt={""}
          fill
          className="rounded-lg h-23 w-full"
        />

        <div className="translate-y-1/2 relative z-10 start-5 flex items-center gap-5">
          <UserAvatar serviceProvider={serviceProvider} />
          <UserNameAndCategory serviceProvider={serviceProvider} />
        </div>
      </div>

      <div className="py-16"></div>
      <Tabs
        defaultValue="bio"
        className="mx-auto container max-w-full space-y-5 max-sm:pt-5"
      >
        <TabsList dir="rtl" className="mx-auto">
          <TabsTrigger value="bio">
            <IconBio className="scale-110" />
            {"نبذة عني"}
          </TabsTrigger>
          <TabsTrigger value={"contact"}>
            <IconContact className="rounded-full " />

            {"التواصل"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bio">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl text-bold">{"نبذة عني"}</h3>
              <div className="p-4 text-gray-600 text-sm bg-white rounded-2xl">
                {bio}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl text-bold">{"عن الخدمة"}</h3>
              <div className="p-4 text-gray-600 text-sm bg-white rounded-2xl">
                {serviceDescription}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-2xl text-bold">{"سنوات الخبرة"}</h3>
              <div className="p-4 text-gray-800 text-sm bg-white rounded-2xl">
                <span className="flex gap-3">
                  <span>
                    <IconMedalStar />
                  </span>
                  <div className="span">
                    +{yearsOfExperience?.toString() ?? "0"}{" "}
                    <bdi>سنوات خبرة</bdi>
                  </div>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl text-bold">{"خدماتي"}</h3>
              {(services ?? "")?.split(",").length > 0 ? (
                <div className="flex flex-wrap gap-2 ">
                  {(services ?? "")
                    .split(",")
                    .map((service, index) => (
                      <div
                        className="p-4 text-gray-800 text-sm bg-white rounded-2xl "
                        key={index}
                      >
                        {service.trim()}
                      </div>
                    ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value={"contact"}>
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl text-bold">{"الأونلاين"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactContainer
                url={facebookUrl}
                icon={<IconFacebook className="w-6 h-6" />}
              />
              <ContactContainer
                url={instagramUrl}
                icon={<IconInstagram className="w-6 h-6" />}
              />
              <ContactContainer
                url={officialUrl}
                icon={<IconWeb className="w-6 h-6" />}
              />
              <ContactContainer
                url={whatsappUrl}
                icon={<IconWhatsapp className="w-6 h-6" />}
              />
              {otherUrls && otherUrls.length > 0 && (
                <>
                  {otherUrls.map((url, index) => {
                    return (
                      <ContactContainer
                        key={index}
                        url={url.trim()}
                        icon={<IconWeb className="w-6 h-6" />}
                      />
                    );
                  })}
                </>
              )}
            </div>
            <h3 className="text-2xl text-bold">{"الأوفلاين"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactContainer
                url={phone}
                type="phone"
                icon={<IconCall className="w-6 h-6" />}
              />
              <ContactContainer
                url={address}
                icon={<IconLocation className="w-6 h-6" />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
