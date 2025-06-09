"use client";

import { useState, useEffect } from "react";
import { resendPhoneOtp } from "@/lib/data/supabase/auth";
import AppButton from "./app-button";
// Consider adding a toast notification for user feedback
// import { toast } from "sonner";

const COOLDOWN_SECONDS = 60; // 60 seconds cooldown

export default function ResendOtpButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [cooldownTimeRemaining, setCooldownTimeRemaining] =
    useState(COOLDOWN_SECONDS);

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
      await resendPhoneOtp();
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
        onClick={handleResendOtp}
        disabled={isLoading || isCooldownActive}
      >
        {isLoading
          ? "Sending..."
          : isCooldownActive
          ? `Resend OTP in ${cooldownTimeRemaining}s`
          : "Resend OTP"}
      </AppButton>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
