"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/lib/api/settings";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import type { UserSettingsOut } from "@/lib/types/common";

export default function SettingsPage() {
    const [settings, setSettings] = useState<UserSettingsOut | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        getSettings()
            .then(setSettings)
            .catch(() => setSettings(null))
            .finally(() => setLoading(false));
    }, []);

    async function handleSave() {
        if (!settings) return;
        setSaving(true);
        setSaved(false);
        try {
            const updated = await updateSettings({
                profile_visibility: settings.profile_visibility,
                show_match_history: settings.show_match_history,
                show_stats: settings.show_stats,
                show_followers: settings.show_followers,
                notify_match_invites: settings.notify_match_invites,
                notify_team_invites: settings.notify_team_invites,
                notify_match_updates: settings.notify_match_updates,
                notify_follows: settings.notify_follows,
                notify_conflicts: settings.notify_conflicts,
                theme: settings.theme,
            });
            setSettings(updated);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch { /* ignore */ }
        finally { setSaving(false); }
    }

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
    if (!settings) return <div className="text-center py-20 text-zinc-400">Failed to load settings</div>;

    function toggle(key: keyof UserSettingsOut) {
        setSettings(prev => prev ? { ...prev, [key]: !prev[key] } : prev);
    }

    return (
        <div className="max-w-lg mx-auto space-y-8">
            <h1 className="text-2xl font-bold">Settings</h1>

            {/* Privacy */}
            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Privacy</h2>
                <div className="space-y-1">
                    <label className="block text-sm text-zinc-400">Profile Visibility</label>
                    <select value={settings.profile_visibility} onChange={e => setSettings(s => s ? { ...s, profile_visibility: e.target.value as UserSettingsOut["profile_visibility"] } : s)}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                        <option value="public">Public</option>
                        <option value="followers_only">Followers Only</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <Toggle label="Show Match History" checked={settings.show_match_history} onChange={() => toggle("show_match_history")} />
                <Toggle label="Show Stats" checked={settings.show_stats} onChange={() => toggle("show_stats")} />
                <Toggle label="Show Followers" checked={settings.show_followers} onChange={() => toggle("show_followers")} />
            </section>

            {/* Notifications */}
            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Notifications</h2>
                <Toggle label="Match Invites" checked={settings.notify_match_invites} onChange={() => toggle("notify_match_invites")} />
                <Toggle label="Team Invites" checked={settings.notify_team_invites} onChange={() => toggle("notify_team_invites")} />
                <Toggle label="Match Updates" checked={settings.notify_match_updates} onChange={() => toggle("notify_match_updates")} />
                <Toggle label="New Followers" checked={settings.notify_follows} onChange={() => toggle("notify_follows")} />
                <Toggle label="Score Conflicts" checked={settings.notify_conflicts} onChange={() => toggle("notify_conflicts")} />
            </section>

            {/* Theme */}
            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Appearance</h2>
                <div className="flex gap-3">
                    {(["system", "dark", "light"] as const).map(t => (
                        <button key={t} type="button" onClick={() => setSettings(s => s ? { ...s, theme: t } : s)}
                            className={`flex-1 py-3 rounded-lg border text-sm font-medium capitalize transition-colors ${settings.theme === t ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400"}`}>
                            {t}
                        </button>
                    ))}
                </div>
            </section>

            <div className="flex items-center gap-3">
                <Button type="button" onClick={handleSave} loading={saving}>Save Changes</Button>
                {saved && <span className="text-sm text-emerald-400">✓ Saved</span>}
            </div>
        </div>
    );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <label className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 cursor-pointer hover:border-zinc-700 transition-colors">
            <span className="text-sm text-zinc-300">{label}</span>
            <div className={`relative w-10 h-6 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-zinc-700"}`} onClick={onChange}>
                <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? "left-5" : "left-1"}`} />
            </div>
        </label>
    );
}
