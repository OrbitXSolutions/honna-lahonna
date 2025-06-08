// hooks/use-dynamic-form.ts
"use client";

import { useState, useCallback, useEffect } from "react";
import { FieldConfig, ValidationState } from "@/lib/validation/types";
import { validateField } from "@/lib/validation/validation-utils";

interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}

interface UseDynamicFormOptions<T> {
  initialValues: T;
  fieldConfigs: FieldConfig[];
  onSubmit?: (values: T) => void | Promise<void>;
}

/**
 * Hook for managing dynamic forms with validation using the new rule-based system
 */
export function useDynamicForm<T extends Record<string, any>>({
  initialValues,
  fieldConfigs,
  onSubmit,
}: UseDynamicFormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {} as Record<keyof T, string>,
    touched: {} as Record<keyof T, boolean>,
    isValid: false,
    isSubmitting: false,
  });

  const [validations, setValidations] = useState<
    Record<string, ValidationState>
  >({});

  // Validate all fields
  const validateForm = useCallback(() => {
    const newValidations: Record<string, ValidationState> = {};
    const newErrors: Record<keyof T, string> = {} as Record<keyof T, string>;
    let isFormValid = true;

    fieldConfigs.forEach((config) => {
      const value = formState.values[config.name] || "";
      const validation = validateField(
        value,
        config.validations,
        formState.values
      );

      newValidations[config.name] = validation;

      if (!validation.isValid) {
        newErrors[config.name as keyof T] = validation.message;
        isFormValid = false;
      }

      if (config.required && !value.trim()) {
        isFormValid = false;
      }
    });

    setValidations(newValidations);
    setFormState((prev) => ({
      ...prev,
      errors: newErrors,
      isValid: isFormValid,
    }));

    return isFormValid;
  }, [formState.values, fieldConfigs]);

  // Validate form on value changes
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Handle field change
  const handleChange = useCallback(
    (fieldName: keyof T, value: string) => {
      setFormState((prev) => ({
        ...prev,
        values: { ...prev.values, [fieldName]: value },
      }));

      // Special handling for password confirmation
      if (fieldName === "password") {
        const confirmPasswordField = fieldConfigs.find(
          (field) => field.name === "confirmPassword"
        );
        if (confirmPasswordField && formState.values.confirmPassword) {
          const confirmValidation = validateField(
            formState.values.confirmPassword as string,
            confirmPasswordField.validations,
            { ...formState.values, [fieldName]: value }
          );
          setValidations((prev) => ({
            ...prev,
            confirmPassword: confirmValidation,
          }));
        }
      }
    },
    [formState.values, fieldConfigs]
  );

  // Handle field blur
  const handleBlur = useCallback((fieldName: keyof T) => {
    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [fieldName]: true },
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      const isValid = validateForm();

      if (isValid && onSubmit) {
        setFormState((prev) => ({ ...prev, isSubmitting: true }));

        try {
          await onSubmit(formState.values);
        } finally {
          setFormState((prev) => ({ ...prev, isSubmitting: false }));
        }
      }
    },
    [formState.values, onSubmit, validateForm]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {} as Record<keyof T, string>,
      touched: {} as Record<keyof T, boolean>,
      isValid: false,
      isSubmitting: false,
    });
    setValidations({});
  }, [initialValues]);

  // Validate all fields manually
  const validateAllFields = useCallback(() => {
    return validateForm();
  }, [validateForm]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isValid: formState.isValid,
    isSubmitting: formState.isSubmitting,
    validations,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateAllFields,
    setFieldValue: handleChange,
    setFieldTouched: handleBlur,
    config: { fields: fieldConfigs },
  };
}
