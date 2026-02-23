"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyMatches } from "@/lib/api/matches";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import type { MatchOut } from "@/lib/types/match";

const STATUS_COLORS: Record<string, string> = {
    in_progress: "bg-green-500",
    paused: "bg-yellow-500",
    completed: "bg-zinc-500",
    lobby: "bg-blue-500",
    toss: "bg-purple-500",
    cancelled: "bg-red-500",
    abandoned: "bg-red-500",
    invitation_sent: "bg-orange-500",
    invitation_accepted: "bg-sky-500",
};

export default function MatchesPage() {
    const [matches, setMatches] = useState<MatchOut[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyMatches()
            .then(setMatches)
            .catch(() => setMatches([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Matches</h1>
                <Link href="/matches/create">
                    <Button type="button">Create Match</Button>
                </Link>
            </div>

            {matches.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                    <div className="h-12 w-12 mx-auto text-zinc-600">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                    </div>
                    <h2 className="text-xl font-semibold">No matches yet</h2>
                    <p className="text-zinc-400">Create a match to get started.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {matches.map(match => (
                        <Link key={match.id} href={`/matches/${match.id}`} className="block">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-zinc-500 font-mono">{match.match_code}</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`h-2 w-2 rounded-full ${STATUS_COLORS[match.status] || "bg-zinc-500"}`} />
                                        <span className="text-xs text-zinc-500 capitalize">{match.status.replace(/_/g, " ")}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-zinc-300 capitalize">{match.sport_type}</p>
                                    <p className="text-xs text-zinc-600">{new Date(match.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
