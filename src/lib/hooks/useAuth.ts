"use client";

/**
 * useAuth — custom hook for auth state management.
 *
 * Equivalent to an AuthViewModel in Android:
 * - Holds current user state
 * - Provides handleAuthSuccess() and logout()
 * - Auto-fetches user profile on mount if session exists
 */

import { useState, useEffect, useCallback } from "react";
import type { UserProfile } from "../types/user";
import type { AuthResponse } from "../types/auth";
import { getMe } from "../api/users";
import { signOut as apiSignOut } from "../api/auth";
import { saveSession, clearSession, hasSession } from "../auth/session";

interface AuthState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
}

export function useAuth() {
    const [state, setState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null,
    });

    // On mount → check session and load user profile
    useEffect(() => {
        async function loadUser() {
            if (!hasSession()) {
                setState({ user: null, loading: false, error: null });
                return;
            }
            try {
                const user = await getMe();
                setState({ user, loading: false, error: null });
            } catch {
                clearSession();
                setState({ user: null, loading: false, error: null });
            }
        }
        loadUser();
    }, []);

    // Called after successful login/signup to persist tokens and load profile
    const handleAuthSuccess = useCallback(async (response: AuthResponse) => {
        if (response.session) {
            saveSession(response.session);
            try {
                const user = await getMe();
                setState({ user, loading: false, error: null });
                return user;
            } catch {
                setState((s) => ({ ...s, error: "Failed to load profile" }));
            }
        }
        return null;
    }, []);

    // Logout
    const logout = useCallback(async () => {
        try {
            await apiSignOut();
        } catch {
            // Ignore signout API errors — always clear local session
        }
        clearSession();
        setState({ user: null, loading: false, error: null });
    }, []);

    return {
        user: state.user,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.user !== null,
        handleAuthSuccess,
        logout,
    };
}
