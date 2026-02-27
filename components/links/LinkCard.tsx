"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, BarChart3, Copy, CheckCheck, Trash2, Calendar, MousePointerClick } from "lucide-react";
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
        if (!confirm(`Delete "${link.name}"?`)) return;
        setDeleting(true);
        const supabase = createClient();
        await supabase.from("clicks").delete().eq("link_id", link.id);
        await supabase.from("links").delete().eq("id", link.id);
        router.refresh();
    }

    return (
        <div className="card card-hover rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-semibold text-gray-900 truncate">{link.name}</p>
                    <p className="text-xs font-mono text-blue-600 truncate mt-0.5">/r/{link.slug}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                        id={`copy-${link.id}`}
                        onClick={copyToClipboard}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        {copied ? <CheckCheck className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                        href={link.destination_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                        id={`delete-${link.id}`}
                        onClick={deleteLink}
                        disabled={deleting}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <p className="text-xs text-gray-400 truncate mb-4">→ {link.destination_url}</p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs">
                        <MousePointerClick className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-semibold text-gray-900">{link.click_count ?? 0}</span>
                        <span className="text-gray-400">clicks</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(link.created_at)}
                    </div>
                </div>
                <Link
                    href={`/dashboard/links/${link.id}`}
                    className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Analytics
                </Link>
            </div>
        </div>
    );
}
