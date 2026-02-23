/**
 * User API functions — equivalent to UserRepository.kt
 */

import { apiClient } from "./client";
import type {
    UserProfile,
    UserPublicProfile,
    OnboardRequest,
    ProfileUpdateRequest,
    UsernameCheck,
    FollowCounts,
    SportProfileOut,
    SportProfileCreate,
} from "../types/user";
import type { MessageResponse } from "../types/auth";

/** GET /api/v1/users/me (requires auth) */
export function getMe() {
    return apiClient<UserProfile>("/api/v1/users/me");
}

/** POST /api/v1/users/onboard (requires auth) */
export function onboard(data: OnboardRequest) {
    return apiClient<UserProfile>("/api/v1/users/onboard", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** PATCH /api/v1/users/me (requires auth) */
export function updateProfile(data: ProfileUpdateRequest) {
    return apiClient<UserProfile>("/api/v1/users/me", {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

/** DELETE /api/v1/users/me (requires auth) */
export function deleteAccount() {
    return apiClient<MessageResponse>("/api/v1/users/me", {
        method: "DELETE",
    });
}

/** GET /api/v1/users/check-username?username=xxx */
export function checkUsername(username: string) {
    return apiClient<UsernameCheck>(
        `/api/v1/users/check-username?username=${encodeURIComponent(username)}`,
    );
}

/** GET /api/v1/users/by-username/{username} */
export function getUserByUsername(username: string) {
    return apiClient<UserPublicProfile>(
        `/api/v1/users/by-username/${encodeURIComponent(username)}`,
    );
}

/** GET /api/v1/users/{user_id} */
export function getUser(userId: string) {
    return apiClient<UserPublicProfile>(`/api/v1/users/${userId}`);
}

/** GET /api/v1/users/{user_id}/follow-counts */
export function getFollowCounts(userId: string) {
    return apiClient<FollowCounts>(`/api/v1/users/${userId}/follow-counts`);
}

/** POST /api/v1/users/{user_id}/follow (requires auth) */
export function followUser(userId: string) {
    return apiClient<MessageResponse>(`/api/v1/users/${userId}/follow`, {
        method: "POST",
    });
}

/** DELETE /api/v1/users/{user_id}/follow (requires auth) */
export function unfollowUser(userId: string) {
    return apiClient<MessageResponse>(`/api/v1/users/${userId}/follow`, {
        method: "DELETE",
    });
}

/** GET /api/v1/users/{user_id}/followers */
export function getFollowers(userId: string, limit = 20, offset = 0) {
    return apiClient<UserPublicProfile[]>(
        `/api/v1/users/${userId}/followers?limit=${limit}&offset=${offset}`,
    );
}

/** GET /api/v1/users/{user_id}/following */
export function getFollowing(userId: string, limit = 20, offset = 0) {
    return apiClient<UserPublicProfile[]>(
        `/api/v1/users/${userId}/following?limit=${limit}&offset=${offset}`,
    );
}

/** GET /api/v1/users/{user_id}/sport-profiles */
export function getSportProfiles(userId: string) {
    return apiClient<SportProfileOut[]>(
        `/api/v1/users/${userId}/sport-profiles`,
    );
}

/** POST /api/v1/users/me/sport-profiles (requires auth) */
export function createSportProfile(data: SportProfileCreate) {
    return apiClient<SportProfileOut>("/api/v1/users/me/sport-profiles", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/** GET /api/v1/users/search?q=&limit=&offset= */
export function searchUsers(query: string, limit = 20, offset = 0) {
    return apiClient<UserPublicProfile[]>(
        `/api/v1/users/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`,
    );
}

/** POST /api/v1/users/{user_id}/block (requires auth) */
export function blockUser(userId: string) {
    return apiClient<MessageResponse>(`/api/v1/users/${userId}/block`, {
        method: "POST",
    });
}

/** DELETE /api/v1/users/{user_id}/block (requires auth) */
export function unblockUser(userId: string) {
    return apiClient<MessageResponse>(`/api/v1/users/${userId}/block`, {
        method: "DELETE",
    });
}

/** GET /api/v1/users/me/blocked (requires auth) */
export function getBlockedUsers() {
    return apiClient<UserPublicProfile[]>("/api/v1/users/me/blocked");
}
