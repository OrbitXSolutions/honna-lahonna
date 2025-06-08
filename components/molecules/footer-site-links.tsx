import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";
import AppButton from "../atoms/app-button";
import { IconArrow } from "../icons";
import AppLink from "../atoms/app-link";

interface Props {
  className?: string;
  [key: string]: any;
}

export default function FooterSiteLinks({ className, ...props }: Props) {
  return (
    <div
      className={`flex flex-col ${className} gap-3 max-md:text-center max-md:items-center max-md:justify-center`}
      {...props}
    >
      <h2 className="text-lg font-semibold">{"روابط الموقع"}</h2>
      <ul className=" text-gray-500 max-lg:list-disc flex flex-wrap gap-x-8 lg:flex-col gap-y-3 max-md:justify-center">
        {[
          { title: "الرئيسية", href: ROUTES.HOME },
          { title: "خدماتنا", href: ROUTES.SERVICES },
          { title: "شركاء النجاح", href: ROUTES.PARTNERS },
          { title: "أراء العملاء", href: ROUTES.TESTIMONIALS },
          { title: "تواصل معنا", href: ROUTES.CONTACT },
        ].map((item) => (
          <li key={item.href} className="">
            <AppLink href={item.href} className="hover:underline">
              {item.title}
            </AppLink>
          </li>
        ))}
      </ul>
      <div>
        <AppButton asChild>
          <AppLink href={ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM}>
            {"سجلي الأن كمقدمة خدمة"}
            <IconArrow />
          </AppLink>
        </AppButton>
      </div>
    </div>
  );
}
