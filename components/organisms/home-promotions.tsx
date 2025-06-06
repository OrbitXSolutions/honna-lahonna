import React from "react";
import HomePromotionsAbout from "../molecules/home-promotions-about";
import HomePromotionsVision from "../molecules/home-promotions-vision";

export default function HomePromotions() {
  return (
    <section className="promotions">
      <HomePromotionsAbout />
      <HomePromotionsVision />
      <h2 className="text-3xl font-semibold">Current Promotions</h2>
      <p className="text-md mt-2">Don't miss out on our latest deals!</p>
    </section>
  );
}
