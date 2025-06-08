"use client";

import { MultiStepForm } from "@/components/organisms/multi-step-form";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { serviceProviderFormSteps } from "@/lib/config/service-provider-form";
import {
  validateStep1,
  validateStep2,
} from "@/lib/validations/service-provider";
import { registerServiceProviderAction } from "@/lib/actions/service-provider";

export function ServiceProviderRegistrationForm() {
  const steps = serviceProviderFormSteps;

  const {
    currentStep,
    values,
    validations,
    serverErrors,
    isSubmitting,
    successMessage,
    errorMessage,
    handleFieldChange,
    handleFieldBlur,
    handleStepSubmit,
    handleStepChange,
  } = useMultiStepForm({
    steps,
    onStepSubmit: async (stepIndex, stepValues) => {
      // For step 1, we can do client-side validation only
      if (stepIndex === 0) {
        return { success: true };
      }
      return { success: true };
    },
    onFinalSubmit: async (allValues) => {
      try {
        const formData = new FormData();

        // Add text fields
        Object.entries(allValues).forEach(([key, value]) => {
          if (
            Array.isArray(value) &&
            value.length > 0 &&
            value[0] instanceof File
          ) {
            // Handle file uploads
            value.forEach((file: File, index: number) => {
              formData.append(`${key}[${index}]`, file);
            });
          } else if (typeof value === "string" || typeof value === "number") {
            formData.append(key, String(value));
          }
        });

        const result = await registerServiceProviderAction(formData);

        if (result.success) {
          return {
            success: true,
            message:
              "تم تسجيل طلب مقدم الخدمة بنجاح! سيتم مراجعة طلبك وإشعارك بالنتيجة قريباً.",
          };
        } else {
          return {
            success: false,
            errors: result.errors,
            message: result.message || "حدث خطأ أثناء تسجيل طلب مقدم الخدمة",
          };
        }
      } catch (error) {
        console.error("Service provider registration error:", error);
        return {
          success: false,
          message: "حدث خطأ غير متوقع أثناء الإرسال",
        };
      }
    },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          تسجيل مقدم خدمة
        </h1>
        <p className="text-lg text-gray-600">
          انضم إلى منصة هنا لهنا وابدأ في تقديم خدماتك
        </p>
      </div>

      <MultiStepForm
        steps={steps}
        values={values}
        validations={validations}
        serverErrors={serverErrors}
        onFieldChange={handleFieldChange}
        onFieldBlur={handleFieldBlur}
        onSubmit={handleStepSubmit}
        isSubmitting={isSubmitting}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
}
