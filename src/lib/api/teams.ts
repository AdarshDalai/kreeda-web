import { apiClient } from "./client";
import type { TeamOut, TeamDetail, TeamMemberOut, TeamInvitationOut, CreateTeamRequest, TeamUpdateRequest, TeamInviteRequest, AddMemberRequest, MemberRoleUpdate, JoinByCodeRequest, TeamCodeRefreshOut } from "../types/team";
import type { MessageResponse } from "../types/auth";

export function createTeam(data: CreateTeamRequest) { return apiClient<TeamOut>("/api/v1/teams/", { method: "POST", body: JSON.stringify(data) }); }
export function getTeam(teamId: string) { return apiClient<TeamDetail>(`/api/v1/teams/${teamId}`); }
export function getTeamByCode(code: string) { return apiClient<TeamDetail>(`/api/v1/teams/code/${code}`); }
export function updateTeam(teamId: string, data: TeamUpdateRequest) { return apiClient<TeamOut>(`/api/v1/teams/${teamId}`, { method: "PATCH", body: JSON.stringify(data) }); }
export function deleteTeam(teamId: string) { return apiClient<MessageResponse>(`/api/v1/teams/${teamId}`, { method: "DELETE" }); }
export function getMyTeams(sportType?: string) { return apiClient<TeamOut[]>(`/api/v1/teams/my${sportType ? `?sport_type=${sportType}` : ""}`); }
export function searchTeams(q: string, sportType?: string) { return apiClient<TeamOut[]>(`/api/v1/teams/search?q=${encodeURIComponent(q)}${sportType ? `&sport_type=${sportType}` : ""}`); }
export function getMembers(teamId: string) { return apiClient<TeamMemberOut[]>(`/api/v1/teams/${teamId}/members`); }
export function addMember(teamId: string, data: AddMemberRequest) { return apiClient<TeamMemberOut>(`/api/v1/teams/${teamId}/members`, { method: "POST", body: JSON.stringify(data) }); }
export function removeMember(teamId: string, userId: string) { return apiClient<MessageResponse>(`/api/v1/teams/${teamId}/members/${userId}`, { method: "DELETE" }); }
export function updateMemberRole(teamId: string, userId: string, data: MemberRoleUpdate) { return apiClient<TeamMemberOut>(`/api/v1/teams/${teamId}/members/${userId}/role`, { method: "PATCH", body: JSON.stringify(data) }); }
export function inviteToTeam(teamId: string, data: TeamInviteRequest) { return apiClient<TeamInvitationOut>(`/api/v1/teams/${teamId}/invite`, { method: "POST", body: JSON.stringify(data) }); }
export function respondTeamInvitation(invitationId: string, accept: boolean) { return apiClient<MessageResponse>(`/api/v1/teams/invitations/${invitationId}/respond?accept=${accept}`, { method: "POST" }); }
export function getMyTeamInvitations() { return apiClient<TeamInvitationOut[]>("/api/v1/teams/invitations/my"); }
export function joinByCode(data: JoinByCodeRequest) { return apiClient<TeamMemberOut>("/api/v1/teams/join", { method: "POST", body: JSON.stringify(data) }); }
export function refreshTeamCode(teamId: string) { return apiClient<TeamCodeRefreshOut>(`/api/v1/teams/${teamId}/refresh-code`, { method: "POST" }); }
