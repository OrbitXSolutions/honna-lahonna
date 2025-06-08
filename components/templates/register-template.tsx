import { AuthPromoSection } from "@/components/organisms/auth-promo-section";
import { RegisterForm } from "@/components/organisms/register-form";
import AuthTemplate from "./auth-template";

export default function RegisterTemplate() {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
}
