"use server";
import { PrismaClient, type service_categories } from "@/lib/generated/prisma";
import { unstable_cache } from "next/cache";
import { CacheTags } from "../constants/cache-tags";

export const getServiceCategories = unstable_cache(
  async (): Promise<service_categories[]> => {
    const prisma = new PrismaClient();
    const serviceCategories = await prisma.service_categories.findMany({
      where: {
        is_deleted: false,
      },
    });
    return serviceCategories;
  },
  [CacheTags.SERVICE_CATEGORIES],
  { revalidate: 60 * 60 }
);
