import { SignupForm } from "@/components/auth/SignupForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign Up — Kreeda",
    description: "Create your Kreeda account and start tracking your sports journey.",
};

export default function SignupPage() {
    return (
        <>
            <h2 className="text-2xl font-semibold text-white mb-6">Create Account</h2>
            <SignupForm />
            <p className="text-center text-zinc-500 mt-6 text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-emerald-400 hover:underline">
                    Sign in
                </Link>
            </p>
        </>
    );
}
