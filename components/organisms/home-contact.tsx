import { HTMLProps } from "react";
import GridBackground from "../molecules/grid-background";
import Image from "next/image";
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

export default function HomeContact() {
  return (
    <section className="contactrelative">
      <GridBackground color="text-background" className="space-y-10">
        <ContactImage />
      </GridBackground>
    </section>
  );
}
