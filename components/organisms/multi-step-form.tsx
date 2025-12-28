"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  step1Schema,
  step2Schema,
  type Step1Data,
  type Step2Data,
  step1DefaultValues,
  step2DefaultValues,
} from "@/lib/validations";
import {
  Camera,
  FileText,
  Video,
  Award,
  CheckCircle,
  FileImage,
  Globe,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import type { GovernorateDto, CategoryDto } from "@/lib/api/types";
import { FileUpload } from "../atoms/file-upload";
import { motion } from "motion/react";
import { toast } from "sonner";
import { MessageAlert } from "@/components/atoms/message-alert";
import Logo from "../atoms/logo";

const steps = [
  {
    id: 1,
    title: "إنشاء البروفايل",
    description: "المعلومات الأساسية والتعريف",
  },
  {
    id: 2,
    title: "التوثيق والشهادات",
    description: "رفع الوثائق والشهادات المطلوبة",
  },
] as const;

const ServiceInfoRequirements = [
  {
    icon: <FileImage className="h-5 w-5 text-primary" />,
    title: "صورة الشعار أو الخدمة",
    description: "يفضل أن تكون صورة مربعة وواضحة تعبر عن الخدمة.",
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "اسم الخدمة",
    description: "الاسم الذي سيظهر للعملاء للتعريف بخدمتك.",
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "وصف الخدمة",
    description: "شرح مفصل للخدمة التي تقدمها وما يميزها.",
  },
  {
    icon: <MapPin className="h-5 w-5 text-primary" />,
    title: "التصنيف والمحافظة",
    description: "تحديد تصنيف الخدمة والمحافظة التي تتواجد بها.",
  },
  {
    icon: <Award className="h-5 w-5 text-primary" />,
    title: "سنوات الخبرة وطريقة تقديم الخدمة",
    description: "عدد سنوات خبرتك وكيفية تقديم الخدمة (أونلاين/حضوري).",
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "المعلومات الشخصية والاتصال",
    description: "نبذة تعريفية، رقم الهاتف، والعنوان إذا لزم الأمر.",
  },
  {
    icon: <Globe className="h-5 w-5 text-primary" />,
    title: "روابط التواصل الاجتماعي والموقع الرسمي",
    description:
      "روابط صفحاتك على فيسبوك، انستغرام، واتساب، وموقعك الرسمي إن وجد.",
  },
] as const;

const TrustDocumentsRequirements = [
  {
    icon: <FileImage className="h-5 w-5 text-amber-600" />,
    title: "صور بطاقة الهوية (الأمام والخلف)",
    description: "صور واضحة لبطاقة الهوية الوطنية أو جواز السفر.",
  },
  {
    icon: <Video className="h-5 w-5 text-amber-600" />,
    title: "فيديو تعريفي (اختياري)",
    description: "فيديو قصير تعرف فيه بنفسك وبخدماتك.",
  },
  {
    icon: <Award className="h-5 w-5 text-amber-600" />,
    title: "الشهادات",
    description: "صور من شهادات الخبرة أو المؤهلات العلمية ذات الصلة.",
  },
  {
    icon: <FileText className="h-5 w-5 text-amber-600" />,
    title: "مستندات إضافية (اختياري)",
    description: "أي مستندات أخرى تدعم ملفك كمقدم خدمة.",
  },
  {
    icon: <FileText className="h-5 w-5 text-amber-600" />,
    title: "ملاحظات إضافية (اختياري)",
    description: "أي معلومات أو ملاحظات تود إضافتها.",
  },
] as const;
export default function MultiStepForm() {
  const [showPreStepsInfo, setShowPreStepsInfo] = useState(true);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [serviceProviderId, setServiceProviderId] = useState<number | null>(null);
  const [governorates, setGovernorates] = useState<GovernorateDto[]>([]);
  const [serviceCategories, setServiceCategories] = useState<CategoryDto[]>([]);

  // Add file states
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [idCardFront, setIdCardFront] = useState<File | null>(null);
  const [idCardBack, setIdCardBack] = useState<File | null>(null);
  const [personalVideo, setPersonalVideo] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);

  // Fetch governorates and service categories from internal API routes (to avoid CORS)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [govsRes, catsRes] = await Promise.all([
          fetch("/api/governorates/list"),
          fetch("/api/service-categories"),
        ]);
        const govs = govsRes.ok ? await govsRes.json() : [];
        const cats = catsRes.ok ? await catsRes.json() : [];
        setGovernorates(govs);
        setServiceCategories(cats);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema) as any,
    defaultValues: step1DefaultValues,
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: step2DefaultValues,
  });

  const onStep1Submit = async (data: Step1Data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Generate a slug if not provided
      const slugBase =
        data.slug ||
        data.service_name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      // Ensure uniqueness by appending a random 4-digit number
      const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
      const slug = `${slugBase}-${randomDigits}`;

      // Map frontend field names to backend API field names
      const { createServiceProviderInfo } = await import("@/lib/api/service-providers");

      // Map service delivery method from string to number
      const serviceDeliveryMethodMap: Record<string, number> = {
        "online": 0,
        "offline": 1,
        "both": 2,
      };

      const apiPayload = {
        categoryId: parseInt(data.service_category_id, 10),
        governorateId: parseInt(data.governorate_id, 10),
        serviceName: data.service_name,
        serviceDescription: data.service_description,
        bio: data.bio || "",
        serviceDeliveryMethod: serviceDeliveryMethodMap[data.service_delivery_method] ?? 2,
        yearsOfExperience: data.years_of_experience,
        facebookUrl: data.facebook_url || undefined,
        instagramUrl: data.instagram_url || undefined,
        whatsappUrl: data.whatsapp_url || undefined,
        otherUrls: data.other_urls || undefined,
        keywords: data.keywords || undefined,
        address: data.address || undefined,
        officialUrl: data.official_url || undefined,
        services: data.services || undefined,
        phone: data.phone,
      };

      const response = await createServiceProviderInfo(apiPayload);

      // Handle nested data structure from backend
      const responseData = response.data || response;

      if (response.success && responseData && 'id' in responseData) {
        const providerId = (responseData as any).id;
        console.log("✅ Step 1 Success - Service Provider ID:", providerId);

        setStep1Data(data);
        setServiceProviderId(providerId);
        setCurrentStep(2);
        toast.success("تم حفظ البيانات بنجاح");
      } else {
        const errorMessage = response.message || "حدث خطأ أثناء حفظ البيانات";
        console.error("❌ Step 1 Error:", errorMessage);
        setSubmitError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Step 1 submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onStep2Submit = async (data: Step2Data) => {
    if (!serviceProviderId) {
      toast.error("لم يتم العثور على معرف مقدم الخدمة");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Upload files to the backend API using the service provider ID from step 1
      const { uploadServiceProviderFiles } = await import("@/lib/api/service-providers");

      // Upload files (all are optional now)
      await uploadServiceProviderFiles(serviceProviderId, {
        logoImage: profileImage || undefined,
        coverImage: undefined, // Cover image is optional
        idCardFront: idCardFront || undefined,
        idCardBack: idCardBack || undefined,
        certificates: certificates.length > 0 ? certificates : undefined,
      });

      setSubmitError(null);
      setIsCompleted(true);
      toast.success("تم إرسال طلب التسجيل بنجاح");
    } catch (error) {
      console.error("Step 2 submission error:", error);
      const msg =
        error instanceof Error
          ? error.message
          : "حدث خطأ غير متوقع أثناء رفع الملفات";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setCurrentStep(1);
  };
  if (showPreStepsInfo) {
    return (
      <div className="max-w-4xl mx-auto md:px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="text-center pb-4 sm:pb-6 lg:pb-8 bg-primary-light px-4 sm:px-6 lg:px-8">
              <Logo className="h-10 sm:h-12 lg:h-16 w-auto mx-auto mb-3 sm:mb-4" />
              <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 px-2">
                مرحباً بك في برنامج تسجيل مقدمي الخدمات
              </CardTitle>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2">
                يسعدنا انضمامك إلى منصتنا. يرجى اتباع الخطوات التالية لإكمال
                عملية التسجيل وتقديم خدماتك لمجتمعنا.
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-6 sm:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    متطلبات التسجيل كمقدم خدمة
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    قبل البدء في عملية التسجيل، يرجى التأكد من أن لديك جميع
                    المعلومات والمستندات التالية جاهزة. هذا سيسهل عليك إكمال
                    النموذج بسرعة وكفاءة.
                  </p>
                </motion.div>

                {/* Service Information Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    معلومات الخدمة المطلوبة
                  </h3>
                  <div className="space-y-4">
                    {ServiceInfoRequirements.map((requirement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + index * 0.05,
                        }}
                        className="flex gap-3"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {requirement.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">
                            {requirement.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {requirement.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Trust Documents Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-amber-50 border border-amber-200 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    مستندات التوثيق المطلوبة
                  </h3>
                  <div className="space-y-4">
                    {TrustDocumentsRequirements.map((requirement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.2 + index * 0.05,
                        }}
                        className="flex gap-3"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {requirement.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">
                            {requirement.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {requirement.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Important Note */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>ملاحظة مهمة:</strong> سيتم مراجعة جميع البيانات
                    والمستندات المقدمة. قد يستغرق الأمر بعض الوقت للموافقة على
                    طلبك. تأكد من أن جميع المعلومات دقيقة وكاملة لتجنب أي تأخير.
                  </p>
                </motion.div>

                {/* Continue Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex justify-center pt-4"
                >
                  <Button
                    onClick={() => setShowPreStepsInfo(false)}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base font-medium"
                    size="lg"
                  >
                    متابعة إلى خطوات التسجيل
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }
  if (isCompleted) {
    return (
      <div className="h-full bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center relative overflow-clip">
            <CardContent className="p-12 ">
              <div className="flex justify-center mb-8">
                <Image
                  src="/hunna-lahunn-cover.png"
                  alt=""
                  width={555}
                  height={555}
                  className="rounded-lg absolute top-5"
                />
                <Image
                  src="/success.png"
                  alt="Success"
                  width={300}
                  height={300}
                  className="rounded-lg relative"
                />

                <Image
                  src="/flower.png"
                  alt=""
                  width={200}
                  height={200}
                  className="rounded-lg absolute -top-10 -left-15"
                />
                <Image
                  src="/flower.png"
                  alt="Success"
                  width={200}
                  height={200}
                  className="rounded-lg absolute -top-10 -left-15"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                تم ارسال البيانات بنجاح
              </h1>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                أدعمك لتزدادي وعياً ومكناً وثقة وقدرة لخوض الرحلة بكامل صحتك
                وعافيتك كامرأة وأم، كما ستحصلين بالإضافة إلى تقديم خدمات
                استشارية متخصصة لكي ...
              </p>
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-primary hover:bg-primary/40"
              >
                الذهاب إلى الصفحة الرئيسية
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            👑 مرحباً بكم في هن لهن 👑
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border-2 transition-all ${currentStep === step.id
                    ? "border-primary bg-pink-50"
                    : currentStep > step.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white"
                    }`}
                >
                  <div className="text-right">
                    <h3 className="font-semibold text-gray-900">
                      الخطوة {step.id}: {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-right text-2xl text-primary text-center">
                  {currentStep === 1
                    ? "الخطوة الأولى: إنشاء البروفايل"
                    : "الخطوة الثانية: التوثيق والشهادات"}
                </CardTitle>
                <p className="text-right text-gray-600">
                  أدعمك لتزدادي وعياً ومكناً وثقة وقدرة لخوض الرحلة بكامل صحتك
                  وعافيتك كامرأة وأم، كما ستحصلين بالإضافة إلى تقديم خدمات
                  استشارية متخصصة لكي ...
                </p>
              </CardHeader>
              <CardContent>
                {currentStep === 1 ? (
                  <form
                    onSubmit={step1Form.handleSubmit(onStep1Submit)}
                    className="space-y-6"
                  >
                    {/* Error message at top */}
                    {submitError && (
                      <div className="rounded-md bg-red-50 border border-red-200 p-4">
                        <p className="text-sm text-red-600 text-center font-medium">
                          {submitError}
                        </p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="service_name">
                          اسم الخدمة <span className="text-red-700">*</span>
                        </Label>
                        <Input
                          id="service_name"
                          {...step1Form.register("service_name")}
                          className="text-right"
                        />
                        {step1Form.formState.errors.service_name && (
                          <p className="text-red-500 text-sm">
                            {step1Form.formState.errors.service_name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="years_of_experience">
                          عدد سنوات الخبرة <span className="text-red-700">*</span>
                        </Label>
                        <Input
                          id="years_of_experience"
                          type="number"
                          {...step1Form.register("years_of_experience", {
                            valueAsNumber: true,
                          })}
                          className="text-right"
                        />
                        {step1Form.formState.errors.years_of_experience && (
                          <p className="text-red-500 text-sm">
                            {
                              step1Form.formState.errors.years_of_experience
                                .message
                            }
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 dir-rtl" dir="rtl">
                        <Label htmlFor="governorate_id">
                          المدينة <span className="text-red-700">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            step1Form.setValue("governorate_id", value)
                          }
                          defaultValue={step1Form.getValues("governorate_id")}
                        >
                          <SelectTrigger className="w-full dir-rtl">
                            <SelectValue placeholder="اختر المدينة" />
                          </SelectTrigger>
                          <SelectContent>
                            {governorates.map((gov) => (
                              <SelectItem key={gov.id} value={gov.id.toString()}>
                                {gov.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {step1Form.formState.errors.governorate_id && (
                          <p className="text-red-500 text-sm">
                            {step1Form.formState.errors.governorate_id.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service_category_id">
                          التصنيف <span className="text-red-700">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            step1Form.setValue("service_category_id", value)
                          }
                          defaultValue={step1Form.getValues(
                            "service_category_id"
                          )}
                        >
                          <SelectTrigger className="w-full dir-rtl">
                            <SelectValue placeholder="اختر التصنيف" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceCategories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {step1Form.formState.errors.service_category_id && (
                          <p className="text-red-500 text-sm">
                            {
                              step1Form.formState.errors.service_category_id
                                .message
                            }
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service_delivery_method">
                          طريقة تقديم الخدمة <span className="text-red-700">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            step1Form.setValue(
                              "service_delivery_method",
                              value as any
                            )
                          }
                          defaultValue={step1Form.getValues(
                            "service_delivery_method"
                          )}
                        >
                          <SelectTrigger className="w-full dir-rtl">
                            <SelectValue placeholder="اختر طريقة تقديم الخدمة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">عبر الإنترنت</SelectItem>
                            <SelectItem value="offline">حضوري</SelectItem>
                            <SelectItem value="both">كلاهما</SelectItem>
                          </SelectContent>
                        </Select>
                        {step1Form.formState.errors.service_delivery_method && (
                          <p className="text-red-500 text-sm">
                            {
                              step1Form.formState.errors.service_delivery_method
                                .message
                            }
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          رقم الهاتف <span className="text-red-700">*</span>
                        </Label>
                        <Input
                          id="phone"
                          {...step1Form.register("phone")}
                          className="text-right"
                          placeholder="أدخل رقم الهاتف"
                        />
                        {step1Form.formState.errors.phone && (
                          <p className="text-red-500 text-sm">
                            {step1Form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service_description">
                        وصف الخدمة <span className="text-red-700">*</span>
                      </Label>
                      <Textarea
                        id="service_description"
                        {...step1Form.register("service_description")}
                        className="text-right min-h-[100px]"
                        placeholder="اكتب وصفاً للخدمة التي تقدمها"
                      />
                      {step1Form.formState.errors.service_description && (
                        <p className="text-red-500 text-sm">
                          {
                            step1Form.formState.errors.service_description
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="services">الخدمات الفرعية (اختياري)</Label>
                      <Textarea
                        id="services"
                        {...step1Form.register("services")}
                        className="text-right"
                        placeholder="اكتب الخدمات الفرعية مفصولة بفواصل"
                      />
                      {step1Form.formState.errors.services && (
                        <p className="text-red-500 text-sm">
                          {step1Form.formState.errors.services.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">العنوان (اختياري)</Label>
                      <Input
                        id="address"
                        {...step1Form.register("address")}
                        className="text-right"
                        placeholder="أدخل العنوان"
                      />
                      {step1Form.formState.errors.address && (
                        <p className="text-red-500 text-sm">
                          {step1Form.formState.errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="bio">نبذة عن مقدم الخدمة <span className="text-red-500">*</span></Label>
                        <Textarea
                          id="bio"
                          {...step1Form.register("bio")}
                          className="text-right min-h-[100px]"
                          placeholder="اكتب نبذة عن نفسك وخدماتك (10-2000 حرف)"
                        />
                        {step1Form.formState.errors.bio && (
                          <p className="text-red-500 text-sm">
                            {step1Form.formState.errors.bio.message}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp_url">رابط الواتساب (اختياري)</Label>
                          <Input
                            id="whatsapp_url"
                            {...step1Form.register("whatsapp_url")}
                            className="text-right"
                            placeholder="رابط الواتساب"
                          />
                          {step1Form.formState.errors.whatsapp_url && (
                            <p className="text-red-500 text-sm">
                              {step1Form.formState.errors.whatsapp_url.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="facebook_url">رابط الفيسبوك (اختياري)</Label>
                          <Input
                            id="facebook_url"
                            {...step1Form.register("facebook_url")}
                            className="text-right"
                            placeholder="رابط الفيسبوك"
                          />
                          {step1Form.formState.errors.facebook_url && (
                            <p className="text-red-500 text-sm">
                              {step1Form.formState.errors.facebook_url.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instagram_url">رابط الانستغرام (اختياري)</Label>
                          <Input
                            id="instagram_url"
                            {...step1Form.register("instagram_url")}
                            className="text-right"
                            placeholder="رابط الانستغرام"
                          />
                          {step1Form.formState.errors.instagram_url && (
                            <p className="text-red-500 text-sm">
                              {step1Form.formState.errors.instagram_url.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="official_url">الموقع الرسمي (اختياري)</Label>
                          <Input
                            id="official_url"
                            {...step1Form.register("official_url")}
                            className="text-right"
                            placeholder="رابط الموقع الرسمي"
                          />
                          {step1Form.formState.errors.official_url && (
                            <p className="text-red-500 text-sm">
                              {step1Form.formState.errors.official_url.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="other_urls">روابط أخرى (اختياري)</Label>
                        <Input
                          id="other_urls"
                          {...step1Form.register("other_urls")}
                          className="text-right"
                          placeholder="روابط أخرى (مفصولة بفواصل)"
                        />
                        {step1Form.formState.errors.other_urls && (
                          <p className="text-red-500 text-sm">
                            {step1Form.formState.errors.other_urls.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="keywords">الكلمات المفتاحية (اختياري)</Label>
                        <Input
                          id="keywords"
                          {...step1Form.register("keywords")}
                          className="text-right"
                          placeholder="الكلمات المفتاحية (مفصولة بفواصل)"
                        />
                        {step1Form.formState.errors.keywords && (
                          <p className="text-red-500 text-sm">
                            {step1Form.formState.errors.keywords.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Error message at bottom */}
                    {submitError && (
                      <div className="rounded-md bg-red-50 border border-red-200 p-4">
                        <p className="text-sm text-red-600 text-center font-medium">
                          {submitError}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" disabled>
                        السابق
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/40"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "جاري الحفظ..." : "حفظ ومتابعة"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form
                    onSubmit={step2Form.handleSubmit(onStep2Submit)}
                    className="space-y-6"
                  >
                    {/* Badge at top */}
                    <div className="bg-gradient-to-r from-pink-100 to-pink-50 border border-pink-200 rounded-lg p-4 text-center">
                      <p className="text-pink-700 font-semibold">
                        📋 يرجى رفع المستندات المطلوبة لإكمال التسجيل
                      </p>
                      <p className="text-pink-600 text-sm mt-1">
                        الحقول المميزة بـ <span className="text-red-500">*</span> إلزامية
                      </p>
                    </div>

                    {submitError && (
                      <MessageAlert type="error" message={submitError} />
                    )}

                    {/* Logo Upload */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        شعار أو صورة الخدمة (اختياري)
                      </Label>
                      <FileUpload
                        onFileSelect={(file) => {
                          setProfileImage(file);
                          step2Form.setValue("logo_image_file", file);
                        }}
                        accept="image/*"
                        placeholder="اسحب الصورة أو لوجو الخاص بيك من الجهاز"
                        icon={<Camera className="w-12 h-12 text-pink-500" />}
                        file={profileImage}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-lg font-semibold mb-2 block">
                          البطاقة الشخصية من الأمام <span className="text-red-500">*</span>
                        </Label>
                        <p className="text-gray-500 text-sm mb-4">صورة واضحة للبطاقة الشخصية من الأمام</p>
                        <FileUpload
                          onFileSelect={(file) => {
                            setIdCardFront(file);
                            step2Form.setValue(
                              "id_card_front_image_file",
                              file
                            );
                          }}
                          accept="image/*"
                          placeholder="اسحب البطاقة الشخصية من الأمام من الجهاز"
                          icon={
                            <FileText className="w-12 h-12 text-pink-500" />
                          }
                          file={idCardFront}
                        />
                        {step2Form.formState.errors.id_card_front_image_file && (
                          <p className="text-red-500 text-sm mt-2">
                            {`${step2Form.formState.errors.id_card_front_image_file.message}`}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-lg font-semibold mb-2 block">
                          البطاقة الشخصية من الخلف <span className="text-red-500">*</span>
                        </Label>
                        <p className="text-gray-500 text-sm mb-4">صورة واضحة للبطاقة الشخصية من الخلف</p>
                        <FileUpload
                          onFileSelect={(file) => {
                            setIdCardBack(file);
                            step2Form.setValue("id_card_back_image_file", file);
                          }}
                          accept="image/*"
                          placeholder="اسحب البطاقة الشخصية من الخلف من الجهاز"
                          icon={
                            <FileText className="w-12 h-12 text-pink-500" />
                          }
                          file={idCardBack}
                        />
                        {step2Form.formState.errors.id_card_back_image_file && (
                          <p className="text-red-500 text-sm mt-2">
                            {`${step2Form.formState.errors.id_card_back_image_file.message}`}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-semibold mb-2 block">
                        فيديو تعريفي <span className="text-red-500">*</span>
                      </Label>
                      <p className="text-gray-500 text-sm mb-4">فيديو قصير تعرف فيه بنفسك وبخدماتك</p>
                      <FileUpload
                        onFileSelect={(file) => {
                          setPersonalVideo(file);
                          step2Form.setValue("video_url_file", file);
                        }}
                        accept="video/*"
                        placeholder="ارفع الفيديو الشخصي الخاص بك"
                        icon={<Video className="w-12 h-12 text-pink-500" />}
                        file={personalVideo}
                      />
                      {step2Form.formState.errors.video_url_file && (
                        <p className="text-red-500 text-sm mt-2">
                          {`${step2Form.formState.errors.video_url_file.message}`}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-lg font-semibold mb-2 block">
                        الشهادات (اختياري)
                      </Label>
                      <p className="text-gray-500 text-sm mb-4">صور من شهادات الخبرة أو المؤهلات العلمية ذات الصلة</p>
                      <FileUpload
                        onFileSelect={(file) => {
                          if (file) {
                            const newCerts = [...certificates, file];
                            setCertificates(newCerts);
                            step2Form.setValue(
                              "certificates_images_files",
                              newCerts
                            );
                          }
                        }}
                        onFileRemove={(file) => {
                          if (!file) return;
                          const newCerts = certificates.filter(
                            (doc) => doc.name !== file.name
                          );
                          setCertificates(newCerts);
                          step2Form.setValue(
                            "certificates_images_files",
                            newCerts
                          );
                        }}
                        files={certificates}
                        accept="image/*,.pdf"
                        placeholder="ارفع الشهادات والوثائق"
                        icon={<Award className="w-12 h-12 text-primary" />}
                      />
                    </div>

                    <div>
                      <Label className="text-lg font-semibold mb-2 block">
                        وثائق إضافية (اختياري)
                      </Label>
                      <p className="text-gray-500 text-sm mb-4">أي مستندات أخرى تدعم ملفك كمقدم خدمة</p>
                      <FileUpload
                        onFileSelect={(file) => {
                          if (file) {
                            const newDocs = [...documents, file];
                            setDocuments(newDocs);
                            step2Form.setValue("document_list_files", newDocs);
                          }
                        }}
                        onFileRemove={(file) => {
                          if (!file) return;
                          const newDocs = documents.filter(
                            (doc) => doc.name !== file.name
                          );
                          setDocuments(newDocs);
                          step2Form.setValue("document_list_files", newDocs);
                        }}
                        // onFileSelect={(file) => {
                        //   const currentDocs =
                        //     step2Form.getValues("document_list_files") || [];
                        //   if (file) {
                        //     step2Form.setValue("document_list_files", [
                        //       ...currentDocs,
                        //       file,
                        //     ]);
                        //   }
                        // }}
                        files={documents}
                        accept="image/*,.pdf,.doc,.docx"
                        placeholder="ارفع وثائق إضافية"
                        icon={<FileText className="w-12 h-12 text-primary" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                      <Textarea
                        id="notes"
                        {...step2Form.register("notes")}
                        className="text-right min-h-[100px]"
                        placeholder="أي ملاحظات إضافية تود إضافتها"
                      />
                      {step2Form.formState.errors.notes && (
                        <p className="text-red-500 text-sm">
                          {step2Form.formState.errors.notes.message}
                        </p>
                      )}
                    </div>

                    {/* Badge at bottom */}
                    <div className="bg-gradient-to-r from-pink-100 to-pink-50 border border-pink-200 rounded-lg p-4 text-center">
                      <p className="text-pink-700 font-semibold">
                        📋 يرجى رفع المستندات المطلوبة لإكمال التسجيل
                      </p>
                      <p className="text-pink-600 text-sm mt-1">
                        الحقول المميزة بـ <span className="text-red-500">*</span> إلزامية
                      </p>
                    </div>

                    {submitError && (
                      <MessageAlert type="error" message={submitError} />
                    )}

                    <div className="flex justify-between gap-3 items-center">
                      <Button type="button" variant="outline" onClick={goBack}>
                        السابق
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/40"
                      >
                        {isSubmitting ? "جاري الإرسال..." : "إرسال البيانات"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
