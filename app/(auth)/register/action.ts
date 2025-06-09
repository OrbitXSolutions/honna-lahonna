"use server";

import { ActionState } from "@/lib/data/models/action-state";
import { UserForRegister } from "@/lib/data/models/schemas/register.schema";
import { redirect } from "next/navigation";

export interface RegisterFormState extends ActionState<UserForRegister> {}

export async function registerAction(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  try {
    // const password = formData.get("password") as string;
    // const confirmPassword = formData.get("confirmPassword") as string;

    // // Validate password confirmation
    // if (password !== confirmPassword) {
    //   return {
    //     success: false,
    //     message: "كلمات المرور غير متطابقة",
    //     errors: {
    //       confirmPassword: ["كلمة المرور وتأكيد كلمة المرور غير متطابقين"],
    //     },
    //   };
    // }
    // const userData: UserForRegister = {
    //   email: formData.get("email") as string,
    //   password: password,
    //   firstName: formData.get("firstName") as string,
    //   lastName: formData.get("lastName") as string,
    //   phone: formData.get("phone") as string,
    // };

    // const result = await registerUser(userData);

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
