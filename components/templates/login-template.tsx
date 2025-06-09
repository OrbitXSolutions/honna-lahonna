"use client";
import dynamic from "next/dynamic";
import Logo from "../atoms/logo";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import LoginForm from "../organisms/login-form";
import AppLink from "../atoms/app-link";
import { ROUTES } from "@/lib/constants/routes";

const SignInWithGoogle = dynamic(() => import("../atoms/sign-in-with-google"), {
  ssr: false,
  loading: () => (
    <Skeleton
      style={{ height: 30 }}
      className="rounded-3xl bg-gray-200 w-full"
    />
  ),
});

export default function LoginTemplate() {
  return (
    <div
      className="flex flex-col max-w-lg mx-auto space-y-5"
      suppressHydrationWarning
    >
      <Logo />

      <div className="space-y-3">
        <p className="font-medium">
          <span>{"مرحباً بكم في"}</span>&nbsp;
          <span className="text-primary">{"هن لهن!"}</span>
          <span>{"👋"}</span>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          <span>{"تسجيل الدخول"}</span>
        </h2>
        <p>
          {
            "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم، كما تستحقين بالإضافة إلي تقديم خدمات استشارية مخصصة لكي …"
          }
        </p>
      </div>
      <LoginForm />
      <div className="flex  items-center justify-center gap-4 ">
        <Separator className="flex-1" />

        <span className="font-body-md-medium">{"أو"}</span>

        <Separator className="flex-1" />
      </div>
      <SignInWithGoogle />
      <p className="text-center text-sm text-gray-500">
        {"ليس لديك حساب؟ "}
        <AppLink href={ROUTES.REGISTER} className="text-primary font-medium">
          {"إنشاء حساب"}
        </AppLink>
      </p>
    </div>
  );
}
