"use server";

import { ROUTES } from "@/lib/constants/routes";
import { ActionState } from "@/lib/data/models/action-state";
import {
  UserForRegister,
  UserForRegisterSchema,
} from "@/lib/data/models/schemas/register.schema";
import { registerUser } from "@/lib/data/supabase/auth";
import { actionClient } from "@/lib/safe-action";
import { Session, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const registerAction = actionClient
  .inputSchema(UserForRegisterSchema)
  .action(async ({ parsedInput: data }) => {
    const { user, session } = await registerUser(data);

    if (!user?.phone) {
      redirect(`${ROUTES.SET_PHONE}`);
    }
    if (!user.phone_confirmed_at) {
      redirect(`${ROUTES.OTP}`);
    }
  });
