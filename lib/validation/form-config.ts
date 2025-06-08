import { ValidationRule } from "./schemas";

export interface FormFieldConfig {
  id: string;
  name: string;
  type: "text" | "email" | "password" | "tel" | "number";
  label: string;
  placeholder: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
  helpText?: string;
  validationRules: ValidationRule[];
  dependencies?: string[]; // Fields that this field depends on for validation
}

export interface FormConfig {
  fields: FormFieldConfig[];
  requiredFields: string[];
}

/**
 * Creates a form configuration object
 */
export const createFormConfig = (fields: FormFieldConfig[]): FormConfig => {
  const requiredFields = fields
    .filter((field) => field.required)
    .map((field) => field.name);

  return {
    fields,
    requiredFields,
  };
};

/**
 * Gets field configuration by name
 */
export const getFieldConfig = (
  formConfig: FormConfig,
  fieldName: string
): FormFieldConfig | undefined => {
  return formConfig.fields.find((field) => field.name === fieldName);
};
