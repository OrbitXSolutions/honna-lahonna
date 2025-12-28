import HomeContact from "../organisms/home-contact";
import HomeFaqs from "../organisms/home-faqs";
import HomeHeroSection from "../organisms/home-hero-section";
import HomeMiniPromotions from "../organisms/home-mini-promotions";
import HomePromotions from "../organisms/home-promotions";
import HomeServicesBanner from "../organisms/home-services-banner";
import HomeTestimonials from "../organisms/home-testimonials";
import HomeTopServiceProviders from "../organisms/home-top-service-providers";
import HomeTutorials from "../organisms/home-tutorials";
import AuthLogger from "../atoms/auth-logger";

export default function HomeTemplate() {
    return (
        <>
            <AuthLogger />
            <HomeHeroSection />
            <HomeServicesBanner />
            <HomePromotions />
            <HomeTutorials />
            <HomeTopServiceProviders />
            <HomeTestimonials />
            <HomeMiniPromotions />
            <HomeFaqs />
            <HomeContact /></>

    );
}