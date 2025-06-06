import React from "react";
import GridBackground from "../molecules/grid-background";
import AppButton from "../atoms/app-button";
import Link from "next/link";
import { IconArrow } from "../icons";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";

export default function HomeMiniPromotions() {
  return (
    <section className="mini-promotions relative overflow-hidden">
      <GridBackground color="text-accent" className="p-5">
        <div className="container mx-auto text-center space-y-10 ">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span>{"مراحل بسيطة وسهلة لكي تكون"}</span>&nbsp;
            <span className="text-primary">{"معنا"}</span>
          </h2>
          <AppButton asChild>
            <Link href={ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM}>
              {"سجلي الأن كمقدمة خدمة"}
              <IconArrow />
            </Link>
          </AppButton>
          <Image
            src={"/huna.svg"}
            alt="huna"
            width={150}
            height={150}
            className="absolute right-0 top-6 translate-x-1/2"
            style={{ zIndex: 0 }}
          />
          <Image
            src={"/lahuna.svg"}
            alt="lahuna"
            width={150}
            height={150}
            className="absolute left-0 top-6 -translate-x-1/2"
            style={{ zIndex: 0 }}
          />
        </div>
      </GridBackground>
    </section>
  );
}
