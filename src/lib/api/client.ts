/**
 * Fetch wrapper with automatic 401 → token refresh → retry.
 *
 * Flow on 401:
 * 1. Read refresh_token from cookie
 * 2. POST /api/v1/auth/token/refresh
 * 3. Save new session
 * 4. Retry the original request with the new access_token
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ─── Custom API Error ────────────────────────────────────

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public detail?: unknown,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

// ─── Cookie Helpers (client-side only) ───────────────────

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(
        new RegExp(`(?:^|;\\s*)${name}=([^;]+)`),
    );
    return match ? decodeURIComponent(match[1]) : null;
}

function getAccessToken(): string | null {
    return getCookie("access_token");
}

function getRefreshToken(): string | null {
    return getCookie("refresh_token");
}

// ─── Refresh Lock (prevent parallel refresh calls) ───────

let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshToken(): Promise<boolean> {
    // If already refreshing, wait for that attempt
    if (refreshPromise) return refreshPromise;

    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    refreshPromise = (async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/auth/token/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });

            if (!response.ok) return false;

            const data = await response.json();
            if (data.session) {
                // Save new tokens (inline to avoid circular imports)
                const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
                document.cookie = `access_token=${encodeURIComponent(data.session.access_token)}; path=/; max-age=${data.session.expires_in}; SameSite=Lax${secure}`;
                document.cookie = `refresh_token=${encodeURIComponent(data.session.refresh_token)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax${secure}`;
                return true;
            }
            return false;
        } catch {
            return false;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

// ─── Core Fetch Wrapper ─────────────────────────────────

export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    async function doFetch(token: string | null): Promise<Response> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(options.headers as Record<string, string> | undefined),
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return fetch(url, { ...options, headers });
    }

    let response = await doFetch(getAccessToken());

    // On 401, attempt token refresh and retry once
    if (response.status === 401) {
        const refreshed = await tryRefreshToken();
        if (refreshed) {
            response = await doFetch(getAccessToken());
        }
    }

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const message =
            typeof body.detail === "string"
                ? body.detail
                : body.message ?? `Request failed (${response.status})`;
        throw new ApiError(response.status, message, body.detail);
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}
