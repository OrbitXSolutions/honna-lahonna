"use server";

import { PrismaClient } from "@/lib/generated/prisma";
import { createSsrClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getServiceProviderId() {
  const supabase = await createSsrClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
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
  return profile;
}
