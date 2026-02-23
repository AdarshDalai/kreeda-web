"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api/auth";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GoogleSignInButton } from "./GoogleSignInButton";

export function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { handleAuthSuccess } = useAuthContext();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await signUp({ email, password });

            if (response.session) {
                // Supabase auto-confirms in some setups → user gets session right away
                await handleAuthSuccess(response);
                router.push("/auth/onboard");
            } else {
                // Email confirmation required → show a success message
                router.push(
                    `/auth/verify-otp?email=${encodeURIComponent(email)}&type=signup`,
                );
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Signup failed");
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
                placeholder="Min. 8 characters"
                required
                minLength={8}
                maxLength={128}
            />

            <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                minLength={8}
            />

            <Button type="submit" loading={loading}>
                Create Account
            </Button>

            <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-px bg-zinc-700" />
                <span className="text-zinc-500 text-sm">or</span>
                <div className="flex-1 h-px bg-zinc-700" />
            </div>

            <GoogleSignInButton />
        </form>
    );
}
