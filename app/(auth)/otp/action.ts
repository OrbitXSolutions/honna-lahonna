"use server";
import { ROUTES } from "@/lib/constants/routes";
import {
  UserVerifyPhone,
  UserVerifyPhoneSchema,
} from "@/lib/data/models/schemas/confirm-phone-otp";
import { UserForPhoneLoginSchema } from "@/lib/data/models/schemas/login.schema";
import { loginWithPhone, verifyOtp } from "@/lib/data/supabase/auth";
import { actionClient } from "@/lib/safe-action";
import { AuthApiError } from "@supabase/supabase-js";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

export const otpVerifyAction = actionClient
  .inputSchema(UserVerifyPhoneSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const { user, session } = await verifyOtp(data);
    } catch (error) {
      if (error instanceof AuthApiError) {
        returnValidationErrors(UserVerifyPhoneSchema, {
          // _errors: [error.message],
          _errors: [`${error.message}`],
        });
      }

      returnValidationErrors(UserVerifyPhoneSchema, {
        _errors: [`${error}`],
      });
    }

    redirect(`${ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM}`);
  });
