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
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to connect. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top bar */}
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
                <Link href="/" className="flex items-center gap-2 w-fit">
                    <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
                        <Link2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Clixy</span>
                </Link>
            </div>

            {/* Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-sm animate-fade-up">
                    <div className="mb-7">
                        <h1 className="text-xl font-bold text-gray-900">Sign in to Clixy</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign up free
                            </Link>
                        </p>
                    </div>

                    <div className="card rounded-xl p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Email address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        id="login-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="input-base w-full pl-9 pr-3 py-2.5 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="input-base w-full pl-9 pr-10 py-2.5 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                    {error}
                                </p>
                            )}

                            <button
                                id="login-submit"
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
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
