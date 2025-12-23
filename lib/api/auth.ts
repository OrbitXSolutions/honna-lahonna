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
    const response = await post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, data);

    if (response.success && response.token && response.user && response.expiresAt) {
        storeAuthData(response.token, response.user, response.expiresAt);
    }

    return response;
}

/**
 * Login with phone number or email
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
    const response = await post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, data);

    if (response.success && response.token && response.user && response.expiresAt) {
        storeAuthData(response.token, response.user, response.expiresAt);
    }

    return response;
}

/**
 * Login with Google OAuth
 */
export async function googleLogin(data: GoogleLoginRequest): Promise<AuthResponse> {
    const response = await post<AuthResponse>(AUTH_ENDPOINTS.GOOGLE_LOGIN, data);

    if (response.success && response.token && response.user && response.expiresAt) {
        storeAuthData(response.token, response.user, response.expiresAt);
    }

    return response;
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
