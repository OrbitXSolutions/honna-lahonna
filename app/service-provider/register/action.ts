"use server";
import { PrismaClient } from "@/lib/generated/prisma";
import { actionClient } from "@/lib/safe-action";
import { getServerUser } from "@/lib/api/server-auth";
import { acceptAnySchema, completeFormSchema } from "@/lib/validations";
import { returnValidationErrors } from "next-safe-action";

export const registerProviderClientAction = actionClient
  .inputSchema(acceptAnySchema)
  .action(async ({ parsedInput: data }) => {
    const prisma = new PrismaClient();
    const user = await getServerUser();
    if (!user) {
      return returnValidationErrors(acceptAnySchema, {
        _errors: [
          "User not authenticated. Please log in to register as a service provider.",
        ],
      });
    }
    // debugger;
    delete data?.logo_image_file;
    delete data?.id_card_front_image_file;
    delete data?.id_card_back_image_file;
    delete data?.video_url_file;
    delete data?.certificates_images_files;
    delete data?.document_list_files;

    // Ensure a users row exists and is linked to the current user
    // - Prefer finding by user_id, then fallback to email and attach user_id
    // - Avoid unique violations on email by using a stable placeholder when missing
    let userPublicData = await prisma.users.findUnique({
      where: { user_id: user.id },
    });

    if (!userPublicData) {
      // Derive a non-conflicting email value
      const derivedEmail = user.email ?? `user-${user.id}@placeholder.local`;

      // Check if there's an existing row with this email
      const existingByEmail = await prisma.users.findUnique({
        where: { email: derivedEmail },
      });

      if (existingByEmail) {
        // If the email exists but is linked to another user_id, block with a clear message
        if (
          existingByEmail.user_id &&
          existingByEmail.user_id !== user.id
        ) {
          return returnValidationErrors(acceptAnySchema, {
            _errors: [
              "البريد الإلكتروني مرتبط بحساب مختلف. يرجى تسجيل الدخول بذلك الحساب أو استخدام بريد آخر.",
            ],
          });
        }

        // Otherwise, attach this user_id and update basic fields
        userPublicData = await prisma.users.update({
          where: { email: derivedEmail },
          data: {
            user_id: user.id,
            phone: user.phoneNumber || existingByEmail.phone || "",
            first_name: user.firstName ?? existingByEmail.first_name ?? "",
            last_name: user.lastName ?? existingByEmail.last_name ?? "",
            updated_by: user.id,
          },
        });
      } else {
        // Create a new row safely
        userPublicData = await prisma.users.create({
          data: {
            user_id: user.id,
            email: derivedEmail,
            phone: user.phoneNumber || "",
            first_name: user.firstName || "",
            last_name: user.lastName || "",
            created_by: user.id,
          },
        });
      }
    }
    const results = await prisma.service_providers.create({
      data: {
        ...data,
        user_id: userPublicData.id,
        created_by: user.id,
      },
    });
    console.log("Service Provider Created:", results);

    return JSON.parse(JSON.stringify(results));
  });
