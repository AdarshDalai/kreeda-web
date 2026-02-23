"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { joinByCode } from "@/lib/api/teams";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function JoinTeamPage() {
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await joinByCode({ team_code: code.trim() });
            router.push("/teams");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to join team");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Join a Team</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>}
                <Input label="Team Code" value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="ABC123" required />
                <Button type="submit" loading={loading}>Join Team</Button>
            </form>
        </div>
    );
}
