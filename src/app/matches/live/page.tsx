import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { getLiveMatches } from "@/lib/api/matches";
import type { MatchOut } from "@/lib/types/match";

export const revalidate = 30; // ISR: re-generate every 30 seconds

export default async function LiveMatchesPage() {
    let matches: MatchOut[] = [];
    try {
        matches = await getLiveMatches();
    } catch { /* API might be down */ }

    return (
        <>
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Live Matches</h1>
                {matches.length === 0 ? (
                    <div className="text-center py-20 space-y-4">
                        <div className="h-12 w-12 mx-auto text-zinc-600">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" /></svg>
                        </div>
                        <h2 className="text-xl font-semibold">No live matches right now</h2>
                        <p className="text-zinc-400">Check back later or start your own match.</p>
                        <Link href="/auth/signup" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl transition-colors mt-2">
                            Get Started
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {matches.map(match => (
                            <Link key={match.id} href={`/matches/${match.id}`} className="block">
                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-zinc-500 font-mono">{match.match_code}</span>
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs text-green-400">Live</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-zinc-300 capitalize">{match.sport_type}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
