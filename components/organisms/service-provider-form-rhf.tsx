"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Check, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  fetchServiceCategories,
  fetchGovernorates,
} from "@/lib/data/service-provider";
import type { ServiceCategory, Governorate } from "@/lib/data/service-provider";

// Enhanced validation schema for React Hook Form
const formSchema = z.object({
  // Step 1 fields
  businessName: z.string().min(2, "اسم العمل يجب أن يكون على الأقل حرفين"),
  businessType: z.enum(["individual", "company", "partnership", "llc"], {
    required_error: "يرجى اختيار نوع العمل",
  }),
  serviceCategory: z.string().min(1, "يرجى اختيار فئة الخدمة"),
  contactPerson: z
    .string()
    .min(2, "اسم الشخص المسؤول يجب أن يكون على الأقل حرفين"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  phone: z.string().min(8, "يرجى إدخال رقم هاتف صحيح"),
  businessLicense: z.any().optional(),
  businessRegistration: z.any().optional(),

  // Step 2 fields
  governorate: z.string().min(1, "يرجى اختيار المحافظة"),
  city: z.string().min(2, "اسم المدينة يجب أن يكون على الأقل حرفين"),
  address: z.string().min(10, "يرجى تقديم عنوان كامل"),
  website: z.string().url("يرجى إدخال رابط صحيح").optional().or(z.literal("")),
  description: z.string().min(50, "الوصف يجب أن يكون على الأقل 50 حرف"),
  experience: z.enum(["0-1", "1-3", "3-5", "5-10", "10+"], {
    required_error: "يرجى اختيار سنوات الخبرة",
  }),
  certifications: z.any().optional(),
  portfolio: z.any().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

type FormData = z.infer<typeof formSchema>;

const businessTypeOptions = [
  { value: "individual", label: "فردي" },
  { value: "company", label: "شركة" },
  { value: "partnership", label: "شراكة" },
  { value: "llc", label: "شركة ذات مسؤولية محدودة" },
];

const experienceOptions = [
  { value: "0-1", label: "أقل من سنة" },
  { value: "1-3", label: "1-3 سنوات" },
  { value: "3-5", label: "3-5 سنوات" },
  { value: "5-10", label: "5-10 سنوات" },
  { value: "10+", label: "أكثر من 10 سنوات" },
];

interface ServiceProviderFormProps {
  onSubmit: (
    data: FormData
  ) => Promise<{
    success: boolean;
    errors?: Record<string, string[]>;
    message?: string;
  }>;
}

export function ServiceProviderForm({ onSubmit }: ServiceProviderFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(
    []
  );
  const [governorates, setGovernorates] = useState<Governorate[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessType: undefined,
      serviceCategory: "",
      contactPerson: "",
      email: "",
      phone: "",
      governorate: "",
      city: "",
      address: "",
      website: "",
      description: "",
      experience: undefined,
      termsAccepted: false,
    },
  });
  // Load data on mount
  useState(() => {
    fetchServiceCategories().then(setServiceCategories);
    fetchGovernorates().then(setGovernorates);
  });

  const steps = [
    {
      title: "معلومات العمل",
      description: "أدخل معلومات عملك الأساسية",
      fields: [
        "businessName",
        "businessType",
        "serviceCategory",
        "contactPerson",
        "email",
        "phone",
        "businessLicense",
        "businessRegistration",
      ],
    },
    {
      title: "التفاصيل والموقع",
      description: "أدخل موقعك وتفاصيل خدماتك",
      fields: [
        "governorate",
        "city",
        "address",
        "website",
        "description",
        "experience",
        "certifications",
        "portfolio",
        "termsAccepted",
      ],
    },
  ];

  const currentStepFields = steps[currentStep].fields;
  const isLastStep = currentStep === steps.length - 1;

  // Check if current step is valid
  const isCurrentStepValid = () => {
    return currentStepFields.every((fieldName) => {
      const fieldState = form.getFieldState(fieldName as keyof FormData);
      const fieldValue = form.getValues(fieldName as keyof FormData);

      // Skip validation for optional fields that are empty
      if (
        !fieldValue &&
        (fieldName === "website" ||
          fieldName === "businessRegistration" ||
          fieldName === "certifications" ||
          fieldName === "portfolio")
      ) {
        return true;
      }

      return !fieldState.invalid;
    });
  };

  const handleNext = async () => {
    const fieldsToValidate = currentStepFields as (keyof FormData)[];
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await onSubmit(data);
      if (!result.success && result.errors) {
        // Set server errors on form fields
        Object.entries(result.errors).forEach(([field, messages]) => {
          form.setError(field as keyof FormData, {
            type: "server",
            message: messages[0],
          });
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                index < currentStep
                  ? "bg-green-500 text-white"
                  : index === currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              )}
            >
              {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>

            <div className="mr-2 text-xs font-medium text-gray-600 hidden sm:block">
              {step.title}
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-12 sm:w-16 mx-2 transition-colors",
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFileUpload = (
    name: keyof FormData,
    label: string,
    required = false
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-right block">
            {label}
            {required && <span className="text-red-500 mr-1">*</span>}
          </FormLabel>
          <FormControl>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => field.onChange(e.target.files)}
                className="hidden"
                id={name}
              />
              <label htmlFor={name} className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">انقر لرفع الملفات</p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOC, DOCX, JPG, PNG (حد أقصى 10MB)
                </p>
              </label>
              {field.value && field.value.length > 0 && (
                <div className="mt-2 text-sm text-green-600">
                  تم رفع {field.value.length} ملف
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {renderProgressBar()}

      <Card>
        <CardHeader>
          <CardTitle className="text-right">
            {steps[currentStep].title}
          </CardTitle>
          <p className="text-muted-foreground text-right">
            {steps[currentStep].description}
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              {/* Step 1 Fields */}
              {currentStep === 0 && (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">
                          اسم العمل *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="أدخل اسم عملك"
                            className="text-right"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">
                          نوع العمل *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-right">
                              <SelectValue placeholder="اختر نوع العمل" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessTypeOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">
                          فئة الخدمة *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-right">
                              <SelectValue placeholder="اختر فئة الخدمة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {" "}
                            {serviceCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">
                          الشخص المسؤول *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="اسم الشخص المسؤول"
                            className="text-right"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">
                          البريد الإلكتروني *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="example@domain.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">
                          رقم الهاتف *
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+961 XX XXX XXX" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-1 md:col-span-2">
                    {renderFileUpload("businessLicense", "رخصة العمل", true)}
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    {renderFileUpload("businessRegistration", "سجل تجاري")}
                  </div>
                </div>
              )}

              {/* Step 2 Fields */}
              {currentStep === 1 && (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="governorate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">
                          المحافظة *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-right">
                              <SelectValue placeholder="اختر المحافظة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {" "}
                            {governorates.map((gov) => (
                              <SelectItem key={gov.id} value={gov.id}>
                                {gov.nameAr || gov.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">
                          المدينة *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="اسم المدينة"
                            className="text-right"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel className="text-right block">
                          العنوان الكامل *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="أدخل العنوان الكامل"
                            className="text-right"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel className="text-right block">
                          الموقع الإلكتروني
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://www.example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel className="text-right block">
                          وصف الخدمات *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="اكتب وصفاً مفصلاً عن خدماتك (على الأقل 50 حرف)"
                            className="text-right"
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">
                          سنوات الخبرة *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-right">
                              <SelectValue placeholder="اختر سنوات الخبرة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-1 md:col-span-2">
                    {renderFileUpload("certifications", "الشهادات والمؤهلات")}
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    {renderFileUpload("portfolio", "نماذج من الأعمال")}
                  </div>

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2 flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-right">
                            أوافق على الشروط والأحكام *
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0 || isSubmitting}
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>

                <div className="flex gap-2">
                  {!isLastStep ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!isCurrentStepValid() || isSubmitting}
                      className="flex items-center gap-2"
                    >
                      التالي
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!isCurrentStepValid() || isSubmitting}
                      className="flex items-center gap-2"
                    >
                      {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
