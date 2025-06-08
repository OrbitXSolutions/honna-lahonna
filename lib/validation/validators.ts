// lib/validation/validators.ts
import { ValidationRule } from "./types";

/**
 * Authentication validation rules
 */
export const authValidations = {
  firstName: [
    {
      required: true,
      message: "الاسم الأول مطلوب",
    },
    {
      minLength: 2,
      message: "الاسم الأول يجب أن يكون حرفين على الأقل",
    },
    {
      maxLength: 50,
      message: "الاسم الأول طويل جداً",
    },
    {
      pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
      message: "الاسم الأول يجب أن يحتوي على أحرف عربية أو إنجليزية فقط",
    },
  ] as ValidationRule[],

  lastName: [
    {
      maxLength: 50,
      message: "اسم الأخير طويل جداً",
    },
    {
      pattern: /^[\u0600-\u06FFa-zA-Z\s]*$/,
      message: "اسم الأخير يجب أن يحتوي على أحرف عربية أو إنجليزية فقط",
    },
  ] as ValidationRule[],

  email: [
    {
      required: true,
      message: "البريد الإلكتروني مطلوب",
    },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "يرجى إدخال بريد إلكتروني صحيح",
    },
  ] as ValidationRule[],

  phone: [
    {
      required: true,
      message: "رقم الهاتف مطلوب",
    },
    {
      custom: (value: string) => {
        let cleanPhone = value.replace(/[^\d+]/g, "");

        if (cleanPhone.startsWith("00")) {
          cleanPhone = "+" + cleanPhone.substring(2);
        }

        if (cleanPhone.startsWith("0") && !cleanPhone.startsWith("+")) {
          cleanPhone = "+20" + cleanPhone.substring(1);
        }

        if (
          !cleanPhone.startsWith("+") &&
          (cleanPhone.length === 10 || cleanPhone.length === 11)
        ) {
          cleanPhone = "+20" + cleanPhone;
        }

        if (!cleanPhone.startsWith("+") && cleanPhone.length === 9) {
          cleanPhone = "+20" + cleanPhone;
        }

        return /^\+20[0-9]{10,11}$/.test(cleanPhone);
      },
      message: "رقم الهاتف يجب أن يكون رقم مصري صحيح",
    },
  ] as ValidationRule[],

  password: [
    {
      required: true,
      message: "كلمة المرور مطلوبة",
    },
    {
      minLength: 6,
      message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    },
    {
      maxLength: 100,
      message: "كلمة المرور طويلة جداً",
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: "كلمة المرور يجب أن تحتوي على حرف صغير وكبير ورقم",
    },
  ] as ValidationRule[],
  confirmPassword: [
    {
      required: true,
      message: "تأكيد كلمة المرور مطلوب",
    },
    {
      custom: (value: string, formData?: Record<string, any>) => {
        return value === formData?.password;
      },
      message: "كلمات المرور غير متطابقة",
    },
  ] as ValidationRule[],
};

/**
 * Service Provider validation rules
 */
