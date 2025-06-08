"use server";

import { PrismaClient } from "@/lib/generated/prisma";
import { unstable_cache } from "next/cache";
import { CacheTags } from "../constants/cache-tags";

// Get service categories for the form dropdown
export const getServiceCategories = unstable_cache(
  async () => {
    const prisma = new PrismaClient();
    const categories = await prisma.service_categories.findMany({
      where: {
        is_deleted: false,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    
    return categories.map(category => ({
      value: category.id,
      label: category.name,
    }));
  },
  [CacheTags.SERVICE_CATEGORIES],
  { revalidate: 60 * 60 }
);

// Get governorates for the form dropdown
export const getGovernorates = unstable_cache(
  async () => {
    const prisma = new PrismaClient();
    const governorates = await prisma.governorates.findMany({
      where: {
        is_deleted: false,
      },
      select: {
        id: true,
        name: true,
        governorate_code: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    
    return governorates.map(gov => ({
      value: gov.id,
      label: gov.name,
    }));
  },
  [CacheTags.GOVERNORATES],
  { revalidate: 60 * 60 }
);

// Service delivery method options
export const getServiceDeliveryMethods = () => [
  { value: "online", label: "أونلاين" },
  { value: "offline", label: "حضوري" },
  { value: "both", label: "كلاهما" },
];

// Years of experience options
export const getYearsOfExperience = () => [
  { value: 1, label: "أقل من سنة" },
  { value: 2, label: "1-2 سنوات" },
  { value: 3, label: "2-3 سنوات" },
  { value: 5, label: "3-5 سنوات" },
  { value: 10, label: "5-10 سنوات" },
  { value: 15, label: "أكثر من 10 سنوات" },
];
