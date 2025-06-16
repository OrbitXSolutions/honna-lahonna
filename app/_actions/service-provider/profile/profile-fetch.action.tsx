"use server";

import { PrismaClient } from "@/lib/generated/prisma";
import { User } from "@supabase/supabase-js";

export async function getServiceProviderByUserId(user: User) {
  const prisma = new PrismaClient();
  const profile = await prisma.service_providers.findFirst({
    include: {
      users: true,
      governorates: true,
      service_categories: true,
    },

    where: {
      users: {
        user_id: user.id,
      },
    },
  });
  return JSON.parse(JSON.stringify(profile));
}
