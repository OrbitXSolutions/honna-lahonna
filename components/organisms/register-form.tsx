"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import {
  UserForRegister,
  UserForRegisterDefaultValues,
  UserForRegisterSchema,
} from "@/lib/data/models/schemas/register.schema";
import { registerAction } from "@/app/(auth)/register/action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import AppButton from "../atoms/app-button";
import { Spinner } from "../ui/spinner";

interface RegisterFieldData {
  name: keyof UserForRegister;
  type: string;
  label: string;
  placeholder: string;
}

const registerFields: RegisterFieldData[] = [
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
] as const;

export default function RegisterForm() {
  const {
    form,
    action,
    handleSubmitWithAction: onSubmit,
    resetFormAndAction: resetForm,
  } = useHookFormAction(registerAction, zodResolver(UserForRegisterSchema), {
    actionProps: {
      onSuccess: ({ data }) => {
        toast.success("تم التسجيل بنجاح");
      },
      onError: ({ error }) => {
        console.error("Registration error:", error);
        toast.error("فشل في التسجيل");
      },
    },
    errorMapProps: {
      joinBy: " | ",
    },
    formProps: {
      mode: "onBlur",
      defaultValues: UserForRegisterDefaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Server Error Display */}
        {action.hasErrored && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-destructive text-center">
              {action.result?.serverError || "حدث خطأ في الخادم"}
            </p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {registerFields.map((fieldData) => (
            <FormField
              key={fieldData.name}
              name={fieldData.name}
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor={field.name}>{fieldData.label}</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      type={fieldData.type}
                      placeholder={fieldData.placeholder}
                      disabled={action.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Submit Button */}
        <AppButton
          disabled={action.isPending}
          type="submit"
          className="w-full cursor-pointer"
        >
          {action.isPending ? (
            <>
              جاري التسجيل...
              <Spinner size="small" />
            </>
          ) : (
            "إنشاء حساب"
          )}
        </AppButton>
      </form>
    </Form>
  );
}
