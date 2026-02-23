"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleOAuthCallback } from "@/lib/api/auth";
import { saveSession } from "@/lib/auth/session";
import { getMe } from "@/lib/api/users";
import { Spinner } from "@/components/ui/Spinner";

function CallbackHandler() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        async function processCallback() {
            const code = searchParams.get("code");
            if (!code) {
                setError("No authorization code received from Google.");
                return;
            }

            try {
                const response = await handleOAuthCallback({ code });

                if (response.session) {
                    saveSession(response.session);
                }

                const user = await getMe();
                router.push(user.is_onboarded ? "/dashboard" : "/auth/onboard");
            } catch {
                setError("Authentication failed. Please try again.");
            }
        }

        processCallback();
    }, [searchParams, router]);

    if (error) {
        return (
            <div className="text-center space-y-4">
                <div className="h-10 w-10 mx-auto text-red-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                </div>
                <p className="text-red-400">{error}</p>
                <a
                    href="/auth/login"
                    className="inline-block text-emerald-400 hover:underline text-sm"
                >
                    ← Back to login
                </a>
            </div>
        );
    }

    return (
        <div className="text-center space-y-4">
            <Spinner size="lg" className="mx-auto" />
            <p className="text-zinc-400">Completing sign in…</p>
        </div>
    );
}

export default function OAuthCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="text-center space-y-4">
                    <Spinner size="lg" className="mx-auto" />
                    <p className="text-zinc-400">Loading…</p>
                </div>
            }
        >
            <CallbackHandler />
        </Suspense>
    );
}
