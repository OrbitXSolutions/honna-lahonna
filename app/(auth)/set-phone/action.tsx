"use server";
import { ROUTES } from "@/lib/constants/routes";
import { UserSetPhoneSchema } from "@/lib/data/models/schemas/set-phone-schema";
import { sendVerificationCode } from "@/lib/api/auth";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { returnValidationErrors } from "next-safe-action";
import { ApiError } from "@/lib/api/client";

export const setPhoneAction = actionClient
  .inputSchema(UserSetPhoneSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      // Send verification code to the phone number
      const response = await sendVerificationCode({
        phoneNumber: data.phoneNumber,
      });

      if (!response.success) {
        returnValidationErrors(UserSetPhoneSchema, {
          _errors: [response.message || "فشل إرسال رمز التحقق"],
        });
      }

      redirect(`${ROUTES.OTP}?phone=${data.phoneNumber}`);
    } catch (error) {
      if (error instanceof ApiError) {
        returnValidationErrors(UserSetPhoneSchema, {
          _errors: [error.message],
        });
      }
      throw error;
    }
  });
