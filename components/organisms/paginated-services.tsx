import { getServiceProvidersPaginated } from "@/lib/data/prisma/service-providers";
import ProviderCard from "../molecules/provider-card";
import { ServiceProviderVM } from "@/lib/data/models/vm/service-provider";
import AppLink from "../atoms/app-link";
import { Inbox } from "lucide-react";

interface Props {
  query?: string;
  categorySlug?: string;
  governorateCode?: string;
  page: number;
  [key: string]: any;
}

export async function PaginatedServices({
  query,
  categorySlug,
  governorateCode,
  page,
  ...props
}: Props) {
  const providers = await getServiceProvidersPaginated({
    category_code: categorySlug,
    governorate_code: governorateCode,
    search: query,
    page: page ?? 1,
  });

  const queryParams = new URLSearchParams(
    JSON.parse(
      JSON.stringify({
        query: query,
        categorySlug: categorySlug,
        governorateCode: governorateCode,
      })
    )
  ).toString();
  return (
    <>
      {(providers.pagination.total === 0 ||
        (providers.data?.length ?? 0) == 0) && (
        <>
          <div className="flex flex-col items-center justify-center text-center py-10 container mx-auto">
            <Inbox className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              لا توجد خدمات متاحة
            </h2>
            <p className="text-gray-500">
              حاول تعديل معايير البحث الخاصة بك أو تحقق مرة أخرى لاحقًا.
            </p>
          </div>
        </>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto">
        {providers.data.map((provider) => (
          <ProviderCard
            key={provider.id}
            providerData={provider as unknown as ServiceProviderVM}
          /> // Spread operator to pass additional props if needed
        ))}
      </div>

      {/* pagination using next's Link element */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: providers.pagination.totalPages }, (_, index) => (
          <AppLink
            key={index}
            href={`?page=${index + 1}${queryParams ? `&${queryParams}` : ""}`}
            className={`px-4 py-2 mx-1 rounded-lg ${
              index + 1 === page
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </AppLink>
        ))}
      </div>
    </>
  );
}
