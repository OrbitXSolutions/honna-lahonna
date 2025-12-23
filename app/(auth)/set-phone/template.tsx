import { ROUTES } from "@/lib/constants/routes";
import { getServerUser } from "@/lib/api/server-auth";
import { redirect } from "next/navigation";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();
  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return children;
}
