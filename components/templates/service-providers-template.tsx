import { NextPageParams } from "@/lib/utils/next-page-types";
import ServicesHeader from "../organisms/services-header";
import { ServicesFilter } from "../organisms/services-filter.component";
import { PaginatedServices } from "../organisms/paginated-services";
import HomeFaqs from "../organisms/home-faqs";
import HomeContact from "../organisms/home-contact";

export default async function ServiceProvidersTemplate({
  searchParams,
}: NextPageParams) {
  const {
    category: categorySlug,
    governorate: governorateCode,
    query: queryString,
    page: page,
  } = await searchParams;
  return (
    <div className="flex flex-col gap-5">
      <ServicesHeader>
        <ServicesFilter
          categorySlug={categorySlug as string | undefined}
          governorateCode={governorateCode as string | undefined}
          queryString={queryString as string | undefined}
        />
      </ServicesHeader>
      <PaginatedServices
        query={queryString as string | undefined}
        governorateCode={governorateCode as string | undefined}
        categorySlug={categorySlug as string | undefined}
        page={page ? parseInt(page as string, 10) : 1}
      />
      <HomeFaqs />
      <HomeContact />
    </div>
  );
}
