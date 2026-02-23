// ─── User Profile Models ─────────────────────────────────

export interface UserProfile {
    id: string;
    username?: string | null;
    display_name?: string | null;
    email: string;
    phone?: string | null;
    avatar_url?: string | null;
    bio?: string | null;
    is_onboarded: boolean;
    created_at: string;
}

export interface UserPublicProfile {
    id: string;
    username?: string | null;
    display_name?: string | null;
    avatar_url?: string | null;
    bio?: string | null;
    created_at: string;
}

// ─── User Request Models ─────────────────────────────────

export interface OnboardRequest {
    username: string;
    display_name?: string | null;
    avatar_url?: string | null;
    bio?: string | null;
}

export interface ProfileUpdateRequest {
    username?: string;
    display_name?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    phone?: string | null;
}

export interface UsernameCheck {
    username: string;
    available: boolean;
}

export interface FollowCounts {
    followers: number;
    following: number;
}

// ─── Sport Profile Models ────────────────────────────────

export type SportType = "cricket" | "football";

export interface SportProfileCreate {
    sport_type: SportType;
    stats?: Record<string, unknown> | null;
}

export interface SportProfileOut {
    id: string;
    sport_type: string;
    stats: Record<string, unknown>;
    matches_played: number;
    created_at: string;
}
