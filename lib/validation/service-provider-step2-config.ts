// lib/validation/service-provider-step2-config.ts
import { FormConfig } from "./types";
import { serviceProviderValidations } from "./validators";

export const serviceProviderStep2Config: FormConfig = {
  title: "وثائق التحقق والثقة",
  description: "يرجى تحميل الوثائق المطلوبة للتحقق من هويتك ومؤهلاتك",
  submitButtonText: "إرسال الطلب للمراجعة",
  fields: [
    {
      name: "id_card_front_image",
      label: "صورة الهوية الأمامية",
      placeholder: "اختر صورة الهوية الأمامية",
      type: "file",
      required: true,
      validationRules: serviceProviderValidations.id_card_front_image,
      accept: "image/*",
      helpText: "يرجى رفع صورة واضحة للجهة الأمامية من هوية الأحوال المدنية",
      gridCols: 6,
    },
    {
      name: "id_card_back_image",
      label: "صورة الهوية الخلفية",
      placeholder: "اختر صورة الهوية الخلفية",
      type: "file",
      required: true,
      validationRules: serviceProviderValidations.id_card_back_image,
      accept: "image/*",
      helpText: "يرجى رفع صورة واضحة للجهة الخلفية من هوية الأحوال المدنية",
      gridCols: 6,
    },
    {
      name: "video_url_file",
      label: "فيديو التعريف الشخصي",
      placeholder: "اختر فيديو التعريف",
      type: "file",
      required: true,
      validationRules: serviceProviderValidations.video_url_file,
      accept: "video/*",
      helpText:
        "فيديو قصير (30-60 ثانية) تقدمين فيه نفسك وخدماتك باللغة العربية",
      gridCols: 12,
    },
    {
      name: "certificates_images_files",
      label: "الشهادات والمؤهلات",
      placeholder: "اختر صور الشهادات",
      type: "file",
      required: false,
      validationRules: serviceProviderValidations.certificates_images_files,
      accept: "image/*",
      multiple: true,
      helpText:
        "يمكنك رفع شهادات التخرج، شهادات الخبرة، أو أي مؤهلات أخرى (حد أقصى 4 ملفات)",
      gridCols: 12,
    },
    {
      name: "document_list_files",
      label: "مستندات إضافية",
      placeholder: "اختر المستندات الإضافية",
      type: "file",
      required: false,
      validationRules: serviceProviderValidations.document_list_files,
      accept: ".pdf,.doc,.docx,image/*",
      multiple: true,
      helpText:
        "أي مستندات إضافية تدعم خدماتك مثل أعمال سابقة، رخص مهنية (حد أقصى 4 ملفات)",
      gridCols: 12,
    },
    {
      name: "notes",
      label: "ملاحظات إضافية",
      placeholder: "أي معلومات إضافية تود مشاركتها مع فريق المراجعة...",
      type: "textarea",
      required: false,
      validationRules: serviceProviderValidations.notes,
      rows: 4,
      helpText: "يمكنك إضافة أي معلومات أو ملاحظات تساعد في مراجعة طلبك",
      gridCols: 12,
    },
  ],
};
