"use client";

// error.tsx — catches any runtime error in auth pages

export default function AuthError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="text-center space-y-4">
            <div className="h-12 w-12 mx-auto text-red-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
            <p className="text-zinc-400 text-sm">
                {error.message || "An unexpected error occurred."}
            </p>
            <button
                onClick={reset}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
                Try Again
            </button>
            <div>
                <a href="/auth/login" className="text-sm text-zinc-500 hover:text-zinc-300">
                    Back to login
                </a>
            </div>
        </div>
    );
}
