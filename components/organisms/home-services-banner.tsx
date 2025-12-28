import { Marquee } from "../magicui/marquee";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { getAllCategories } from "@/lib/api/categories";
import { getCategoryIconUrl, type CategoryDto } from "@/lib/api/types";

const ServiceCard = ({ name, icon, slug }: CategoryDto) => {
  const iconUrl = getCategoryIconUrl(icon);
  return (
    <Link
      href={{
        pathname: ROUTES.SERVICES,
        query: { category: slug },
      }}
      className={"flex gap-2 hover:bg-accent/40 rounded-full items-center"}
    >
      {iconUrl && (
        <Image
          src={iconUrl}
          alt={name}
          unoptimized
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
  serviceCategories: CategoryDto[];
}) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s] " repeat={20}>
        {serviceCategories.map((review, i) => (
          <ServiceCard key={i} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
export default async function HomeServicesBanner() {
  const serviceCategories = await getAllCategories();
  if (!serviceCategories || serviceCategories.length === 0) {
    return <></>;
  }
  return (
    <section className="services-banner  bg-primary text-white">
      <MarqueeDemo serviceCategories={serviceCategories} />
    </section>
  );
}
