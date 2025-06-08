import { z } from "zod";

// Base file validation schemas
const baseImageSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 10 * 1024 * 1024,
    "حجم الملف يجب أن يكون أقل من 10 ميغابايت"
  )
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "نوع الملف غير مدعوم. يُرجى رفع JPG, PNG, أو WEBP"
  );

const videoFileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 100 * 1024 * 1024,
    "حجم الفيديو يجب أن يكون أقل من 100 ميغابايت"
  )
  .refine(
    (file) => ["video/mp4", "video/webm", "video/ogg"].includes(file.type),
    "نوع الفيديو غير مدعوم. يُرجى رفع MP4, WEBM, أو OGG"
  );

const documentFileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 10 * 1024 * 1024,
    "حجم الملف يجب أن يكون أقل من 10 ميغابايت"
  )
  .refine(
    (file) =>
      [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type),
    "نوع الملف غير مدعوم. يُرجى رفع PDF, DOC, DOCX, JPG, أو PNG"
  );

// Required image schema (for mandatory uploads)
const requiredImageSchema = baseImageSchema;

// Optional image schema (for optional uploads)
const optionalImageSchema = baseImageSchema.optional();

// Required video schema
const requiredVideoSchema = videoFileSchema;

// Optional document array schema (max 4 files)
const optionalDocumentArraySchema = z
  .array(documentFileSchema)
  .max(4, "يمكن رفع 4 ملفات كحد أقصى")
  .optional();

// Service delivery method enum
export const serviceDeliveryMethodSchema = z.enum(
  ["online", "offline", "both"],
  {
    required_error: "يرجى اختيار طريقة تقديم الخدمة",
  }
);

// Step 1 Schema - Service Information
export const step1Schema = z
  .object({
    logo_image_file: requiredImageSchema,
    service_name: z
      .string()
      .min(2, "اسم الخدمة يجب أن يكون على الأقل حرفين")
      .max(100, "اسم الخدمة طويل جداً"),
    service_description: z
      .string()
      .min(50, "وصف الخدمة يجب أن يكون على الأقل 50 حرف")
      .max(1000, "وصف الخدمة طويل جداً"),
    service_category_id: z.string().min(1, "يرجى اختيار فئة الخدمة"),
    governorate_id: z.string().min(1, "يرجى اختيار المحافظة"),
    years_of_experience: z.coerce
      .number()
      .min(0, "سنوات الخبرة يجب أن تكون 0 أو أكثر")
      .max(50, "سنوات الخبرة لا يمكن أن تكون أكثر من 50"),
    service_delivery_method: serviceDeliveryMethodSchema,
    address: z.string().optional(),
    official_url: z
      .string()
      .url("يرجى إدخال رابط صحيح")
      .optional()
      .or(z.literal("")),
    bio: z
      .string()
      .min(20, "السيرة الذاتية يجب أن تكون على الأقل 20 حرف")
      .max(500, "السيرة الذاتية طويلة جداً"),
    services: z.string().optional(),
    facebook_url: z
      .string()
      .url("يرجى إدخال رابط فيسبوك صحيح")
      .optional()
      .or(z.literal("")),
    instagram_url: z
      .string()
      .url("يرجى إدخال رابط انستغرام صحيح")
      .optional()
      .or(z.literal("")),
    whatsapp_url: z
      .string()
      .url("يرجى إدخال رابط واتساب صحيح")
      .optional()
      .or(z.literal("")),
    other_urls: z.string().optional(),
    slug: z
      .string()
      .min(3, "الرابط يجب أن يكون على الأقل 3 أحرف")
      .max(50, "الرابط طويل جداً")
      .regex(
        /^[a-z0-9-]+$/,
        "الرابط يجب أن يحتوي على أحرف انجليزية صغيرة وأرقام وشرطات فقط"
      ),
    keywords: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.service_delivery_method === "offline" ||
        data.service_delivery_method === "both"
      ) {
        return data.address && data.address.length >= 10;
      }
      return true;
    },
    {
      message: "العنوان مطلوب عند اختيار الخدمة المكتبية أو كلاهما",
      path: ["address"],
    }
  );

// Step 2 Schema - Trust Documents (Admin Only)
export const step2Schema = z.object({
  id_card_front_image: requiredImageSchema,
  id_card_back_image: requiredImageSchema,
  video_url_file: requiredVideoSchema,
  certificates_images_files: optionalDocumentArraySchema,
  document_list_files: optionalDocumentArraySchema,
  notes: z.string().optional(),
});

// Complete form schema
export const serviceProviderSchema = step1Schema.and(step2Schema);

// TypeScript types
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type ServiceProviderFormData = z.infer<typeof serviceProviderSchema>;

// Form state for useActionState
export interface FormState {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  step?: number;
}

// Initial form state
export const initialFormState: FormState = {
  success: false,
  step: 1,
};
