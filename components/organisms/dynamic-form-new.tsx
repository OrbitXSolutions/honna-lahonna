// components/organisms/dynamic-form.tsx
"use client";

import React from "react";
import { FieldConfig } from "@/lib/validation/types";
import { FormField } from "@/components/molecules/form-field";
import { Button } from "@/components/ui/button";
import { MessageAlert } from "@/components/atoms/message-alert";

interface DynamicFormProps<T> {
  fields: FieldConfig[];
  values: T;
  validations: Record<string, any>;
  serverErrors?: Record<string, string[]>;
  onFieldChange: (fieldName: string, value: string) => void;
  onFieldBlur?: (fieldName: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  isValid?: boolean;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  submitIcon?: React.ReactNode;
  className?: string;
}

export function DynamicForm<T extends Record<string, any>>({
  fields,
  values,
  validations,
  serverErrors,
  onFieldChange,
  onFieldBlur,
  onSubmit,
  isSubmitting = false,
  isValid = false,
  submitLabel = "Submit",
  successMessage,
  errorMessage,
  submitIcon,
  className = "",
}: DynamicFormProps<T>) {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      {/* Messages */}
      {successMessage && (
        <MessageAlert type="success" message={successMessage} />
      )}
      {errorMessage && <MessageAlert type="error" message={errorMessage} />}

      {/* Fields */}
      {fields.map((field) => (
        <FormField
          key={field.name}
          id={field.name}
          name={field.name}
          type={field.type}
          label={field.label}
          placeholder={field.placeholder || ""}
          value={values[field.name] || ""}
          onChange={(e) => onFieldChange(field.name, e.target.value)}
          required={field.required}
          disabled={isSubmitting}
          dir={field.dir}
          validation={validations[field.name]}
          serverError={serverErrors?.[field.name]}
          helpText={field.helpText}
        />
      ))}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
            جاري التحميل...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {submitLabel}
            {submitIcon}
          </div>
        )}
      </Button>
    </form>
  );
}
