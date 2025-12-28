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
import { PhoneInput } from "../ui/phone-input";
import { Check, X } from "lucide-react";
import { storeAuthData } from "@/lib/api/client";

// Password requirement validation helper
function PasswordRequirements({ password }: { password: string }) {
  const requirements = [
    { label: "6 أحرف على الأقل", met: password.length >= 6 },
    { label: "رقم واحد على الأقل", met: /[0-9]/.test(password) },
    { label: "حرف صغير واحد على الأقل", met: /[a-z]/.test(password) },
    { label: "رمز خاص واحد على الأقل (!@#$%^&*)", met: /[^a-zA-Z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1 text-xs">
      {requirements.map((req, index) => (
        <div
          key={index}
          className={`flex items-center gap-1 ${req.met ? "text-green-600" : "text-muted-foreground"}`}
        >
          {req.met ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
          <span>{req.label}</span>
        </div>
      ))}
    </div>
  );
}

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
    name: "phoneNumber",
    type: "tel",
    label: "رقم الهاتف",
    placeholder: "01234567890",
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
        // Store auth data in localStorage for client-side access
        if (data?.token && data?.user && data?.expiresAt) {
          storeAuthData(data.token, data.user, data.expiresAt);
        }
        toast.success("تم التسجيل بنجاح");
      },
      onError: ({ error }) => {
        console.error("Registration error:", error);
        toast.error("فشل في التسجيل");
      },
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
                    {fieldData.type === "tel" ? (
                      // Use PhoneInput for telephone fields
                      <PhoneInput
                        id={field.name}
                        initialValueFormat="national"
                        disabled={action.isPending}
                        placeholder={fieldData.placeholder}
                        {...field}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={fieldData.type}
                        placeholder={fieldData.placeholder}
                        disabled={action.isPending}
                        {...field}
                      />
                    )}
                  </FormControl>
                  {fieldData.name === "password" && (
                    <PasswordRequirements password={field.value || ""} />
                  )}
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
