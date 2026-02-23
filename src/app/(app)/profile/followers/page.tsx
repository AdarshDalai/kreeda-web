"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { getFollowers } from "@/lib/api/users";
import { Avatar } from "@/components/ui/Avatar";
import { Spinner } from "@/components/ui/Spinner";
import type { UserPublicProfile } from "@/lib/types/user";

export default function FollowersPage() {
    const { user } = useAuthContext();
    const [followers, setFollowers] = useState<UserPublicProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        getFollowers(user.id, 100)
            .then(setFollowers)
            .catch(() => setFollowers([]))
            .finally(() => setLoading(false));
    }, [user]);

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Followers</h1>
            {followers.length === 0 ? (
                <div className="m3-card p-6 text-center">
                    <p className="text-[#9ca3af] text-sm">No followers yet.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {followers.map(u => (
                        <Link key={u.id} href={`/user/${u.username || u.id}`} className="block">
                            <div className="m3-card p-4 flex items-center gap-3 hover:border-[var(--outline)] transition-colors">
                                <Avatar src={u.avatar_url} name={u.display_name || u.username} size="sm" />
                                <div>
                                    <p className="text-sm font-medium text-white">{u.display_name || u.username || "Player"}</p>
                                    {u.username && <p className="text-xs text-[#9ca3af]">@{u.username}</p>}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
