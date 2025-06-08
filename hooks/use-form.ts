import { useState, useCallback } from "react";
import { FormConfig, getFieldConfig } from "@/lib/validation/form-config";
import {
  ValidationState,
  validateField,
  validateForm,
  isFormValid as checkFormValid,
} from "@/lib/validation/schemas";

export interface UseFormOptions {
  config: FormConfig;
  initialData?: Record<string, string>;
  onFieldChange?: (
    fieldName: string,
    value: string,
    validation: ValidationState
  ) => void;
}

export interface UseFormReturn {
  formData: Record<string, string>;
  validation: Record<string, ValidationState>;
  isValid: boolean;
  isFieldValid: (fieldName: string) => boolean;
  hasValue: (fieldName: string) => boolean;
  handleFieldChange: (fieldName: string, value: string) => void;
  validateAllFields: () => void;
  resetForm: () => void;
  setFieldValue: (fieldName: string, value: string) => void;
  getFieldValue: (fieldName: string) => string;
}

/**
 * Custom hook for managing form state and validation
 */
export const useForm = ({
  config,
  initialData = {},
  onFieldChange,
}: UseFormOptions): UseFormReturn => {
  // Initialize form data with default values
  const getInitialFormData = useCallback(() => {
    const data: Record<string, string> = {};
    config.fields.forEach((field) => {
      data[field.name] = initialData[field.name] || "";
    });
    return data;
  }, [config.fields, initialData]);

  // Initialize validation state
  const getInitialValidation = useCallback(() => {
    const validation: Record<string, ValidationState> = {};
    config.fields.forEach((field) => {
      validation[field.name] = { isValid: true, message: "" };
    });
    return validation;
  }, [config.fields]);

  const [formData, setFormData] =
    useState<Record<string, string>>(getInitialFormData);
  const [validation, setValidation] =
    useState<Record<string, ValidationState>>(getInitialValidation);

  /**
   * Validates a single field and its dependencies
   */
  const validateSingleField = useCallback(
    (
      fieldName: string,
      value: string,
      currentFormData: Record<string, string>
    ) => {
      const fieldConfig = getFieldConfig(config, fieldName);
      if (!fieldConfig) return { isValid: true, message: "" };

      return validateField(value, fieldConfig.validationRules, currentFormData);
    },
    [config]
  );

  /**
   * Validates fields that depend on the changed field
   */
  const validateDependentFields = useCallback(
    (changedFieldName: string, currentFormData: Record<string, string>) => {
      const dependentFields = config.fields.filter((field) =>
        field.dependencies?.includes(changedFieldName)
      );

      const updates: Record<string, ValidationState> = {};

      dependentFields.forEach((field) => {
        const value = currentFormData[field.name];
        updates[field.name] = validateSingleField(
          field.name,
          value,
          currentFormData
        );
      });

      return updates;
    },
    [config.fields, validateSingleField]
  );

  /**
   * Handles field value changes with validation
   */
  const handleFieldChange = useCallback(
    (fieldName: string, value: string) => {
      const newFormData = { ...formData, [fieldName]: value };
      setFormData(newFormData);

      // Validate the changed field
      const fieldValidation = validateSingleField(
        fieldName,
        value,
        newFormData
      );

      // Validate dependent fields
      const dependentValidations = validateDependentFields(
        fieldName,
        newFormData
      );

      // Update validation state
      const newValidation = {
        ...validation,
        [fieldName]: fieldValidation,
        ...dependentValidations,
      };

      setValidation(newValidation);

      // Call callback if provided
      onFieldChange?.(fieldName, value, fieldValidation);
    },
    [
      formData,
      validation,
      validateSingleField,
      validateDependentFields,
      onFieldChange,
    ]
  );

  /**
   * Validates all fields in the form
   */
  const validateAllFields = useCallback(() => {
    const validationRules: Record<string, any[]> = {};
    config.fields.forEach((field) => {
      validationRules[field.name] = field.validationRules;
    });

    const allValidation = validateForm(formData, validationRules);
    setValidation(allValidation);
  }, [config.fields, formData]);

  /**
   * Resets the form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData(getInitialFormData());
    setValidation(getInitialValidation());
  }, [getInitialFormData, getInitialValidation]);

  /**
   * Sets a field value without triggering validation
   */
  const setFieldValue = useCallback((fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }, []);

  /**
   * Gets a field value
   */
  const getFieldValue = useCallback(
    (fieldName: string): string => {
      return formData[fieldName] || "";
    },
    [formData]
  );

  /**
   * Checks if a specific field is valid
   */
  const isFieldValid = useCallback(
    (fieldName: string): boolean => {
      return validation[fieldName]?.isValid ?? true;
    },
    [validation]
  );

  /**
   * Checks if a field has a value
   */
  const hasValue = useCallback(
    (fieldName: string): boolean => {
      return Boolean(formData[fieldName]?.trim());
    },
    [formData]
  );

  // Check if the entire form is valid
  const isValid = checkFormValid(validation, config.requiredFields);

  return {
    formData,
    validation,
    isValid,
    isFieldValid,
    hasValue,
    handleFieldChange,
    validateAllFields,
    resetForm,
    setFieldValue,
    getFieldValue,
  };
};
