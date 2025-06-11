import {
  UserForRegister,
  UserForRegisterSchema,
} from "@/lib/data/models/schemas/register.schema";
import { createSsrClient } from "@/lib/supabase/server";
import {
  UserForPhoneLogin,
  UserForPhoneLoginSchema,
} from "../models/schemas/login.schema";
import {
  UserSetPhone,
  UserSetPhoneSchema,
} from "../models/schemas/set-phone-schema";
import {
  UserVerifyPhone,
  UserVerifyPhoneSchema,
} from "../models/schemas/confirm-phone-otp";
import { createClient } from "@/lib/supabase/client";

export async function registerUser(user: UserForRegister) {
  const parsedUser = UserForRegisterSchema.safeParse(user);
  if (!parsedUser.success) {
    throw new Error(
      "Invalid user data: " + JSON.stringify(parsedUser.error.issues)
    );
  }
  const supabase = await createSsrClient();

  const { data, error } = await supabase.auth.signUp({
    phone: parsedUser.data.phone,
    password: parsedUser.data.password,
    options: {
      data: {
        first_name: parsedUser.data.firstName,
        last_name: parsedUser.data.lastName,
        email: parsedUser.data.email,
      },
    },
  });

  if (error) {
    console.error("Error during user registration:", error);
    throw error;
  }


  console.log("User registered:", data.user);

  return data;
}

export async function registerWithGoogle() {
  const supabase = await createSsrClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function loginWithPhone(user: UserForPhoneLogin) {
  const parsedUser = UserForPhoneLoginSchema.safeParse(user);
  if (!parsedUser.success) {
    throw new Error(
      "Invalid user data: " + JSON.stringify(parsedUser.error.issues)
    );
  }
  const supabase = await createSsrClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    phone: parsedUser.data.phone,
    password: parsedUser.data.password,
  });

  if (error) {
    throw error;
  }
  if (!data.user) {
    throw new Error("User login failed");
  }

  return data;
}

export async function setUserPhone(input: UserSetPhone) {
  const parsedInput = UserSetPhoneSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error(
      "Invalid user data: " + JSON.stringify(parsedInput.error.issues)
    );
  }
  const supabase = await createSsrClient();

  const { data, error } = await supabase.auth.updateUser({
    phone: parsedInput.data.phone,
  });

  if (error) {
    throw error;
  }
  if (!data.user) {
    throw new Error("User phone update failed");
  }

  return data;
}

export async function verifyOtp(input: UserVerifyPhone) {
  const parsedInput = UserVerifyPhoneSchema.safeParse(input);
  if (
    !parsedInput.success ||
    !parsedInput.data.phone ||
    !parsedInput.data.token
  ) {
    throw new Error(
      "Invalid user data: " +
      JSON.stringify(parsedInput.error?.issues ?? `Invalid input`)
    );
  }
  const supabase = await createSsrClient();

  // const {
  //   data: { user },
  //   error: getUserError,
  // } = await supabase.auth.getUser();
  // if (getUserError) {
  //   throw getUserError;
  // }
  // if (!user) {
  //   throw new Error("User not found");
  // }

  // if (!user.phone && !user.new_phone) {
  //   throw new Error("User phone is not set");
  // }

  // const isPhoneChange = !!user.new_phone;

  // const phone = isPhoneChange ? user.new_phone : user.phone;

  // if (!phone) throw new Error("User phone is not set");

  const { data, error } = await supabase.auth.verifyOtp({
    phone: parsedInput.data.phone,
    token: parsedInput.data.token,
    type: parsedInput.data.isChange ? "phone_change" : "sms",
  });

  if (error) {
    throw error;
  }
  if (!data.user) {
    throw new Error("User OTP verification failed");
  }

  return data;
}

export async function verifyOtpChange(input: UserVerifyPhone) {
  const parsedInput = UserVerifyPhoneSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error(
      "Invalid user data: " + JSON.stringify(parsedInput.error.issues)
    );
  }
  const supabase = await createSsrClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();
  if (getUserError) {
    throw getUserError;
  }
  if (!user) {
    throw new Error("User not found");
  }

  const phone = user.phone;
  if (!phone) {
    throw new Error("User phone is not set");
  }

  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token: parsedInput.data.token,
    type: "phone_change",
  });

  if (error) {
    throw error;
  }
  if (!data.user) {
    throw new Error("User OTP verification failed");
  }

  return data;
}

export async function resendPhoneOtp() {
  const supabase = createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();
  if (getUserError) {
    throw getUserError;
  }
  if (!user) {
    throw new Error("User not found");
  }

  const phone = user.phone;
  if (!phone) {
    throw new Error("User phone is not set");
  }

  const { data, error } = await supabase.auth.resend({
    phone,
    type: "sms",
  });

  if (error) {
    throw error;
  }

  return data;
}
