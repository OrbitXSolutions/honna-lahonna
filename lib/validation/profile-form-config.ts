// lib/validation/profile-form-config.ts
import { FormConfig } from "./types";
import { authValidations } from "./validators";

export const profileFormConfig: FormConfig = {
  title: "تحديث الملف الشخصي",
  description: "قم بتحديث معلوماتك الشخصية",
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "الاسم الأول",
      placeholder: "أدخل اسمك الأول",
      required: true,
      dir: "rtl",
      validations: authValidations.firstName,
    },
    {
      name: "lastName",
      type: "text",
      label: "اسم العائلة",
      placeholder: "أدخل اسم العائلة (اختياري)",
      required: false,
      dir: "rtl",
      validations: authValidations.lastName,
    },
    {
      name: "email",
      type: "email",
      label: "البريد الإلكتروني",
      placeholder: "أدخل بريدك الإلكتروني",
      required: true,
      dir: "ltr",
      validations: authValidations.email,
      helpText: "تغيير البريد الإلكتروني يتطلب تأكيد جديد",
    },
    {
      name: "phone",
      type: "tel",
      label: "رقم الهاتف",
      placeholder: "+20 1xxxxxxxxx",
      required: true,
      dir: "ltr",
      validations: authValidations.phone,
    },
    {
      name: "dateOfBirth",
      type: "date",
      label: "تاريخ الميلاد",
      placeholder: "",
      required: false,
      dir: "ltr",
      validations: [
        {
          custom: (value: string) => {
            if (!value) return true; // Optional field
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 16 && age <= 100;
          },
          message: "يجب أن يكون العمر بين 16 و 100 سنة",
        },
      ],
    },
    {
      name: "gender",
      type: "select",
      label: "الجنس",
      placeholder: "اختر الجنس",
      required: false,
      dir: "rtl",
      options: [
        { value: "male", label: "ذكر" },
        { value: "female", label: "أنثى" },
        { value: "prefer_not_to_say", label: "أفضل عدم الإفصاح" },
      ],
      validations: [],
    },
    {
      name: "bio",
      type: "textarea",
      label: "نبذة شخصية",
      placeholder: "اكتب نبذة مختصرة عن نفسك...",
      required: false,
      dir: "rtl",
      validations: [
        {
          maxLength: 500,
          message: "النبذة الشخصية طويلة جداً (500 حرف كحد أقصى)",
        },
      ],
    },
    {
      name: "location",
      type: "select",
      label: "المحافظة",
      placeholder: "اختر محافظتك",
      required: false,
      dir: "rtl",
      options: [
        { value: "cairo", label: "القاهرة" },
        { value: "giza", label: "الجيزة" },
        { value: "alexandria", label: "الإسكندرية" },
        { value: "qalyubia", label: "القليوبية" },
        { value: "dakahlia", label: "الدقهلية" },
        { value: "sharqia", label: "الشرقية" },
        { value: "gharbia", label: "الغربية" },
        { value: "beheira", label: "البحيرة" },
        { value: "kafr_el_sheikh", label: "كفر الشيخ" },
        { value: "damietta", label: "دمياط" },
        { value: "port_said", label: "بورسعيد" },
        { value: "north_sinai", label: "شمال سيناء" },
        { value: "south_sinai", label: "جنوب سيناء" },
        { value: "ismailia", label: "الإسماعيلية" },
        { value: "suez", label: "السويس" },
        { value: "menoufia", label: "المنوفية" },
        { value: "fayyum", label: "الفيوم" },
        { value: "beni_suef", label: "بني سويف" },
        { value: "minya", label: "المنيا" },
        { value: "assiut", label: "أسيوط" },
        { value: "sohag", label: "سوهاج" },
        { value: "qena", label: "قنا" },
        { value: "luxor", label: "الأقصر" },
        { value: "aswan", label: "أسوان" },
        { value: "red_sea", label: "البحر الأحمر" },
        { value: "new_valley", label: "الوادي الجديد" },
        { value: "matrouh", label: "مطروح" },
      ],
      validations: [],
    },
  ],
};

export type ProfileFormData = {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "prefer_not_to_say";
  bio?: string;
  location?: string;
};
