import { apiClient } from "./client";
import type { TournamentOut, CreateTournamentRequest, TournamentUpdateRequest, TournamentMatchOut, PointsTableEntry } from "../types/common";
import type { MessageResponse } from "../types/auth";

export function createTournament(data: CreateTournamentRequest) { return apiClient<TournamentOut>("/api/v1/tournaments", { method: "POST", body: JSON.stringify(data) }); }
export function getTournament(id: string) { return apiClient<TournamentOut>(`/api/v1/tournaments/${id}`); }
export function updateTournament(id: string, data: TournamentUpdateRequest) { return apiClient<TournamentOut>(`/api/v1/tournaments/${id}`, { method: "PATCH", body: JSON.stringify(data) }); }
export function deleteTournament(id: string) { return apiClient<MessageResponse>(`/api/v1/tournaments/${id}`, { method: "DELETE" }); }
export function listTournaments(sportType?: string, status?: string) { return apiClient<TournamentOut[]>(`/api/v1/tournaments?${sportType ? `sport_type=${sportType}&` : ""}${status ? `status=${status}` : ""}`); }
export function registerTeam(tournamentId: string, teamId: string) { return apiClient<MessageResponse>(`/api/v1/tournaments/${tournamentId}/teams/${teamId}`, { method: "POST" }); }
export function removeTeamFromTournament(tournamentId: string, teamId: string) { return apiClient<MessageResponse>(`/api/v1/tournaments/${tournamentId}/teams/${teamId}`, { method: "DELETE" }); }
export function getPointsTable(tournamentId: string) { return apiClient<PointsTableEntry[]>(`/api/v1/tournaments/${tournamentId}/points`); }
export function addMatchToTournament(tournamentId: string, matchId: string) { return apiClient<TournamentMatchOut>(`/api/v1/tournaments/${tournamentId}/matches/${matchId}`, { method: "POST" }); }
export function getTournamentMatches(tournamentId: string) { return apiClient<TournamentMatchOut[]>(`/api/v1/tournaments/${tournamentId}/matches`); }
