"use client";

/**
 * AuthProvider — React Context for sharing auth state across the entire app.
 *
 * This replaces the need to call useAuth() in every component —
 * any component in the tree can access the auth state via useAuthContext().
 *
 * Compose equivalent: CompositionLocalProvider(LocalAuth provides authState)
 */

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import type { UserProfile } from "@/lib/types/user";
import type { AuthResponse } from "@/lib/types/auth";
import { getMe } from "@/lib/api/users";
import { signOut as apiSignOut } from "@/lib/api/auth";
import { saveSession, clearSession, hasSession } from "@/lib/auth/session";

// ─── 1. Define the context shape ────────────────────────
interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    isAuthenticated: boolean;
    handleAuthSuccess: (response: AuthResponse) => Promise<UserProfile | null>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

// ─── 2. Create the context with a default value ─────────
const AuthContext = createContext<AuthContextType | null>(null);

// ─── 3. The Provider component ──────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            if (!hasSession()) {
                setLoading(false);
                return;
            }
            try {
                const profile = await getMe();
                setUser(profile);
            } catch {
                clearSession();
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    const handleAuthSuccess = useCallback(
        async (response: AuthResponse): Promise<UserProfile | null> => {
            if (response.session) {
                saveSession(response.session);
                try {
                    const profile = await getMe();
                    setUser(profile);
                    return profile;
                } catch {
                    return null;
                }
            }
            return null;
        },
        [],
    );

    const logout = useCallback(async () => {
        try {
            await apiSignOut();
        } catch {
            /* ignore */
        }
        clearSession();
        setUser(null);
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const profile = await getMe();
            setUser(profile);
        } catch { /* ignore */ }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: user !== null,
                handleAuthSuccess,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ─── 4. The consumer hook ───────────────────────────────
export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an <AuthProvider>");
    }
    return context;
}
