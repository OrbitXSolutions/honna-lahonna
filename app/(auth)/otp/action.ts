"use server";
import { ROUTES } from "@/lib/constants/routes";
import {
  UserVerifyPhone,
  UserVerifyPhoneSchema,
} from "@/lib/data/models/schemas/confirm-phone-otp";
import { UserForPhoneLoginSchema } from "@/lib/data/models/schemas/login.schema";
import { loginWithPhone, verifyOtp } from "@/lib/data/supabase/auth";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";

export const otpVerifyAction = actionClient
  .inputSchema(UserVerifyPhoneSchema)
  .action(async ({ parsedInput: data }) => {
    const { user, session } = await verifyOtp(data);

    redirect(`${ROUTES.HOME}`);
  });
