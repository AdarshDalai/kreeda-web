"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listTournaments } from "@/lib/api/tournaments";
import { Spinner } from "@/components/ui/Spinner";
import type { TournamentOut } from "@/lib/types/common";

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState<TournamentOut[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listTournaments()
            .then(setTournaments)
            .catch(() => setTournaments([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Tournaments</h1>
            {tournaments.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                    <div className="h-12 w-12 mx-auto text-zinc-600">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228" /></svg>
                    </div>
                    <h2 className="text-xl font-semibold">No tournaments yet</h2>
                    <p className="text-zinc-400">Tournaments will appear here when created.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {tournaments.map(t => (
                        <Link key={t.id} href={`/tournaments/${t.id}`} className="block">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-white">{t.name}</h3>
                                    <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded capitalize">{t.status}</span>
                                </div>
                                <p className="text-sm text-zinc-500 capitalize">{t.sport_type} • {t.tournament_type.replace(/_/g, " ")}</p>
                                {t.teams.length > 0 && <p className="text-xs text-zinc-600 mt-2">{t.teams.length} teams registered</p>}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
