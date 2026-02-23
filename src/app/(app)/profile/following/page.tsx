"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { getFollowing } from "@/lib/api/users";
import { Avatar } from "@/components/ui/Avatar";
import { Spinner } from "@/components/ui/Spinner";
import type { UserPublicProfile } from "@/lib/types/user";

export default function FollowingPage() {
    const { user } = useAuthContext();
    const [following, setFollowing] = useState<UserPublicProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        getFollowing(user.id, 100)
            .then(setFollowing)
            .catch(() => setFollowing([]))
            .finally(() => setLoading(false));
    }, [user]);

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Following</h1>
            {following.length === 0 ? (
                <div className="m3-card p-6 text-center">
                    <p className="text-[#9ca3af] text-sm">Not following anyone yet.</p>
                    <Link href="/search" className="m3-btn-filled inline-block mt-3 text-sm">Find Players</Link>
                </div>
            ) : (
                <div className="space-y-2">
                    {following.map(u => (
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
