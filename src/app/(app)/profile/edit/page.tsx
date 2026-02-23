"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { updateProfile, checkUsername } from "@/lib/api/users";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

export default function EditProfilePage() {
    const { user, loading: authLoading, refreshUser } = useAuthContext();
    const router = useRouter();
    const [displayName, setDisplayName] = useState(user?.display_name || "");
    const [username, setUsername] = useState(user?.username || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [error, setError] = useState<string | null>(null);
    const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
    const [saving, setSaving] = useState(false);

    async function handleCheckUsername() {
        if (!username || username === user?.username) { setUsernameStatus("idle"); return; }
        setUsernameStatus("checking");
        try {
            const result = await checkUsername(username);
            setUsernameStatus(result.available ? "available" : "taken");
        } catch {
            setUsernameStatus("idle");
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (usernameStatus === "taken") { setError("Username is already taken."); return; }
        setError(null);
        setSaving(true);
        try {
            await updateProfile({
                display_name: displayName || null,
                username: username !== user?.username ? username : undefined,
                bio: bio || null,
            });
            if (refreshUser) await refreshUser();
            router.push("/profile");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update profile");
        } finally {
            setSaving(false);
        }
    }

    if (authLoading || !user) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && <div className="bg-[var(--error-container)] text-[var(--error)] px-4 py-3 rounded-[var(--radius-md)] text-sm">{error}</div>}

                <div className="space-y-1.5">
                    <label className="block text-sm text-[#9ca3af]">Display Name</label>
                    <input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your display name"
                        className="m3-input" maxLength={100} />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm text-[#9ca3af]">Username</label>
                    <input value={username} onChange={e => { setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")); setUsernameStatus("idle"); }}
                        onBlur={handleCheckUsername} placeholder="username" className="m3-input" minLength={3} maxLength={30} />
                    {usernameStatus === "checking" && <p className="text-xs text-[#9ca3af]">Checking availability...</p>}
                    {usernameStatus === "available" && <p className="text-xs text-green-400">Username is available</p>}
                    {usernameStatus === "taken" && <p className="text-xs text-[var(--error)]">Username is already taken</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm text-[#9ca3af]">Bio</label>
                    <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about yourself"
                        rows={3} maxLength={250} className="m3-input resize-none" />
                    <p className="text-xs text-[#6b7280] text-right">{bio.length}/250</p>
                </div>

                <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => router.back()} className="m3-btn-tonal flex-1">Cancel</button>
                    <Button type="submit" loading={saving}>Save Changes</Button>
                </div>
            </form>
        </div>
    );
}
