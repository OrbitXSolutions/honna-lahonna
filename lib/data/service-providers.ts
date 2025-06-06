"use server";
import {
  PrismaClient,
  type service_providers,
  type Prisma,
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

// New paginated version
export const getServiceProvidersPaginated = unstable_cache(
  async (
    params: ServiceProviderQuery = {}
  ): Promise<PaginatedResult<ServiceProviderVM>> => {
    const prisma = new PrismaClient();

    // Default pagination values
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = params.skip ?? (page - 1) * limit;
    const take = params.take ?? limit;

    // Get total count for pagination info
    const total = await prisma.service_providers.count();

    // Get paginated data
    const serviceProviders = await prisma.service_providers.findMany({
      skip,
      take,
      include: {
        service_categories: true,
        governorates: true,
        users: true,
      },
      orderBy: {
        created_at: "desc", // Add ordering for consistent pagination
      },
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
