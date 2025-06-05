"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import NavMenu from "./nav-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavMenuToggle({
    className = '',
}: Readonly<{
    className?: string;
}>) {

    const router = useRouter() // Initialize useRouter
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    // const [user, setUser] = useState<User | null>(null) // State for user
    const [loadingUser, setLoadingUser] = useState(true) // State for loading user

    useEffect(() => {
        // const supabase = getSupabaseBrowserClient()
        // const fetchUser = async () => {
        //     const { data: { user: currentUser } } = await supabase.auth.getUser()
        //     setUser(currentUser)
        //     setLoadingUser(false)
        // }
        // fetchUser()

        // const { data: authListener } = supabase.auth.onAuthStateChange(
        //     async (event, session) => {
        //         setUser(session?.user ?? null)
        //         setLoadingUser(false)
        //         if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        //             router.refresh(); // Refresh server components on auth change
        //         }
        //     }
        // )
        // return () => {
        //     authListener?.unsubscribe()
        // }
    }, [router])


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleSignOut = async () => {
        // await signOut();
        // The onAuthStateChange listener and router.refresh() should handle UI updates.
    };
    return (
        <>
            <motion.button
                onClick={toggleMobileMenu}
                className={`p-2 text-gray-700 hover:text-primary cursor-pointer transition-colors ${className ?? ''}`}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Mobile Navigation Overlay */}
            <NavMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                // user={user} // Pass user to mobile nav
                onSignOut={handleSignOut} // Pass sign out handler
            />
        </>
    );
}