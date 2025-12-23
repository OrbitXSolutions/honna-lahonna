"use client";

import {
    createContext,
    useContext,
    useCallback,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    UserInfo,
    AuthState,
    LoginRequest,
    RegisterRequest,
    GoogleLoginRequest,
    SendVerificationCodeRequest,
    VerifyPhoneRequest,
} from "@/lib/api/types";
import {
    login as apiLogin,
    register as apiRegister,
    googleLogin as apiGoogleLogin,
    sendVerificationCode as apiSendCode,
    verifyPhone as apiVerifyPhone,
    resendCode as apiResendCode,
    logout as apiLogout,
    getCurrentUser,
    isAuthenticated,
    getAuthToken,
} from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { ROUTES } from "@/lib/constants/routes";

interface AuthContextType extends AuthState {
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    googleLogin: (idToken: string) => Promise<void>;
    sendVerificationCode: (phoneNumber: string) => Promise<void>;
    verifyPhone: (phoneNumber: string, code: string) => Promise<void>;
    resendCode: (phoneNumber: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        expiresAt: null,
        isAuthenticated: false,
        isLoading: true,
    });

    const router = useRouter();
    const pathname = usePathname();

    // Initialize auth state from storage
    const refreshUser = useCallback(() => {
        const user = getCurrentUser();
        const token = getAuthToken();
        const authenticated = isAuthenticated();

        setState({
            user,
            token,
            expiresAt: typeof window !== "undefined"
                ? localStorage.getItem("auth_expires_at")
                : null,
            isAuthenticated: authenticated,
            isLoading: false,
        });
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser, pathname]);

    const login = useCallback(async (data: LoginRequest) => {
        const response = await apiLogin(data);

        if (!response.success) {
            throw new ApiError(response.message || "Login failed", 400);
        }

        setState({
            user: response.user || null,
            token: response.token || null,
            expiresAt: response.expiresAt || null,
            isAuthenticated: true,
            isLoading: false,
        });
    }, []);

    const register = useCallback(async (data: RegisterRequest) => {
        const response = await apiRegister(data);

        if (!response.success) {
            throw new ApiError(response.message || "Registration failed", 400);
        }

        setState({
            user: response.user || null,
            token: response.token || null,
            expiresAt: response.expiresAt || null,
            isAuthenticated: true,
            isLoading: false,
        });
    }, []);

    const googleLogin = useCallback(async (idToken: string) => {
        const response = await apiGoogleLogin({ idToken });

        if (!response.success) {
            throw new ApiError(response.message || "Google login failed", 400);
        }

        setState({
            user: response.user || null,
            token: response.token || null,
            expiresAt: response.expiresAt || null,
            isAuthenticated: true,
            isLoading: false,
        });
    }, []);

    const sendVerificationCode = useCallback(async (phoneNumber: string) => {
        const response = await apiSendCode({ phoneNumber });

        if (!response.success) {
            throw new ApiError(response.message || "Failed to send verification code", 400);
        }
    }, []);

    const verifyPhone = useCallback(async (phoneNumber: string, code: string) => {
        const response = await apiVerifyPhone({ phoneNumber, code });

        if (!response.success) {
            throw new ApiError(response.message || "Phone verification failed", 400);
        }

        // Update user's phone verification status
        if (state.user) {
            const updatedUser: UserInfo = {
                ...state.user,
                phoneNumberConfirmed: true,
            };
            setState(prev => ({
                ...prev,
                user: updatedUser,
            }));
            // Update storage
            if (typeof window !== "undefined") {
                localStorage.setItem("auth_user", JSON.stringify(updatedUser));
            }
        }
    }, [state.user]);

    const resendCode = useCallback(async (phoneNumber: string) => {
        const response = await apiResendCode({ phoneNumber });

        if (!response.success) {
            throw new ApiError(response.message || "Failed to resend verification code", 400);
        }
    }, []);

    const logout = useCallback(() => {
        apiLogout();
        setState({
            user: null,
            token: null,
            expiresAt: null,
            isAuthenticated: false,
            isLoading: false,
        });
        router.push(ROUTES.LOGIN);
    }, [router]);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                googleLogin,
                sendVerificationCode,
                verifyPhone,
                resendCode,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
