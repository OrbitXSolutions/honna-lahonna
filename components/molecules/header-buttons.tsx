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
import { LogOut, User, UserPlus } from "lucide-react"; // Example icons
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
    const firstName: string | undefined = user.user_metadata["first_name"];
    const displayName = firstName && firstName.trim().length > 0 ? firstName : user.email ?? "";
    const userInitial = displayName ? displayName[0]!.toUpperCase() : "U";
    const isServiceProvider = user.user_metadata?.is_service_provider;
    return (
      <div className={`flex items-center gap-2 ${className ?? ""}`} {...props}>
        {children}
        {/* {user.user_metadata?.avatar_url} */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* Use a focusable button to ensure Radix trigger works reliably */}
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-accent focus:bg-accent focus:outline-none"
              aria-label="Account menu"
            >
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user.user_metadata?.avatar_url}
                  alt={user.email ?? "User"}
                />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              {/* Show first name or email next to the avatar */}
              <span className="text-sm font-medium text-foreground hidden sm:inline">
                {displayName}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              {isServiceProvider ? (
                <AppLink
                  href={ROUTES.SERVICE_PROVIDER_PROFILE}
                  className="flex items-center w-full"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{"الملف الشخصي"}</span>
                </AppLink>
              ) : (
                <AppLink
                  href={ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM}
                  className="flex items-center w-full"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>{"سجل كمقدم خدمة"}</span>
                </AppLink>
              )}
            </DropdownMenuItem>
            {/* Use onSelect to handle logout reliably */}
            <DropdownMenuItem
              onSelect={async (e) => {
                e.preventDefault();
                try {
                  await logout();
                } finally {
                  // Redirect to server-side logout route to clear SSR session and then back home
                  window.location.href = "/logout";
                }
              }}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{"تسجيل الخروج"}</span>
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
