"use client";

import { useEffect } from "react";
import { getStoredToken, getStoredUser } from "@/lib/api/client";
import { isAuthenticated } from "@/lib/api/auth";

/**
 * Client component that logs auth status to console for debugging
 * Renders nothing to the DOM
 */
export default function AuthLogger() {
    useEffect(() => {
        const isLoggedIn = isAuthenticated();
        const token = getStoredToken();
        const userJson = getStoredUser();

        console.log("%c🏠 HOME PAGE AUTH STATUS", "background: #222; color: #bada55; font-size: 16px; padding: 4px;");
        console.log("%c👤 User logged in:", "color: #00ff00; font-weight: bold;", isLoggedIn);
        console.log("%c🔑 Token:", "color: #ffcc00; font-weight: bold;", token ? token.substring(0, 50) + "..." : "null");

        if (userJson) {
            try {
                const user = JSON.parse(userJson);
                console.log("%c📋 User Data:", "color: #00ccff; font-weight: bold;", user);
            } catch {
                console.log("%c📋 User (raw):", "color: #00ccff; font-weight: bold;", userJson);
            }
        } else {
            console.log("%c📋 User:", "color: #00ccff; font-weight: bold;", "null");
        }
    }, []);

    return null;
}
