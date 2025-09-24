import HomeContact from "@/components/organisms/home-contact";
import HomePromotions from "@/components/organisms/home-promotions";
import HomeTutorials from "@/components/organisms/home-tutorials";

export default function AboutPage() {
    return (
        <>
            {/* <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-3xl font-bold mb-4">من نحن</h1>
                <p className="text-lg text-center max-w-2xl">
                    نحن شركة رائدة في تقديم الحلول التقنية المبتكرة. نسعى لتقديم أفضل الخدمات لعملائنا من خلال فريق عمل محترف ومؤهل.
                </p>
            </div> */}

            <HomePromotions />
            <HomeTutorials />
            <HomeContact />
        </>
    );
}

