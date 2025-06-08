"use server";
import { PrismaClient, type governorates } from "@/lib/generated/prisma";
import { unstable_cache } from "next/cache";
import { CacheTags } from "../constants/cache-tags";

export const getGovernorates = unstable_cache(
  async (): Promise<governorates[]> => {
    const prisma = new PrismaClient();
    const governorates = await prisma.governorates.findMany({
      where: {
        is_deleted: false,
      },
      orderBy: {
        name: "asc",
      },
    });
    return governorates;
  },
  [CacheTags.GOVERNORATES],
  { revalidate: 60 * 60 }
);
