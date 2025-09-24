"use client";
import { otpVerifyAction } from "@/app/(auth)/otp/action";
import {
  UserVerifyPhoneDefaultValues,
  UserVerifyPhoneSchema,
} from "@/lib/data/models/schemas/confirm-phone-otp";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../ui/input-otp";
import AppButton from "../atoms/app-button";
import { Spinner } from "../ui/spinner";
import ResendOtpButton from "../atoms/app-resent-otp-button";
import { useSearchParams } from "next/navigation";
import { useSupabaseUser } from "@/hooks/use-supabase-user";

interface Props {
  phone: string;
  isChange: boolean;
}

export default function PhoneOtpForm() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const isChange = searchParams.has("isChanging");
  const {
    form,
    action,
    handleSubmitWithAction: onSubmit,
    resetFormAndAction: resetForm,
  } = useHookFormAction(otpVerifyAction, zodResolver(UserVerifyPhoneSchema), {
    actionProps: {
      onSuccess: ({ data }) => {
        toast.success("تم تأكيد رقم الهاتف بنجاح");
      },
      onError: ({ error }) => {
        console.error("Registration error:", error);

        toast.error(
          error.serverError ??
          error.validationErrors?._errors?.join(", ") ??
          error.thrownError?.message ??
          " لقد حدث خطأ في التسجيل"
        );
        // resetForm();
      },
    },

    formProps: {
      mode: "onBlur",
      defaultValues: UserVerifyPhoneDefaultValues,
      values: {
        phone,
        isChange,
        token: "",
      },
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-8 max-w-3xl mx-auto py-10"
        suppressHydrationWarning
      >
        {/* Display phone number info */}
        {phone && (
          <p className="text-center text-sm text-muted-foreground">
            تم إرسال رمز التأكيد إلى: <span className="font-medium">{phone}</span>
          </p>
        )}
        {/* Server Error Display */}

        {action.hasErrored && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-destructive text-center">
              {action.result?.validationErrors?._errors?.join(", ")}

              {action.result?.serverError}
            </p>
          </div>
        )}
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز التأكيد</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  className="mx-auto"
                  style={{ direction: "ltr" }}
                  dir="ltr"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                  {/* <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup> */}
                </InputOTP>
              </FormControl>
              <FormDescription>
                سوف تصلك رسالة رمز التأكيد, قم بإدخال رمز التأكيد هنا
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ResendOtpButton />
        {/* Submit Button */}
        <AppButton
          disabled={action.isPending}
          type="submit"
          className="w-full cursor-pointer"
        >
          {action.isPending ? (
            <>
              جاري التأكيد...
              <Spinner size="small" />
            </>
          ) : (
            "تأكيد رقم الهاتف"
          )}
        </AppButton>
      </form>
    </Form>
  );
}
