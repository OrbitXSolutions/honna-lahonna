"use server";

import { PrismaClient } from "@/lib/generated/prisma";
import { cookies } from "next/headers";
import { UserInfo } from "@/lib/api/types";

/**
 * Decode JWT token to get user info
 * Note: This is a simple decode - in production, you should verify the token signature
 */
function decodeToken(token: string): UserInfo | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    return {
      id: payload.sub || payload.nameid || payload.id,
      firstName: payload.given_name || payload.firstName || "",
      lastName: payload.family_name || payload.lastName || "",
      phoneNumber: payload.phone_number || payload.phoneNumber,
      email: payload.email,
      photo: payload.picture || payload.photo,
      phoneNumberConfirmed: payload.phone_number_verified === "true" || payload.phoneNumberConfirmed === true,
      emailConfirmed: payload.email_verified === "true" || payload.emailConfirmed === true,
      roles: payload.role ? (Array.isArray(payload.role) ? payload.role : [payload.role]) : [],
    };
  } catch {
    return null;
  }
}

export async function getServiceProviderId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const user = decodeToken(token);
  if (!user) {
    throw new Error("Invalid token");
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
