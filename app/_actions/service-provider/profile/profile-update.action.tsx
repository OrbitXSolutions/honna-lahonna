"use server";

import {
  profileUpdateSchema,
  serviceProviderSchema,
} from "@/lib/data/models/schemas/service-provider.schema";
import { actionClient } from "@/lib/safe-action";
import { getServiceProviderId } from "./profile-id.action";
import { PrismaClient, service_providers } from "@/lib/generated/prisma";
import { Decimal } from "@/lib/generated/prisma/runtime/library";
import { z } from "zod/v4";

export const profileUpdateAction = actionClient
  .inputSchema(profileUpdateSchema)
  .action(async ({ parsedInput }) => {
    const serviceProviderId = await getServiceProviderId();
    if (!serviceProviderId) {
      throw new Error("Service provider not found");
    }
    const prisma = new PrismaClient();

    if (!Object.keys(parsedInput).length) {
      throw new Error("No data to update");
    }

    await prisma.service_providers.update({
      where: { id: serviceProviderId.id },
      data: parsedInput,
    });
  });
