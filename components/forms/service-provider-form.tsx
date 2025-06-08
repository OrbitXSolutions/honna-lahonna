"use client";

import { useState, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle2,
  Upload,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createServiceProvider } from "@/lib/actions/service-provider";
import {
  step1Schema,
  step2Schema,
  serviceProviderSchema,
  type Step1Data,
  type Step2Data,
  type ServiceProviderFormData,
  type FormState,
  initialFormState,
} from "@/lib/schemas/service-provider";
import { ServiceProviderStep1 } from "./service-provider-step1";
import { ServiceProviderStep2 } from "./service-provider-step2";

interface ServiceProviderFormProps {
  serviceCategories: Array<{ id: string; name: string; slug?: string | null }>;
  governorates: Array<{ id: string; name: string }>;
}

export function ServiceProviderForm({
  serviceCategories,
  governorates,
}: ServiceProviderFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [state, formAction, isPending] = useActionState(
    createServiceProvider,
    initialFormState
  );

  // Step 1 form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
  });

  // Step 2 form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
  });

  const totalSteps = 2;
  const progress = (currentStep / totalSteps) * 100;

  // Handle step 1 submission
  const handleStep1Submit = async (data: Step1Data) => {
    console.log("Step 1 data:", data);
    setStep1Data(data);
    setCurrentStep(2);
  };

  // Handle step 2 submission (final submission)
  const handleStep2Submit = async (data: Step2Data) => {
    if (!step1Data) {
      console.error("Step 1 data is missing");
      return;
    }

    console.log("Step 2 data:", data);

    // Combine both steps data
    const combinedData: ServiceProviderFormData = {
      ...step1Data,
      ...data,
    };

    console.log("Combined data:", combinedData);

    // Create FormData for server action
    const formData = new FormData();

    // Add all non-file fields
    Object.entries(combinedData).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        !key.endsWith("_file") &&
        !key.endsWith("_files")
      ) {
        formData.append(key, String(value));
      }
    });

    // Add file fields
    if (combinedData.logo_image_file) {
      formData.append("logo_image_file", combinedData.logo_image_file);
    }
    if (combinedData.id_card_front_image) {
      formData.append("id_card_front_image", combinedData.id_card_front_image);
    }
    if (combinedData.id_card_back_image) {
      formData.append("id_card_back_image", combinedData.id_card_back_image);
    }
    if (combinedData.video_url_file) {
      formData.append("video_url_file", combinedData.video_url_file);
    }
    if (combinedData.certificates_images_files) {
      combinedData.certificates_images_files.forEach((file) => {
        formData.append("certificates_images_files", file);
      });
    }
    if (combinedData.document_list_files) {
      combinedData.document_list_files.forEach((file) => {
        formData.append("document_list_files", file);
      });
    }

    // Submit to server action
    formAction(formData);
  };

  // Go back to step 1
  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  // Reset form and start over
  const handleStartOver = () => {
    setCurrentStep(1);
    setStep1Data(null);
    step1Form.reset();
    step2Form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            تسجيل مقدم خدمة جديد
          </CardTitle>
          <CardDescription className="text-center">
            املأ النموذج لتصبح مقدم خدمة معتمد على منصتنا
          </CardDescription>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                الخطوة {currentStep} من {totalSteps}
              </span>
              <span>{Math.round(progress)}% مكتمل</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step indicators */}
          <div className="flex justify-center space-x-4 space-x-reverse">
            <div
              className={`flex items-center space-x-2 space-x-reverse ${
                currentStep >= 1 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep > 1
                    ? "bg-primary text-primary-foreground"
                    : currentStep === 1
                    ? "bg-primary/20 border-2 border-primary"
                    : "bg-muted"
                }`}
              >
                {currentStep > 1 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
              </div>
              <span className="text-sm font-medium">معلومات الخدمة</span>
            </div>

            <div
              className={`flex items-center space-x-2 space-x-reverse ${
                currentStep >= 2 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep > 2
                    ? "bg-primary text-primary-foreground"
                    : currentStep === 2
                    ? "bg-primary/20 border-2 border-primary"
                    : "bg-muted"
                }`}
              >
                {currentStep > 2 ? <CheckCircle2 className="w-4 h-4" /> : "2"}
              </div>
              <span className="text-sm font-medium">وثائق التحقق</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Display form errors */}
          {state.message && !state.success && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          {/* Step 1: Service Information */}
          {currentStep === 1 && (
            <ServiceProviderStep1
              form={step1Form}
              onSubmit={handleStep1Submit}
              serviceCategories={serviceCategories}
              governorates={governorates}
              errors={state.errors}
              isLoading={isPending}
            />
          )}

          {/* Step 2: Trust Documents */}
          {currentStep === 2 && (
            <ServiceProviderStep2
              form={step2Form}
              onSubmit={handleStep2Submit}
              onBack={handleBackToStep1}
              errors={state.errors}
              isLoading={isPending}
            />
          )}

          {/* Navigation buttons for step 1 are handled inside ServiceProviderStep1 */}
          {/* Navigation buttons for step 2 are handled inside ServiceProviderStep2 */}
        </CardContent>
      </Card>
    </div>
  );
}
