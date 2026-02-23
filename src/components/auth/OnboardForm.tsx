"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { onboard, checkUsername } from "@/lib/api/users";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export function OnboardForm() {
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Debounced username availability check (like LaunchedEffect with delay)
    useEffect(() => {
        if (username.length < 3) {
            setUsernameStatus(username.length > 0 ? "invalid" : "idle");
            return;
        }

        // Validate format: lowercase, starts with letter
        if (!/^[a-z][a-z0-9_]*$/.test(username)) {
            setUsernameStatus("invalid");
            return;
        }

        setUsernameStatus("checking");

        const timer = setTimeout(async () => {
            try {
                const result = await checkUsername(username);
                setUsernameStatus(result.available ? "available" : "taken");
            } catch {
                setUsernameStatus("idle");
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [username]);

    const usernameHint: Record<UsernameStatus, string | undefined> = {
        idle: undefined,
        checking: "Checking availability...",
        available: "✓ Username is available!",
        taken: "✗ Username is already taken",
        invalid: "Must be 3-30 chars, lowercase, start with a letter (a-z, 0-9, _)",
    };

    const usernameError =
        usernameStatus === "taken" || usernameStatus === "invalid"
            ? usernameHint[usernameStatus]
            : null;

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (usernameStatus !== "available") return;

        setLoading(true);
        setError(null);

        try {
            await onboard({
                username,
                display_name: displayName || null,
                bio: bio || null,
            });
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Onboarding failed");
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
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                placeholder="your_username"
                required
                minLength={3}
                maxLength={30}
                error={usernameError}
                hint={
                    usernameStatus === "checking" || usernameStatus === "available"
                        ? usernameHint[usernameStatus]
                        : undefined
                }
            />

            <Input
                label="Display Name (optional)"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Adarsh Kumar"
            />

            <div className="space-y-1">
                <label className="block text-sm text-zinc-400">Bio (optional)</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3
                     text-white placeholder-zinc-500 focus:outline-none
                     focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                     resize-none transition-colors"
                    placeholder="Cricket enthusiast"
                />
            </div>

            <Button
                type="submit"
                loading={loading}
                disabled={usernameStatus !== "available"}
            >
                Continue
            </Button>
        </form>
    );
}
