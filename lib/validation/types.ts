// lib/validation/types.ts

/**
 * Individual validation rule configuration
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string, formData?: Record<string, any>) => boolean;
  message: string;
}

/**
 * Validation result for a single field
 */
export interface ValidationState {
  isValid: boolean;
  message: string;
}

/**
 * Field configuration for dynamic form generation
 */
export interface FieldConfig<T = Record<string, any>> {
  name: keyof T;
  type:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "file"
    | "textarea"
    | "select"
    | "number"
    | "url";
  label: string;
  placeholder?: string;
  required?: boolean;
  validationRules?: ValidationRule[]; // Updated name to match step configs
  validations?: ValidationRule[]; // Keep for backward compatibility
  helpText?: string;
  dir?: "ltr" | "rtl";
  dependencies?: string[]; // Fields this field depends on

  // Grid layout
  gridCols?: number;

  // File input specific
  accept?: string;
  multiple?: boolean;

  // Textarea specific
  rows?: number;

  // Number input specific
  min?: number;
  max?: number;

  // Select specific
  options?: Array<{ value: string; label: string }>;

  // Conditional display
  conditionalDisplay?: {
    field: string;
    values: string[];
  };
}

/**
 * Form configuration interface
 */
export interface FormConfig<
  T extends Record<string, any> = Record<string, any>
> {
  title: string;
  description: string;
  submitButtonText: string;
  fields: FieldConfig<T>[];
  initialData?: T;
  submitLabel?: string; // Keep for backward compatibility
}

/**
 * Complete form validation state
 */
export type FormValidation<
  T extends Record<string, any> = Record<string, any>
> = {
  [K in keyof T]: ValidationState;
};

/**
 * Form state interface
 */
export interface FormState<
  T extends Record<string, any> = Record<string, any>
> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}
