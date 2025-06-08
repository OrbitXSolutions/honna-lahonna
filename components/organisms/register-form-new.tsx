"use client";

import { useActionState } from "react";
import { registerAction } from "@/lib/actions/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DynamicForm } from "./dynamic-form";
import { useDynamicForm } from "@/hooks/use-dynamic-form";
import {
  registerFormConfig,
  registerInitialValues,
  RegisterFormData,
} from "@/lib/validation/register-form-config";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { IconArrow } from "@/components/icons";

const initialState = {
  success: false,
  message: undefined,
  errors: undefined,
};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  const { values, validations, isValid, handleChange, handleBlur } =
    useDynamicForm<RegisterFormData>({
      initialValues: registerInitialValues,
      fieldConfigs: registerFormConfig,
    });

  const handleFieldChange = (fieldName: string, value: string) => {
    handleChange(fieldName as keyof RegisterFormData, value);
  };

  const handleFieldBlur = (fieldName: string) => {
    handleBlur(fieldName as keyof RegisterFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formAction(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>إنشاء حساب جديد</CardTitle>
      </CardHeader>

      <CardContent>
        <DynamicForm<RegisterFormData>
          fields={registerFormConfig}
          values={values}
          validations={validations}
          serverErrors={state.errors}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          isValid={isValid}
          submitLabel="إنشاء الحساب"
          submitIcon={<IconArrow />}
          successMessage={state.success ? state.message : undefined}
          errorMessage={
            !state.success && state.message ? state.message : undefined
          }
        />
      </CardContent>

      <CardFooter>
        <div className="text-center text-sm text-muted-foreground w-full">
          لديك حساب بالفعل؟{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-primary hover:underline font-medium"
          >
            تسجيل الدخول
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
