"use client";
import Logo from "../atoms/logo";
import PhoneOtpForm from "../organisms/phone-otp-form";

export default function PhoneOtpTemplate() {
  return (
    <div
      className="flex flex-col max-w-lg mx-auto space-y-5"
      suppressHydrationWarning
    >
      <Logo />
      <div className="space-y-3 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span>{"تأكيد رقم الهاتف"}</span>
        </h2>
        <p className="text-muted-foreground">
          {
            "لقد أرسلنا رمز تحقق إلى رقم هاتفك. الرجاء إدخال الرمز أدناه للمتابعة."
          }
        </p>
      </div>
      <PhoneOtpForm />
    </div>
  );
}
