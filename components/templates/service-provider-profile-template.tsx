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
import { ShareDialog } from "../organisms/share-profile-dialog";

// Helpers
const sanitizePhone = (raw?: string | null): string | null => {
  if (!raw) return null;
  const trimmed = String(raw).trim();
  // Keep leading + and digits only
  const cleaned = trimmed.replace(/[^\d+]/g, "");
  if (!cleaned || cleaned === "+") return null;
  return cleaned;
};
interface Props {
  serviceProvider: ServiceProviderVM;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any; // Allow additional props if needed
}

const UserAvatar = ({ serviceProvider }: Props): React.ReactNode => {
  const firstName = serviceProvider.users?.first_name || "";
  const logoUrl = serviceProvider.logo_image
    ? `${SupabasePaths.SERVICE_PROVIDERS}/${serviceProvider.logo_image}`
    : undefined;
  const userAvatarUrl = serviceProvider.users?.avatar
    ? `${SupabasePaths.USERS}/${serviceProvider.users?.avatar}`
    : undefined;
  const avatarUrl = logoUrl || userAvatarUrl || undefined;

  return (
    <Avatar className="w-28 h-28 text-6xl bg-gray-200 border-4 border-primary">
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt={serviceProvider.service_name ?? firstName} className="object-cover" />
      ) : null}
      <AvatarFallback>{(serviceProvider.service_name?.charAt(0) || firstName.charAt(0) || "").toUpperCase()}</AvatarFallback>
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
  let href: string | null = url;
  if (type === "email") {
    href = url ? `mailto:${url}` : null;
  } else if (type === "phone") {
    const tel = sanitizePhone(url);
    href = tel ? `tel:${tel}` : null;
  } else if (type === "url") {
    if (!url) href = null;
    else href = url.startsWith("http") ? url : `https://${url}`;
  }
  if (!href) return null;
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
  const { instagram_url, facebook_url, whatsapp_url, official_url } =
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
  const categoryNameServiceName = category || serviceName || "غير محدد";
  const status = serviceProvider.status;
  const StatusBadge = () => {
    switch (status) {
      case service_provider_status.rejected:
        return (
          <Badge variant="destructive" className="text-sm md:text-base px-3 py-1.5">
            <ClockFading />
            {"مرفوض"}
          </Badge>
        );
      case service_provider_status.approved:
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 text-sm md:text-base px-3 py-1.5"
          >
            <BadgeCheckIcon />
            {"مفعل"}
          </Badge>
        );
      case service_provider_status.pending:
      default:
        return (
          <Badge variant="secondary" className="text-sm md:text-base px-3 py-1.5">
            <ClockFading />
            {"قيد المراجعة"}
          </Badge>
        );
    }
  };
  const titleText = serviceName || fullName;
  return (
    <div className="text-start pt-10 md:pt-12 space-y-2">
      <h2 className="text-3xl font-extrabold flex items-center gap-3">
        <span style={serviceName ? { color: "oklch(0.63 0.08 1.88)" } : undefined}>
          {titleText}
        </span>
        <span>
          <StatusBadge />
        </span>
      </h2>
      {fullName && (
        <p className="text-sm text-gray-600">{fullName}</p>
      )}
      <p className="text-sm text-gray-500">{categoryNameServiceName}</p>
      <div className="flex flex-col gap-2">
        <UserSocialMediaButtons serviceProvider={serviceProvider} />
      </div>
    </div>
  );
};

