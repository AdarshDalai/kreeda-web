// ─── Venue Types ─────────────────────────────────────────

export interface VenueOut {
    id: string;
    name: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    ground_type?: string | null;
    created_by: string;
    created_at: string;
}

export interface CreateVenueRequest {
    name: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    ground_type?: string | null;
}

export interface VenueUpdateRequest {
    name?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    ground_type?: string | null;
}

// ─── Tournament Types ────────────────────────────────────

export type TournamentType = "knockout" | "league" | "group_stage" | "round_robin";
export type TournamentStatus = "draft" | "registration" | "in_progress" | "completed" | "cancelled";

export interface TournamentOut {
    id: string;
    name: string;
    description?: string | null;
    sport_type: string;
    tournament_type: TournamentType;
    max_teams?: number | null;
    is_active: boolean;
    status: TournamentStatus;
    settings: Record<string, unknown>;
    created_by: string;
    venue_id?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    created_at: string;
    teams: TournamentTeamOut[];
}

export interface TournamentTeamOut {
    id: string;
    tournament_id: string;
    team_id: string;
    seed?: number | null;
    group_name?: string | null;
    points: number;
    matches_played: number;
    matches_won: number;
    matches_lost: number;
    matches_drawn: number;
    net_run_rate?: number | null;
    goal_difference?: number | null;
    is_eliminated: boolean;
    team?: { id: string; name: string; logo_url?: string | null } | null;
}

export interface CreateTournamentRequest {
    name: string;
    sport_type: string;
    description?: string | null;
    tournament_type?: TournamentType;
    max_teams?: number | null;
    settings?: Record<string, unknown>;
    venue_id?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}

export interface TournamentUpdateRequest {
    name?: string | null;
    description?: string | null;
    status?: TournamentStatus | null;
    settings?: Record<string, unknown> | null;
    venue_id?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}

export interface TournamentMatchOut {
    id: string;
    tournament_id: string;
    match_id: string;
    round_name?: string | null;
    match_number?: number | null;
    created_at: string;
}

export interface PointsTableEntry {
    team: { id: string; name: string; logo_url?: string | null };
    points: number;
    matches_played: number;
    matches_won: number;
    matches_lost: number;
    matches_drawn: number;
    net_run_rate?: number | null;
    goal_difference?: number | null;
}

// ─── Settings & Notifications ────────────────────────────

export interface UserSettingsOut {
    id: string;
    user_id: string;
    profile_visibility: "public" | "followers_only" | "private";
    show_match_history: boolean;
    show_stats: boolean;
    show_followers: boolean;
    notify_match_invites: boolean;
    notify_team_invites: boolean;
    notify_match_updates: boolean;
    notify_follows: boolean;
    notify_conflicts: boolean;
    timezone: string;
    language: string;
    theme: "light" | "dark" | "system";
}

export interface UpdateSettingsRequest {
    profile_visibility?: string | null;
    show_match_history?: boolean | null;
    show_stats?: boolean | null;
    show_followers?: boolean | null;
    notify_match_invites?: boolean | null;
    notify_team_invites?: boolean | null;
    notify_match_updates?: boolean | null;
    notify_follows?: boolean | null;
    notify_conflicts?: boolean | null;
    timezone?: string | null;
    language?: string | null;
    theme?: string | null;
}

export interface NotificationOut {
    id: string;
    notification_type: string;
    title: string;
    body?: string | null;
    data?: Record<string, unknown> | null;
    is_read: boolean;
    read_at?: string | null;
    created_at: string;
}

export interface UnreadCount {
    count: number;
}
