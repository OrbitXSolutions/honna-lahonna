import GridBackground from "../molecules/grid-background";
import HeaderHeroContent from "../molecules/header-hero-content";
import HeaderHeroImage from "../molecules/header-hero-image";

export default function HomeHeroSection() {
  return (
    <section className="hero relative overflow-clip">
      <GridBackground color="text-background">
        <div className="container mx-auto pt-8 px-5 flex flex-col lg:flex-row gap-3 md:gap-10">
          <HeaderHeroContent />
          <HeaderHeroImage />
        </div>
      </GridBackground>
    </section>
  );
}
