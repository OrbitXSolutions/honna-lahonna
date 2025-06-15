"use server";
import { CacheTags } from "@/lib/constants/cache-tags";
import {
  governorates,
  PrismaClient,
  type service_categories,
} from "@/lib/generated/prisma";
import { unstable_cache } from "next/cache";
import { cache } from "react";

const _getCategories = async (): Promise<governorates[]> => {
  const prisma = new PrismaClient();
  const categories = await prisma.governorates.findMany({
    where: {
      is_deleted: false,
    },
  });
  return categories;
};

export const getGovernorates = unstable_cache(
  async (): Promise<governorates[]> => {
    return await _getCategories();
  },
  [CacheTags.GOVERNORATES],
  { revalidate: 60 * 60 }
);

export const getGovernoratesReactCached = cache(
  async (): Promise<governorates[]> => {
    return await _getCategories();
  }
);
