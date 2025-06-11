"use client";

import { useState, useEffect } from "react";
import AppButton from "./app-button";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
// Consider adding a toast notification for user feedback
// import { toast } from "sonner";

const COOLDOWN_SECONDS = 60; // 60 seconds cooldown

async function resendPhoneOtp(phone = '') {
  const supabase = createClient();
  const { data: {user}, error } = await supabase.auth.getUser();
  const isChange = user ?? false ;
  if (isChange) {
    if (error) {
      throw error;
    }
    if (!user) {
      throw new Error("User not found");
    }
    const phone = user.new_phone;
    if (!phone) {
      throw new Error("User phone is not set");
    }

    return await supabase.auth.resend({
      phone,
      type: "phone_change",
    });
  } else {
    return await supabase.auth.resend({
      phone,
      type: "sms",
    });
  }
}

export default function ResendOtpButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [cooldownTimeRemaining, setCooldownTimeRemaining] =
    useState(COOLDOWN_SECONDS);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldownActive && cooldownTimeRemaining > 0) {
      timer = setTimeout(() => {
        setCooldownTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (cooldownTimeRemaining === 0) {
      setIsCooldownActive(false);
      setCooldownTimeRemaining(COOLDOWN_SECONDS); // Reset for next time
    }
    return () => clearTimeout(timer);
  }, [isCooldownActive, cooldownTimeRemaining]);

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const phone = searchParams.get("phone") || '';
      await resendPhoneOtp(phone);
      //   toast.success("OTP has been resent successfully!");
      
      setIsCooldownActive(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      //   toast.error(`Failed to resend OTP: ${errorMessage}`);
      console.error("Resend OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AppButton
        variant={"outline"}
        className="cursor-pointer"
        onClick={handleResendOtp}
        disabled={isLoading || isCooldownActive}
      >
        {isLoading
          ? "جاري الإرسال..."
          : isCooldownActive
          ? `يمكنك الإرسال بعد ${cooldownTimeRemaining}s`
          : "إعادة الإرسال"}
      </AppButton>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
