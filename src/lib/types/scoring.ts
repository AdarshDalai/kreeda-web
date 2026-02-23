// ─── Scoring Types ───────────────────────────────────────

export type EventStatus = "pending_confirmation" | "confirmed" | "disputed" | "auto_confirmed" | "rolled_back";
export type ConflictType = "scorer_disagreement" | "anomaly_detected" | "player_flag" | "captain_flag" | "system_flag";
export type ConflictStatus = "open" | "under_review" | "voting" | "resolved" | "dismissed";
export type VoteChoice = "approve" | "reject" | "abstain";

export interface MatchEventOut {
    id: string;
    match_id: string;
    event_type: string;
    submitted_by: string;
    event_data: Record<string, unknown>;
    sequence_number: number;
    status: EventStatus;
    confirmed_by?: string | null;
    confirmed_at?: string | null;
    created_at: string;
}

export interface EventSubmitRequest {
    event_type: string;
    event_data: Record<string, unknown>;
}

export interface EventDisputeRequest {
    reason: string;
}

export interface ScoreConflictOut {
    id: string;
    match_id: string;
    event_id?: string | null;
    conflict_type: ConflictType;
    raised_by?: string | null;
    raised_by_system: boolean;
    description?: string | null;
    status: ConflictStatus;
    resolution?: Record<string, unknown> | null;
    resolved_at?: string | null;
    created_at: string;
}

export interface ConflictVoteRequest {
    vote: VoteChoice;
    voter_role?: string;
    comment?: string | null;
}

export interface ConflictVoteOut {
    id: string;
    conflict_id: string;
    voter_id: string;
    vote: VoteChoice;
    voter_role: string;
    comment?: string | null;
    created_at: string;
}

export interface ConflictResolveRequest {
    resolution: Record<string, unknown>;
}

export interface MatchStateOut {
    match_id: string;
    sport_type: string;
    state: Record<string, unknown>;
    version: number;
}
