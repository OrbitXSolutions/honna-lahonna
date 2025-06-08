// lib/validation/validation-utils.ts
import { ValidationRule, ValidationState } from "./types";

/**
 * Validates a field value against an array of validation rules
 */
export function validateField(
  value: string,
  validations: ValidationRule[] = [],
  formData?: Record<string, any>
): ValidationState {
  for (const rule of validations) {
    if (rule.required && !value.trim()) {
      return { isValid: false, message: rule.message };
    }

    if (rule.minLength && value.length < rule.minLength) {
      return { isValid: false, message: rule.message };
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return { isValid: false, message: rule.message };
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      return { isValid: false, message: rule.message };
    }

    if (rule.custom && value && !rule.custom(value, formData)) {
      return { isValid: false, message: rule.message };
    }
  }

  return { isValid: true, message: "" };
}

/**
 * Validates all fields in a form configuration
 */
export function validateAllFields<T extends Record<string, any>>(
  values: T,
  fieldConfigs: Array<{
    name: keyof T;
    validations?: ValidationRule[];
    required?: boolean;
  }>
): Record<keyof T, ValidationState> {
  const validations = {} as Record<keyof T, ValidationState>;

  fieldConfigs.forEach((config) => {
    const value = (values[config.name] as string) || "";
    validations[config.name] = validateField(value, config.validations, values);
  });

  return validations;
}

/**
 * Checks if the entire form is valid
 */
export function isFormValid<T extends Record<string, any>>(
  validations: Record<keyof T, ValidationState>,
  values: T,
  fieldConfigs: Array<{ name: keyof T; required?: boolean }>
): boolean {
  const allFieldsValid = Object.values(validations).every(
    (v: ValidationState) => v.isValid
  );
  const requiredFieldsFilled = fieldConfigs
    .filter((field) => field.required)
    .every((field) => {
      const value = values[field.name];
      return value && (value as string).trim() !== "";
    });

  return allFieldsValid && requiredFieldsFilled;
}
