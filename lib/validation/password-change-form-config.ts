// lib/validation/password-change-form-config.ts
import { FormConfig } from "./types";
import { authValidations } from "./validators";

export const passwordChangeFormConfig: FormConfig = {
  title: "تغيير كلمة المرور",
  description: "قم بتحديث كلمة المرور الخاصة بك",
  fields: [
    {
      name: "currentPassword",
      type: "password",
      label: "كلمة المرور الحالية",
      placeholder: "أدخل كلمة المرور الحالية",
      required: true,
      dir: "ltr",
      validations: [
        {
          required: true,
          message: "كلمة المرور الحالية مطلوبة",
        },
        {
          minLength: 1,
          message: "يرجى إدخال كلمة المرور الحالية",
        },
      ],
    },
    {
      name: "newPassword",
      type: "password",
      label: "كلمة المرور الجديدة",
      placeholder: "أدخل كلمة المرور الجديدة",
      required: true,
      dir: "ltr",
      validations: authValidations.password,
      helpText: "يجب أن تحتوي على 8 أحرف على الأقل",
    },
    {
      name: "confirmNewPassword",
      type: "password",
      label: "تأكيد كلمة المرور الجديدة",
      placeholder: "أعد إدخال كلمة المرور الجديدة",
      required: true,
      dir: "ltr",
      validations: [
        {
          required: true,
          message: "تأكيد كلمة المرور الجديدة مطلوب",
        },
        {
          custom: (value: string, formData?: Record<string, any>) => {
            if (!formData || !formData.newPassword) return true;
            return value === formData.newPassword;
          },
          message: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
        },
      ],
    },
  ],
};

export type PasswordChangeFormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
