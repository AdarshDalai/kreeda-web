"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTournament, getPointsTable } from "@/lib/api/tournaments";
import { Spinner } from "@/components/ui/Spinner";
import type { TournamentOut, PointsTableEntry } from "@/lib/types/common";

export default function TournamentDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [tournament, setTournament] = useState<TournamentOut | null>(null);
    const [points, setPoints] = useState<PointsTableEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        Promise.all([
            getTournament(id),
            getPointsTable(id).catch(() => []),
        ]).then(([t, p]) => { setTournament(t); setPoints(p); })
            .catch(() => setTournament(null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
    if (!tournament) return <div className="text-center py-20 text-zinc-400">Tournament not found</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold">{tournament.name}</h1>
                <p className="text-zinc-500 capitalize">{tournament.sport_type} • {tournament.tournament_type.replace(/_/g, " ")} • {tournament.status}</p>
                {tournament.description && <p className="text-zinc-400 mt-2">{tournament.description}</p>}
            </div>

            {/* Points Table */}
            {points.length > 0 && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                    <h2 className="text-lg font-semibold p-4 border-b border-zinc-800">Points Table</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-zinc-500 border-b border-zinc-800">
                                    <th className="text-left px-4 py-3">Team</th>
                                    <th className="text-center px-2 py-3">P</th>
                                    <th className="text-center px-2 py-3">W</th>
                                    <th className="text-center px-2 py-3">L</th>
                                    <th className="text-center px-2 py-3">D</th>
                                    <th className="text-center px-2 py-3">Pts</th>
                                    <th className="text-center px-2 py-3">NRR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {points.map((entry, i) => (
                                    <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                                        <td className="px-4 py-3 text-white font-medium">{entry.team.name}</td>
                                        <td className="text-center px-2 py-3 text-zinc-400">{entry.matches_played}</td>
                                        <td className="text-center px-2 py-3 text-green-400">{entry.matches_won}</td>
                                        <td className="text-center px-2 py-3 text-red-400">{entry.matches_lost}</td>
                                        <td className="text-center px-2 py-3 text-zinc-400">{entry.matches_drawn}</td>
                                        <td className="text-center px-2 py-3 text-white font-bold">{entry.points}</td>
                                        <td className="text-center px-2 py-3 text-zinc-400">{entry.net_run_rate?.toFixed(3) ?? "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
