"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import {
  UserForPhoneLogin,
  UserForPhoneLoginDefaultValues,
  UserForPhoneLoginSchema,
} from "@/lib/data/models/schemas/login.schema";
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
import { loginAction } from "@/app/(auth)/login/action";
import { PhoneInput } from "../ui/phone-input";

interface LoginFieldData {
  name: keyof UserForPhoneLogin;
  type: string;
  label: string;
  placeholder: string;
}

const loginFields: LoginFieldData[] = [
  {
    name: "phone",
    type: "tel",
    label: "رقم الهاتف",
    placeholder: "01234567890",
  },
  {
    name: "password",
    type: "password",
    label: "كلمة المرور",
    placeholder: "كلمة مرور ",
  },
] as const;

export default function LoginForm() {
  const {
    form,
    action,
    handleSubmitWithAction: onSubmit,
    resetFormAndAction: resetForm,
  } = useHookFormAction(loginAction, zodResolver(UserForPhoneLoginSchema), {
    actionProps: {
      onSuccess: ({ data }) => {
        toast.success("تم التسجيل بنجاح");
      },
      onError: ({ error }) => {
        console.error("Registration error:", error);
        toast.error("لقد حدث خطأ في التسجيل");
      },
    },

    formProps: {
      mode: "onBlur",
      defaultValues: {
        ...UserForPhoneLoginDefaultValues,
        // phone: "+201234567890", // Default phone number format
      },
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
          {loginFields.map((fieldData) => (
            <FormField
              key={fieldData.name}
              name={fieldData.name}
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor={field.name}>{fieldData.label}</FormLabel>
                  <FormControl>
                    {fieldData.type === "tel" ? (
                      <PhoneInput
                        id={field.name}
                        initialValueFormat="national"
                        placeholder={fieldData.placeholder}
                        disabled={action.isPending}
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
            "تسجيل الدخول"
          )}
        </AppButton>
      </form>
    </Form>
  );
}
