import { HTMLProps } from "react";
import GridBackground from "../molecules/grid-background";
import Image from "next/image";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import AppButton from "../atoms/app-button";
import { IconArrow } from "../icons";
const ContactImage = ({ className, ...params }: HTMLProps<any>) => {
  return (
    <div
      className={`relative lg:mt-0 ${className ?? ""} max-md:hidden`}
      {...params}
    >
      <div className="relative ">
        <Image
          src={"/lahuna.svg"}
          alt="lahuna"
          width={150}
          height={150}
          className="absolute -top-10 md:top-0 lg:top-25 md:right-10 right-0 lg:right-18 lg:scale-140"
          style={{ zIndex: 0 }}
        />
        <Image
          src={"/huna.svg"}
          alt="huna"
          width={150}
          height={150}
          className="absolute -bottom-10 left-0 md:left-10 lg:bottom-0  lg:left-18 lg:scale-140"
          style={{ zIndex: 0 }}
        />
        <Image
          src="/home/contact-us.png"
          alt="Hero Woman about section"
          width={550}
          height={550}
          className="rounded-lg mx-auto  relative h-full object-contain w-full "
        />
      </div>
    </div>
  );
};

const ContactForm = () => {
  return (
    <div className="mx-auto space-y-6">
      <div className="text-center space-y-4">
        <p>
          <span className="font-medium">{"ــــــــــــــ"}</span>&nbsp;
          <span className="font-medium">{"تواصل معنا"}</span>
        </p>

        <h2 className="text-3xl md:text-4xl font-bold">
          <span>{"نرحب بتواصلك"}</span>
        </h2>
      </div>
      <form className="space-y-4 w-full">
        <Input type="text" placeholder="الاسم" className="w-full bg-white" />
        <Input
          type="email"
          placeholder="البريد الإلكتروني"
          className="w-full bg-white"
        />
        <Input
          type="tel"
          placeholder="رقم الهاتف"
          className="w-full bg-white"
        />
        <Textarea
          placeholder="اكتبي رسالتك هنا ..."
          className="w-full bg-white min-h-32"
        />
        <AppButton type="submit" className="text-center w-full">
          {"إرسال"}

          <IconArrow />
        </AppButton>
      </form>
    </div>
  );
};

export default function HomeContact() {
  return (
    <section className="contactrelative">
      <GridBackground color="text-background" className="">
        <div className="container flex mx-auto gap-20">
          <ContactImage />
          <ContactForm />
        </div>
      </GridBackground>
    </section>
  );
}
