// ─── Team Types ──────────────────────────────────────────

export type TeamRole = "owner" | "admin" | "captain" | "vice_captain" | "player" | "scorer" | "substitute" | "water_boy";
export type JoinPolicy = "open" | "invite_only" | "request_to_join";
export type InvitationStatus = "pending" | "accepted" | "rejected" | "expired" | "cancelled";

export interface TeamOut {
    id: string;
    team_code: string;
    name: string;
    sport_type: string;
    logo_url?: string | null;
    description?: string | null;
    max_players?: number | null;
    join_policy: JoinPolicy;
    is_active: boolean;
    created_by: string;
    created_at: string;
}

export interface TeamDetail extends TeamOut {
    members: TeamMemberOut[];
}

export interface TeamMemberOut {
    id: string;
    user_id: string;
    role: TeamRole;
    jersey_number?: number | null;
    position?: string | null;
    is_active: boolean;
    joined_at: string;
    user?: { id: string; username?: string | null; display_name?: string | null; avatar_url?: string | null } | null;
}

export interface TeamInvitationOut {
    id: string;
    team_id: string;
    invited_user_id: string;
    invited_by: string;
    status: InvitationStatus;
    created_at: string;
    team?: TeamOut | null;
}

export interface CreateTeamRequest {
    name: string;
    sport_type: string;
    description?: string | null;
    logo_url?: string | null;
    max_players?: number | null;
}

export interface TeamUpdateRequest {
    name?: string | null;
    description?: string | null;
    logo_url?: string | null;
    max_players?: number | null;
    join_policy?: JoinPolicy | null;
}

export interface TeamInviteRequest {
    user_id: string;
}

export interface AddMemberRequest {
    user_id: string;
    role?: TeamRole;
}

export interface MemberRoleUpdate {
    role: TeamRole;
    jersey_number?: number | null;
    position?: string | null;
}

export interface JoinByCodeRequest {
    team_code: string;
}

export interface TeamCodeRefreshOut {
    team_id: string;
    team_code: string;
}
