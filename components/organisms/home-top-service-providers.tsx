import React from "react";
import AppButton from "../atoms/app-button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { IconArrow } from "../icons";
import GridBackground from "../molecules/grid-background";
import HomeServiceProviders from "../molecules/home-service-providers";
import AppLink from "../atoms/app-link";

export default function HomeTopServiceProviders() {
  return (
    <section className="top-service-providers relative">
      <GridBackground color="text-background">
        <div className="container mx-auto px-3 max-md:text-center">
          <p>
            <span>{"ــــــــــــــ"}</span>&nbsp;
            <span>{"خدماتنا"}</span>
          </p>
          <div className="flex flex-wrap justify-between gap-3 space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span>{"نقدم لكي خدمات متنوعة ومميزة"}</span>&nbsp;
              <span className="text-primary">{"متنوعة"}</span>&nbsp;
              <span>{"ومميزة"}</span>
            </h2>
            <AppButton asChild variant={"outline"} className="max-md:m-auto">
              <AppLink href={ROUTES.SERVICES}>
                {"عرض جميع الخدمات"}
                <IconArrow />
              </AppLink>
            </AppButton>
          </div>
          <HomeServiceProviders />
        </div>
      </GridBackground>
    </section>
  );
}
