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
            className="p-1.5 rounded-lg border border-solid border-transparent hover:border-[#ffffff] bg-[#1c1c1c] hover:bg-[#262626] text-[#a3a3a3] hover:text-[#ffffff] transition-all"
            title="Copy link"
        >
            {copied ? (
                <CheckCheck className="w-4 h-4 text-[#e5e5e5]" />
            ) : (
                <Copy className="w-4 h-4" />
            )}
        </button>
    );
}
