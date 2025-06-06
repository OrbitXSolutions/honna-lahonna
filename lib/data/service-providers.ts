"use server";
import {
  PrismaClient,
  type service_providers,
  type Prisma,
  service_categories,
} from "@/lib/generated/prisma";
import { unstable_cache } from "next/cache";
import { CacheTags } from "../constants/cache-tags";
import { PaginationParams } from "./models/pagination-request";
import { PaginatedResult } from "./models/pagination-response";
import { ServiceProviderQuery } from "./models/queries/service-provider-query";
import { ServiceProviderVM } from "./models/vm/service-provider";

export const getServiceProviders = unstable_cache(
  async (): Promise<service_providers[]> => {
    const prisma = new PrismaClient();
    const serviceProviders = await prisma.service_providers.findMany({
      include: {
        service_categories: true,
        governorates: true,
        users: true,
      },
    });
    return serviceProviders;
  },
  [CacheTags.SERVICE_PROVIDERS],
  { revalidate: 60 * 60 }
);

// New paginated version with advanced filtering, sorting, and search
export const getServiceProvidersPaginated = unstable_cache(
  async (
    params: ServiceProviderQuery = {}
  ): Promise<PaginatedResult<ServiceProviderVM>> => {
    const prisma = new PrismaClient();

    // Default pagination values
    const page = params.page || 1;
    const limit = Math.min(params.limit || 10, 100); // Cap at 100 items per page
    const skip = params.skip ?? (page - 1) * limit;
    const take = params.take ?? limit;

    // Build where clause for filtering and search
    const whereClause: Prisma.service_providersWhereInput = {}; // Apply filters if provided
    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          // Handle specific field types appropriately
          switch (key) {
            case "governorate_id":
              whereClause.governorate_id = value as string;
              break;
            case "service_category_id":
              whereClause.service_category_id = value as string;
              break;
            case "user_id":
              whereClause.user_id = value as string;
              break;
            case "status":
              whereClause.status = value as any;
              break;
            case "service_delivery_method":
              whereClause.service_delivery_method = value as any;
              break;
            case "years_of_experience":
              if (typeof value === "number") {
                whereClause.years_of_experience = value;
              }
              break;
            case "service_name":
            case "service_description":
            case "bio":
            case "keywords":
              if (typeof value === "string") {
                (whereClause as any)[key] = {
                  contains: value,
                  mode: "insensitive",
                };
              }
              break;
            default:
              // Handle other string fields with exact match
              if (typeof value === "string") {
                (whereClause as any)[key] = value;
              } else {
                (whereClause as any)[key] = value;
              }
              break;
          }
        }
      });
    } // Apply search if provided
    if (params.search && params.search.trim()) {
      const searchTerm = params.search.trim();
      whereClause.OR = [
        {
          service_name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          service_description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          bio: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          keywords: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          service_categories: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          governorates: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          users: {
            first_name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          users: {
            last_name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    // Build orderBy clause
    const orderBy: Prisma.service_providersOrderByWithRelationInput = {};
    if (params.sortBy && params.sortOrder) {
      // Handle nested sorting for related fields
      if (params.sortBy === "service_categories") {
        orderBy.service_categories = { name: params.sortOrder };
      } else if (params.sortBy === "governorates") {
        orderBy.governorates = { name: params.sortOrder };
      } else {
        orderBy[
          params.sortBy as keyof Prisma.service_providersOrderByWithRelationInput
        ] = params.sortOrder;
      }
    } else {
      // Default sorting
      orderBy.created_at = "desc";
    }

    // Get total count with filters applied
    const total = await prisma.service_providers.count({
      where: whereClause,
    });

    // Get paginated data
    const serviceProviders = await prisma.service_providers.findMany({
      skip,
      take,
      where: whereClause,
      include: {
        service_categories: true,
        governorates: true,
        users: true,
      },
      orderBy,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: serviceProviders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  },
  [CacheTags.SERVICE_PROVIDERS],
  { revalidate: 60 * 60 }
);

// Helper functions for common filtering scenarios

// Get service providers by category
export const getServiceProvidersByCategory = async (
  categoryId: string,
  params: ServiceProviderQuery = {}
): Promise<PaginatedResult<ServiceProviderVM>> => {
  return getServiceProvidersPaginated({
    ...params,
    filter: {
      service_category_id: categoryId,
      ...(params.filter || {}),
    },
  });
};

// Get service providers by governorate
export const getServiceProvidersByGovernorate = async (
  governorateId: string,
  params: ServiceProviderQuery = {}
): Promise<PaginatedResult<ServiceProviderVM>> => {
  return getServiceProvidersPaginated({
    ...params,
    filter: {
      governorate_id: governorateId,
      ...(params.filter || {}),
    },
  });
};

// Get approved service providers only
export const getApprovedServiceProviders = async (
  params: ServiceProviderQuery = {}
): Promise<PaginatedResult<ServiceProviderVM>> => {
  return getServiceProvidersPaginated({
    ...params,
    filter: {
      status: "approved",
      ...(params.filter || {}),
    },
  });
};

// Search service providers with text
export const searchServiceProviders = async (
  searchTerm: string,
  params: ServiceProviderQuery = {}
): Promise<PaginatedResult<ServiceProviderVM>> => {
  return getServiceProvidersPaginated({
    ...params,
    search: searchTerm,
  });
};

// Get service providers by category slug
export const getServiceProvidersByCategorySlug = unstable_cache(
  async (
    categorySlug: string,
    params: ServiceProviderQuery = {}
  ): Promise<PaginatedResult<ServiceProviderVM>> => {
    const prisma = new PrismaClient();
    if (!categorySlug) return await getServiceProvidersPaginated(params);
    // First, find the category by slug
    const category = await prisma.service_categories.findFirst({
      where: {
        slug: categorySlug,
        is_deleted: false,
      },
    });

    if (!category) {
      // Return empty result if category not found
      return {
        data: [],
        pagination: {
          page: params.page || 1,
          limit: params.limit || 10,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }

    // Use the existing function with the category ID
    return getServiceProvidersByCategory(category.id, params);
  },
  [CacheTags.SERVICE_PROVIDERS, CacheTags.SERVICE_CATEGORIES],
  { revalidate: 60 * 60 }
);
// Get service providers grouped by categories
export const getServiceProvidersGroupedByCategories = unstable_cache(
  async (
    takeCategories = 4,
    takeProviders = 4,
    includeAll = true
  ): Promise<{
    servicesCategories: service_categories[];
    serviceProviders: {
      // Grouped by category slug
      [key: string]: ServiceProviderVM[];
    };
  }> => {
    const prisma = new PrismaClient();

    // Get all active service categories
    const categories = await prisma.service_categories.findMany({
      take: takeCategories,
      where: {
        is_deleted: false,
      },
      orderBy: {
        name: "asc",
      },
    });

    // Initialize the result object
    const serviceProviders: { [key: string]: ServiceProviderVM[] } = {};
    if (includeAll) {
      // First, get top 4 service providers across all categories for "all"
      const topProviders = await prisma.service_providers.findMany({
        where: {
          status: "approved", // Only approved providers
        },
        take: takeProviders, // Always top 4 for "all" category
        include: {
          service_categories: true,
          governorates: true,
          users: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      // Add "all" category at the beginning
      serviceProviders["all"] = topProviders;
    }

    // For each category, get service providers
    for (const category of categories) {
      const providers = await prisma.service_providers.findMany({
        where: {
          service_category_id: category.id,
          status: "approved", // Only approved providers
        },
        take: takeProviders,
        include: {
          service_categories: true,
          governorates: true,
          users: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      // Group by category slug
      serviceProviders[category.slug ?? category.id] = providers;
    }

    return {
      servicesCategories: categories,
      serviceProviders,
    };
  },
  [CacheTags.SERVICE_PROVIDERS, CacheTags.SERVICE_CATEGORIES],
  { revalidate: 60 * 60 }
);
