/**
 * Auth API service for the .NET 9 backend
 */

import { post, storeAuthData, clearAuthData, getStoredToken, getStoredUser, isTokenExpired } from "./client";
import {
    AuthResponse,
    ApiResponse,
    LoginRequest,
    RegisterRequest,
    GoogleLoginRequest,
    SendVerificationCodeRequest,
    VerifyPhoneRequest,
    ResendCodeRequest,
    UserInfo,
} from "./types";

// Auth API endpoints
const AUTH_ENDPOINTS = {
    REGISTER: "/api/Auth/register",
    LOGIN: "/api/Auth/login",
    GOOGLE_LOGIN: "/api/Auth/google-login",
    SEND_CODE: "/api/Auth/phone/send-code",
    VERIFY_PHONE: "/api/Auth/phone/verify",
    RESEND_CODE: "/api/Auth/phone/resend-code",
};

/**
 * Register a new user
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
    console.log("📤 Register request to backend:", JSON.stringify(data, null, 2));

    const response = await post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, data);

    console.log("📥 Register response from backend:", JSON.stringify(response, null, 2));

    // Extract auth data from nested data property or from flat structure
    const authData = response.data || response;
    const token = authData.token;
    const user = authData.user;
    const expiresAt = authData.expiresAt;

    if (response.success && token && user && expiresAt) {
        console.log("✅ Register successful - storing auth data");
        storeAuthData(token, user, expiresAt);
    }

    // Return normalized response with token/user/expiresAt at top level for easier access
    return {
        ...response,
        token,
        user,
        expiresAt,
    };
}

/**
 * Login with phone number or email
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
    console.log("📤 Login request to backend:", JSON.stringify(data, null, 2));

    const response = await post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, data);

    console.log("📥 Login response from backend:", JSON.stringify(response, null, 2));

    // Extract auth data from nested data property or from flat structure
    const authData = response.data || response;
    const token = authData.token;
    const user = authData.user;
    const expiresAt = authData.expiresAt;

    if (response.success && token && user && expiresAt) {
        console.log("✅ Login successful - storing auth data");
        storeAuthData(token, user, expiresAt);
    } else {
        console.log("❌ Login response missing required fields:", {
            success: response.success,
            hasToken: !!token,
            hasUser: !!user,
            hasExpiresAt: !!expiresAt,
        });
    }

    // Return normalized response with token/user/expiresAt at top level for easier access
    return {
        ...response,
        token,
        user,
        expiresAt,
    };
}

/**
 * Login with Google OAuth
 */
export async function googleLogin(data: GoogleLoginRequest): Promise<AuthResponse> {
    const response = await post<AuthResponse>(AUTH_ENDPOINTS.GOOGLE_LOGIN, data);

    // Extract auth data from nested data property or from flat structure
    const authData = response.data || response;
    const token = authData.token;
    const user = authData.user;
    const expiresAt = authData.expiresAt;

    if (response.success && token && user && expiresAt) {
        storeAuthData(token, user, expiresAt);
    }

    // Return normalized response with token/user/expiresAt at top level for easier access
    return {
        ...response,
        token,
        user,
        expiresAt,
    };
}

/**
 * Send OTP verification code to phone number
 */
export async function sendVerificationCode(data: SendVerificationCodeRequest): Promise<ApiResponse> {
    return post<ApiResponse>(AUTH_ENDPOINTS.SEND_CODE, data);
}

/**
 * Verify phone number with OTP code
 */
export async function verifyPhone(data: VerifyPhoneRequest): Promise<ApiResponse> {
    return post<ApiResponse>(AUTH_ENDPOINTS.VERIFY_PHONE, data);
}

/**
 * Resend OTP verification code
 */
export async function resendCode(data: ResendCodeRequest): Promise<ApiResponse> {
    return post<ApiResponse>(AUTH_ENDPOINTS.RESEND_CODE, data);
}

/**
 * Logout - clears stored auth data
 */
export function logout(): void {
    clearAuthData();
}

/**
 * Get current user from storage
 */
export function getCurrentUser(): UserInfo | null {
    const userJson = getStoredUser();
    if (!userJson) return null;

    try {
        return JSON.parse(userJson) as UserInfo;
    } catch {
        return null;
    }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    const token = getStoredToken();
    if (!token) return false;
    return !isTokenExpired();
}

/**
 * Get auth token for API requests
 */
export function getAuthToken(): string | null {
    if (isTokenExpired()) {
        clearAuthData();
        return null;
    }
    return getStoredToken();
}
