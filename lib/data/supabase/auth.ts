/**
 * @deprecated This file is deprecated and kept for backwards compatibility.
 * All auth functionality has been moved to the new API layer in lib/api/auth.ts
 * 
 * Please use the new auth functions from @/lib/api/auth instead:
 * - register() for user registration
 * - login() for user login
 * - googleLogin() for Google OAuth
 * - sendVerificationCode() for sending OTP
 * - verifyPhone() for OTP verification
 * - resendCode() for resending OTP
 * - logout() for signing out
 */

import {
  UserForRegister,
} from "@/lib/data/models/schemas/register.schema";
import {
  UserForPhoneLogin,
} from "../models/schemas/login.schema";
import {
  UserSetPhone,
} from "../models/schemas/set-phone-schema";
import {
  UserVerifyPhone,
} from "../models/schemas/confirm-phone-otp";

/** @deprecated Use register() from @/lib/api/auth instead */
export async function registerUser(user: UserForRegister) {
  throw new Error("DEPRECATED: Use register() from @/lib/api/auth instead");
}

/** @deprecated Use googleLogin() from @/lib/api/auth instead */
export async function registerWithGoogle() {
  throw new Error("DEPRECATED: Use googleLogin() from @/lib/api/auth instead");
}

/** @deprecated Use login() from @/lib/api/auth instead */
export async function loginWithPhone(user: UserForPhoneLogin) {
  throw new Error("DEPRECATED: Use login() from @/lib/api/auth instead");
}

/** @deprecated Use sendVerificationCode() from @/lib/api/auth instead */
export async function setUserPhone(input: UserSetPhone) {
  throw new Error("DEPRECATED: Use sendVerificationCode() from @/lib/api/auth instead");
}

/** @deprecated Use verifyPhone() from @/lib/api/auth instead */
export async function verifyOtp(input: UserVerifyPhone) {
  throw new Error("DEPRECATED: Use verifyPhone() from @/lib/api/auth instead");
}

/** @deprecated Use verifyPhone() from @/lib/api/auth instead */
export async function verifyOtpChange(input: UserVerifyPhone) {
  throw new Error("DEPRECATED: Use verifyPhone() from @/lib/api/auth instead");
}

/** @deprecated Use resendCode() from @/lib/api/auth instead */
export async function resendPhoneOtp() {
  throw new Error("DEPRECATED: Use resendCode() from @/lib/api/auth instead");
}
