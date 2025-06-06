"use server";
import { PrismaClient, type Prisma } from "@/lib/generated/prisma";
import { unstable_cache } from "next/cache";
import { CacheTags } from "../constants/cache-tags";

// Cursor-based pagination parameters
interface CursorPaginationParams {
  cursor?: string; // ID of the last item from previous page
  take?: number; // Number of items to fetch
  direction?: "forward" | "backward";
}

// Cursor pagination result
interface CursorPaginatedResult<T> {
  data: T[];
  pagination: {
    nextCursor?: string;
    prevCursor?: string;
    hasMore: boolean;
    take: number;
  };
}

// Type for service providers with includes
type ServiceProviderWithCategories = Prisma.service_providersGetPayload<{
  include: {
    service_categories: true;
  };
}>;

export const getServiceProvidersCursor = unstable_cache(
  async (
    params: CursorPaginationParams = {}
  ): Promise<CursorPaginatedResult<ServiceProviderWithCategories>> => {
    const prisma = new PrismaClient();

    const take = params.take || 10;
    const direction = params.direction || "forward";

    // Build the query options
    const queryOptions: Prisma.service_providersFindManyArgs = {
      take: direction === "forward" ? take + 1 : -(take + 1), // +1 to check if there are more items
      include: {
        service_categories: true,
      },
      orderBy: {
        id: "asc", // Consistent ordering by ID for cursor pagination
      },
    };

    // Add cursor if provided
    if (params.cursor) {
      queryOptions.cursor = {
        id: params.cursor,
      };
      queryOptions.skip = 1; // Skip the cursor item itself
    }

    const serviceProviders = await prisma.service_providers.findMany(
      queryOptions
    );

    // Check if there are more items
    const hasMore = Math.abs(serviceProviders.length) > take;

    // Remove the extra item used for hasMore check
    const data =
      direction === "forward"
        ? serviceProviders.slice(0, take)
        : serviceProviders.slice(1);

    // Get cursors for next/prev navigation
    const nextCursor =
      hasMore && data.length > 0 ? data[data.length - 1].id : undefined;

    const prevCursor = data.length > 0 ? data[0].id : undefined;

    return {
      data,
      pagination: {
        nextCursor,
        prevCursor,
        hasMore,
        take,
      },
    };
  },
  [CacheTags.SERVICE_PROVIDERS],
  { revalidate: 60 * 60 }
);

// Helper function for getting first page
export const getServiceProvidersFirstPage = (take: number = 10) => {
  return getServiceProvidersCursor({ take });
};

// Helper function for getting next page
export const getServiceProvidersNextPage = (
  cursor: string,
  take: number = 10
) => {
  return getServiceProvidersCursor({ cursor, take, direction: "forward" });
};

// Helper function for getting previous page
export const getServiceProvidersPrevPage = (
  cursor: string,
  take: number = 10
) => {
  return getServiceProvidersCursor({ cursor, take, direction: "backward" });
};
