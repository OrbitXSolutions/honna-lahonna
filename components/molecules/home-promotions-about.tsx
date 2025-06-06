import Image from "next/image";
import AppButton from "../atoms/app-button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { IconArrow, IconKnowMore } from "../icons";

const HomeAboutImage = ({ className, ...params }: React.HTMLProps<any>) => {
  return (
    <div className={`relative lg:mt-0 ${className ?? ""}`} {...params}>
      <div className="relative ">
        <Image
          src={"/lahuna.svg"}
          alt="lahuna"
          width={150}
          height={150}
          className="absolute -top-10 md:top-0 lg:-top-8 md:right-10 right-0 lg:-right-15"
          style={{ zIndex: 0 }}
        />
        <Image
          src={"/huna.svg"}
          alt="huna"
          width={150}
          height={150}
          className="absolute -bottom-10 left-0 md:left-10 lg:-bottom-20  lg:-left-1/5"
          style={{ zIndex: 0 }}
        />
        <Image
          src="/home/about.png"
          alt="Hero Woman about section"
          width={550}
          height={550}
          className="rounded-lg mx-auto relative h-full object-contain w-full "
        />
      </div>
    </div>
  );
};

const HomePromotionsContent = (params: React.DOMAttributes<any>) => {
  return (
    <div className="flex flex-col gap-5 max-md:text-center md:max-w-200 lg:gap-10 justify-center">
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
      <div className="flex max-md:flex-col max-md:justify-center gap-3">
        <AppButton asChild>
          <Link href={ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM}>
            <span>{"سجلي الأن كمقدمة خدمة"}</span>
            <IconArrow />
          </Link>
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
};

export default function HomePromotionsAbout() {
  return (
    <div className="flex max-sm:flex-col">
      <HomeAboutImage className="max-sm:w-60 max-sm:mx-auto" />
      <HomePromotionsContent />
    </div>
  );
}
