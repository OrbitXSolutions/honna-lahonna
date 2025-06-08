/**
 * Validation schemas and utilities for forms
 */

export interface ValidationState {
  isValid: boolean;
  message: string;
}

export type ValidationRule<T = string> = (
  value: T,
  formData?: Record<string, any>
) => ValidationState;

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

/**
 * Common validation rules
 */
export const validationRules = {
  required:
    (message: string): ValidationRule =>
    (value: string) => {
      if (!value || !value.toString().trim()) {
        return { isValid: false, message };
      }
      return { isValid: true, message: "" };
    },

  minLength:
    (length: number, message: string): ValidationRule =>
    (value: string) => {
      if (value && value.length < length) {
        return { isValid: false, message };
      }
      return { isValid: true, message: "" };
    },

  maxLength:
    (length: number, message: string): ValidationRule =>
    (value: string) => {
      if (value && value.length > length) {
        return { isValid: false, message };
      }
      return { isValid: true, message: "" };
    },

  pattern:
    (regex: RegExp, message: string): ValidationRule =>
    (value: string) => {
      if (value && !regex.test(value)) {
        return { isValid: false, message };
      }
      return { isValid: true, message: "" };
    },

  email:
    (message: string = "يرجى إدخال بريد إلكتروني صحيح"): ValidationRule =>
    (value: string) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return { isValid: false, message };
      }
      return { isValid: true, message: "" };
    },

  egyptianPhone:
    (
      message: string = "رقم الهاتف يجب أن يكون رقم مصري صحيح"
    ): ValidationRule =>
    (value: string) => {
      if (!value) return { isValid: true, message: "" };

      // Use the same normalization logic as the server
      let cleanPhone = value.replace(/[^\d+]/g, "");

      if (cleanPhone.startsWith("00")) {
        cleanPhone = "+" + cleanPhone.substring(2);
      }

      if (cleanPhone.startsWith("0") && !cleanPhone.startsWith("+")) {
        cleanPhone = "+20" + cleanPhone.substring(1);
      }

      if (
        !cleanPhone.startsWith("+") &&
        (cleanPhone.length === 10 || cleanPhone.length === 11)
      ) {
        cleanPhone = "+20" + cleanPhone;
      }

      if (!cleanPhone.startsWith("+") && cleanPhone.length === 9) {
        cleanPhone = "+20" + cleanPhone;
      }

      if (!/^\+20[0-9]{10,11}$/.test(cleanPhone)) {
        return { isValid: false, message };
      }
      return { isValid: true, message: "" };
    },

  passwordStrength:
    (
      message: string = "كلمة المرور يجب أن تحتوي على حرف صغير وكبير ورقم"
    ): ValidationRule =>
    (value: string) => {
      if (value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return { isValid: false, message };
      }
      return { isValid: true, message: "" };
    },

  confirmPassword:
    (message: string = "كلمات المرور غير متطابقة"): ValidationRule =>
    (value: string, formData?: Record<string, any>) => {
      if (value && formData?.password && value !== formData.password) {
        return { isValid: false, message };
      }
      return { isValid: true, message: "" };
    },

  arabicEnglishOnly:
    (
      message: string = "يجب أن يحتوي على أحرف عربية أو إنجليزية فقط"
    ): ValidationRule =>
    (value: string) => {
      if (value && !/^[\u0600-\u06FFa-zA-Z\s]+$/.test(value)) {
        return { isValid: false, message };
      }
      return { isValid: true, message: "" };
    },
};

/**
 * Validates a single field using multiple rules
 */
export const validateField = (
  value: string,
  rules: ValidationRule[],
  formData?: Record<string, any>
): ValidationState => {
  for (const rule of rules) {
    const result = rule(value, formData);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true, message: "" };
};

/**
 * Validates all fields in a form
 */
export const validateForm = (
  formData: Record<string, string>,
  validationRules: ValidationRules
): Record<string, ValidationState> => {
  const validationState: Record<string, ValidationState> = {};

  Object.keys(validationRules).forEach((fieldName) => {
    const value = formData[fieldName] || "";
    const rules = validationRules[fieldName];
    validationState[fieldName] = validateField(value, rules, formData);
  });

  return validationState;
};

/**
 * Checks if the entire form is valid
 */
export const isFormValid = (
  validationState: Record<string, ValidationState>,
  requiredFields: string[] = []
): boolean => {
  // Check if all validations pass
  const allValid = Object.values(validationState).every(
    (state) => state.isValid
  );

  // Check if all required fields have values
  const requiredFieldsValid = requiredFields.every((fieldName) => {
    return validationState[fieldName]?.isValid === true;
  });

  return allValid && requiredFieldsValid;
};
