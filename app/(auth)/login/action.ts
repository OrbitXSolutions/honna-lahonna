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
    try {
 const { user, session } = await loginWithPhone(data);

    if (!user?.phone) {
      redirect(`${ROUTES.SET_PHONE}`);
    }
    if (!user.phone_confirmed_at) {
      redirect(`${ROUTES.OTP}`);
    }
    } catch (error) {
      if (error instanceof AuthApiError) {
        if (error.code === 'phone_not_confirmed') {
          redirect(`${ROUTES.OTP}?phone=${data.phone}`);
        }
        return returnValidationErrors(UserForPhoneLoginSchema, {
        _errors: [`${error.message}`]
      });
      }
      return returnValidationErrors(UserForPhoneLoginSchema, {
        _errors: [`${error}`]
      });
    }
   
  });
