"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithPassword } from "@/lib/api/auth";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GoogleSignInButton } from "./GoogleSignInButton";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { handleAuthSuccess } = useAuthContext();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await signInWithPassword({ email, password });

            const user = await handleAuthSuccess(response);
            if (user) {
                router.push(user.is_onboarded ? "/dashboard" : "/auth/onboard");
            } else {
                setError("Failed to load user profile");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
            />

            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
            />

            <div className="text-right">
                <a
                    href="/auth/forgot-password"
                    className="text-sm text-emerald-400 hover:underline"
                >
                    Forgot password?
                </a>
            </div>

            <Button type="submit" loading={loading}>
                Sign In
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-px bg-zinc-700" />
                <span className="text-zinc-500 text-sm">or</span>
                <div className="flex-1 h-px bg-zinc-700" />
            </div>

            <GoogleSignInButton />
        </form>
    );
}
