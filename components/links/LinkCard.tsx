"use client";

import Link from "next/link";
import { useState } from "react";
import {
    ExternalLink,
    BarChart3,
    Copy,
    CheckCheck,
    Trash2,
    Calendar,
    MousePointerClick,
} from "lucide-react";
import { Link as LinkType } from "@/types";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface LinkCardProps {
    link: LinkType;
    baseUrl: string;
}

export default function LinkCard({ link, baseUrl }: LinkCardProps) {
    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();
    const shortUrl = `${baseUrl}/r/${link.slug}`;

    async function copyToClipboard() {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    async function deleteLink() {
        if (!confirm(`Delete "${link.name}"? This will remove all click data.`)) return;
        setDeleting(true);
        const supabase = createClient();
        await supabase.from("clicks").delete().eq("link_id", link.id);
        await supabase.from("links").delete().eq("id", link.id);
        router.refresh();
    }

    return (
        <div className="glass-card rounded-2xl p-5 hover:border-violet-500/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-3">
                    <h3 className="font-semibold text-white truncate">{link.name}</h3>
                    <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:text-violet-300 text-sm font-mono transition-colors truncate block"
                    >
                        {shortUrl}
                    </a>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                        id={`copy-${link.id}`}
                        onClick={copyToClipboard}
                        title="Copy link"
                        className="p-2 rounded-lg hover:bg-gray-700/60 text-gray-400 hover:text-white transition-all"
                    >
                        {copied ? (
                            <CheckCheck className="w-4 h-4 text-emerald-400" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                    <a
                        href={link.destination_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open destination"
                        className="p-2 rounded-lg hover:bg-gray-700/60 text-gray-400 hover:text-white transition-all"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                        id={`delete-${link.id}`}
                        onClick={deleteLink}
                        disabled={deleting}
                        title="Delete link"
                        className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Destination */}
            <p className="text-xs text-gray-500 truncate mb-4">
                → {link.destination_url}
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm">
                        <MousePointerClick className="w-4 h-4 text-violet-400" />
                        <span className="font-semibold text-white">
                            {link.click_count ?? 0}
                        </span>
                        <span className="text-gray-500">clicks</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(link.created_at)}
                    </div>
                </div>
                <Link
                    href={`/dashboard/links/${link.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/15 hover:bg-violet-600/25 text-violet-300 text-xs font-medium transition-all border border-violet-500/20"
                >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Analytics
                </Link>
            </div>
        </div>
    );
}
