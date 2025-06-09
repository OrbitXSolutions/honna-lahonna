"use client";

import { Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import {
  UserForRegister,
  UserForRegisterSchema,
} from "@/lib/data/models/schemas/register.schema";
import { registerAction } from "@/app/(auth)/register/action";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import AppButton from "../atoms/app-button";
import { Spinner } from "../ui/spinner";

const registerFields: {
  name: keyof UserForRegister;
  type: string;
  label: string;
  placeholder: string;
}[] = [
  {
    name: "firstName",
    type: "text",
    label: "الاسم الأول",
    placeholder: "أدخلي اسمك الأول",
  },
  {
    name: "lastName",
    type: "text",
    label: "الاسم الأخير",
    placeholder: "أدخلي الاسم الأخير",
  },
  {
    name: "email",
    type: "email",
    label: "البريد الإلكتروني",
    placeholder: "أدخلي بريدك الإلكتروني",
  },
  {
    name: "phone",
    type: "tel",
    label: "رقم الهاتف",
    placeholder: "+20 123 456 7890",
  },
  {
    name: "password",
    type: "password",
    label: "كلمة المرور",
    placeholder: "أدخلي كلمة مرور قوية",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "تأكيد كلمة المرور",
    placeholder: "أعيدي إدخال كلمة المرور",
  },
];

export function RegisterForm() {
  const {
    form,
    action,
    handleSubmitWithAction: onSubmit,
    resetFormAndAction: resetForm,
  } = useHookFormAction(registerAction, zodResolver(UserForRegisterSchema), {
    actionProps: {
      onSuccess({ data }) {
        toast.success("Logged in successfully");
      },
      onError({ error }) {
        error.thrownError;
        toast.error("Failed to login");
      },
    },
    formProps: {
      mode: "onBlur",
    },
    errorMapProps: {},
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Server Error */}
        {action.hasErrored && (
          <div className="text-error text-center">
            {action.result.serverError}
          </div>
        )}

        {/* Form Fields */}
        {registerFields.map((fieldData) => (
          <FormField
            key={fieldData.name}
            name={fieldData.name}
            control={form.control}
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor={field.name}>{fieldData.label}</FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    placeholder={fieldData.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <AppButton disabled={action.isPending} type="submit" className="w-full">
          {action.isPending ? "جاري التسجيل..." : "إنشاء حساب"}
          {action.isPending && <Spinner size="small" />}
        </AppButton>
      </form>
    </Form>
  );
}
