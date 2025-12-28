"use server";

import { ROUTES } from "@/lib/constants/routes";
import {
  UserForRegisterSchema,
} from "@/lib/data/models/schemas/register.schema";
import { register } from "@/lib/api/auth";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { returnValidationErrors } from "next-safe-action";
import { ApiError } from "@/lib/api/client";
import { cookies } from "next/headers";

export const registerAction = actionClient
  .inputSchema(UserForRegisterSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const response = await register({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (!response.success) {
        returnValidationErrors(UserForRegisterSchema, {
          _errors: [response.message || "فشل التسجيل"],
        });
      }

      console.log("User registered: action", response.user);

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

      // Check if phone is verified
      if (!response.user?.phoneNumberConfirmed) {
        const phoneNumber = response.user?.phoneNumber || data.phoneNumber;
        redirect(`${ROUTES.OTP}?phone=${encodeURIComponent(phoneNumber)}`);
      }

      // Return success with user data for client-side storage
      return {
        success: true,
        user: response.user,
        token: response.token,
        expiresAt: response.expiresAt,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        returnValidationErrors(UserForRegisterSchema, {
          _errors: [error.message],
        });
      }
      throw error;
    }
  });
