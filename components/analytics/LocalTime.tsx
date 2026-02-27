"use client";

import { useState, useEffect } from "react";
import { formatDateTime } from "@/lib/utils";

export default function LocalTime({ timestamp }: { timestamp: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <span className="opacity-0">Loading...</span>;
    }

    return <span>{formatDateTime(timestamp)}</span>;
}
