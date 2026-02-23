"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMatch, getScorecard } from "@/lib/api/matches";
import { Spinner } from "@/components/ui/Spinner";
import type { MatchDetail } from "@/lib/types/match";

const STATUS_LABELS: Record<string, string> = {
    invitation_sent: "Invitation Sent",
    invitation_accepted: "Invitation Accepted",
    lobby: "Lobby",
    toss: "Toss",
    in_progress: "In Progress",
    paused: "Paused",
    completed: "Completed",
    abandoned: "Abandoned",
    cancelled: "Cancelled",
    conflict: "Conflict",
};

export default function MatchDetailPage() {
    const { matchId } = useParams<{ matchId: string }>();
    const [match, setMatch] = useState<MatchDetail | null>(null);
    const [scorecard, setScorecard] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!matchId) return;
        Promise.all([
            getMatch(matchId),
            getScorecard(matchId).catch(() => null),
        ]).then(([m, sc]) => {
            setMatch(m);
            setScorecard(sc);
        }).catch(() => setMatch(null)).finally(() => setLoading(false));
    }, [matchId]);

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
    if (!match) return <div className="text-center py-20 text-zinc-400">Match not found</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-zinc-500">{match.match_code}</span>
                    <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
                        {STATUS_LABELS[match.status] || match.status}
                    </span>
                </div>
                <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                        <div className="h-14 w-14 mx-auto bg-zinc-800 rounded-xl flex items-center justify-center text-2xl mb-2">
                            {match.sport_type === "cricket" ? "CR" : "FB"}
                        </div>
                        <p className="text-sm font-semibold text-white">{match.team_a?.name || "Team A"}</p>
                    </div>
                    <span className="text-2xl font-bold text-zinc-600">vs</span>
                    <div className="text-center">
                        <div className="h-14 w-14 mx-auto bg-zinc-800 rounded-xl flex items-center justify-center text-2xl mb-2">
                            {match.sport_type === "cricket" ? "CR" : "FB"}
                        </div>
                        <p className="text-sm font-semibold text-white">{match.team_b?.name || "Team B"}</p>
                    </div>
                </div>
                {match.toss_winner_team_id && (
                    <p className="text-center text-xs text-zinc-500 mt-4">
                        Toss: won by {match.toss_winner_team_id === match.team_a_id ? match.team_a?.name : match.team_b?.name} — elected to {match.toss_decision}
                    </p>
                )}
            </div>

            {/* Scorecard */}
            {scorecard && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold mb-3">Scorecard</h2>
                    <pre className="text-xs text-zinc-400 overflow-x-auto">{JSON.stringify(scorecard, null, 2)}</pre>
                </div>
            )}

            {/* Participants */}
            {match.participants.length > 0 && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold mb-3">Participants ({match.participants.length})</h2>
                    <div className="space-y-2">
                        {match.participants.map(p => (
                            <div key={p.id} className="flex justify-between text-sm">
                                <span className="text-zinc-300">{p.user_id.slice(0, 8)}...</span>
                                <span className="text-zinc-500 capitalize">{p.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
