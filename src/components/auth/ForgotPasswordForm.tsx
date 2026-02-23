"use client";

import { useState, FormEvent } from "react";
import { resetPassword } from "@/lib/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await resetPassword({ email });
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send reset email");
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="text-center space-y-4">
                <div className="text-4xl">📧</div>
                <p className="text-zinc-300">
                    We&apos;ve sent a password reset link to{" "}
                    <strong className="text-white">{email}</strong>
                </p>
                <p className="text-zinc-500 text-sm">
                    Check your inbox and follow the link to reset your password.
                </p>
                <a
                    href="/auth/login"
                    className="inline-block text-emerald-400 hover:underline text-sm mt-4"
                >
                    ← Back to login
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-zinc-400 text-sm mb-2">
                Enter your email and we&apos;ll send you a link to reset your password.
            </p>

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

            <Button type="submit" loading={loading}>
                Send Reset Link
            </Button>

            <div className="text-center">
                <a
                    href="/auth/login"
                    className="text-sm text-zinc-400 hover:text-zinc-300"
                >
                    ← Back to login
                </a>
            </div>
        </form>
    );
}
