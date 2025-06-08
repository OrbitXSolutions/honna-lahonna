// lib/validation/register-form-config.ts
import { FieldConfig } from "./types";
import { authValidations } from "./validators";

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const registerFormConfig: FieldConfig[] = [
  {
    name: "firstName",
    type: "text",
    label: "الاسم الأول",
    placeholder: "أدخلي اسمك الأول",
    required: true,
    validations: authValidations.firstName,
  },
  {
    name: "lastName",
    type: "text",
    label: "اسم الأخير",
    placeholder: "أدخلي اسم الأخير (اختياري)",
    validations: authValidations.lastName,
  },
  {
    name: "email",
    type: "email",
    label: "البريد الإلكتروني",
    placeholder: "example@domain.com",
    required: true,
    validations: authValidations.email,
  },
  {
    name: "phone",
    type: "tel",
    label: "رقم الهاتف",
    placeholder: "+20 123 456 7890",
    required: true,
    dir: "rtl",
    validations: authValidations.phone,
  },
  {
    name: "password",
    type: "password",
    label: "كلمة المرور",
    placeholder: "أدخلي كلمة مرور قوية",
    required: true,
    validations: authValidations.password,
    helpText: "يجب أن تحتوي على 6 أحرف على الأقل",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "تأكيد كلمة المرور",
    placeholder: "أعيدي إدخال كلمة المرور",
    required: true,
    validations: authValidations.confirmPassword,
    dependencies: ["password"],
  },
];

export const registerInitialValues: RegisterFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
