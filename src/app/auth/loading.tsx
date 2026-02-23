// loading.tsx — shown automatically while auth pages are loading
// This is a React Suspense fallback managed by Next.js

export default function AuthLoading() {
    return (
        <div className="space-y-4 animate-pulse">
            {/* Skeleton heading */}
            <div className="h-8 bg-zinc-800 rounded-lg w-2/3" />

            {/* Skeleton input fields */}
            <div className="space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-1/4" />
                <div className="h-12 bg-zinc-800 rounded-lg" />
            </div>
            <div className="space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-1/4" />
                <div className="h-12 bg-zinc-800 rounded-lg" />
            </div>

            {/* Skeleton button */}
            <div className="h-12 bg-zinc-800 rounded-lg" />
        </div>
    );
}
