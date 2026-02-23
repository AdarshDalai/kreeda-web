"use client";

import { useEffect, useState } from "react";
import { listNotifications, markRead, markAllRead } from "@/lib/api/notifications";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import type { NotificationOut } from "@/lib/types/common";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<NotificationOut[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listNotifications()
            .then(setNotifications)
            .catch(() => setNotifications([]))
            .finally(() => setLoading(false));
    }, []);

    async function handleMarkAllRead() {
        await markAllRead();
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    }

    async function handleMarkRead(id: string) {
        await markRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    }

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Notifications</h1>
                {notifications.some(n => !n.is_read) && (
                    <Button variant="ghost" type="button" onClick={handleMarkAllRead}>Mark all read</Button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                    <div className="h-12 w-12 mx-auto text-zinc-600">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                    </div>
                    <p className="text-zinc-400">No notifications yet</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {notifications.map(n => (
                        <button key={n.id} onClick={() => !n.is_read && handleMarkRead(n.id)}
                            className={`w-full text-left bg-zinc-900 border rounded-xl p-4 transition-colors ${n.is_read ? "border-zinc-800" : "border-emerald-500/30 bg-emerald-500/5"}`}>
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className={`text-sm font-medium ${n.is_read ? "text-zinc-300" : "text-white"}`}>{n.title}</p>
                                    {n.body && <p className="text-xs text-zinc-500 mt-1">{n.body}</p>}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    {!n.is_read && <div className="h-2 w-2 rounded-full bg-emerald-400" />}
                                    <span className="text-xs text-zinc-600">{new Date(n.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
