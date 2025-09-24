"use server";
import { PrismaClient } from "@/lib/generated/prisma";
import { actionClient } from "@/lib/safe-action";
import { createSsrClient } from "@/lib/supabase/server";
import { acceptAnySchema, completeFormSchema } from "@/lib/validations";
import { returnValidationErrors } from "next-safe-action";

export const registerProviderClientAction = actionClient
  .inputSchema(acceptAnySchema)
  .action(async ({ parsedInput: data }) => {
    const prisma = new PrismaClient();
    const supabase = await createSsrClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!user || error) {
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

    // Ensure a users row exists and is linked to the current Supabase user
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

        // Otherwise, attach this Supabase user_id and update basic fields
        userPublicData = await prisma.users.update({
          where: { email: derivedEmail },
          data: {
            user_id: user.id,
            phone: user.phone || existingByEmail.phone || "",
            first_name:
              (user.user_metadata?.first_name as string | undefined) ??
              existingByEmail.first_name ??
              "",
            last_name:
              (user.user_metadata?.last_name as string | undefined) ??
              existingByEmail.last_name ??
              "",
            updated_by: user.id,
          },
        });
      } else {
        // Create a new row safely
        userPublicData = await prisma.users.create({
          data: {
            user_id: user.id,
            email: derivedEmail,
            phone: user.phone || "",
            first_name: (user.user_metadata?.first_name as string | undefined) || "",
            last_name: (user.user_metadata?.last_name as string | undefined) || "",
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
    if (results) {
      await supabase.auth.updateUser({
        data: {
          is_service_provider: true,
          service_provider_id: results.id,
        },
      });
    }

    return JSON.parse(JSON.stringify(results));
  });
