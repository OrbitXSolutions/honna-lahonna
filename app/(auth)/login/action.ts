"use server";
import { ROUTES } from "@/lib/constants/routes";
import { UserForPhoneLoginSchema } from "@/lib/data/models/schemas/login.schema";
import { returnValidationErrors } from "next-safe-action";
import { login } from "@/lib/api/auth";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { cookies } from "next/headers";

export const loginAction = actionClient
  .inputSchema(UserForPhoneLoginSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      // Determine if input is email or phone
      const isEmail = data.emailOrPhone.includes("@");

      const response = await login({
        phoneNumber: isEmail ? undefined : data.emailOrPhone,
        email: isEmail ? data.emailOrPhone : undefined,
        password: data.password,
      });

      if (!response.success) {
        returnValidationErrors(UserForPhoneLoginSchema, {
          _errors: [response.message || "فشل تسجيل الدخول"],
        });
      }

      // Set auth token in cookie for middleware
      if (response.token) {
        const cookieStore = await cookies();
        cookieStore.set("auth_token", response.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
      }

      // Check if phone verification is needed (only if user has phone and it's not confirmed)
      const hasUnverifiedPhone = response.user?.phoneNumber && !response.user?.phoneNumberConfirmed;
      if (hasUnverifiedPhone) {
        const phoneNumber = response.user?.phoneNumber;
        redirect(`${ROUTES.OTP}?phone=${encodeURIComponent(phoneNumber!)}`);
      }

      // Return success with user data for client-side storage
      return {
        success: true,
        message: "تم تسجيل الدخول بنجاح",
        user: response.user,
        token: response.token,
        expiresAt: response.expiresAt,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        returnValidationErrors(UserForPhoneLoginSchema, {
          _errors: [error.message],
        });
      }
      throw error;
    }
  });
