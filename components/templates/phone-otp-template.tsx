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

export default async function PhoneOtpTemplate({
  searchParams,
}: NextPageParams) {
  const supabase = await createSsrClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { phone: phoneFromParam } = await searchParams;
  const isChange = !!user;

  const phone = isChange ? user?.new_phone : `${phoneFromParam}`;
  if (!phone) {
    redirect(ROUTES.LOGIN);
  }
  if (!isChange) {
    const prisma = new PrismaClient();
    const userWithPhone = await prisma.users.findFirst({
      where: {
        phone: phone,
      },
    });
    if (!userWithPhone) {
      redirect(ROUTES.LOGIN);
    }
  }

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
        <PhoneOtpForm phone={phone} isChange={isChange} />
      </CardContent>
    </Card>
  );
}
