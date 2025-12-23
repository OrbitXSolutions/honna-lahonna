"use server";
import { ROUTES } from "@/lib/constants/routes";
import {
  UserVerifyPhoneSchema,
} from "@/lib/data/models/schemas/confirm-phone-otp";
import { verifyPhone, sendVerificationCode, resendCode } from "@/lib/api/auth";
import { actionClient } from "@/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { z } from "zod/v4";

export const otpVerifyAction = actionClient
  .inputSchema(UserVerifyPhoneSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const response = await verifyPhone({
        phoneNumber: data.phoneNumber,
        code: data.code,
      });

      if (!response.success) {
        returnValidationErrors(UserVerifyPhoneSchema, {
          _errors: [response.message || "فشل التحقق من رقم الهاتف"],
        });
      }

      redirect(`${ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM}`);
    } catch (error) {
      if (error instanceof ApiError) {
        returnValidationErrors(UserVerifyPhoneSchema, {
          _errors: [error.message],
        });
      }
      throw error;
    }
  });

// Schema for sending verification code
const SendCodeSchema = z.object({
  phoneNumber: z.string().min(1, "رقم الهاتف مطلوب"),
});

export const sendCodeAction = actionClient
  .inputSchema(SendCodeSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const response = await sendVerificationCode({
        phoneNumber: data.phoneNumber,
      });

      if (!response.success) {
        returnValidationErrors(SendCodeSchema, {
          _errors: [response.message || "فشل إرسال رمز التحقق"],
        });
      }

      return { success: true, message: response.message };
    } catch (error) {
      if (error instanceof ApiError) {
        returnValidationErrors(SendCodeSchema, {
          _errors: [error.message],
        });
      }
      throw error;
    }
  });

export const resendCodeAction = actionClient
  .inputSchema(SendCodeSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const response = await resendCode({
        phoneNumber: data.phoneNumber,
      });

      if (!response.success) {
        returnValidationErrors(SendCodeSchema, {
          _errors: [response.message || "فشل إعادة إرسال رمز التحقق"],
        });
      }

      return { success: true, message: response.message };
    } catch (error) {
      if (error instanceof ApiError) {
        returnValidationErrors(SendCodeSchema, {
          _errors: [error.message],
        });
      }
      throw error;
    }
  });
