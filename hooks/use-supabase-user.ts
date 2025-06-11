import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

/**
 * Custom hook to fetch and manage the Supabase user on the client side.
 * @returns An object containing the Supabase user object (or null) and a loading state.
 */
export function useSupabaseUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();
        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
            } catch (error) {
                console.error("Error fetching user:", error);
                // Optionally handle the error, e.g., setUser(null)
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                // Potentially set loading to false here as well if the initial fetch hasn't completed
                // or if you want to indicate a change in auth state has resolved.
                // However, for the initial load, the fetchUser's finally block handles it.
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    return { user, loading };
}