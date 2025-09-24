import { ROUTES } from "@/lib/constants/routes";
import Logo from "../atoms/logo";
import PhoneOtpForm from "../organisms/phone-otp-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { createSsrClient } from "@/lib/supabase/server";
import { NextPageParams } from "@/lib/utils/next-page-types";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/lib/generated/prisma";
import { Suspense } from "react";

export default async function PhoneOtpTemplate() {


  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white shadow-md" suppressHydrationWarning>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl" style={{ color: "#d8859cfd" }}>{
            "تأكيد رقم الهاتف"
          }</CardTitle>
          <CardDescription>
            {
              "لقد أرسلنا رمز تحقق إلى رقم هاتفك. الرجاء إدخال الرمز أدناه للمتابعة."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <PhoneOtpForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
