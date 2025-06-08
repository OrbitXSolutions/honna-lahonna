"use server";

import { unstable_cache } from "next/cache";
import { PrismaClient } from "@/lib/generated/prisma";
import { CacheTags } from "@/lib/constants/cache-tags";

const prisma = new PrismaClient();

// Service category type
export interface ServiceCategory {
  id: string;
  name: string;
}

// Governorate type
export interface Governorate {
  id: string;
  name: string;
  governorate_code?: string | null;
}

// Fetch service categories
export const getServiceCategories = unstable_cache(
  async (): Promise<ServiceCategory[]> => {
    try {
      const categories = await prisma.service_categories.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
      
      return categories;
    } catch (error) {
      console.error('Error fetching service categories:', error);
      return [];
    }
  },
  [CacheTags.SERVICE_CATEGORIES],
  { revalidate: 60 * 60 } // Cache for 1 hour
);

// Fetch governorates
export const getGovernorates = unstable_cache(
  async (): Promise<Governorate[]> => {
    try {
      const governorates = await prisma.governorates.findMany({
        select: {
          id: true,
          name: true,
          governorate_code: true,
        },
        where: {
          is_deleted: false,
        },
        orderBy: {
          name: 'asc',
        },
      });
      
      return governorates;
    } catch (error) {
      console.error('Error fetching governorates:', error);
      return [];
    }
  },
  [CacheTags.GOVERNORATES],
  { revalidate: 60 * 60 } // Cache for 1 hour
);

// Check if slug is available
export async function checkSlugAvailability(slug: string): Promise<boolean> {
  try {
    const existing = await prisma.service_providers.findFirst({
      where: {
        slug: slug,
        is_deleted: false,
      },
    });
    
    return !existing; // Return true if slug is available (no existing record)
  } catch (error) {
    console.error('Error checking slug availability:', error);
    return false;
  }
}
