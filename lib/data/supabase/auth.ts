import {
  UserForRegister,
  UserForRegisterSchema,
} from "@/lib/data/models/schemas/register.schema";
import { createSsrClient } from "@/lib/supabase/server";

export async function registerUser(user: UserForRegister) {
  const parsedUser = UserForRegisterSchema.safeParse(user);
  if (!parsedUser.success) {
    throw new Error(
      "Invalid user data: " + JSON.stringify(parsedUser.error.issues)
    );
  }
  const supabase = await createSsrClient();

  const { data, error } = await supabase.auth.signUp({
    email: parsedUser.data.email,
    password: parsedUser.data.password,
    options: {
      data: {
        first_name: parsedUser.data.firstName,
        last_name: parsedUser.data.lastName,
        phone: parsedUser.data.phone,
      },
    },
  });

  if (error) {
    throw error;
  }
  if (!data.user) {
    throw new Error("User registration failed");
  }

  //   const adminClient = await createAdminClient();
  //   adminClient.auth.admin.updateUserById(data.user.id, {
  //     phone: parsedUser.data.phone,
  //   });

  return data;
}
