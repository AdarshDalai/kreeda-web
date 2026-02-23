"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getMyTeams } from "@/lib/api/teams";
import { createMatch } from "@/lib/api/matches";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import type { TeamOut } from "@/lib/types/team";

export default function CreateMatchPage() {
    const [teams, setTeams] = useState<TeamOut[]>([]);
    const [teamAId, setTeamAId] = useState("");
    const [invitedTeamId, setInvitedTeamId] = useState("");
    const [sportType, setSportType] = useState("cricket");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        getMyTeams()
            .then(t => { setTeams(t); if (t[0]) setTeamAId(t[0].id); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!teamAId || !invitedTeamId) { setError("Select both teams"); return; }
        setError(null);
        setSubmitting(true);
        try {
            const match = await createMatch({ sport_type: sportType, team_a_id: teamAId, invited_team_id: invitedTeamId });
            router.push(`/matches/${match.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create match");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create Match</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>}

                <div className="space-y-1">
                    <label className="block text-sm text-zinc-400">Sport</label>
                    <div className="flex gap-3">
                        {["cricket", "football"].map(s => (
                            <button key={s} type="button" onClick={() => setSportType(s)}
                                className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors ${sportType === s ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400"}`}>
                                {s === "cricket" ? "Cricket" : "Football"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm text-zinc-400">Your Team</label>
                    <select value={teamAId} onChange={e => setTeamAId(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option value="">Select your team</option>
                        {teams.filter(t => t.sport_type === sportType).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm text-zinc-400">Opponent Team ID</label>
                    <input value={invitedTeamId} onChange={e => setInvitedTeamId(e.target.value)} placeholder="Paste opponent team ID" required
                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>

                <Button type="submit" loading={submitting}>Create Match</Button>
            </form>
        </div>
    );
}
