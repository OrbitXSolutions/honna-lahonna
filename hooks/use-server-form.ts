"use client";

import { useState, useCallback, useTransition } from "react";
import { useFormState } from "react-dom";
import { FieldConfig, ValidationState } from "@/lib/validation/types";
import { validateField, isFormValid } from "@/lib/validation/validation-utils";

interface UseServerFormOptions {
  fields: FieldConfig[];
  action: (prevState: any, formData: FormData) => Promise<any>;
  initialState?: any;
}

/**
 * Hook for managing forms with server actions and client-side validation
 */
export function useServerForm({
  fields,
  action,
  initialState = { success: false },
}: UseServerFormOptions) {
  const [state, formAction] = useFormState(action, initialState);
  const [isPending, startTransition] = useTransition();

  // Client-side form state
  const [values, setValues] = useState<Record<string, string>>(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const [validations, setValidations] = useState<
    Record<string, ValidationState>
  >(() =>
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: { isValid: true, message: "" },
      }),
      {}
    )
  );

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate a single field
  const validateSingleField = useCallback(
    (fieldName: string, value: string) => {
      const fieldConfig = fields.find((f) => f.name === fieldName);
      if (!fieldConfig) return;

      const validation = validateField(value, fieldConfig.validations, values);

      setValidations((prev) => ({
        ...prev,
        [fieldName]: validation,
      }));

      return validation;
    },
    [fields, values]
  );

  // Handle field changes
  const handleFieldChange = useCallback(
    (fieldName: string, value: string) => {
      setValues((prev) => ({ ...prev, [fieldName]: value }));

      // Validate field if it's been touched
      if (touched[fieldName]) {
        validateSingleField(fieldName, value);
      }

      // Special handling for confirmPassword
      if (
        fieldName === "password" &&
        values.confirmPassword &&
        touched.confirmPassword
      ) {
        const confirmField = fields.find((f) => f.name === "confirmPassword");
        if (confirmField) {
          const confirmValidation = validateField(
            values.confirmPassword,
            confirmField.validations,
            { ...values, [fieldName]: value }
          );
          setValidations((prev) => ({
            ...prev,
            confirmPassword: confirmValidation,
          }));
        }
      }
    },
    [fields, values, touched, validateSingleField]
  );

  // Handle field blur
  const handleFieldBlur = useCallback(
    (fieldName: string) => {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
      const value = values[fieldName] || "";
      validateSingleField(fieldName, value);
    },
    [values, validateSingleField]
  );
  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all fields
      const newValidations: Record<string, ValidationState> = {};
      let hasErrors = false;

      fields.forEach((field) => {
        const value = values[field.name] || "";
        const validation = validateField(value, field.validations, values);
        newValidations[field.name] = validation;

        if (!validation.isValid) {
          hasErrors = true;
        }
      });

      setValidations(newValidations);
      setTouched(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {})
      );

      if (!hasErrors) {
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        startTransition(() => {
          formAction(formData);
        });
      }
    },
    [fields, values, formAction, startTransition]
  );
  // Check if form is valid
  const isValid = isFormValid(validations, values, fields);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
    setValidations(
      fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: { isValid: true, message: "" },
        }),
        {}
      )
    );
    setTouched({});
  }, [fields]);

  return {
    values,
    validations,
    touched,
    serverErrors: state?.errors,
    isSubmitting: isPending,
    isValid: isValid && !isPending,
    successMessage: state?.success ? state?.message : undefined,
    errorMessage: state?.success === false ? state?.message : undefined,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
    resetForm,
    state,
  };
}
