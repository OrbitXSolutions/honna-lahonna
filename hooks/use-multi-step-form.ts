"use client";

import { useState, useCallback } from "react";
import { validateField } from "@/lib/validation/validators";
import type { FormConfig, FieldConfig } from "@/lib/validation/types";

interface UseMultiStepFormOptions {
  steps: FormConfig[];
  onStepSubmit?: (
    stepIndex: number,
    values: Record<string, any>
  ) => Promise<{
    success: boolean;
    errors?: Record<string, string[]>;
    message?: string;
  }>;
  onFinalSubmit?: (
    values: Record<string, any>
  ) => Promise<{
    success: boolean;
    errors?: Record<string, string[]>;
    message?: string;
  }>;
}

export function useMultiStepForm({
  steps,
  onStepSubmit,
  onFinalSubmit,
}: UseMultiStepFormOptions) {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<Record<string, any>>({});
  const [validations, setValidations] = useState<
    Record<string, { isValid: boolean; message: string }>
  >({});
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Initialize validations for all fields
  const initializeValidations = useCallback(() => {
    const initialValidations: Record<
      string,
      { isValid: boolean; message: string }
    > = {};

    steps.forEach((step) => {
      step.fields.forEach((field) => {
        initialValidations[field.name] = {
          isValid: true,
          message: "",
        };
      });
    });

    setValidations(initialValidations);
  }, [steps]);

  // Initialize validations on mount
  useState(() => {
    initializeValidations();
  });

  const handleFieldChange = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear server errors for this field
    setServerErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    // Clear success and error messages
    setSuccessMessage("");
    setErrorMessage("");
  }, []);

  const handleFieldBlur = useCallback(
    (name: string) => {
      const value = values[name];
      const validation = validateField(name, value, values);

      setValidations((prev) => ({
        ...prev,
        [name]: validation,
      }));
    },
    [values]
  );

  const validateCurrentStep = useCallback(() => {
    const currentStepConfig = steps[currentStep];
    const stepValidations: Record<
      string,
      { isValid: boolean; message: string }
    > = {};
    let isStepValid = true;

    currentStepConfig.fields.forEach((field) => {
      const value = values[field.name];
      const validation = validateField(field.name, value, values);

      stepValidations[field.name] = validation;

      if (!validation.isValid) {
        isStepValid = false;
      }

      // Check required fields
      if (
        field.required &&
        (!value || (Array.isArray(value) && value.length === 0))
      ) {
        stepValidations[field.name] = {
          isValid: false,
          message: "هذا الحقل مطلوب",
        };
        isStepValid = false;
      }
    });

    setValidations((prev) => ({ ...prev, ...stepValidations }));
    return isStepValid;
  }, [currentStep, steps, values]);

  const handleStepSubmit = useCallback(
    async (stepIndex: number) => {
      setIsSubmitting(true);
      setServerErrors({});
      setSuccessMessage("");
      setErrorMessage("");

      try {
        // Validate current step
        const isValid = validateCurrentStep();
        if (!isValid) {
          setErrorMessage("يرجى تصحيح الأخطاء قبل المتابعة");
          return;
        }

        const isLastStep = stepIndex === steps.length - 1;

        if (isLastStep && onFinalSubmit) {
          // Final submission
          const result = await onFinalSubmit(values);

          if (result.success) {
            setSuccessMessage(result.message || "تم الإرسال بنجاح");
          } else {
            if (result.errors) {
              setServerErrors(result.errors);
            }
            setErrorMessage(result.message || "حدث خطأ أثناء الإرسال");
          }
        } else if (onStepSubmit) {
          // Step validation/submission
          const result = await onStepSubmit(stepIndex, values);

          if (result.success) {
            // Move to next step
            if (stepIndex < steps.length - 1) {
              setCurrentStep(stepIndex + 1);
              setSuccessMessage("");
            } else {
              setSuccessMessage(result.message || "تم الإرسال بنجاح");
            }
          } else {
            if (result.errors) {
              setServerErrors(result.errors);
            }
            setErrorMessage(result.message || "حدث خطأ أثناء المعالجة");
          }
        } else {
          // No submission handler, just move to next step
          if (stepIndex < steps.length - 1) {
            setCurrentStep(stepIndex + 1);
          }
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setErrorMessage("حدث خطأ غير متوقع");
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateCurrentStep, steps, values, onStepSubmit, onFinalSubmit]
  );

  const handleStepChange = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setCurrentStep(step);
        setSuccessMessage("");
        setErrorMessage("");
      }
    },
    [steps.length]
  );

  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setValues({});
    setServerErrors({});
    setSuccessMessage("");
    setErrorMessage("");
    initializeValidations();
  }, [initializeValidations]);

  return {
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
    resetForm,
  };
}
