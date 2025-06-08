import { Metadata } from "next";
import { ServiceProviderRegistrationTemplate } from "@/components/templates/service-provider-registration-template";

export const metadata: Metadata = {
  title: "تسجيل مقدم خدمة - هنا لهنا",
  description:
    "انضم إلى منصة هنا لهنا كمقدم خدمة وابدأ في تقديم خدماتك للعملاء",
};

export default function ServiceProviderRegistrationPage() {
  return <ServiceProviderRegistrationTemplate />;
}
