"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Link2, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        const supabase = createClient();

        try {
            const timeout = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error("Connection timed out. Try again in a moment.")), 8000)
            );
            const signInResult = supabase.auth.signInWithPassword({ email, password });
            const { error } = await Promise.race([signInResult, timeout]) as Awaited<typeof signInResult>;

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                // Success - do not reset loading so the spinner stays while Next.js routes
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to connect. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#111111] flex flex-col">
            {/* Top bar */}
            <div className="px-6 py-4 border-b border-solid border-[#2b2b2b] bg-[#111111]">
                <Link href="/" className="flex items-center gap-2 w-fit">
                    <div className="px-2 py-1 bg-[#e5e5e5] text-[#111111] rounded uppercase font-medium tracking-tight  border border-solid border-[#111111] shadow-md text-sm">
                        CLIXY™
                    </div>
                </Link>
            </div>

            {/* Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-sm animate-fade-up">
                    <div className="mb-7 text-center">
                        <h1 className="text-2xl font-medium uppercase tracking-wider text-[#e5e5e5]">Sign in to Clixy</h1>
                        <p className="text-sm font-semibold text-[#a3a3a3] mt-2">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-[#ffffff] hover:text-[#e5e5e5] font-bold uppercase tracking-wider">
                                Sign up free
                            </Link>
                        </p>
                    </div>

                    <div className="card rounded-xl p-6 border border-solid border-[#2b2b2b] bg-[#111111]">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#a3a3a3] mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                                    <input
                                        id="login-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="input-base w-full pl-9 pr-3 py-3 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#a3a3a3] mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="input-base w-full pl-9 pr-10 py-3 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#e5e5e5] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <p className="text-xs font-bold text-[#111111] bg-[#ef4444] border border-[#ef4444] rounded-lg px-3 py-2 shadow-md">
                                    {error}
                                </p>
                            )}

                            <button
                                id="login-submit"
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
