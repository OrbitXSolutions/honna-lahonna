"use server";
import { ROUTES } from "@/lib/constants/routes";
import { UserForPhoneLoginSchema } from "@/lib/data/models/schemas/login.schema";
import { flattenValidationErrors } from "next-safe-action";
import { returnValidationErrors } from "next-safe-action";

import { loginWithPhone } from "@/lib/data/supabase/auth";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { AuthApiError } from "@supabase/supabase-js";

export const loginAction = actionClient
  .inputSchema(UserForPhoneLoginSchema)
  .action(async ({ parsedInput: data }) => {
    const { user, session } = await loginWithPhone(data).catch((error) => {
      if (error instanceof AuthApiError) {
        returnValidationErrors(UserForPhoneLoginSchema, {
          _errors: [`${error.message}`],
        });
      } else {
        returnValidationErrors(UserForPhoneLoginSchema, {
          _errors: [`${error}`],
        });
      }
    });

    if (!user?.phone) {
      redirect(`${ROUTES.SET_PHONE}`);
    }
    if (!user.phone_confirmed_at) {
      redirect(`${ROUTES.OTP}`);
    }
    redirect(ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM);

    // }
  });
