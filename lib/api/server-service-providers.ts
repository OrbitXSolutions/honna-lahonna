import { cookies } from "next/headers";
import { ServiceProviderUserDto, ApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://back.honnalahonna.com";

/**
 * Get current user's service provider profile from backend API
 * Server-side only - uses cookies for authentication
 */
export async function getMyServiceProviderProfileServer(): Promise<ServiceProviderUserDto | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            console.log("📛 No auth token found in cookies");
            return null;
        }

        console.log("📤 Fetching my-profile from backend API");

        const response = await fetch(`${API_BASE_URL}/api/ServiceProviders/my-profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store", // Don't cache - always fetch fresh data
        });

        if (!response.ok) {
            console.log("📛 Backend API error:", response.status, response.statusText);
            return null;
        }

        const result: ApiResponse<ServiceProviderUserDto> = await response.json();

        console.log("📥 my-profile response:", JSON.stringify(result, null, 2));

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch (error) {
        console.error("Error fetching service provider profile:", error);
        return null;
    }
}
