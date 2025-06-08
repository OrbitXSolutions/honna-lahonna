"use server";

import {
  registerUser,
  UserForRegister,
  loginUser,
  UserForLogin,
} from "../data/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "../constants/routes";

interface RegisterFormState {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    firstName?: string[];
    lastName?: string[];
    phone?: string[];
  };
}

interface LoginFormState {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
}

export async function registerAction(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  try {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate password confirmation
    if (password !== confirmPassword) {
      return {
        success: false,
        message: "كلمات المرور غير متطابقة",
        errors: {
          confirmPassword: ["كلمة المرور وتأكيد كلمة المرور غير متطابقين"],
        },
      };
    }
    const userData: UserForRegister = {
      email: formData.get("email") as string,
      password: password,
      firstName: formData.get("firstName") as string,
      lastName: (formData.get("lastName") as string) || undefined,
      phone: formData.get("phone") as string,
    };

    const result = await registerUser(userData);

    if (result.user) {
      redirect(ROUTES.LOGIN + "?message=registration-successful");
    }

    return {
      success: true,
      message: "تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.",
    };
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error) {
      // Handle Zod validation errors
      if (error.message.includes("Invalid user data:")) {
        try {
          // Parse the Zod error message to extract individual field errors
          const errorMessage = error.message.replace("Invalid user data: ", "");
          const parsedErrors = JSON.parse(errorMessage);
          const fieldErrors: Record<string, string[]> = {};

          if (parsedErrors && Array.isArray(parsedErrors)) {
            parsedErrors.forEach((err: any) => {
              if (err.path && err.path.length > 0) {
                const fieldName = err.path[0] as string;
                if (!fieldErrors[fieldName]) {
                  fieldErrors[fieldName] = [];
                }
                fieldErrors[fieldName].push(err.message);
              }
            });
          }

          return {
            success: false,
            message: "يرجى التحقق من البيانات المدخلة وإصلاح الأخطاء",
            errors: {
              email: fieldErrors.email,
              password: fieldErrors.password,
              confirmPassword: fieldErrors.confirmPassword,
              firstName: fieldErrors.firstName,
              lastName: fieldErrors.lastName,
              phone: fieldErrors.phone,
            },
          };
        } catch (parseError) {
          // Fallback to original error handling if parsing fails
          const errorMessage = error.message.replace("Invalid user data: ", "");
          return {
            success: false,
            message: "يرجى التحقق من البيانات المدخلة",
            errors: {
              email: errorMessage.includes("email")
                ? ["يرجى إدخال بريد إلكتروني صحيح"]
                : undefined,
              password: errorMessage.includes("password")
                ? ["كلمة المرور يجب أن تكون 6 أحرف على الأقل"]
                : undefined,
              firstName: errorMessage.includes("firstName")
                ? ["يرجى إدخال الاسم الأول"]
                : undefined,
            },
          };
        }
      }

      // Handle Supabase auth errors
      if (error.message.includes("already registered")) {
        return {
          success: false,
          message: "هذا البريد الإلكتروني مسجل مسبقاً",
          errors: {
            email: ["البريد الإلكتروني مستخدم بالفعل"],
          },
        };
      }
    }

    return {
      success: false,
      message: "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
    };
  }
}

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  try {
    const userData: UserForLogin = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = await loginUser(userData);
    if (result.user) {
      redirect("/dashboard");
    }

    return {
      success: true,
      message: "تم تسجيل الدخول بنجاح!",
    };
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof Error) {
      // Handle Zod validation errors
      if (error.message.includes("Invalid login data:")) {
        try {
          const errorMessage = error.message.replace(
            "Invalid login data: ",
            ""
          );
          const parsedErrors = JSON.parse(errorMessage);
          const fieldErrors: Record<string, string[]> = {};

          if (parsedErrors && Array.isArray(parsedErrors)) {
            parsedErrors.forEach((err: any) => {
              if (err.path && err.path.length > 0) {
                const fieldName = err.path[0] as string;
                if (!fieldErrors[fieldName]) {
                  fieldErrors[fieldName] = [];
                }
                fieldErrors[fieldName].push(err.message);
              }
            });
          }

          return {
            success: false,
            message: "يرجى التحقق من بيانات تسجيل الدخول",
            errors: {
              email: fieldErrors.email,
              password: fieldErrors.password,
            },
          };
        } catch (parseError) {
          return {
            success: false,
            message: "يرجى التحقق من بيانات تسجيل الدخول",
            errors: {
              email: ["يرجى إدخال بريد إلكتروني صحيح"],
              password: ["يرجى إدخال كلمة المرور"],
            },
          };
        }
      }

      // Handle Supabase auth errors
      if (error.message.includes("Invalid login credentials")) {
        return {
          success: false,
          message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          errors: {
            email: ["البريد الإلكتروني أو كلمة المرور غير صحيحة"],
          },
        };
      }

      if (error.message.includes("Email not confirmed")) {
        return {
          success: false,
          message: "يرجى تأكيد البريد الإلكتروني أولاً",
          errors: {
            email: ["يرجى تأكيد البريد الإلكتروني أولاً"],
          },
        };
      }
    }

    return {
      success: false,
      message: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
    };
  }
}
