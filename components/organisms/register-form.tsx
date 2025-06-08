// filepath: c:\dev\work\new\honna-lahonna\components\organisms\register-form.tsx
"use client";

import { DynamicForm } from "./dynamic-form";
import { registerFormConfig } from "@/lib/validation/register-form-config";
import { registerAction } from "@/lib/actions/auth";
import { useServerForm } from "@/hooks/use-server-form";

export function RegisterForm() {
  const {
    values,
    validations,
    serverErrors,
    isSubmitting,
    isValid,
    successMessage,
    errorMessage,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
  } = useServerForm({
    fields: registerFormConfig.fields,
    action: registerAction,
  });

  return (
    <DynamicForm
      fields={registerFormConfig.fields}
      values={values}
      validations={validations}
      serverErrors={serverErrors}
      onFieldChange={handleFieldChange}
      onFieldBlur={handleFieldBlur}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isValid={isValid}
      submitLabel="إنشاء حساب"
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
}
