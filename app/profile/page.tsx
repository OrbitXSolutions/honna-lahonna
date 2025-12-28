import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";

export default function ProfilePage() {
    // Redirect to service provider profile
    redirect(ROUTES.SERVICE_PROVIDER_PROFILE);
}
