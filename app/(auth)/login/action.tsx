import { ROUTES } from "@/lib/constants/routes";
import { UserForPhoneLoginSchema } from "@/lib/data/models/schemas/login.schema";
import { loginWithPhone } from "@/lib/data/supabase/auth";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";

export const loginAction = actionClient
  .inputSchema(UserForPhoneLoginSchema)
  .action(async ({ parsedInput: data }) => {
    const { user, session } = await loginWithPhone(data);

    if (!user?.phone) {
      redirect(`${ROUTES.SET_PHONE}`);
    }
    if (!user.phone_confirmed_at) {
      redirect(`${ROUTES.OTP}`);
    }
  });
