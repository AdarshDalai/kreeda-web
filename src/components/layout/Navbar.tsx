"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";

export function Navbar() {
    const { user, isAuthenticated, loading } = useAuthContext();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold text-emerald-400 tracking-tight"
                >
                    Kreeda
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-6">
                    <NavLink href="/matches/live">Live</NavLink>
                    {isAuthenticated && (
                        <>
                            <NavLink href="/teams">Teams</NavLink>
                            <NavLink href="/matches">Matches</NavLink>
                            <NavLink href="/tournaments">Tournaments</NavLink>
                        </>
                    )}
                </div>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-3">
                    {loading ? (
                        <div className="h-8 w-20 bg-zinc-800 rounded-lg animate-pulse" />
                    ) : isAuthenticated && user ? (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/notifications"
                                className="text-zinc-400 hover:text-white transition-colors"
                                aria-label="Notifications"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </Link>
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                            >
                                <Avatar src={user.avatar_url} name={user.display_name || user.username} size="sm" />
                                <span className="text-sm text-zinc-300">
                                    {user.display_name || user.username || "Profile"}
                                </span>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/auth/login"
                                className="text-sm text-zinc-300 hover:text-white px-4 py-2 transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-zinc-400 hover:text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 space-y-3">
                    <MobileLink href="/matches/live" onClick={() => setMobileOpen(false)}>Live Matches</MobileLink>
                    {isAuthenticated ? (
                        <>
                            <MobileLink href="/teams" onClick={() => setMobileOpen(false)}>Teams</MobileLink>
                            <MobileLink href="/matches" onClick={() => setMobileOpen(false)}>Matches</MobileLink>
                            <MobileLink href="/tournaments" onClick={() => setMobileOpen(false)}>Tournaments</MobileLink>
                            <MobileLink href="/notifications" onClick={() => setMobileOpen(false)}>Notifications</MobileLink>
                            <MobileLink href="/profile" onClick={() => setMobileOpen(false)}>Profile</MobileLink>
                            <MobileLink href="/settings" onClick={() => setMobileOpen(false)}>Settings</MobileLink>
                        </>
                    ) : (
                        <>
                            <MobileLink href="/auth/login" onClick={() => setMobileOpen(false)}>Sign In</MobileLink>
                            <MobileLink href="/auth/signup" onClick={() => setMobileOpen(false)}>Sign Up</MobileLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
            {children}
        </Link>
    );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block text-zinc-300 hover:text-white py-2 transition-colors"
        >
            {children}
        </Link>
    );
}
