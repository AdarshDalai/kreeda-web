"use client";

import { useEffect, useState } from "react";
import { getMyTeamInvitations, respondTeamInvitation } from "@/lib/api/teams";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import type { TeamInvitationOut } from "@/lib/types/team";

export default function TeamInvitationsPage() {
    const [invitations, setInvitations] = useState<TeamInvitationOut[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyTeamInvitations()
            .then(setInvitations)
            .catch(() => setInvitations([]))
            .finally(() => setLoading(false));
    }, []);

    async function respond(id: string, accept: boolean) {
        try {
            await respondTeamInvitation(id, accept);
            setInvitations(prev => prev.filter(i => i.id !== id));
        } catch { /* ignore */ }
    }

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

    return (
        <div className="max-w-lg mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Team Invitations</h1>
            {invitations.length === 0 ? (
                <p className="text-zinc-400 text-center py-10">No pending invitations</p>
            ) : (
                <div className="space-y-3">
                    {invitations.map(inv => (
                        <div key={inv.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium">{inv.team?.name || "Team"}</p>
                                <p className="text-zinc-500 text-sm capitalize">{inv.team?.sport_type || "sport"} • {inv.status}</p>
                            </div>
                            {inv.status === "pending" && (
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => respond(inv.id, false)} type="button">Decline</Button>
                                    <Button onClick={() => respond(inv.id, true)} type="button">Accept</Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
