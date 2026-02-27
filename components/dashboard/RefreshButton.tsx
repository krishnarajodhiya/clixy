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
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0d0d0c] border-2 border-dashed border-[#f4f2e9] hover:border-solid hover:shadow-[3px_3px_0_#ff6b4a] hover:-translate-y-0.5 text-[#f4f2e9] rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
        >
            <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin text-[#52ff7a]" : "text-[#737373]"}`} />
            <span className="hidden sm:inline">Refresh</span>
        </button>
    );
}
