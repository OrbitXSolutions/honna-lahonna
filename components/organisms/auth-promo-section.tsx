import Image from "next/image";
import { IconMembers, IconNote } from "../icons";
import { Separator } from "@radix-ui/react-separator";

interface AuthPromoSectionProps {
  className?: string;
}

const AuthHeroImage = () => (
  <>
    <div className="relative mt-10 lg:mt-0">
      <div className="relative">
        <Image
          src={"/lahuna.svg"}
          alt="lahuna"
          width={300}
          height={300}
          className="absolute -top-10 md:top-0 lg:-top-8 md:right-20 right-0 lg:-right-15"
          style={{ zIndex: 0 }}
        />
        <Image
          src={"/huna.svg"}
          alt="huna"
          width={300}
          height={300}
          className="absolute -bottom-17 left-0 md:left-20 lg:-bottom-20  lg:-left-1/5"
          style={{ zIndex: 0 }}
        />
        <Image
          src="/auth.png"
          alt="Women supporting each other"
          width={500}
          height={500}
          //   style={{ zIndex: 1 }}
          className="relative"
          priority
        />
      </div>
      <div className="absolute top-1/4 right-0 lg:-right-10  text-primary-dark bg-white p-3 rounded-lg shadow-lg flex min-h-18 ">
        <div className="flex items-center space-x-2">
          <IconMembers />
          <Separator
            orientation="vertical"
            className="bg-primary h-full"
            style={{ width: 0.1 }}
          />
          <div className="flex flex-col items-start">
            <p className="font-bold text-2xl text-brand-text-dark">20k</p>
            <p className="text-xs text-brand-text-light font-medium">
              عضو في المنصة
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-0 lg:-left-10 text-primary-dark bg-white p-3 rounded-lg shadow-lg flex min-h-18">
        <div className="flex items-center space-x-2">
          <IconNote />
          <Separator
            orientation="vertical"
            className="bg-primary h-full"
            style={{ width: 0.1 }}
          />
          <div className="flex flex-col items-start">
            <p className="font-bold text-2xl  text-brand-text-dark">60+</p>
            <p className="text-xs text-brand-text-light font-medium">
              إستشارة متاحة
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export function AuthPromoSection({ className = "" }: AuthPromoSectionProps) {
  return (
    <div className={`bg-background relative overflow-hidden ${className}`}>
      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
        {/* Header text */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span>{"معك لتزدهري في رحلة"}</span>&nbsp;
            <span className="text-primary">{"حياتك"}</span>&nbsp;
            <span>{"الخاصة"}</span>
          </h2>
          <p>
            {
              "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم، كما تستحقين بالإضافة إلي تقديم خدمات استشارية مخصصة لكي …"
            }
          </p>
        </div>

        {/* Main image */}
        <div className="relative mb-8">
          <AuthHeroImage />
        </div>
      </div>
    </div>
  );
}
