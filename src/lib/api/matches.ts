import { apiClient } from "./client";
import type { MatchOut, MatchDetail, CreateMatchRequest, MatchSettingsUpdate, TossRequest, PlayingXIRequest, SetBatsmenRequest, SetBowlerRequest, AddParticipantRequest, MatchCancelRequest, MatchInvitationOut, PlayerOfMatchNominate, PlayerOfMatchVoteRequest } from "../types/match";
import type { MessageResponse } from "../types/auth";

export function createMatch(data: CreateMatchRequest) { return apiClient<MatchOut>("/api/v1/matches/", { method: "POST", body: JSON.stringify(data) }); }
export function getMatch(matchId: string) { return apiClient<MatchDetail>(`/api/v1/matches/${matchId}`); }
export function getMatchByCode(code: string) { return apiClient<MatchDetail>(`/api/v1/matches/code/${code}`); }
export function updateMatchSettings(matchId: string, data: MatchSettingsUpdate) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/settings`, { method: "PATCH", body: JSON.stringify(data) }); }
export function recordToss(matchId: string, data: TossRequest) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/toss`, { method: "POST", body: JSON.stringify(data) }); }
export function startMatch(matchId: string, battingFirstId: string) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/start?batting_first_id=${battingFirstId}`, { method: "POST" }); }
export function pauseMatch(matchId: string) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/pause`, { method: "POST" }); }
export function resumeMatch(matchId: string) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/resume`, { method: "POST" }); }
export function abandonMatch(matchId: string, reason: string) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/abandon?reason=${encodeURIComponent(reason)}`, { method: "POST" }); }
export function cancelMatch(matchId: string, data: MatchCancelRequest) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/cancel`, { method: "POST", body: JSON.stringify(data) }); }
export function changeInnings(matchId: string) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/change-innings`, { method: "POST" }); }
export function undoLastEvent(matchId: string) { return apiClient<MessageResponse>(`/api/v1/matches/${matchId}/undo`, { method: "POST" }); }
export function inviteTeamToMatch(matchId: string, invitedTeamId: string) { return apiClient<MatchInvitationOut>(`/api/v1/matches/${matchId}/invite`, { method: "POST", body: JSON.stringify({ invited_team_id: invitedTeamId }) }); }
export function setPlayingXI(matchId: string, data: PlayingXIRequest) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/playing-xi`, { method: "POST", body: JSON.stringify(data) }); }
export function setBatsmen(matchId: string, data: SetBatsmenRequest) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/batsmen`, { method: "POST", body: JSON.stringify(data) }); }
export function setBowler(matchId: string, data: SetBowlerRequest) { return apiClient<MatchOut>(`/api/v1/matches/${matchId}/bowler`, { method: "POST", body: JSON.stringify(data) }); }
export function addParticipant(matchId: string, data: AddParticipantRequest) { return apiClient<MessageResponse>(`/api/v1/matches/${matchId}/participants`, { method: "POST", body: JSON.stringify(data) }); }
export function nominatePOTM(matchId: string, data: PlayerOfMatchNominate) { return apiClient<MessageResponse>(`/api/v1/matches/${matchId}/potm`, { method: "POST", body: JSON.stringify(data) }); }
export function votePOTM(matchId: string, data: PlayerOfMatchVoteRequest) { return apiClient<MessageResponse>(`/api/v1/matches/${matchId}/potm/vote`, { method: "POST", body: JSON.stringify(data) }); }
export function getPOTM(matchId: string) { return apiClient<Record<string, unknown>>(`/api/v1/matches/${matchId}/potm`); }
export function getScorecard(matchId: string) { return apiClient<Record<string, unknown>>(`/api/v1/matches/${matchId}/scorecard`); }
export function getMyMatches(sportType?: string, status?: string) { return apiClient<MatchOut[]>(`/api/v1/matches/my?${sportType ? `sport_type=${sportType}&` : ""}${status ? `status=${status}` : ""}`); }
export function getLiveMatches(sportType?: string) { return apiClient<MatchOut[]>(`/api/v1/matches/live${sportType ? `?sport_type=${sportType}` : ""}`); }
export function respondMatchInvitation(invitationId: string, accept: boolean) { return apiClient<MessageResponse>(`/api/v1/matches/invitations/${invitationId}/respond?accept=${accept}`, { method: "POST" }); }
