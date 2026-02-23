"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyTeams } from "@/lib/api/teams";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import type { TeamOut } from "@/lib/types/team";

export default function TeamsPage() {
    const [teams, setTeams] = useState<TeamOut[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyTeams()
            .then(setTeams)
            .catch(() => setTeams([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Teams</h1>
                <div className="flex gap-2">
                    <Link href="/teams/join">
                        <Button variant="outline" type="button">Join Team</Button>
                    </Link>
                    <Link href="/teams/create">
                        <Button type="button">Create Team</Button>
                    </Link>
                </div>
            </div>

            {teams.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                    <div className="h-12 w-12 mx-auto text-zinc-600">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                    </div>
                    <h2 className="text-xl font-semibold">No teams yet</h2>
                    <p className="text-zinc-400">Create a team or join one with a team code.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {teams.map((team) => (
                        <Link key={team.id} href={`/teams/${team.id}`} className="block">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-xl">
                                        {team.sport_type === "cricket" ? "CR" : "FB"}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{team.name}</h3>
                                        <p className="text-sm text-zinc-500 capitalize">{team.sport_type} • {team.team_code}</p>
                                    </div>
                                </div>
                                {team.description && (
                                    <p className="text-sm text-zinc-400 mt-3 line-clamp-2">{team.description}</p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <Link href="/teams/invitations" className="block text-center text-sm text-emerald-400 hover:underline mt-4">
                View pending invitations →
            </Link>
        </div>
    );
}
