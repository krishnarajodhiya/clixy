"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Link2,
    Globe,
    Tag,
    Wand2,
    Loader2,
    CheckCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isValidUrl } from "@/lib/utils";
import { generateSlug, sanitizeSlug } from "@/utils/slugify";

export default function CreateLinkForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showUtm, setShowUtm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        destination_url: "",
        slug: "",
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
    });

    function update(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        // Validate URL
        if (!isValidUrl(form.destination_url)) {
            setError("Please enter a valid URL (must start with http:// or https://).");
            return;
        }

        const slug = form.slug ? sanitizeSlug(form.slug) : generateSlug();

        setLoading(true);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setError("You must be logged in.");
            setLoading(false);
            return;
        }

        // Build final destination URL with UTM params
        let destinationUrl = form.destination_url;
        if (form.utm_source || form.utm_medium || form.utm_campaign) {
            try {
                const url = new URL(destinationUrl);
                if (form.utm_source) url.searchParams.set("utm_source", form.utm_source);
                if (form.utm_medium) url.searchParams.set("utm_medium", form.utm_medium);
                if (form.utm_campaign) url.searchParams.set("utm_campaign", form.utm_campaign);
                destinationUrl = url.toString();
            } catch {
                // If URL parsing fails, use as-is
            }
        }

        const { error: insertError } = await supabase.from("links").insert({
            user_id: user.id,
            slug,
            name: form.name,
            destination_url: destinationUrl,
            utm_source: form.utm_source || null,
            utm_medium: form.utm_medium || null,
            utm_campaign: form.utm_campaign || null,
        });

        if (insertError) {
            if (insertError.code === "23505") {
                setError("That slug is already taken. Please choose a different one.");
            } else {
                setError(insertError.message);
            }
            setLoading(false);
            return;
        }

        setSuccess(true);
        setTimeout(() => {
            router.push("/dashboard/links");
            router.refresh();
        }, 1500);
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Link created!</h3>
                <p className="text-gray-400 text-sm">Redirecting to your links…</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {/* Link Name */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Link Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        id="link-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="e.g. YouTube Video - Product Review"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Display name in your dashboard
                </p>
            </div>

            {/* Destination URL */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Destination URL <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        id="destination-url"
                        type="url"
                        required
                        value={form.destination_url}
                        onChange={(e) => update("destination_url", e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
                    />
                </div>
            </div>

            {/* Custom Slug */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Custom Slug{" "}
                    <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <div className="flex items-center gap-0">
                    <span className="px-3 py-3 bg-gray-800 border border-r-0 border-gray-700 rounded-l-xl text-gray-400 text-sm whitespace-nowrap">
                        /r/
                    </span>
                    <div className="relative flex-1">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            id="custom-slug"
                            type="text"
                            value={form.slug}
                            onChange={(e) => update("slug", e.target.value)}
                            placeholder="my-cool-link"
                            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-r-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Wand2 className="w-3 h-3" />
                    Leave blank to auto-generate a random slug
                </p>
            </div>

            {/* UTM Parameters */}
            <div>
                <button
                    type="button"
                    id="utm-toggle"
                    onClick={() => setShowUtm(!showUtm)}
                    className="flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                >
                    {showUtm ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                    UTM Parameters (Campaign Tracking)
                </button>

                {showUtm && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-900/60 rounded-xl border border-gray-800 animate-fade-in">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">
                                UTM Source
                            </label>
                            <input
                                id="utm-source"
                                type="text"
                                value={form.utm_source}
                                onChange={(e) => update("utm_source", e.target.value)}
                                placeholder="instagram"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">
                                UTM Medium
                            </label>
                            <input
                                id="utm-medium"
                                type="text"
                                value={form.utm_medium}
                                onChange={(e) => update("utm_medium", e.target.value)}
                                placeholder="social"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">
                                UTM Campaign
                            </label>
                            <input
                                id="utm-campaign"
                                type="text"
                                value={form.utm_campaign}
                                onChange={(e) => update("utm_campaign", e.target.value)}
                                placeholder="spring-sale"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Submit */}
            <button
                id="create-link-submit"
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-60 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</>
                ) : (
                    <><Link2 className="w-4 h-4" /> Create Tracking Link</>
                )}
            </button>
        </form>
    );
}
