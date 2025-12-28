import { getServiceProviders } from "@/lib/api/service-providers";
import { mapProviderWithImageUrls } from "@/lib/api/service-providers";
import { getCategoryBySlug } from "@/lib/api/categories";
import { getGovernorateByCode } from "@/lib/api/governorates";
import ProviderCard from "../molecules/provider-card";
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
  // Resolve category and governorate IDs from slugs/codes if provided
  let categoryId: number | undefined;
  let governorateId: number | undefined;

  try {
    if (categorySlug) {
      const catResponse = await getCategoryBySlug(categorySlug);
      if (catResponse.success && catResponse.data) {
        categoryId = catResponse.data.id;
      }
    }

    if (governorateCode) {
      const govResponse = await getGovernorateByCode(governorateCode);
      if (govResponse.success && govResponse.data) {
        governorateId = govResponse.data.id;
      }
    }
  } catch (error) {
    console.error("Error resolving category/governorate:", error);
  }

  // Fetch service providers with proper filtering
  const response = await getServiceProviders({
    search: query,
    categoryId,
    governorateId,
    pageNumber: page ?? 1,
    pageSize: 12,
    sortBy: "CreatedDate",
    sortDescending: true,
  });

  const providers = response.data?.items ?? [];
  const pagination = {
    total: response.data?.totalCount ?? 0,
    totalPages: response.data?.totalPages ?? 0,
  };

  const queryParams = new URLSearchParams(
    JSON.parse(
      JSON.stringify({
        query: query,
        category: categorySlug,
        governorate: governorateCode,
      })
    )
  ).toString();
  return (
    <>
      {(pagination.total === 0 || providers.length === 0) && (
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
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            providerData={mapProviderWithImageUrls(provider) as any}
          />
        ))}
      </div>

      {/* pagination using next's Link element */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <AppLink
            key={index}
            href={`?page=${index + 1}${queryParams ? `&${queryParams}` : ""}`}
            className={`px-4 py-2 mx-1 rounded-lg ${index + 1 === page
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
