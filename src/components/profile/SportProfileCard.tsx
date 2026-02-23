import type { SportProfileOut } from "@/lib/types/user";

interface SportProfileCardProps {
    profile: SportProfileOut;
}

const sportLabel: Record<string, string> = {
    cricket: "CR",
    football: "FB",
};

export function SportProfileCard({ profile }: SportProfileCardProps) {
    return (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-lg font-bold text-emerald-400 bg-emerald-500/10 rounded-lg h-10 w-10 flex items-center justify-center">
                    {sportLabel[profile.sport_type] || profile.sport_type.slice(0, 2).toUpperCase()}
                </span>
                <div>
                    <h3 className="text-white font-semibold capitalize">
                        {profile.sport_type}
                    </h3>
                    <p className="text-zinc-500 text-xs">
                        {profile.matches_played} matches played
                    </p>
                </div>
            </div>

            {/* Stats grid */}
            {Object.keys(profile.stats).length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.entries(profile.stats).map(([key, value]) => (
                        <div key={key} className="bg-zinc-900 rounded-lg p-2 text-center">
                            <p className="text-sm font-medium text-white">
                                {String(value)}
                            </p>
                            <p className="text-xs text-zinc-500 capitalize">
                                {key.replace(/_/g, " ")}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
