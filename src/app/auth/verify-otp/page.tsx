import { OTPVerifyForm } from "@/components/auth/OTPVerifyForm";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";

export const metadata: Metadata = {
    title: "Verify Email — Kreeda",
    description: "Verify your email to complete Kreeda registration.",
};

export default function VerifyOTPPage() {
    return (
        <>
            <h2 className="text-2xl font-semibold text-white mb-6">
                Verify Your Email
            </h2>
            <Suspense
                fallback={
                    <div className="flex justify-center py-8">
                        <Spinner />
                    </div>
                }
            >
                <OTPVerifyForm />
            </Suspense>
        </>
    );
}
