import React from "react";
import HomePromotionsAbout from "../molecules/home-promotions-about";
import HomePromotionsVision from "../molecules/home-promotions-vision";
import GridBackground from "../molecules/grid-background";

export default function HomePromotions() {
  return (
    <section className="promotions relative">
      <GridBackground color="text-background" className="space-y-10">
        <HomePromotionsAbout />
        <HomePromotionsVision />
      </GridBackground>
    </section>
  );
}
