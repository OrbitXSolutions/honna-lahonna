"use client";
import Logo from "../atoms/logo";
import SetPhoneForm from "../organisms/set-phone-form";

export default function SetPhoneTemplate() {
  return (
    <div
      className="flex flex-col max-w-lg mx-auto space-y-5"
      suppressHydrationWarning
    >
      <Logo />

      <div className="space-y-3 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span>{"إضافة رقم الهاتف"}</span>
        </h2>
        <p className="text-muted-foreground">
          {
            "الرجاء إدخال رقم الهاتف الخاص بك للمتابعة. سوف نرسل لك رمز تحقق لمرة واحدة (OTP)."
          }
        </p>
      </div>
      <SetPhoneForm />
    </div>
  );
}
