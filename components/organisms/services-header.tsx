import React from "react";
import GridBackground from "../molecules/grid-background";
import Image from "next/image";

export default function ServicesHeader({
  children,
  ...props
}: React.PropsWithChildren<any>) {
  return (
    <section {...props} className="services-header relative overflow-hidden">
      <GridBackground color="text-background relative">
        <Image
          src={"/lahuna.svg"}
          alt="lahuna"
          width={200}
          height={200}
          className="absolute top-0 left-0 -translate-x-1/2 translate-y-1/5"
          style={{ zIndex: 0 }}
        />
        <Image
          src={"/huna.svg"}
          alt="huna"
          width={200}
          height={200}
          className="absolute top-0 right-0 translate-x-1/2 translate-y-1/5"
          style={{ zIndex: 0 }}
        />
        <div className="container mx-auto space-y-10 py-10 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            <span>{"معك لتزدهري في رحلة"}</span>&nbsp;
            <span className="text-primary">{"حياتك"}</span>&nbsp;
            <span>{"الخاصة"}</span>
          </h2>
          {children}
        </div>
      </GridBackground>
    </section>
  );
}
