"use client";
import { ROUTES } from "@/lib/constants/routes";
import AppButton from "../atoms/app-button";
import AppLink from "../atoms/app-link";
import { IconArrow, IconCall } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming shadcn/ui path
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Assuming shadcn/ui path
import { LogOut, UserPlus } from "lucide-react"; // Example icons
import { useSupabaseUser } from "@/hooks/use-supabase-user";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

interface HeaderButtonsProps {
  className?: string;
  children?: React.ReactNode;
}

export default function HeaderButtons({
  children,
  className = "",
  ...props
}: Readonly<HeaderButtonsProps>) {
  const { user, loading, mounted, logout, isLoggingOut } = useSupabaseUser();

  // if (loading && mounted) {
  //   // Optional: render a loading state or null
  //   return <div className={`flex items-center gap-1 ${className ?? ""}`} {...props}>
  //     {children}
  //     <Skeleton className="h-10 w-10 rounded-full" /> {/* Skeleton for Avatar */}
  //   </div>
  // }

  if (isLoggingOut) {
    return (
      <div className={`flex items-center gap-1 ${className ?? ""}`} {...props}>
        {children}
        <Spinner size={"small"} />
      </div>
    );
  }
  if (user) {
    const userInitial = user.user_metadata["first_name"]
      ? user.user_metadata["first_name"][0].toUpperCase()
      : "U";
    return (
      <div className={`flex items-center gap-1 ${className ?? ""}`} {...props}>
        {children}
        {/* {user.user_metadata?.avatar_url} */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={user.user_metadata?.avatar_url}
                alt={user.email ?? "User"}
              />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <AppLink
                href={ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM}
                className="flex items-center w-full"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span>{"سجل كمقدم خدمة"}</span>
              </AppLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AppLink
                href={ROUTES.LOGOUT}
                onClick={logout}
                className="flex items-center w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{"تسجيل الخروج"}</span>
              </AppLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className={`flex gap-1 ${className ?? ""}`} {...props}>
      {children}
      <AppButton variant="outline">
        <span>{"تواصلي معنا"}</span>
        <IconCall />
      </AppButton>
      <AppButton asChild>
        <AppLink loaderClassName="text-white" href={ROUTES.REGISTER}>
          <span>{"سجلي الأن"}</span>
          <IconArrow />
        </AppLink>
      </AppButton>
    </div>
  );
}
