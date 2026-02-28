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
        <div className="card card-hover rounded-xl p-5 border border-solid border-[#2b2b2b] bg-[#111111] hover:bg-[#1c1c1c] transition-colors group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium text-[#e5e5e5] uppercase tracking-widest truncate">{link.name}</p>
                    <p className="text-xs font-mono font-bold text-[#a3a3a3] truncate mt-1">/r/{link.slug}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 cursor-default">
                    <button
                        id={`copy-${link.id}`}
                        onClick={copyToClipboard}
                        className="p-1.5 rounded-lg border border-transparent hover:border-[#ffffff] bg-[#1c1c1c] hover:bg-[#262626] text-[#737373] hover:text-[#ffffff] transition-all"
                    >
                        {copied ? <CheckCheck className="w-4 h-4 text-[#e5e5e5]" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                        href={link.destination_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-transparent hover:border-[#ffffff] bg-[#1c1c1c] hover:bg-[#262626] text-[#737373] hover:text-[#ffffff] transition-all"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                        id={`delete-${link.id}`}
                        onClick={deleteLink}
                        disabled={deleting}
                        className="p-1.5 rounded-lg border border-transparent hover:border-[#ef4444] bg-[#1c1c1c] hover:bg-[#262626] text-[#737373] hover:text-[#ef4444] transition-all disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-widest text-[#737373] truncate mb-5">→ {link.destination_url}</p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs">
                        <MousePointerClick className="w-4 h-4 text-[#e5e5e5]" />
                        <span className="font-medium text-[#e5e5e5] text-sm">{link.click_count ?? 0}</span>
                        <span className="font-bold uppercase tracking-widest text-[#a3a3a3] text-[10px]">clicks</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#737373]">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(link.created_at)}
                    </div>
                    <Link
                        href={`/dashboard/links/${link.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e5e5e5] text-[#111111] border border-[#111111] shadow-md hover:shadow-md text-[10px] font-medium uppercase tracking-widest rounded transition-all"
                    >
                        <BarChart3 className="w-3.5 h-3.5" />
                        Analytics
                    </Link>
                </div>
            </div>
        </div>
    );
}
