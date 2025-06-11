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
    <Card className="mx-auto max-w-sm bg-white my-10" suppressHydrationWarning>
      <CardHeader>
        <CardTitle className="text-2xl">{"تأكيد رقم الهاتف"}</CardTitle>
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
  );
}
