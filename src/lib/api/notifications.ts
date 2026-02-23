import { apiClient } from "./client";
import type { NotificationOut, UnreadCount } from "../types/common";
import type { MessageResponse } from "../types/auth";

export function listNotifications(unreadOnly = false, limit = 20, offset = 0) { return apiClient<NotificationOut[]>(`/api/v1/notifications?unread_only=${unreadOnly}&limit=${limit}&offset=${offset}`); }
export function getUnreadCount() { return apiClient<UnreadCount>("/api/v1/notifications/unread-count"); }
export function markRead(notificationId: string) { return apiClient<MessageResponse>(`/api/v1/notifications/${notificationId}/read`, { method: "PATCH" }); }
export function markAllRead() { return apiClient<MessageResponse>("/api/v1/notifications/read-all", { method: "PATCH" }); }
