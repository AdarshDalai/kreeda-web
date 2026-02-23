/**
 * Auth API functions — equivalent to AuthRepository.kt
 *
 * Every export maps 1:1 to a backend endpoint from the API spec.
 */

import { apiClient } from "./client";
import type {
    AuthResponse,
    SignUpRequest,
    SignInRequest,
    GoogleOAuthRequest,
    OAuthURL,
    OAuthCallbackRequest,
    RefreshRequest,
    PasswordResetRequest,
    PasswordUpdateRequest,
    MessageResponse,
    VerifyOTPRequest,
    ResendRequest,
} from "../types/auth";

/** POST /api/v1/auth/signup */
export function signUp(data: SignUpRequest) {
    return apiClient<AuthResponse>("/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** POST /api/v1/auth/signin/password */
export function signInWithPassword(data: SignInRequest) {
    return apiClient<AuthResponse>("/api/v1/auth/signin/password", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** POST /api/v1/auth/google — returns Google OAuth URL for PKCE redirect */
export function getGoogleOAuthUrl(data: GoogleOAuthRequest) {
    return apiClient<OAuthURL>("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** POST /api/v1/auth/callback — exchanges auth code for session */
export function handleOAuthCallback(data: OAuthCallbackRequest) {
    return apiClient<AuthResponse>("/api/v1/auth/callback", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** POST /api/v1/auth/token/refresh */
export function refreshToken(data: RefreshRequest) {
    return apiClient<AuthResponse>("/api/v1/auth/token/refresh", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** POST /api/v1/auth/password/reset */
export function resetPassword(data: PasswordResetRequest) {
    return apiClient<MessageResponse>("/api/v1/auth/password/reset", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** POST /api/v1/auth/password/update (requires auth) */
export function updatePassword(data: PasswordUpdateRequest) {
    return apiClient<MessageResponse>("/api/v1/auth/password/update", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** POST /api/v1/auth/verify-otp */
export function verifyOTP(data: VerifyOTPRequest) {
    return apiClient<AuthResponse>("/api/v1/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** POST /api/v1/auth/resend */
export function resendVerification(data: ResendRequest) {
    return apiClient<MessageResponse>("/api/v1/auth/resend", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** POST /api/v1/auth/signout (requires auth) */
export function signOut() {
    return apiClient<MessageResponse>("/api/v1/auth/signout", {
        method: "POST",
    });
}
