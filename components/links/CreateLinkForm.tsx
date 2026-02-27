"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Globe, Tag, Wand2, Loader2, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
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
        name: "", destination_url: "", slug: "",
        utm_source: "", utm_medium: "", utm_campaign: "",
    });

    function update(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!isValidUrl(form.destination_url)) {
            setError("Please enter a valid URL starting with http:// or https://");
            return;
        }

        const slug = form.slug ? sanitizeSlug(form.slug) : generateSlug();
        setLoading(true);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) { setError("You must be logged in."); setLoading(false); return; }

        let destinationUrl = form.destination_url;
        if (form.utm_source || form.utm_medium || form.utm_campaign) {
            try {
                const url = new URL(destinationUrl);
                if (form.utm_source) url.searchParams.set("utm_source", form.utm_source);
                if (form.utm_medium) url.searchParams.set("utm_medium", form.utm_medium);
                if (form.utm_campaign) url.searchParams.set("utm_campaign", form.utm_campaign);
                destinationUrl = url.toString();
            } catch { /* use as-is */ }
        }

        const { error: insertError } = await supabase.from("links").insert({
            user_id: user.id, slug, name: form.name, destination_url: destinationUrl,
            utm_source: form.utm_source || null, utm_medium: form.utm_medium || null,
            utm_campaign: form.utm_campaign || null,
        });

        if (insertError) {
            setError(insertError.code === "23505" ? "That slug is already taken. Choose a different one." : insertError.message);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setTimeout(() => { router.push("/dashboard/links"); router.refresh(); }, 1200);
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Link created!</p>
                <p className="text-xs text-gray-400 mt-1">Redirecting…</p>
            </div>
        );
    }

    const inputCls = "input-base w-full px-3 py-2.5 text-sm";

    return (
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Link name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input id="link-name" type="text" required value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="e.g. YouTube Product Review"
                        className="input-base w-full pl-9 pr-3 py-2.5 text-sm" />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Destination URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input id="destination-url" type="url" required value={form.destination_url}
                        onChange={(e) => update("destination_url", e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="input-base w-full pl-9 pr-3 py-2.5 text-sm" />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Custom slug <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="flex">
                    <span className="px-3 py-2.5 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-xs text-gray-500 whitespace-nowrap flex items-center">
                        /r/
                    </span>
                    <div className="relative flex-1">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input id="custom-slug" type="text" value={form.slug}
                            onChange={(e) => update("slug", e.target.value)}
                            placeholder="my-link"
                            className="input-base w-full pl-9 pr-3 py-2.5 text-sm rounded-l-none" />
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Wand2 className="w-3 h-3" /> Leave blank to auto-generate
                </p>
            </div>

            <div>
                <button type="button" id="utm-toggle" onClick={() => setShowUtm(!showUtm)}
                    className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    {showUtm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    UTM parameters
                </button>
                {showUtm && (
                    <div className="mt-3 grid grid-cols-3 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        {[
                            { key: "utm_source", label: "Source", placeholder: "instagram" },
                            { key: "utm_medium", label: "Medium", placeholder: "social" },
                            { key: "utm_campaign", label: "Campaign", placeholder: "spring-sale" },
                        ].map((f) => (
                            <div key={f.key}>
                                <label className="block text-[10px] font-medium text-gray-500 mb-1">{f.label}</label>
                                <input id={f.key} type="text" value={form[f.key as keyof typeof form]}
                                    onChange={(e) => update(f.key, e.target.value)}
                                    placeholder={f.placeholder}
                                    className="input-base w-full px-2.5 py-2 text-xs" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            <button id="create-link-submit" type="submit" disabled={loading}
                className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-60">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</> : <><Link2 className="w-4 h-4" /> Create link</>}
            </button>
        </form>
    );
}
