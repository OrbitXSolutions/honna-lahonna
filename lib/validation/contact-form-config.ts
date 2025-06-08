// lib/validation/contact-form-config.ts
import { FormConfig } from "./types";
import { authValidations } from "./validators";

export const contactFormConfig: FormConfig = {
  title: "اتصل بنا",
  description: "أرسل لنا رسالتك وسنرد عليك في أقرب وقت",
  fields: [
    {
      name: "fullName",
      type: "text",
      label: "الاسم الكامل",
      placeholder: "أدخل اسمك الكامل",
      required: true,
      dir: "rtl",
      validations: [
        {
          required: true,
          message: "الاسم الكامل مطلوب",
        },
        {
          minLength: 2,
          message: "الاسم يجب أن يكون حرفين على الأقل",
        },
        {
          maxLength: 100,
          message: "الاسم طويل جداً",
        },
        {
          pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
          message: "الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية فقط",
        },
      ],
    },
    {
      name: "email",
      type: "email",
      label: "البريد الإلكتروني",
      placeholder: "أدخل بريدك الإلكتروني",
      required: true,
      dir: "ltr",
      validations: authValidations.email,
      helpText: "سنستخدم هذا البريد للرد عليك",
    },
    {
      name: "phone",
      type: "tel",
      label: "رقم الهاتف",
      placeholder: "+20 1xxxxxxxxx",
      required: false,
      dir: "ltr",
      validations: authValidations.phone.map((rule) => ({
        ...rule,
        required: false,
      })),
      helpText: "اختياري - للتواصل السريع",
    },
    {
      name: "subject",
      type: "text",
      label: "موضوع الرسالة",
      placeholder: "اختر موضوع الرسالة",
      required: true,
      dir: "rtl",
      validations: [
        {
          required: true,
          message: "موضوع الرسالة مطلوب",
        },
        {
          minLength: 5,
          message: "موضوع الرسالة قصير جداً",
        },
        {
          maxLength: 200,
          message: "موضوع الرسالة طويل جداً",
        },
      ],
    },
    {
      name: "message",
      type: "textarea",
      label: "الرسالة",
      placeholder: "اكتب رسالتك هنا...",
      required: true,
      dir: "rtl",
      validations: [
        {
          required: true,
          message: "نص الرسالة مطلوب",
        },
        {
          minLength: 20,
          message: "الرسالة قصيرة جداً (20 حرف على الأقل)",
        },
        {
          maxLength: 1000,
          message: "الرسالة طويلة جداً (1000 حرف كحد أقصى)",
        },
      ],
    },
    {
      name: "contactPreference",
      type: "select",
      label: "طريقة التواصل المفضلة",
      placeholder: "اختر طريقة التواصل",
      required: true,
      dir: "rtl",
      options: [
        { value: "email", label: "البريد الإلكتروني" },
        { value: "phone", label: "الهاتف" },
        { value: "whatsapp", label: "واتساب" },
      ],
      validations: [
        {
          required: true,
          message: "يرجى اختيار طريقة التواصل المفضلة",
        },
      ],
    },
  ],
};

export type ContactFormData = {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  contactPreference: "email" | "phone" | "whatsapp";
};
