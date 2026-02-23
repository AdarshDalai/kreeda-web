import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password — Kreeda",
    description: "Reset your Kreeda account password.",
};

export default function ForgotPasswordPage() {
    return (
        <>
            <h2 className="text-2xl font-semibold text-white mb-6">
                Reset Password
            </h2>
            <ForgotPasswordForm />
        </>
    );
}
