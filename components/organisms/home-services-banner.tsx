import { Marquee } from "../magicui/marquee";
// import Marquee from "react-fast-marquee";
import type { service_categories } from "@/lib/generated/prisma";
import { getServiceCategories } from "@/lib/data/service-categories";
import Image from "next/image";
import { SupabasePaths } from "@/lib/constants/supabase";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

const ServiceCard = ({ name, icon, slug }: service_categories) => {
  return (
    <Link
      href={`${ROUTES.SERVICES}?category=${slug}`}
      className={"flex gap-2 hover:bg-accent/40 rounded-full items-center"}
    >
      {icon && (
        <Image
          src={`${SupabasePaths.SERVICE_CATEGORIES}/${icon}`}
          alt={name}
          width={20}
          height={20}
          className="rounded-full white-image "
        />
      )}
      <p>{name}</p>
    </Link>
  );
};

export function MarqueeDemo({
  serviceCategories,
}: {
  serviceCategories: service_categories[];
}) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:5s] " repeat={20}>
        {serviceCategories.map((review, i) => (
          <ServiceCard key={i} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
export default async function HomeServicesBanner() {
  const serviceCategory = await getServiceCategories();
  if (!serviceCategory || serviceCategory.length === 0) {
    return <></>;
  }
  return (
    <section className="services-banner  bg-primary text-white">
      <MarqueeDemo serviceCategories={serviceCategory} />
    </section>
  );
}
