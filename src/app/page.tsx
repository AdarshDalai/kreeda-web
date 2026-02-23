"use client";

/**
 * Root Page — client-side redirect fallback.
 *
 * The middleware already handles "/" redirects server-side.
 * This page acts as a safety net: if the middleware doesn't fire
 * (e.g. static export), it checks auth state and redirects accordingly.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Spinner } from "@/components/ui/Spinner";

export default function Home() {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace(isAuthenticated ? "/dashboard" : "/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Spinner size="lg" />
    </main>
  );
}