import { Avatar } from "@/components/ui/Avatar";
import type { UserProfile, UserPublicProfile } from "@/lib/types/user";

interface ProfileHeaderProps {
    user: UserProfile | UserPublicProfile;
    isOwnProfile?: boolean;
    onLogout?: () => void;
}

export function ProfileHeader({ user, isOwnProfile, onLogout }: ProfileHeaderProps) {
    return (
        <div className="flex flex-col items-center text-center space-y-4">
            <Avatar
                src={user.avatar_url}
                name={user.display_name || user.username}
                size="xl"
            />

            <div>
                {user.display_name && (
                    <h1 className="text-2xl font-bold text-white">{user.display_name}</h1>
                )}
                {user.username && (
                    <p className="text-zinc-400 text-sm">@{user.username}</p>
                )}
            </div>

            {user.bio && (
                <p className="text-zinc-300 text-sm max-w-md">{user.bio}</p>
            )}

            {isOwnProfile && onLogout && (
                <button
                    onClick={onLogout}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors mt-2"
                >
                    Sign Out
                </button>
            )}
        </div>
    );
}
