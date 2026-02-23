"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createTeam } from "@/lib/api/teams";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CreateTeamPage() {
    const [name, setName] = useState("");
    const [sportType, setSportType] = useState("cricket");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const team = await createTeam({ name, sport_type: sportType, description: description || undefined });
            router.push(`/teams/${team.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create team");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create Team</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>}
                <Input label="Team Name" value={name} onChange={e => setName(e.target.value)} placeholder="Thunder XI" required minLength={2} maxLength={100} />
                <div className="space-y-1">
                    <label className="block text-sm text-zinc-400">Sport</label>
                    <div className="flex gap-3">
                        {["cricket", "football"].map(sport => (
                            <button key={sport} type="button" onClick={() => setSportType(sport)}
                                className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors ${sportType === sport ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>
                                {sport === "cricket" ? "Cricket" : "Football"}
                            </button>
                        ))}
                    </div>
                </div>
                <Input label="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} placeholder="Our weekend squad" />
                <Button type="submit" loading={loading}>Create Team</Button>
            </form>
        </div>
    );
}
