"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { searchUsers } from "@/lib/api/users";
import { Avatar } from "@/components/ui/Avatar";
import { Spinner } from "@/components/ui/Spinner";
import type { UserPublicProfile } from "@/lib/types/user";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<UserPublicProfile[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const doSearch = useCallback(async (q: string) => {
        if (q.length < 2) { setResults([]); setSearched(false); return; }
        setLoading(true);
        setSearched(true);
        try {
            const users = await searchUsers(q, 20);
            setResults(users);
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => doSearch(query), 400);
        return () => clearTimeout(timer);
    }, [query, doSearch]);

    return (
        <div className="max-w-lg mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Find Players</h1>

            {/* Search input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </div>
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by name or username..."
                    className="m3-input pl-11"
                    autoFocus
                />
            </div>

            {/* Results */}
            {loading ? (
                <div className="flex justify-center py-10"><Spinner size="md" /></div>
            ) : results.length > 0 ? (
                <div className="space-y-2">
                    {results.map(u => (
                        <Link key={u.id} href={`/user/${u.username || u.id}`} className="block">
                            <div className="m3-card p-4 flex items-center gap-3 hover:border-[var(--outline)] transition-colors">
                                <Avatar src={u.avatar_url} name={u.display_name || u.username} size="sm" />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{u.display_name || u.username || "Player"}</p>
                                    {u.username && <p className="text-xs text-[#9ca3af]">@{u.username}</p>}
                                    {u.bio && <p className="text-xs text-[#6b7280] mt-1 truncate">{u.bio}</p>}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : searched && query.length >= 2 ? (
                <div className="m3-card p-6 text-center">
                    <p className="text-[#9ca3af] text-sm">No players found for &quot;{query}&quot;</p>
                </div>
            ) : !searched ? (
                <div className="m3-card p-6 text-center">
                    <p className="text-[#9ca3af] text-sm">Type at least 2 characters to search</p>
                </div>
            ) : null}
        </div>
    );
}
