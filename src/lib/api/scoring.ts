import { apiClient } from "./client";
import type { MatchEventOut, EventSubmitRequest, EventDisputeRequest, ScoreConflictOut, ConflictVoteRequest, ConflictVoteOut, ConflictResolveRequest, MatchStateOut } from "../types/scoring";
import type { MessageResponse } from "../types/auth";

export function submitEvent(matchId: string, data: EventSubmitRequest) { return apiClient<MatchEventOut>(`/api/v1/scoring/${matchId}/events`, { method: "POST", body: JSON.stringify(data) }); }
export function listEvents(matchId: string) { return apiClient<MatchEventOut[]>(`/api/v1/scoring/${matchId}/events`); }
export function confirmEvent(matchId: string, eventId: string) { return apiClient<MatchEventOut>(`/api/v1/scoring/${matchId}/events/${eventId}/confirm`, { method: "POST" }); }
export function disputeEvent(matchId: string, eventId: string, data: EventDisputeRequest) { return apiClient<MatchEventOut>(`/api/v1/scoring/${matchId}/events/${eventId}/dispute`, { method: "POST", body: JSON.stringify(data) }); }
export function rollbackEvent(matchId: string, eventId: string) { return apiClient<MatchEventOut>(`/api/v1/scoring/${matchId}/events/${eventId}/rollback`, { method: "POST" }); }
export function getPendingEvents(matchId: string) { return apiClient<MatchEventOut[]>(`/api/v1/scoring/${matchId}/events/pending`); }
export function getMatchState(matchId: string) { return apiClient<MatchStateOut>(`/api/v1/scoring/${matchId}/state`); }
export function listConflicts(matchId: string) { return apiClient<ScoreConflictOut[]>(`/api/v1/scoring/${matchId}/conflicts`); }
export function voteOnConflict(conflictId: string, data: ConflictVoteRequest) { return apiClient<ConflictVoteOut>(`/api/v1/scoring/conflicts/${conflictId}/vote`, { method: "POST", body: JSON.stringify(data) }); }
export function resolveConflict(conflictId: string, data: ConflictResolveRequest) { return apiClient<MessageResponse>(`/api/v1/scoring/conflicts/${conflictId}/resolve`, { method: "POST", body: JSON.stringify(data) }); }
