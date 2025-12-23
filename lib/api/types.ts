// API Request DTOs
export interface RegisterRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    phoneNumber?: string;
    email?: string;
    password: string;
}

export interface GoogleLoginRequest {
    idToken: string;
}

export interface SendVerificationCodeRequest {
    phoneNumber: string;
}

export interface VerifyPhoneRequest {
    phoneNumber: string;
    code: string;
}

export interface ResendCodeRequest {
    phoneNumber: string;
}

// API Response DTOs
export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email?: string;
    photo?: string;
    phoneNumberConfirmed: boolean;
    emailConfirmed: boolean;
    roles: string[];
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    token?: string;
    expiresAt?: string;
    user?: UserInfo;
}

export interface ApiResponse {
    success: boolean;
    message?: string;
    errors?: string[];
}

// Auth state for context
export interface AuthState {
    user: UserInfo | null;
    token: string | null;
    expiresAt: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
