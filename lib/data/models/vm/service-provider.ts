import { Prisma } from "@/lib/generated/prisma";

export type ServiceProviderVM = Prisma.service_providersGetPayload<{
  include: {
    service_categories: true;
    governorates: true;
    users: true;
  };
}>;
