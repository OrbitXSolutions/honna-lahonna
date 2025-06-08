// components/molecules/dynamic-form-field.tsx
"use client";

import React from "react";
import { FormField } from "./form-field";
import { FieldConfig, ValidationState } from "@/lib/validation/types";

interface DynamicFormFieldProps {
  field: FieldConfig;
  value: string;
  validation: ValidationState;
  serverError?: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}

/**
 * Dynamic form field component that renders based on field configuration
 */
export function DynamicFormField({
  field,
  value,
  validation,
  serverError,
  disabled = false,
  onChange,
}: DynamicFormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <FormField
      id={field.name}
      name={field.name}
      type={field.type}
      label={field.label}
      placeholder={field.placeholder}
      value={value}
      onChange={handleChange}
      required={field.required}
      disabled={disabled}
      dir={field.dir}
      validation={validation}
      serverError={serverError}
      helpText={field.helpText}
    />
  );
}
