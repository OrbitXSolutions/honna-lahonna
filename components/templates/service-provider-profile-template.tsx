import { ServiceProviderVM } from "@/lib/data/models/vm/service-provider";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SupabasePaths } from "@/lib/constants/supabase";
import React from "react";
import AppButton from "../atoms/app-button";
import {
  IconBio,
  IconCall,
  IconCategories,
  IconContact,
  IconFacebook,
  IconInstagram,
  IconLocation,
  IconMedalStar,
  IconVerified,
  IconWeb,
  IconWhatsapp,
} from "../icons";
import { url } from "inspector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProfileBio from "../organisms/profile-bio";
import { service_provider_status } from "@/lib/generated/prisma";
import { Badge } from "../ui/badge";
import { BadgeCheckIcon, ClockFading } from "lucide-react";
interface Props {
  serviceProvider: ServiceProviderVM;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any; // Allow additional props if needed
}

const UserAvatar = ({ serviceProvider }: Props): React.ReactNode => {
  const firstName = serviceProvider.users?.first_name || "";
  const avatarUrl = SupabasePaths.USERS + "/" + serviceProvider.users?.avatar;

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
  serviceProvider: ServiceProviderVM;
}) => {
  const { instagram_url, facebook_url, whatsapp_url, official_url, phone } =
    serviceProvider;
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
      {/* {other_urls && other_urls.length > 0 && (
        <div className="flex gap-2">
          {other_urls?.split(",")?.map((url, i) => (
            <SocialButton
              key={i}
              url={url.trim()}
              icon={<IconWeb className="w-6 h-6" />}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};

const UserNameAndCategory = ({
  serviceProvider,
}: {
  serviceProvider: ServiceProviderVM;
}) => {
  const firstName = serviceProvider.users?.first_name || "";
  const lastName = serviceProvider.users?.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const category = serviceProvider.service_categories?.name;
  const serviceName = serviceProvider.service_name;
  let categoryNameServiceName;
  if (category && serviceName) {
    categoryNameServiceName = `${category} - ${serviceName}`;
  } else {
    categoryNameServiceName = category || serviceName || "غير محدد";
  }
  const status = serviceProvider.status;
  const StatusBadge = () => {
    switch (status) {
      case service_provider_status.rejected:
        return (
          <Badge variant="destructive">
            <ClockFading />
            {"مرفوض"}
          </Badge>
        );
      case service_provider_status.approved:
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            <BadgeCheckIcon />
            {"مفعل"}
          </Badge>
        );
      case service_provider_status.pending:
      default:
        return (
          <Badge variant="secondary">
            <ClockFading />
            {"قيد المراجعة"}
          </Badge>
        );
    }
  };
  return (
    <div className="text-start pt-7 space-y-2">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span>{fullName}</span>
        <span>
          <StatusBadge />
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

export default function ServiceProviderProfileTemplate({
  serviceProvider,
  children,
  className,
  ...props
}: Props) {
  const otherUrls = serviceProvider.other_urls?.split(",") || [];
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
          <ProfileBio serviceProvider={serviceProvider} />
        </TabsContent>
        <TabsContent value={"contact"}>
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl text-bold">{"الأونلاين"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactContainer
                url={serviceProvider.facebook_url}
                icon={<IconFacebook className="w-6 h-6" />}
              />
              <ContactContainer
                url={serviceProvider.instagram_url}
                icon={<IconInstagram className="w-6 h-6" />}
              />
              <ContactContainer
                url={serviceProvider.official_url}
                icon={<IconWeb className="w-6 h-6" />}
              />
              <ContactContainer
                url={serviceProvider.whatsapp_url}
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
                url={serviceProvider.phone}
                type="phone"
                icon={<IconCall className="w-6 h-6" />}
              />
              <ContactContainer
                url={serviceProvider.address}
                icon={<IconLocation className="w-6 h-6" />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
