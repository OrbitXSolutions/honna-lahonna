import { z } from "zod/v4";

export const UserVerifyPhoneSchema = z.object({
  code: z
    .string("رمز التحقق مطلوب")
    .trim()
    .length(6, "رمز التحقق يجب أن يكون 6 أرقام"),
  phoneNumber: z.string().min(1, "رقم الهاتف مطلوب"),
});

export type UserVerifyPhone = z.infer<typeof UserVerifyPhoneSchema>;
export const UserVerifyPhoneDefaultValues: UserVerifyPhone = {
  code: "",
  phoneNumber: "",
};
