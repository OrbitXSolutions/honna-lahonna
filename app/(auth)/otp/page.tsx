import PhoneOtpTemplate from "@/components/templates/phone-otp-template";
import { NextPageParams } from "@/lib/utils/next-page-types";

export default async function OtpPage(pageParams: NextPageParams) {
  return <PhoneOtpTemplate {...pageParams} />;
}
