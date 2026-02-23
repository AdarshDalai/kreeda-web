"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserByUsername, getUser, getFollowCounts, getSportProfiles, followUser, unfollowUser } from "@/lib/api/users";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import type { UserPublicProfile, FollowCounts, SportProfileOut } from "@/lib/types/user";

export default function UserProfilePage() {
    const { id } = useParams<{ id: string }>();
    const { user: me } = useAuthContext();
    const [profile, setProfile] = useState<UserPublicProfile | null>(null);
    const [followCounts, setFollowCounts] = useState<FollowCounts | null>(null);
    const [sportProfiles, setSportProfiles] = useState<SportProfileOut[]>([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [followLoading, setFollowLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        // Try by username first, fallback to by ID
        const fetchUser = id.length > 20
            ? getUser(id)
            : getUserByUsername(id).catch(() => getUser(id));

        fetchUser
            .then(async (u) => {
                setProfile(u);
                const [counts, profiles] = await Promise.all([
                    getFollowCounts(u.id).catch(() => ({ followers: 0, following: 0 })),
                    getSportProfiles(u.id).catch(() => []),
                ]);
                setFollowCounts(counts);
                setSportProfiles(profiles);
            })
            .catch(() => setProfile(null))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleFollow() {
        if (!profile) return;
        setFollowLoading(true);
        try {
            if (isFollowing) {
                await unfollowUser(profile.id);
                setIsFollowing(false);
                setFollowCounts(prev => prev ? { ...prev, followers: prev.followers - 1 } : prev);
            } else {
                await followUser(profile.id);
                setIsFollowing(true);
                setFollowCounts(prev => prev ? { ...prev, followers: prev.followers + 1 } : prev);
            }
        } catch { /* ignore */ }
        finally { setFollowLoading(false); }
    }

    if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
    if (!profile) return <div className="text-center py-20 text-[#9ca3af]">User not found</div>;

    const isOwn = me?.id === profile.id;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="m3-card-elevated p-6">
                <div className="flex items-start gap-5">
                    <Avatar src={profile.avatar_url} name={profile.display_name || profile.username} size="xl" />
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                {profile.display_name && <h1 className="text-xl font-bold text-white">{profile.display_name}</h1>}
                                {profile.username && <p className="text-sm text-[#9ca3af]">@{profile.username}</p>}
                            </div>
                            {!isOwn && (
                                <Button type="button" onClick={handleFollow} loading={followLoading} variant={isFollowing ? "outline" : undefined}>
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </Button>
                            )}
                        </div>
                        {profile.bio && <p className="text-sm text-[#d4d4d8] mt-2">{profile.bio}</p>}
                        {followCounts && (
                            <div className="flex gap-4 mt-4">
                                <span><span className="text-white font-semibold">{followCounts.followers}</span> <span className="text-[#9ca3af] text-sm">followers</span></span>
                                <span><span className="text-white font-semibold">{followCounts.following}</span> <span className="text-[#9ca3af] text-sm">following</span></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {sportProfiles.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-white mb-3">Sport Profiles</h2>
                    <div className="space-y-3">
                        {sportProfiles.map((sp) => (
                            <div key={sp.id} className="m3-card p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--primary-container)] flex items-center justify-center text-sm font-bold text-[var(--on-primary-container)]">
                                        {sp.sport_type.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold capitalize">{sp.sport_type}</h3>
                                        <p className="text-[#9ca3af] text-xs">{sp.matches_played} matches</p>
                                    </div>
                                </div>
                                {Object.keys(sp.stats).length > 0 && (
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.entries(sp.stats).map(([key, value]) => (
                                            <div key={key} className="bg-[var(--surface-container-high)] rounded-[var(--radius-sm)] p-2 text-center">
                                                <p className="text-sm font-medium text-white">{String(value)}</p>
                                                <p className="text-xs text-[#9ca3af] capitalize">{key.replace(/_/g, " ")}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
