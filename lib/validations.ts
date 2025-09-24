import { z } from "zod/v4";

// Helper: treat empty string as undefined for optional URL fields
const optionalUrl = (message: string) =>
  z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url(message).optional()
  );

// Define constants for file validation
const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_ID_CARD_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_VIDEO_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_CERTIFICATE_SIZE = 5 * 1024 * 1024; // 5MB per certificate

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
];
const ACCEPTED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
];

// Service delivery method enum
export const serviceDeliveryMethods = ["online", "offline", "both"] as const;
export type ServiceDeliveryMethod = (typeof serviceDeliveryMethods)[number];

// Step 1: Basic Information Schema
export const step1Schema = z.object({
  service_name: z
    .string({ error: "اسم الخدمة مطلوب" })
    .min(3, "اسم الخدمة يجب أن يكون 3 أحرف على الأقل")
    .max(100, "اسم الخدمة طويل جداً"),
  years_of_experience: z
    .number({ error: "سنوات الخبرة مطلوبة" })
    .int("سنوات الخبرة يجب أن تكون رقمًا صحيحًا")
    .min(0, "سنوات الخبرة يجب أن تكون رقمًا موجبًا")
    .max(60, "سنوات الخبرة تبدو غير واقعية (الحد الأقصى 60)"),
  governorate_id: z
    .string({ error: "المدينة مطلوبة" })
    .uuid("يرجى اختيار مدينة صحيحة"),
  service_category_id: z
    .string({ error: "التصنيف مطلوب" })
    .uuid("يرجى اختيار تصنيف صحيح"),
  service_delivery_method: z.enum(
    serviceDeliveryMethods,
    "طريقة تقديم الخدمة مطلوبة"
  ),
  service_description: z
    .string({ error: "وصف الخدمة مطلوب" })
    .min(10, "وصف الخدمة يجب أن يكون 10 أحرف على الأقل")
    .max(1000, "وصف الخدمة طويل جداً"),
  bio: z.string().max(1000, "النبذة التعريفية طويلة جداً").optional(),
  phone: z
    .string({ error: "رقم الهاتف مطلوب" })
    .max(20, "رقم الهاتف طويل جداً"),
  address: z.string().max(255, "العنوان طويل جداً").optional(),
  facebook_url: optionalUrl("رابط فيسبوك غير صالح"),
  instagram_url: optionalUrl("رابط إنستاجرام غير صالح"),
  whatsapp_url: optionalUrl("رابط واتساب غير صالح"),
  official_url: optionalUrl("رابط الموقع الرسمي غير صالح"),
  other_urls: z.string().max(500, "قائمة الروابط الأخرى طويلة جداً").optional(),
  services: z.string().max(500, "قائمة الخدمات طويلة جداً").optional(),
  keywords: z.string().max(255, "الكلمات المفتاحية طويلة جداً").optional(),
  slug: z
    .string({ error: "الرابط التعريفي مطلوب" })
    .min(3, "الرابط التعريفي يجب أن يكون 3 أحرف على الأقل")
    .max(50, "الرابط التعريفي طويل جداً")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "الرابط التعريفي يجب أن يحتوي على أحرف صغيرة وأرقام وفواصل '-' فقط"
    ),
  logo_image: z.string().optional(),
  logo_image_file: z.file().optional().nullable(),
});

// Step 2: Documents Schema
export const step2Schema = z
  .object({
    id_card_front_image: z.string().optional(),
    id_card_front_image_file: z.file().optional().nullable(),
    id_card_back_image: z.string().optional(),
    id_card_back_image_file: z.file().optional().nullable(),
    video_url: z.string().optional(),
    video_url_file: z.file().optional().nullable(),
    certificates_images: z.string().optional(),
    certificates_images_files: z.array(z.file()).optional().nullable(),
    document_list: z.string().optional(),
    document_list_files: z.array(z.file()).optional().nullable(),
    notes: z.string().max(500, "الملاحظات طويلة جداً").optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.id_card_front_image_file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "صورة البطاقة الأمامية مطلوبة",
        path: ["id_card_front_image_file"],
      });
    }
    if (!val.id_card_back_image_file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "صورة البطاقة الخلفية مطلوبة",
        path: ["id_card_back_image_file"],
      });
    }
    if (!val.video_url_file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "الفيديو التعريفي مطلوب",
        path: ["video_url_file"],
      });
    }
  });
export const acceptAnySchema = z
  .object({
    ...step1Schema.shape,
    ...step2Schema.shape,
  })
  .optional();
// Complete form schema
export const completeFormSchema = step1Schema.extend(step2Schema);

// Types
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type CompleteFormData = z.infer<typeof completeFormSchema>;

// Default values
export const step1DefaultValues: Step1Data = {
  service_name: "",
  years_of_experience: 0,
  governorate_id: "",
  service_category_id: "",
  service_delivery_method: "online",
  service_description: "",
  bio: "",
  phone: "",
  address: "",
  facebook_url: "",
  instagram_url: "",
  whatsapp_url: "",
  official_url: "",
  other_urls: "",
  services: "",
  keywords: "",
  slug: "",
  logo_image: "",
  logo_image_file: null,
};

export const step2DefaultValues: Step2Data = {
  id_card_front_image: "",
  id_card_front_image_file: null,
  id_card_back_image: "",
  id_card_back_image_file: null,
  video_url: "",
  video_url_file: null,
  certificates_images: "",
  certificates_images_files: null,
  document_list: "",
  document_list_files: null,
  notes: "",
};
