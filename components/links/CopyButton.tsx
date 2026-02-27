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
            className="p-1 rounded-md hover:bg-gray-700/60 text-gray-400 hover:text-white transition-all"
            title="Copy link"
        >
            {copied ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
                <Copy className="w-3.5 h-3.5" />
            )}
        </button>
    );
}