const ContactContainer = ({
  url,
  type = "url",
  icon,
  label,
}: {
  url?: string | null;
  type?: "email" | "phone" | "url";
  icon: React.ReactNode;
  label: string;
}) => {
  let href: string | null = null;
  let displayValue: string = url ?? "";
  if (type === "email") {
    if (url && url.trim()) href = `mailto:${url.trim()}`;
  } else if (type === "phone") {
    const tel = sanitizePhone(url ?? undefined);
    if (tel) {
      href = `tel:${tel}`;
      displayValue = url ?? tel;
    }
  } else if (type === "url") {
    if (url && url.trim()) href = url.startsWith("http") ? url : `https://${url.trim()}`;
  }

  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="flex gap-3 w-full p-4 border border-gray-300 rounded-2xl items-center justify-start bg-white">
      <span className="shrink-0 text-primary">{icon}</span>
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{label}</span>
        {href ? (
          <a className="text-primary hover:underline break-all" href={href} target="_blank" rel="noopener noreferrer">
            {displayValue}
          </a>
        ) : (
          <span className="text-gray-400">غير متوفر</span>
        )}
      </div>
      {children}
    </div>
  );

  return <Container>{null}</Container>;
};

export default function ServiceProviderProfileTemplate({
  serviceProvider,
  children,
  className,
  ...props
}: Props) {
  const otherUrls = serviceProvider.other_urls?.split(",") || [];
  // Pick primary contact: prefer phone, then WhatsApp, then official site
  const primaryTel = sanitizePhone(serviceProvider.phone ?? undefined);
  const primaryContactHref = primaryTel
    ? `tel:${primaryTel}`
    : serviceProvider.whatsapp_url
      ? (serviceProvider.whatsapp_url.startsWith("http")
        ? serviceProvider.whatsapp_url
        : `https://${serviceProvider.whatsapp_url}`)
      : serviceProvider.official_url
        ? (serviceProvider.official_url.startsWith("http")
          ? serviceProvider.official_url
          : `https://${serviceProvider.official_url}`)
        : undefined;
  return (
    <div
      className={`service-provider-template ${className} container mx-auto relative mt-5 mb-10`}
      {...props}
    >
      {/* Cover banner */}
      <div className="relative w-full h-40 md:h-56">
        <Image
          src={"/cover.png"}
          alt={""}
          fill
          className="rounded-lg object-cover pointer-events-none"
        />
      </div>
      {/* Profile header row - slightly overlaps the banner but not the tabs */}
      <div className="relative z-10 -mt-10 md:-mt-12 px-5 flex items-center gap-5">
        <UserAvatar serviceProvider={serviceProvider} />
        <div className="flex justify-between flex-wrap w-full">
          <UserNameAndCategory serviceProvider={serviceProvider} />
          <div className="pt-8 pe-2 flex items-center gap-2">
            {primaryContactHref ? (
              <AppButton asChild className="bg-primary text-white hover:bg-primary/90">
                <a href={primaryContactHref} target="_blank" rel="noopener noreferrer">
                  {"تواصلي معي"}
                </a>
              </AppButton>
            ) : null}
            <ShareDialog slug={serviceProvider.slug || serviceProvider.id} />
          </div>
        </div>
      </div>
      {/* Spacer to ensure tabs are not overlaid by header */}
      <div className="mt-6" />
      <Tabs
        defaultValue="bio"
        className="mx-auto container max-w-full space-y-5 max-sm:pt-5"
      >
        <TabsList dir="rtl" className="mx-auto relative z-0">
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
                label="فيسبوك"
                icon={<IconFacebook className="w-6 h-6" />}
              />
              <ContactContainer
                url={serviceProvider.instagram_url}
                label="انستغرام"
                icon={<IconInstagram className="w-6 h-6" />}
              />
              <ContactContainer
                url={serviceProvider.official_url}
                label="الموقع الرسمي"
                icon={<IconWeb className="w-6 h-6" />}
              />
              <ContactContainer
                url={serviceProvider.whatsapp_url}
                label="واتساب"
                icon={<IconWhatsapp className="w-6 h-6" />}
              />
              {otherUrls && otherUrls.length > 0 && (
                <>
                  {otherUrls.map((url, index) => {
                    return (
                      <ContactContainer
                        key={index}
                        url={url.trim()}
                        label="رابط آخر"
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
                label="رقم الهاتف"
                icon={<IconCall className="w-6 h-6" />}
              />
              <ContactContainer
                url={serviceProvider.address}
                label="العنوان"
                icon={<IconLocation className="w-6 h-6" />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
