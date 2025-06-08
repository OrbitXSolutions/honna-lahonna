import { createAdminClient } from "../supabase/admin";
import { createSsrClient } from "../supabase/server";
import { z } from "zod/v4";

export interface UserForRegister {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone: string;
}

// Utility function to normalize phone numbers with Egyptian +20 default
export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters except +
  let cleanPhone = phone.replace(/[^\d+]/g, "");

  // If it starts with 00, replace with +
  if (cleanPhone.startsWith("00")) {
    cleanPhone = "+" + cleanPhone.substring(2);
  }

  // If it starts with 0 (local Egyptian number), add +20
  if (cleanPhone.startsWith("0") && !cleanPhone.startsWith("+")) {
    cleanPhone = "+20" + cleanPhone.substring(1);
  }

  // If it's just digits without country code and looks like Egyptian number (10-11 digits)
  if (
    !cleanPhone.startsWith("+") &&
    (cleanPhone.length === 10 || cleanPhone.length === 11)
  ) {
    cleanPhone = "+20" + cleanPhone;
  }

  // If no country code and it's 9 digits, assume it's Egyptian mobile without leading 0
  if (!cleanPhone.startsWith("+") && cleanPhone.length === 9) {
    cleanPhone = "+20" + cleanPhone;
  }

  return cleanPhone;
}

// create zod schema for UserForRegister
export const UserForRegisterSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("يرجى إدخال بريد إلكتروني صحيح"),
  password: z
    .string()
    .min(6, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .max(100, "كلمة المرور طويلة جداً"),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  //   "كلمة المرور يجب أن تحتوي على حرف صغير وكبير ورقم"
  // ),
  firstName: z
    .string()
    .min(1, "الاسم الأول مطلوب")
    .min(2, "الاسم الأول يجب أن يكون حرفين على الأقل")
    .max(50, "الاسم الأول طويل جداً")
    .regex(
      /^[\u0600-\u06FFa-zA-Z\s]+$/,
      "الاسم الأول يجب أن يحتوي على أحرف عربية أو إنجليزية فقط"
    ),
  lastName: z
    .string()
    .max(50, "اسم العائلة طويل جداً")
    .regex(
      /^[\u0600-\u06FFa-zA-Z\s]*$/,
      "اسم العائلة يجب أن يحتوي على أحرف عربية أو إنجليزية فقط"
    )
    .or(z.literal("")),
  phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .transform((phone) => normalizePhoneNumber(phone))
    .refine(
      (phone) => /^\+20[0-9]{10,11}$/.test(phone),
      "رقم الهاتف يجب أن يكون رقم مصري صحيح"
    ),
});

export async function registerUser(user: UserForRegister) {
  const parsedUser = UserForRegisterSchema.safeParse(user);
  if (!parsedUser.success) {
    throw new Error(
      "Invalid user data: " + JSON.stringify(parsedUser.error.issues)
    );
  }
  const supabase = await createSsrClient();

  const { data, error } = await supabase.auth.signUp({
    email: parsedUser.data.email,
    password: parsedUser.data.password,
    options: {
      data: {
        first_name: parsedUser.data.firstName,
        last_name: parsedUser.data.lastName,
        phone: parsedUser.data.phone,
      },
    },
  });

  if (error) {
    throw error;
  }
  if (!data.user) {
    throw new Error("User registration failed");
  }

  //   const adminClient = await createAdminClient();
  //   adminClient.auth.admin.updateUserById(data.user.id, {
  //     phone: parsedUser.data.phone,
  //   });

  return data;
}
