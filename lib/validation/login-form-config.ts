// lib/validation/login-form-config.ts
import { FieldConfig } from "./types";
import { authValidations } from "./validators";

export interface LoginFormData {
  email: string;
  password: string;
}

export const loginFormConfig: FieldConfig[] = [
  {
    name: "email",
    type: "email",
    label: "البريد الإلكتروني",
    placeholder: "example@domain.com",
    required: true,
    validations: authValidations.email,
  },
  {
    name: "password",
    type: "password",
    label: "كلمة المرور",
    placeholder: "أدخل كلمة المرور",
    required: true,
    validations: [
      {
        required: true,
        message: "كلمة المرور مطلوبة",
      },
    ],
  },
];

export const loginInitialValues: LoginFormData = {
  email: "",
  password: "",
};
