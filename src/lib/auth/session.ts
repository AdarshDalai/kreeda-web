/**
 * Cookie-based session/token management.
 *
 * Equivalent to EncryptedSharedPreferences / DataStore on Android.
 * Stores access_token and refresh_token as browser cookies.
 */

import type { Session } from "../types/auth";

/** Save session tokens after successful login / signup */
export function saveSession(session: Session): void {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = [
        `access_token=${encodeURIComponent(session.access_token)}`,
        `path=/`,
        `max-age=${session.expires_in}`,
        `SameSite=Lax`,
        secure,
    ].join("; ");

    document.cookie = [
        `refresh_token=${encodeURIComponent(session.refresh_token)}`,
        `path=/`,
        `max-age=${60 * 60 * 24 * 30}`, // 30 days
        `SameSite=Lax`,
        secure,
    ].join("; ");
}

/** Read access token from cookies */
export function getAccessToken(): string | null {
    return getCookie("access_token");
}

/** Read refresh token from cookies */
export function getRefreshToken(): string | null {
    return getCookie("refresh_token");
}

/** Clear all auth cookies (on logout) */
export function clearSession(): void {
    document.cookie = "access_token=; path=/; max-age=0";
    document.cookie = "refresh_token=; path=/; max-age=0";
}

/** Quick check — does any session exist? */
export function hasSession(): boolean {
    return getAccessToken() !== null;
}

// ─── Internal Helpers ────────────────────────────────────

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(
        new RegExp(`(?:^|;\\s*)${name}=([^;]+)`),
    );
    return match ? decodeURIComponent(match[1]) : null;
}
