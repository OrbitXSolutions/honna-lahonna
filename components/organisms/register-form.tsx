"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
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
import { FormField } from "@/components/molecules/form-field";
import { MessageAlert } from "@/components/atoms/message-alert";
import Logo from "../atoms/logo";

const initialState = {
  success: false,
  message: undefined,
  errors: undefined,
};

interface ValidationState {
  isValid: boolean;
  message: string;
}

interface FormValidation {
  firstName: ValidationState;
  lastName: ValidationState;
  email: ValidationState;
  phone: ValidationState;
  password: ValidationState;
  confirmPassword: ValidationState;
}

export function RegisterForm() {
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
  const [validation, setValidation] = useState<FormValidation>({
    firstName: { isValid: true, message: "" },
    lastName: { isValid: true, message: "" },
    email: { isValid: true, message: "" },
    phone: { isValid: true, message: "" },
    password: { isValid: true, message: "" },
    confirmPassword: { isValid: true, message: "" },
  });

  // Validation functions
  const validateFirstName = (value: string): ValidationState => {
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

  const validateLastName = (value: string): ValidationState => {
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

  const validateEmail = (value: string): ValidationState => {
    if (!value.trim()) {
      return { isValid: false, message: "البريد الإلكتروني مطلوب" };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { isValid: false, message: "يرجى إدخال بريد إلكتروني صحيح" };
    }
    return { isValid: true, message: "" };
  };
  const validatePhone = (value: string): ValidationState => {
    if (!value.trim()) {
      return { isValid: false, message: "رقم الهاتف مطلوب" };
    }

    // Use the same normalization logic as the server
    let cleanPhone = value.replace(/[^\d+]/g, "");

    if (cleanPhone.startsWith("00")) {
      cleanPhone = "+" + cleanPhone.substring(2);
    }

    if (cleanPhone.startsWith("0") && !cleanPhone.startsWith("+")) {
      cleanPhone = "+20" + cleanPhone.substring(1);
    }

    if (
      !cleanPhone.startsWith("+") &&
      (cleanPhone.length === 10 || cleanPhone.length === 11)
    ) {
      cleanPhone = "+20" + cleanPhone;
    }

    if (!cleanPhone.startsWith("+") && cleanPhone.length === 9) {
      cleanPhone = "+20" + cleanPhone;
    }

    if (!/^\+20[0-9]{10,11}$/.test(cleanPhone)) {
      return {
        isValid: false,
        message: "رقم الهاتف يجب أن يكون رقم مصري صحيح",
      };
    }
    return { isValid: true, message: "" };
  };

  const validatePassword = (value: string): ValidationState => {
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

  const validateConfirmPassword = (
    value: string,
    passwordValue: string
  ): ValidationState => {
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

    let fieldValidation: ValidationState;
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
    formData.phone &&
    formData.password &&
    formData.confirmPassword;

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <Logo />

      <div className="space-y-3">
        <p className="font-medium">
          <span>{"مرحباً بكم في"}</span>&nbsp;
          <span className="text-primary">{"هن لهن!"}</span>
          <span>{"👋"}</span>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          <span>{"معك لتزدهري في رحلة"}</span>&nbsp;
          <span className="text-primary">{"حياتك"}</span>
          <span>
            <br />
            {"الخاصة"}
          </span>
        </h2>
        <p>
          {
            "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم، كما تستحقين بالإضافة إلي تقديم خدمات استشارية مخصصة لكي …"
          }
        </p>
      </div>

      <form action={formAction}>
        {" "}
        <CardContent className="space-y-4">
          {/* Success Message */}
          {state.success && state.message && (
            <MessageAlert type="success" message={state.message} />
          )}
          {/* Error Message */}
          {!state.success && state.message && (
            <MessageAlert type="error" message={state.message} />
          )}
          {/* First Name Field */}
          <FormField
            id="firstName"
            name="firstName"
            type="text"
            label="الاسم الأول"
            placeholder="أدخلي اسمك الأول"
            value={formData.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            required
            disabled={isPending}
            validation={validation.firstName}
            serverError={state.errors?.firstName}
          />
          {/* Last Name Field */}
          <FormField
            id="lastName"
            name="lastName"
            type="text"
            label="اسم العائلة"
            placeholder="أدخلي اسم العائلة (اختياري)"
            value={formData.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            disabled={isPending}
            validation={validation.lastName}
            serverError={state.errors?.lastName}
          />
          {/* Email Field */}
          <FormField
            id="email"
            name="email"
            type="email"
            label="البريد الإلكتروني"
            placeholder="example@domain.com"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            required
            disabled={isPending}
            validation={validation.email}
            serverError={state.errors?.email}
          />{" "}
          {/* Phone Field */}
          <FormField
            id="phone"
            name="phone"
            type="tel"
            label="رقم الهاتف"
            placeholder="+20 123 456 7890"
            value={formData.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            required
            disabled={isPending}
            dir="rtl"
            validation={validation.phone}
            serverError={state.errors?.phone}
          />
          {/* Password Field */}
          <FormField
            id="password"
            name="password"
            type="password"
            label="كلمة المرور"
            placeholder="أدخلي كلمة مرور قوية"
            value={formData.password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            required
            disabled={isPending}
            validation={validation.password}
            serverError={state.errors?.password}
            helpText="يجب أن تحتوي على 6 أحرف على الأقل، حرف صغير وكبير ورقم"
          />
          {/* Confirm Password Field */}
          <FormField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="تأكيد كلمة المرور"
            placeholder="أعيدي إدخال كلمة المرور"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleFieldChange("confirmPassword", e.target.value)
            }
            required
            disabled={isPending}
            validation={validation.confirmPassword}
            serverError={state.errors?.confirmPassword}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !isFormValid}
          >
            {isPending ? (
              <Spinner size="small" show={true} />
            ) : (
              <>
                إنشاء الحساب
                <IconArrow />
              </>
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link
              href={ROUTES.LOGIN}
              className="text-primary hover:underline font-medium"
            >
              تسجيل الدخول
            </Link>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
