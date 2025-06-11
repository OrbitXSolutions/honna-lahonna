import PhoneOtpTemplate from "@/components/templates/phone-otp-template";
import RegisterTemplate from "@/components/templates/register-template";
import { createSsrClient } from "@/lib/supabase/server";

export default async function OtpPage() {
  const supabase = await createSsrClient();
  const { data: { user } } = await supabase.auth.getUser();
  return <>
    <div className="container mx-auto my-10 p-10 bg-white rounded-lg shadow-md">
      {`${user}`}
    </div>
    <PhoneOtpTemplate />
  </>;
}
