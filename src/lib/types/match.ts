// ─── Match Types ─────────────────────────────────────────

export type MatchStatus = "invitation_sent" | "invitation_accepted" | "lobby" | "toss" | "in_progress" | "paused" | "conflict" | "completed" | "abandoned" | "cancelled";
export type MatchRole = "CAPTAIN" | "SCORER" | "PLAYER" | "UMPIRE" | "REFEREE" | "SPECTATOR";
export type TossDecision = "bat" | "bowl";

export interface MatchOut {
    id: string;
    match_code: string;
    sport_type: string;
    status: MatchStatus;
    team_a_id: string;
    team_b_id: string;
    created_by: string;
    visibility: "public" | "private";
    settings: Record<string, unknown>;
    toss_winner_team_id?: string | null;
    toss_decision?: TossDecision | null;
    result_summary?: Record<string, unknown> | null;
    winner_team_id?: string | null;
    venue_id?: string | null;
    playing_xi_a?: Record<string, unknown> | null;
    playing_xi_b?: Record<string, unknown> | null;
    cancellation_reason?: string | null;
    started_at?: string | null;
    ended_at?: string | null;
    created_at: string;
}

export interface MatchDetail extends MatchOut {
    team_a?: { id: string; name: string; logo_url?: string | null; sport_type: string } | null;
    team_b?: { id: string; name: string; logo_url?: string | null; sport_type: string } | null;
    participants: MatchParticipantOut[];
}

export interface MatchParticipantOut {
    id: string;
    match_id: string;
    user_id: string;
    team_id?: string | null;
    role: MatchRole;
    joined_at: string;
}

export interface CreateMatchRequest {
    sport_type: string;
    team_a_id: string;
    invited_team_id: string;
    visibility?: "public" | "private";
    settings?: Record<string, unknown>;
    venue_id?: string | null;
}

export interface MatchSettingsUpdate {
    settings: Record<string, unknown>;
    version?: number | null;
}

export interface TossRequest {
    winner_team_id: string;
    decision: TossDecision;
}

export interface PlayingXIRequest {
    team_id: string;
    player_ids: string[];
}

export interface SetBatsmenRequest {
    striker_id: string;
    non_striker_id: string;
}

export interface SetBowlerRequest {
    bowler_id: string;
}

export interface AddParticipantRequest {
    user_id: string;
    team_id?: string | null;
    role: MatchRole;
}

export interface MatchCancelRequest {
    reason: string;
}

export interface MatchInvitationOut {
    id: string;
    match_id: string;
    inviting_team_id: string;
    invited_team_id: string;
    invited_by: string;
    status: string;
    created_at: string;
}

export interface PlayerOfMatchNominate {
    player_id: string;
    reason?: string | null;
}

export interface PlayerOfMatchVoteRequest {
    player_id: string;
}
