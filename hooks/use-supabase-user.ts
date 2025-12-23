import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserInfo } from "@/lib/api/types";
import {
  getCurrentUser,
  isAuthenticated,
  logout as apiLogout,
} from "@/lib/api/auth";
import { clearAuthData } from "@/lib/api/client";
import { ROUTES } from "@/lib/constants/routes";

/**
 * Custom hook to fetch and manage the user on the client side.
 * Replaces the previous Supabase-based hook.
 * @returns An object containing the user object (or null) and a loading state.
 */
export function useSupabaseUser() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const fetchUser = () => {
      try {
        if (isAuthenticated()) {
          const currentUser = getCurrentUser();
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pathname]);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      apiLogout();
      clearAuthData();
      setUser(null);
      router.push(ROUTES.LOGIN);
    } catch (e) {
      console.error("Exception during sign out:", e);
    } finally {
      setIsLoggingOut(false);
    }
  }, [router]);

  return { user, loading, mounted, logout, isLoggingOut };
}

// Re-export the useAuth hook for new code
export { useAuth } from "@/lib/api/auth-context";
