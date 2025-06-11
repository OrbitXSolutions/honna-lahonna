"use server";
import { CacheTags } from "@/lib/constants/cache-tags";
import {
  governorates,
  PrismaClient,
  type service_categories,
} from "@/lib/generated/prisma";
import { unstable_cache } from "next/cache";

export const getGovernorates = unstable_cache(
  async (): Promise<governorates[]> => {
    const prisma = new PrismaClient();
    const governorates = await prisma.governorates.findMany({
      where: {
        is_deleted: false,
      },
    });
    return governorates;
  },
  [CacheTags.GOVERNORATES],
  { revalidate: 60 * 60 }
);
