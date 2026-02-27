"use client";

import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <button
            id="analytics-copy-btn"
            onClick={handleCopy}
            className="p-1.5 rounded-lg border-2 border-dashed border-transparent hover:border-[#ff6b4a] bg-[#1a1a19] hover:bg-[#262626] text-[#a3a3a3] hover:text-[#ff6b4a] transition-all"
            title="Copy link"
        >
            {copied ? (
                <CheckCheck className="w-4 h-4 text-[#52ff7a]" />
            ) : (
                <Copy className="w-4 h-4" />
            )}
        </button>
    );
}
