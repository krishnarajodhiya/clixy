"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Make sure we have a session before allowing them to reset, but realistically Supabase SDK
    // will pick up the hash token from the URL and log them in immediately.
    useEffect(() => {
        const supabase = createClient();
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                // Good to go
            }
        });
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        const supabase = createClient();

        try {
            const { error: updateError } = await supabase.auth.updateUser({ password });

            if (updateError) {
                setError(updateError.message);
                setLoading(false);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to connect. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-up">
                <div className="card rounded-xl p-8 border border-solid border-border bg-bg">
                    <h1 className="text-2xl font-medium tracking-tight text-text-primary mb-2 text-center">Set new password</h1>
                    <p className="text-sm text-text-secondary mb-8 text-center">
                        Choose a strong, unique password for your account.
                    </p>

                    <form onSubmit={handleSubmit} className="text-left space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                                New password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
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
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                                Confirm new password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input-base w-full pl-9 pr-10 py-3 text-sm"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs font-bold text-text-primary bg-[#ef4444] border border-[#ef4444] rounded-lg px-3 py-2 shadow-md">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password || !confirmPassword}
                            className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</>
                            ) : (
                                "Update password"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
