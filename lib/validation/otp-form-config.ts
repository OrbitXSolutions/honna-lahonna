// lib/validation/otp-form-config.ts
import { FieldConfig } from "./types";
import { authValidations } from "./validators";

export interface OtpFormData {
  phone: string;
}

export interface OtpVerifyFormData {
  otp: string;
}

export const otpFormConfig: FieldConfig[] = [
  {
    name: "phone",
    type: "tel",
    label: "رقم الهاتف",
    placeholder: "+20 123 456 7890",
    required: true,
    dir: "rtl",
    validations: authValidations.phone,
  },
];

export const otpVerifyConfig: FieldConfig[] = [
  {
    name: "otp",
    type: "text",
    label: "رمز التحقق",
    placeholder: "أدخل رمز التحقق",
    required: true,
    validations: [
      {
        required: true,
        message: "رمز التحقق مطلوب",
      },
      {
        pattern: /^\d{6}$/,
        message: "رمز التحقق يجب أن يكون 6 أرقام",
      },
    ],
    helpText: "أدخل رمز التحقق المرسل إلى هاتفك",
  },
];

export const otpInitialValues: OtpFormData = {
  phone: "",
};

export const otpVerifyInitialValues: OtpVerifyFormData = {
  otp: "",
};
