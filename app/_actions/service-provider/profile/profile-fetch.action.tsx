"use server";

import { PrismaClient } from "@/lib/generated/prisma";
import { UserInfo } from "@/lib/api/types";

export async function getServiceProviderByUserId(user: UserInfo) {
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
