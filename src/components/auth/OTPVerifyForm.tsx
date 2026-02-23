"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOTP, resendVerification } from "@/lib/api/auth";
import { saveSession } from "@/lib/auth/session";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function OTPVerifyForm() {
    const [tokenHash, setTokenHash] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";
    const otpType = searchParams.get("type") || "signup";

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await verifyOTP({
                token_hash: tokenHash,
                otp_type: otpType,
            });

            if (response.session) {
                saveSession(response.session);
                router.push("/auth/onboard");
            } else {
                router.push("/auth/login");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Verification failed");
        } finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        if (!email) return;
        setResending(true);
        setResendSuccess(false);
        try {
            await resendVerification({ email, otp_type: otpType });
            setResendSuccess(true);
        } catch {
            setError("Failed to resend verification email");
        } finally {
            setResending(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-zinc-400 text-sm mb-2">
                {email
                    ? <>Check your email <strong className="text-white">{email}</strong> for the verification code.</>
                    : "Enter your verification code below."
                }
            </p>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {resendSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg text-sm">
                    Verification email resent!
                </div>
            )}

            <Input
                label="Verification Code"
                type="text"
                value={tokenHash}
                onChange={(e) => setTokenHash(e.target.value)}
                placeholder="Enter code from email"
                required
            />

            <Button type="submit" loading={loading}>
                Verify
            </Button>

            {email && (
                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resending}
                        className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
                    >
                        {resending ? "Sending..." : "Didn't receive it? Resend"}
                    </button>
                </div>
            )}

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
