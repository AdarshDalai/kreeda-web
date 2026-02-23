"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { getMyTeams } from "@/lib/api/teams";
import { getMyMatches, getLiveMatches } from "@/lib/api/matches";
import { getUnreadCount } from "@/lib/api/notifications";
import { Spinner } from "@/components/ui/Spinner";
import { Avatar } from "@/components/ui/Avatar";
import type { TeamOut } from "@/lib/types/team";
import type { MatchOut } from "@/lib/types/match";

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuthContext();
    const [teams, setTeams] = useState<TeamOut[]>([]);
    const [matches, setMatches] = useState<MatchOut[]>([]);
    const [liveMatches, setLiveMatches] = useState<MatchOut[]>([]);
    const [unread, setUnread] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getMyTeams().catch(() => []),
            getMyMatches().catch(() => []),
            getLiveMatches().catch(() => []),
            getUnreadCount().catch(() => ({ count: 0 })),
        ]).then(([t, m, lm, uc]) => {
            setTeams(t);
            setMatches(m);
            setLiveMatches(lm);
            setUnread(uc.count);
        }).finally(() => setLoading(false));
    }, []);

    if (authLoading || loading) {
        return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
    }

    const activeMatches = matches.filter(m => ["in_progress", "paused", "lobby", "toss"].includes(m.status));
    const recentMatches = matches.filter(m => m.status === "completed").slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Greeting */}
            <div className="flex items-center gap-4">
                <Avatar src={user?.avatar_url} name={user?.display_name || user?.username} size="lg" />
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Welcome back, {user?.display_name || user?.username || "Player"}
                    </h1>
                    <p className="text-sm text-[#9ca3af] mt-0.5">Here&apos;s what&apos;s happening on the field.</p>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Teams" value={teams.length} href="/teams" />
                <StatCard label="Active" value={activeMatches.length} href="/matches" />
                <StatCard label="Live Now" value={liveMatches.length} href="/matches" accent />
                <StatCard label="Unread" value={unread} href="/notifications" />
            </div>

            {/* Live matches */}
            {liveMatches.length > 0 && (
                <section>
                    <SectionHeader title="Live Matches" href="/matches" />
                    <div className="space-y-3">
                        {liveMatches.slice(0, 3).map(match => (
                            <Link key={match.id} href={`/matches/${match.id}`} className="block">
                                <div className="m3-card p-4 hover:border-[var(--primary)]/30 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-[#9ca3af] font-mono">{match.match_code}</span>
                                            <p className="text-sm text-white capitalize mt-1">{match.sport_type}</p>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-2 w-2 rounded-full bg-green-500 status-live" />
                                            <span className="text-xs text-green-400">Live</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Active Matches */}
            {activeMatches.length > 0 && (
                <section>
                    <SectionHeader title="Active Matches" href="/matches" />
                    <div className="space-y-3">
                        {activeMatches.slice(0, 5).map(match => (
                            <Link key={match.id} href={`/matches/${match.id}`} className="block">
                                <div className="m3-card p-4 hover:border-[var(--primary)]/30 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-[#9ca3af] font-mono">{match.match_code}</span>
                                            <p className="text-sm text-white capitalize mt-1">{match.sport_type}</p>
                                        </div>
                                        <span className="text-xs px-2 py-1 rounded-full bg-[var(--surface-container-high)] text-[#9ca3af] capitalize">
                                            {match.status.replace(/_/g, " ")}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* My Teams */}
            <section>
                <SectionHeader title="My Teams" href="/teams" />
                {teams.length === 0 ? (
                    <div className="m3-card p-6 text-center">
                        <p className="text-[#9ca3af] text-sm mb-3">You haven&apos;t joined any teams yet.</p>
                        <div className="flex gap-2 justify-center">
                            <Link href="/teams/join" className="m3-btn-tonal text-sm">Join a Team</Link>
                            <Link href="/teams/create" className="m3-btn-filled text-sm">Create Team</Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-3">
                        {teams.slice(0, 4).map(team => (
                            <Link key={team.id} href={`/teams/${team.id}`} className="block">
                                <div className="m3-card p-4 hover:border-[var(--primary)]/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--primary-container)] flex items-center justify-center text-sm font-bold text-[var(--on-primary-container)]">
                                            {team.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{team.name}</p>
                                            <p className="text-xs text-[#9ca3af] capitalize">{team.sport_type} &middot; {team.team_code}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Recent Results */}
            {recentMatches.length > 0 && (
                <section>
                    <SectionHeader title="Recent Results" href="/matches" />
                    <div className="space-y-2">
                        {recentMatches.map(match => (
                            <Link key={match.id} href={`/matches/${match.id}`} className="block">
                                <div className="m3-card p-4 hover:border-[var(--primary)]/30 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-[#9ca3af] font-mono">{match.match_code}</span>
                                            <p className="text-sm text-white capitalize mt-1">{match.sport_type}</p>
                                        </div>
                                        <span className="text-xs text-[#6b7280]">
                                            {new Date(match.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty state */}
            {teams.length === 0 && matches.length === 0 && (
                <div className="m3-card-elevated p-8 text-center space-y-4">
                    <h2 className="text-xl font-semibold text-white">Get started with Kreeda</h2>
                    <p className="text-[#9ca3af] text-sm max-w-md mx-auto">
                        Create a team, invite your friends, and start scoring your street matches in real-time.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Link href="/teams/create" className="m3-btn-filled">Create a Team</Link>
                        <Link href="/teams/join" className="m3-btn-tonal">Join by Code</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, href, accent }: { label: string; value: number; href: string; accent?: boolean }) {
    return (
        <Link href={href}>
            <div className="m3-card p-4 hover:border-[var(--primary)]/30 transition-colors">
                <p className={`text-2xl font-bold ${accent && value > 0 ? "text-green-400" : "text-white"}`}>{value}</p>
                <p className="text-xs text-[#9ca3af] mt-1">{label}</p>
            </div>
        </Link>
    );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
    return (
        <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <Link href={href} className="text-xs text-[var(--primary)] hover:underline">View all</Link>
        </div>
    );
}
