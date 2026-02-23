"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTeam } from "@/lib/api/teams";
import { Spinner } from "@/components/ui/Spinner";
import { Avatar } from "@/components/ui/Avatar";
import type { TeamDetail } from "@/lib/types/team";

export default function TeamDetailPage() {
    const { teamId } = useParams<{ teamId: string }>();
    const [team, setTeam] = useState<TeamDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!teamId) return;
        getTeam(teamId)
            .then(setTeam)
            .catch(() => setTeam(null))
            .finally(() => setLoading(false));
    }, [teamId]);

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
    if (!team) return <div className="text-center py-20 text-zinc-400">Team not found</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl">
                    {team.sport_type === "cricket" ? "CR" : "FB"}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{team.name}</h1>
                    <p className="text-zinc-500 text-sm capitalize">{team.sport_type} • Code: <span className="text-emerald-400 font-mono">{team.team_code}</span></p>
                </div>
            </div>

            {team.description && <p className="text-zinc-400">{team.description}</p>}

            {/* Members */}
            <div>
                <h2 className="text-lg font-semibold mb-3">Members ({team.members.length})</h2>
                <div className="space-y-2">
                    {team.members.map((m) => (
                        <div key={m.id} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <Avatar src={m.user?.avatar_url} name={m.user?.display_name || m.user?.username} size="sm" />
                                <div>
                                    <p className="text-white text-sm font-medium">{m.user?.display_name || m.user?.username || "Unknown"}</p>
                                    <p className="text-zinc-500 text-xs capitalize">{m.role.replace("_", " ")}{m.jersey_number ? ` • #${m.jersey_number}` : ""}</p>
                                </div>
                            </div>
                            {m.position && <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">{m.position}</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
