"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function RefreshButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function handleRefresh() {
        startTransition(() => {
            router.refresh();
        });
    }

    return (
        <button
            onClick={handleRefresh}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] border border-solid border-[#2b2b2b] hover:border-solid hover:shadow-md hover:-translate-y-0.5 text-[#e5e5e5] rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
        >
            <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin text-[#e5e5e5]" : "text-[#737373]"}`} />
            <span className="hidden sm:inline">Refresh</span>
        </button>
    );
}