export const serviceProviderValidations = {
  // Step 1: Basic Information
  service_name: [
    {
      required: true,
      message: "اسم الخدمة مطلوب",
    },
    {
      minLength: 3,
      message: "اسم الخدمة يجب أن يكون 3 أحرف على الأقل",
    },
    {
      maxLength: 100,
      message: "اسم الخدمة طويل جداً",
    },
  ] as ValidationRule[],

  service_description: [
    {
      required: true,
      message: "وصف الخدمة مطلوب",
    },
    {
      minLength: 20,
      message: "وصف الخدمة يجب أن يكون 20 حرف على الأقل",
    },
    {
      maxLength: 1000,
      message: "وصف الخدمة طويل جداً",
    },
  ] as ValidationRule[],

  service_category_id: [
    {
      required: true,
      message: "فئة الخدمة مطلوبة",
    },
  ] as ValidationRule[],

  governorate_id: [
    {
      required: true,
      message: "المحافظة مطلوبة",
    },
  ] as ValidationRule[],

  years_of_experience: [
    {
      required: true,
      message: "سنوات الخبرة مطلوبة",
    },
    {
      custom: (value: string) => {
        const num = parseInt(value);
        return !isNaN(num) && num >= 0 && num <= 50;
      },
      message: "سنوات الخبرة يجب أن تكون رقم بين 0 و 50",
    },
  ] as ValidationRule[],

  service_delivery_method: [
    {
      required: true,
      message: "طريقة تقديم الخدمة مطلوبة",
    },
    {
      custom: (value: string) => {
        return ["online", "offline", "both"].includes(value);
      },
      message: "يرجى اختيار طريقة تقديم الخدمة",
    },
  ] as ValidationRule[],

  address: [
    {
      custom: (value: string, formData?: Record<string, any>) => {
        const method = formData?.service_delivery_method;
        if (method === "offline" || method === "both") {
          return value && value.trim().length >= 10;
        }
        return true;
      },
      message: "العنوان مطلوب لتقديم الخدمة في المكان",
    },
    {
      maxLength: 200,
      message: "العنوان طويل جداً",
    },
  ] as ValidationRule[],

  official_url: [
    {
      custom: (value: string) => {
        if (!value || value.trim() === "") return true;
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      message: "يرجى إدخال رابط صحيح",
    },
  ] as ValidationRule[],

  bio: [
    {
      required: true,
      message: "السيرة الذاتية مطلوبة",
    },
    {
      minLength: 50,
      message: "السيرة الذاتية يجب أن تكون 50 حرف على الأقل",
    },
    {
      maxLength: 500,
      message: "السيرة الذاتية طويلة جداً",
    },
  ] as ValidationRule[],

  services: [
    {
      maxLength: 300,
      message: "قائمة الخدمات طويلة جداً",
    },
  ] as ValidationRule[],

  facebook_url: [
    {
      custom: (value: string) => {
        if (!value || value.trim() === "") return true;
        return /^https?:\/\/(www\.)?facebook\.com\//.test(value);
      },
      message: "يرجى إدخال رابط فيسبوك صحيح",
    },
  ] as ValidationRule[],

  instagram_url: [
    {
      custom: (value: string) => {
        if (!value || value.trim() === "") return true;
        return /^https?:\/\/(www\.)?instagram\.com\//.test(value);
      },
      message: "يرجى إدخال رابط إنستقرام صحيح",
    },
  ] as ValidationRule[],

  whatsapp_url: [
    {
      custom: (value: string) => {
        if (!value || value.trim() === "") return true;
        return /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(value);
      },
      message: "يرجى إدخال رابط واتساب صحيح",
    },
  ] as ValidationRule[],

  other_urls: [
    {
      custom: (value: string) => {
        if (!value || value.trim() === "") return true;
        const urls = value.split(",").map((url) => url.trim());
        if (urls.length > 4) return false;
        return urls.every((url) => {
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        });
      },
      message: "يرجى إدخال روابط صحيحة مفصولة بفاصلة (حد أقصى 4 روابط)",
    },
  ] as ValidationRule[],

  slug: [
    {
      required: true,
      message: "رابط الصفحة مطلوب",
    },
    {
      minLength: 3,
      message: "رابط الصفحة يجب أن يكون 3 أحرف على الأقل",
    },
    {
      maxLength: 100,
      message: "رابط الصفحة طويل جداً",
    },
    {
      pattern: /^[a-z0-9-]+$/,
      message:
        "رابط الصفحة يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط",
    },
  ] as ValidationRule[],

  keywords: [
    {
      maxLength: 200,
      message: "الكلمات المفتاحية طويلة جداً",
    },
  ] as ValidationRule[],

  // Step 2: Trust Documents
  logo_image_file: [
    {
      required: true,
      message: "صورة الشعار مطلوبة",
    },
  ] as ValidationRule[],

  id_card_front_image: [
    {
      required: true,
      message: "صورة الهوية الأمامية مطلوبة",
    },
  ] as ValidationRule[],

  id_card_back_image: [
    {
      required: true,
      message: "صورة الهوية الخلفية مطلوبة",
    },
  ] as ValidationRule[],

  video_url_file: [
    {
      required: true,
      message: "فيديو التعريف مطلوب",
    },
  ] as ValidationRule[],

  certificates_images_files: [
    {
      custom: (value: FileList | null) => {
        if (!value) return true;
        return value.length <= 4;
      },
      message: "يمكن رفع 4 شهادات كحد أقصى",
    },
  ] as ValidationRule[],

  document_list_files: [
    {
      custom: (value: FileList | null) => {
        if (!value) return true;
        return value.length <= 4;
      },
      message: "يمكن رفع 4 مستندات كحد أقصى",
    },
  ] as ValidationRule[],

  notes: [
    {
      maxLength: 500,
      message: "الملاحظات طويلة جداً",
    },
  ] as ValidationRule[],
};

/**
 * Validate a single field value against its validation rules
 */
export function validateField(
  value: any,
  rules: ValidationRule[],
  formData?: Record<string, any>
): { isValid: boolean; message: string } {
  if (!rules || rules.length === 0) {
    return { isValid: true, message: "" };
  }

  for (const rule of rules) {
    // Check required
    if (
      rule.required &&
      (!value || (typeof value === "string" && value.trim() === ""))
    ) {
      return { isValid: false, message: rule.message };
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === "string" && value.trim() === "")) {
      continue;
    }

    // Check minLength
    if (
      rule.minLength &&
      typeof value === "string" &&
      value.length < rule.minLength
    ) {
      return { isValid: false, message: rule.message };
    }

    // Check maxLength
    if (
      rule.maxLength &&
      typeof value === "string" &&
      value.length > rule.maxLength
    ) {
      return { isValid: false, message: rule.message };
    }

    // Check pattern
    if (
      rule.pattern &&
      typeof value === "string" &&
      !rule.pattern.test(value)
    ) {
      return { isValid: false, message: rule.message };
    }

    // Check custom validation
    if (rule.custom && !rule.custom(value, formData)) {
      return { isValid: false, message: rule.message };
    }
  }

  return { isValid: true, message: "" };
}
