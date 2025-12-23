/**
 * API Client for the .NET 9 backend
 * Base URL: https://back.honnalahonna.com
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://back.honnalahonna.com";

// Token storage keys
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const EXPIRES_AT_KEY = "auth_expires_at";

/**
 * Get the stored auth token
 */
export function getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get the stored user info
 */
export function getStoredUser(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(USER_KEY);
}

/**
 * Get the token expiration time
 */
export function getStoredExpiresAt(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(EXPIRES_AT_KEY);
}

/**
 * Store auth data in localStorage
 */
export function storeAuthData(token: string, user: object, expiresAt: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
}

/**
 * Clear auth data from localStorage
 */
export function clearAuthData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
}

/**
 * Check if the token is expired
 */
export function isTokenExpired(): boolean {
    const expiresAt = getStoredExpiresAt();
    if (!expiresAt) return true;

    const expirationDate = new Date(expiresAt);
    const now = new Date();

    // Add a 1 minute buffer to handle clock skew
    return now >= new Date(expirationDate.getTime() - 60000);
}

/**
 * API Error class for handling API errors
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public errors?: string[]
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/**
 * Fetch wrapper with automatic token handling
 */
export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // Build headers
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    // Add auth token if available and not expired
    const token = getStoredToken();
    if (token && !isTokenExpired()) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    // Parse response body
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new ApiError(
            data.message || "An error occurred",
            response.status,
            data.errors
        );
    }

    return data as T;
}

/**
 * GET request helper
 */
export async function get<T>(endpoint: string): Promise<T> {
    return apiClient<T>(endpoint, { method: "GET" });
}

/**
 * POST request helper
 */
export async function post<T>(endpoint: string, body?: unknown): Promise<T> {
    return apiClient<T>(endpoint, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
    });
}

/**
 * PUT request helper
 */
export async function put<T>(endpoint: string, body?: unknown): Promise<T> {
    return apiClient<T>(endpoint, {
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
    });
}

/**
 * DELETE request helper
 */
export async function del<T>(endpoint: string): Promise<T> {
    return apiClient<T>(endpoint, { method: "DELETE" });
}
