import { apiClient } from "./client";
import type { UserSettingsOut, UpdateSettingsRequest } from "../types/common";
import type { MessageResponse } from "../types/auth";

export function getSettings() { return apiClient<UserSettingsOut>("/api/v1/settings"); }
export function updateSettings(data: UpdateSettingsRequest) { return apiClient<UserSettingsOut>("/api/v1/settings", { method: "PATCH", body: JSON.stringify(data) }); }
export function registerPushToken(token: string, platform: string) { return apiClient<MessageResponse>("/api/v1/settings/push-token", { method: "POST", body: JSON.stringify({ token, platform }) }); }
export function removePushToken() { return apiClient<MessageResponse>("/api/v1/settings/push-token", { method: "DELETE" }); }
