import Logo from "../atoms/logo";
import PhoneOtpForm from "../organisms/phone-otp-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export default function PhoneOtpTemplate() {
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
        <PhoneOtpForm />
      </CardContent>
    </Card>
  );
}
