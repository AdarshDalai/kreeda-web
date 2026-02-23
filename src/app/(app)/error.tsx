"use client";

import { Button } from "@/components/ui/Button";

export default function AppError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-12 w-12 text-red-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
            </div>
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="text-zinc-400 text-sm max-w-md text-center">{error.message}</p>
            <Button onClick={reset} type="button">Try Again</Button>
        </div>
    );
}
