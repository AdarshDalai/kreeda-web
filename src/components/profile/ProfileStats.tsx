import type { FollowCounts } from "@/lib/types/user";

interface ProfileStatsProps {
    counts: FollowCounts;
}

export function ProfileStats({ counts }: ProfileStatsProps) {
    return (
        <div className="flex justify-center gap-8 py-4">
            <div className="text-center">
                <p className="text-xl font-bold text-white">{counts.followers}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wide">Followers</p>
            </div>
            <div className="text-center">
                <p className="text-xl font-bold text-white">{counts.following}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wide">Following</p>
            </div>
        </div>
    );
}
