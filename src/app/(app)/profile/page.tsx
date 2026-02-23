"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { getFollowCounts, getSportProfiles } from "@/lib/api/users";
import { Avatar } from "@/components/ui/Avatar";
import { Spinner } from "@/components/ui/Spinner";
import type { FollowCounts, SportProfileOut } from "@/lib/types/user";

export default function ProfilePage() {
    const { user, loading: authLoading, logout } = useAuthContext();
    const [followCounts, setFollowCounts] = useState<FollowCounts | null>(null);
    const [sportProfiles, setSportProfiles] = useState<SportProfileOut[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        Promise.all([
            getFollowCounts(user.id).catch(() => ({ followers: 0, following: 0 })),
            getSportProfiles(user.id).catch(() => []),
        ]).then(([counts, profiles]) => {
            setFollowCounts(counts);
            setSportProfiles(profiles);
        }).finally(() => setLoading(false));
    }, [user]);

    if (authLoading || loading || !user) {
        return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile header card */}
            <div className="m3-card-elevated p-6">
                <div className="flex items-start gap-5">
                    <Avatar src={user.avatar_url} name={user.display_name || user.username} size="xl" />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                {user.display_name && <h1 className="text-xl font-bold text-white">{user.display_name}</h1>}
                                {user.username && <p className="text-sm text-[#9ca3af]">@{user.username}</p>}
                            </div>
                            <Link href="/profile/edit" className="m3-btn-tonal text-xs px-4 py-2">
                                Edit Profile
                            </Link>
                        </div>
                        {user.bio && <p className="text-sm text-[#d4d4d8] mt-2 leading-relaxed">{user.bio}</p>}

                        {/* Follow counts */}
                        {followCounts && (
                            <div className="flex gap-4 mt-4">
                                <Link href="/profile/followers" className="group">
                                    <span className="text-white font-semibold">{followCounts.followers}</span>
                                    <span className="text-[#9ca3af] text-sm ml-1 group-hover:text-white transition-colors">followers</span>
                                </Link>
                                <Link href="/profile/following" className="group">
                                    <span className="text-white font-semibold">{followCounts.following}</span>
                                    <span className="text-[#9ca3af] text-sm ml-1 group-hover:text-white transition-colors">following</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-3">
                <Link href="/profile/edit" className="m3-card p-4 text-center hover:border-[var(--outline)] transition-colors">
                    <div className="h-5 w-5 mx-auto text-[var(--primary)] mb-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                    </div>
                    <p className="text-xs text-[#9ca3af]">Edit Profile</p>
                </Link>
                <Link href="/settings" className="m3-card p-4 text-center hover:border-[var(--outline)] transition-colors">
                    <div className="h-5 w-5 mx-auto text-[var(--primary)] mb-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <p className="text-xs text-[#9ca3af]">Settings</p>
                </Link>
                <Link href="/search" className="m3-card p-4 text-center hover:border-[var(--outline)] transition-colors">
                    <div className="h-5 w-5 mx-auto text-[var(--primary)] mb-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </div>
                    <p className="text-xs text-[#9ca3af]">Find Players</p>
                </Link>
            </div>

            {/* Sport profiles */}
            {sportProfiles.length > 0 ? (
                <section>
                    <h2 className="text-lg font-semibold text-white mb-3">Sport Profiles</h2>
                    <div className="space-y-3">
                        {sportProfiles.map((sp) => (
                            <div key={sp.id} className="m3-card p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--primary-container)] flex items-center justify-center text-sm font-bold text-[var(--on-primary-container)]">
                                        {sp.sport_type.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold capitalize">{sp.sport_type}</h3>
                                        <p className="text-[#9ca3af] text-xs">{sp.matches_played} matches played</p>
                                    </div>
                                </div>
                                {Object.keys(sp.stats).length > 0 && (
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.entries(sp.stats).map(([key, value]) => (
                                            <div key={key} className="bg-[var(--surface-container-high)] rounded-[var(--radius-sm)] p-2 text-center">
                                                <p className="text-sm font-medium text-white">{String(value)}</p>
                                                <p className="text-xs text-[#9ca3af] capitalize">{key.replace(/_/g, " ")}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <div className="m3-card p-6 text-center">
                    <p className="text-[#9ca3af] text-sm">No sport profiles yet. Play some matches to build your stats!</p>
                </div>
            )}

            {/* Sign out */}
            <button
                onClick={async () => { await logout(); window.location.href = "/auth/login"; }}
                className="w-full text-sm text-red-400 hover:text-red-300 py-3 transition-colors"
            >
                Sign Out
            </button>
        </div>
    );
}
