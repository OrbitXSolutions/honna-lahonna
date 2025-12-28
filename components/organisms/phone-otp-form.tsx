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
import { useSearchParams, useRouter } from "next/navigation";

export default function PhoneOtpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Ensure phone number starts with + (fix URL encoding issue where + becomes space)
  const rawPhone = searchParams.get("phone") || "";
  const phone = rawPhone.trim().startsWith("+") ? rawPhone.trim() : `+${rawPhone.trim()}`;
  const {
    form,
    action,
    handleSubmitWithAction: onSubmit,
    resetFormAndAction: resetForm,
  } = useHookFormAction(otpVerifyAction, zodResolver(UserVerifyPhoneSchema), {
    actionProps: {
      onSuccess: ({ data }) => {
        // Show success message
        toast.success(data?.message || "تم تأكيد رقم الهاتف بنجاح! تم إنشاء حسابك.");
        // Redirect to service provider registration
        if (data?.redirectTo) {
          router.push(data.redirectTo);
        }
      },
      onError: ({ error }) => {
        console.error("Verification error:", error);

        toast.error(
          error.serverError ??
          error.validationErrors?._errors?.join(", ") ??
          error.thrownError?.message ??
          " لقد حدث خطأ في التحقق"
        );
      },
    },

    formProps: {
      mode: "onBlur",
      defaultValues: UserVerifyPhoneDefaultValues,
      values: {
        phoneNumber: phone,
        code: "",
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
          name="code"
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
