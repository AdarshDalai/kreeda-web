"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Navbar } from "@/components/layout/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, loading } = useAuthContext();
    const pathname = usePathname();

    // If not authenticated, show a simple layout with top navbar
    if (!isAuthenticated && !loading) {
        return (
            <>
                <Navbar />
                <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
            </>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* M3 Navigation Rail (sidebar) */}
            <nav className="nav-rail hidden md:flex shrink-0">
                {/* Logo */}
                <Link href="/" className="mb-4 mt-2 text-emerald-400 font-bold text-lg">K</Link>

                <NavRailItem href="/dashboard" icon={<HomeIcon />} label="Home" active={pathname === "/dashboard"} />
                <NavRailItem href="/teams" icon={<TeamIcon />} label="Teams" active={pathname.startsWith("/teams")} />
                <NavRailItem href="/matches" icon={<MatchIcon />} label="Matches" active={pathname.startsWith("/matches")} />
                <NavRailItem href="/tournaments" icon={<TournamentIcon />} label="Tourneys" active={pathname.startsWith("/tournaments")} />
                <NavRailItem href="/notifications" icon={<BellIcon />} label="Alerts" active={pathname.startsWith("/notifications")} />

                <div className="flex-1" />

                <NavRailItem href="/settings" icon={<SettingsIcon />} label="Settings" active={pathname.startsWith("/settings")} />

                {user && (
                    <Link href="/profile" className="mb-4 mt-2">
                        <Avatar src={user.avatar_url} name={user.display_name || user.username} size="sm" />
                    </Link>
                )}
            </nav>

            {/* Mobile top bar */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="md:hidden">
                    <Navbar />
                </div>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

// ─── Navigation Rail Item ────────────────────────────────

function NavRailItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
    return (
        <Link href={href} className={`nav-rail-item ${active ? "active" : ""}`}>
            <div className="nav-rail-indicator">
                <div className="h-5 w-5">{icon}</div>
            </div>
            <span>{label}</span>
        </Link>
    );
}

// ─── SVG Icons ──────────────────────────────────────────

function HomeIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
}

function TeamIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>;
}

function MatchIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
}

function TournamentIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228" /></svg>;
}

function BellIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>;
}

function SettingsIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
