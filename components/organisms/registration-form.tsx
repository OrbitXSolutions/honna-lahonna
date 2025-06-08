"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { IconArrow } from "@/components/icons";

const initialState = {
  success: false,
  message: undefined,
  errors: undefined,
};

export function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Validation state
  const [validation, setValidation] = useState({
    firstName: { isValid: true, message: "" },
    lastName: { isValid: true, message: "" },
    email: { isValid: true, message: "" },
    phone: { isValid: true, message: "" },
    password: { isValid: true, message: "" },
    confirmPassword: { isValid: true, message: "" },
  });

  // Validation functions
  const validateFirstName = (value: string) => {
    if (!value.trim()) {
      return { isValid: false, message: "الاسم الأول مطلوب" };
    }
    if (value.length < 2) {
      return {
        isValid: false,
        message: "الاسم الأول يجب أن يكون حرفين على الأقل",
      };
    }
    if (value.length > 50) {
      return { isValid: false, message: "الاسم الأول طويل جداً" };
    }
    if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(value)) {
      return {
        isValid: false,
        message: "الاسم الأول يجب أن يحتوي على أحرف عربية أو إنجليزية فقط",
      };
    }
    return { isValid: true, message: "" };
  };

  const validateLastName = (value: string) => {
    if (value && value.length > 50) {
      return { isValid: false, message: "اسم العائلة طويل جداً" };
    }
    if (value && !/^[\u0600-\u06FFa-zA-Z\s]*$/.test(value)) {
      return {
        isValid: false,
        message: "اسم العائلة يجب أن يحتوي على أحرف عربية أو إنجليزية فقط",
      };
    }
    return { isValid: true, message: "" };
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return { isValid: false, message: "البريد الإلكتروني مطلوب" };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { isValid: false, message: "يرجى إدخال بريد إلكتروني صحيح" };
    }
    return { isValid: true, message: "" };
  };

  const validatePhone = (value: string) => {
    if (value && !/^(\+965)?[0-9]{8}$/.test(value)) {
      return {
        isValid: false,
        message: "رقم الهاتف يجب أن يكون 8 أرقام أو يبدأ بـ +965",
      };
    }
    return { isValid: true, message: "" };
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return { isValid: false, message: "كلمة المرور مطلوبة" };
    }
    if (value.length < 6) {
      return {
        isValid: false,
        message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      };
    }
    if (value.length > 100) {
      return { isValid: false, message: "كلمة المرور طويلة جداً" };
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return {
        isValid: false,
        message: "كلمة المرور يجب أن تحتوي على حرف صغير وكبير ورقم",
      };
    }
    return { isValid: true, message: "" };
  };

  const validateConfirmPassword = (value: string, passwordValue: string) => {
    if (!value) {
      return { isValid: false, message: "تأكيد كلمة المرور مطلوب" };
    }
    if (value !== passwordValue) {
      return { isValid: false, message: "كلمات المرور غير متطابقة" };
    }
    return { isValid: true, message: "" };
  };

  // Handle field changes with validation
  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    let fieldValidation: { isValid: boolean; message: string };
    switch (field) {
      case "firstName":
        fieldValidation = validateFirstName(value);
        break;
      case "lastName":
        fieldValidation = validateLastName(value);
        break;
      case "email":
        fieldValidation = validateEmail(value);
        break;
      case "phone":
        fieldValidation = validatePhone(value);
        break;
      case "password":
        fieldValidation = validatePassword(value);
        // Also revalidate confirm password if it exists
        if (formData.confirmPassword) {
          const confirmValidation = validateConfirmPassword(
            formData.confirmPassword,
            value
          );
          setValidation((prev) => ({
            ...prev,
            [field]: fieldValidation,
            confirmPassword: confirmValidation,
          }));
          return;
        }
        break;
      case "confirmPassword":
        fieldValidation = validateConfirmPassword(value, formData.password);
        break;
      default:
        return;
    }

    setValidation((prev) => ({
      ...prev,
      [field]: fieldValidation,
    }));
  };

  // Check if form is valid
  const isFormValid =
    Object.values(validation).every((v) => v.isValid) &&
    formData.firstName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword;

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold text-primary">
              إنشاء حساب كمقدمة خدمة
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              أدعمك لتزدادي وعياً وثقة وقدرة لخوض الرحلة بكامل محبتك وتعافيك
              كأخبراء وأم، كما ستجدين بالإضافة إلى ذلك خدمات استشارية متخصصة لكل
              ...
            </CardDescription>
          </CardHeader>

          <form action={formAction}>
            <CardContent className="space-y-4">
              {/* Success Message */}
              {state.success && state.message && (
                <div className="p-3 text-sm bg-green-100 border border-green-400 text-green-700 rounded-md">
                  {state.message}
                </div>
              )}

              {/* Error Message */}
              {!state.success && state.message && (
                <div className="p-3 text-sm bg-red-100 border border-red-400 text-red-700 rounded-md">
                  {state.message}
                </div>
              )}

              {/* First Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-right block"
                >
                  الاسم
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleFieldChange("firstName", e.target.value)
                  }
                  placeholder=""
                  required
                  className={
                    state.errors?.firstName || !validation.firstName.isValid
                      ? "border-red-500"
                      : validation.firstName.isValid && formData.firstName
                      ? "border-green-500"
                      : ""
                  }
                  disabled={isPending}
                />
                {state.errors?.firstName && (
                  <p className="text-sm text-red-500">
                    {state.errors.firstName[0]}
                  </p>
                )}
                {!validation.firstName.isValid &&
                  validation.firstName.message && (
                    <p className="text-sm text-red-500">
                      {validation.firstName.message}
                    </p>
                  )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-right block"
                >
                  بريد الإلكتروني
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  placeholder=""
                  required
                  className={
                    state.errors?.email || !validation.email.isValid
                      ? "border-red-500"
                      : validation.email.isValid && formData.email
                      ? "border-green-500"
                      : ""
                  }
                  disabled={isPending}
                />
                {state.errors?.email && (
                  <p className="text-sm text-red-500">
                    {state.errors.email[0]}
                  </p>
                )}
                {!validation.email.isValid && validation.email.message && (
                  <p className="text-sm text-red-500">
                    {validation.email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-right block"
                >
                  رقم الهاتف{" "}
                  <span className="text-sm text-green-600 mr-2">🇰🇼 +965</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  placeholder=""
                  dir="rtl"
                  className={
                    state.errors?.phone || !validation.phone.isValid
                      ? "border-red-500"
                      : validation.phone.isValid && formData.phone
                      ? "border-green-500"
                      : ""
                  }
                  disabled={isPending}
                />
                {state.errors?.phone && (
                  <p className="text-sm text-red-500">
                    {state.errors.phone[0]}
                  </p>
                )}
                {!validation.phone.isValid && validation.phone.message && (
                  <p className="text-sm text-red-500">
                    {validation.phone.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-right block"
                >
                  الرقم السري
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  placeholder=""
                  required
                  className={
                    state.errors?.password || !validation.password.isValid
                      ? "border-red-500"
                      : validation.password.isValid && formData.password
                      ? "border-green-500"
                      : ""
                  }
                  disabled={isPending}
                />
                {state.errors?.password && (
                  <p className="text-sm text-red-500">
                    {state.errors.password[0]}
                  </p>
                )}
                {!validation.password.isValid &&
                  validation.password.message && (
                    <p className="text-sm text-red-500">
                      {validation.password.message}
                    </p>
                  )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-right block"
                >
                  تأكيد الرقم السري
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleFieldChange("confirmPassword", e.target.value)
                  }
                  placeholder=""
                  required
                  className={
                    state.errors?.confirmPassword ||
                    !validation.confirmPassword.isValid
                      ? "border-red-500"
                      : validation.confirmPassword.isValid &&
                        formData.confirmPassword &&
                        formData.password
                      ? "border-green-500"
                      : ""
                  }
                  disabled={isPending}
                />
                {state.errors?.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {state.errors.confirmPassword[0]}
                  </p>
                )}
                {!validation.confirmPassword.isValid &&
                  validation.confirmPassword.message && (
                    <p className="text-sm text-red-500">
                      {validation.confirmPassword.message}
                    </p>
                  )}
                {validation.confirmPassword.isValid &&
                  formData.confirmPassword &&
                  formData.password && (
                    <p className="text-sm text-green-600">
                      كلمات المرور متطابقة ✓
                    </p>
                  )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full py-3"
                disabled={isPending || !isFormValid}
              >
                {isPending ? (
                  <Spinner size="small" show={true} />
                ) : (
                  <>
                    إنشاء حساب
                    <IconArrow className="mr-2" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                أو
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full py-3"
                disabled={isPending}
              >
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                التسجيل بواسطة جوجل
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                هل لديك حساب بالفعل؟{" "}
                <Link
                  href={ROUTES.LOGIN}
                  className="text-pink-500 hover:underline font-medium"
                >
                  تسجيل الدخول
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
