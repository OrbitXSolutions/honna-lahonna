"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

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
import {
  UserSetPhoneDefaultValues,
  UserSetPhoneSchema,
} from "@/lib/data/models/schemas/set-phone-schema";
import { setPhoneAction } from "@/app/(auth)/set-phone/action";

// const setphoneFields: SetPhoneFieldData[] = [
//   {
//     name: "phone",
//     type: "tel",
//     label: "رقم الهاتف",
//     placeholder: "+201234567890",
//   },

// ] as const;

export default function SetPhoneForm() {
  const {
    form,
    action,
    handleSubmitWithAction: onSubmit,
    resetFormAndAction: resetForm,
  } = useHookFormAction(setPhoneAction, zodResolver(UserSetPhoneSchema), {
    actionProps: {
      onSuccess: ({ data }) => {
        toast.info("تم إرسال رمز التحقق إلى رقم الهاتف");
      },
      onError: ({ error }) => {
        console.error("Registration error:", error);
        toast.error("فشل في التسجيل");
      },
    },

    formProps: {
      mode: "onBlur",
      defaultValues: UserSetPhoneDefaultValues,
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
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor={field.name}>{"رقم الهاتف"}</FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    type="tel"
                    placeholder="+201234567890"
                    disabled={action.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            "إرسال رمز التحقق"
          )}
        </AppButton>
      </form>
    </Form>
  );
}
