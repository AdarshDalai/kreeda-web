// Auth Layout — wraps all /auth/* pages with centered card + branding (like Scaffold)

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-emerald-400 tracking-tight">
                        Kreeda
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        Score. Compete. Dominate.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-xl">
                    {children}
                </div>
            </div>
        </div>
    );
}
