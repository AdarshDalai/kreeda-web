import { OnboardForm } from "@/components/auth/OnboardForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Set Up Profile — Kreeda",
    description: "Choose your username and set up your Kreeda profile.",
};

export default function OnboardPage() {
    return (
        <>
            <h2 className="text-2xl font-semibold text-white mb-2">
                Set Up Your Profile
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
                Choose a unique username to get started on Kreeda
            </p>
            <OnboardForm />
        </>
    );
}
