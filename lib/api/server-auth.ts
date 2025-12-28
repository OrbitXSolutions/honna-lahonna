import { cookies } from "next/headers";
import { UserInfo } from "./types";

/**
 * Decode JWT token to get user info
 * Note: This is a simple decode - in production, you should verify the token signature
 */
export function decodeToken(token: string): UserInfo | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
        return {
            id: payload.sub || payload.nameid || payload.id,
            firstName: payload.given_name || payload.firstName || "",
            lastName: payload.family_name || payload.lastName || "",
            phoneNumber: payload.phone_number || payload.phoneNumber,
            email: payload.email,
            photo: payload.picture || payload.photo,
            phoneNumberConfirmed: payload.phone_number_verified === "true" || payload.phoneNumberConfirmed === true,
            emailConfirmed: payload.email_verified === "true" || payload.emailConfirmed === true,
            roles: payload.role ? (Array.isArray(payload.role) ? payload.role : [payload.role]) : [],
            isServiceProvider: payload.IsServiceProvider === "true" || payload.IsServiceProvider === true || payload.isServiceProvider === true,
            serviceProviderId: payload.ServiceProviderId ? parseInt(payload.ServiceProviderId, 10) : (payload.serviceProviderId ?? null),
        };
    } catch {
        return null;
    }
}

/**
 * Get the current user from the auth token cookie (server-side)
 */
export async function getServerUser(): Promise<UserInfo | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return null;
    }

    return decodeToken(token);
}

/**
 * Check if user is authenticated (server-side)
 */
export async function isServerAuthenticated(): Promise<boolean> {
    const user = await getServerUser();
    return user !== null;
}
