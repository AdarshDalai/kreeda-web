import { LoginForm } from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign In — Kreeda",
    description: "Sign in to your Kreeda account to track scores, manage teams, and compete.",
};

export default function LoginPage() {
    return (
        <>
            <h2 className="text-2xl font-semibold text-white mb-6">Sign In</h2>
            <LoginForm />
            <p className="text-center text-zinc-500 mt-6 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-emerald-400 hover:underline">
                    Sign up
                </Link>
            </p>
        </>
    );
}
