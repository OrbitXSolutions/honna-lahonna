import Link from "next/link";
import AppButton from "../atoms/app-button";
import { ROUTES } from "@/lib/constants/routes";
import { IconArrow, IconKnowMore } from "../icons";
import AppLink from "../atoms/app-link";

export default function HeaderHeroContent() {
  return (
    <div className="flex flex-col gap-5 max-lg:text-center md:max-w-200 lg:gap-10 justify-center">
      <p className="font-medium">
        <span>{"مرحباً بكم في"}</span>&nbsp;
        <span className="text-primary">{"هن لهن!"}</span>
        <span>{"👋"}</span>
      </p>
      <h2 className="text-3xl md:text-4xl font-bold">
        <span>{"معك لتزدهري في رحلة"}</span>&nbsp;
        <span className="text-primary">{"حياتك"}</span>
        <span>
          <br />
          {"الخاصة"}
        </span>
      </h2>
      <p>
        {
          "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم، كما تستحقين بالإضافة إلي تقديم خدمات استشارية مخصصة لكي …"
        }
      </p>
      <div className="flex max-lg:justify-center gap-3">
        <AppButton asChild>
          <AppLink href={ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM}>
            <span>{"سجلي الأن كمقدمة خدمة"}</span>
            <IconArrow />
          </AppLink>
        </AppButton>
        <AppButton asChild variant={"outline"}>
          <Link href={ROUTES.FAQ}>
            <span>{"إعرفي المزيد"}</span>
            <IconKnowMore />
          </Link>
        </AppButton>
      </div>
    </div>
  );
}
