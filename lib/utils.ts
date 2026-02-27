import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function isValidUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol);
    } catch {
        return false;
    }
}

export function getPlatformFromReferrer(referrer: string | null): string {
    if (!referrer) return "Direct";
    try {
        const url = new URL(referrer);
        const hostname = url.hostname.toLowerCase();
        if (hostname.includes("instagram")) return "Instagram";
        if (hostname.includes("youtube") || hostname.includes("youtu.be"))
            return "YouTube";
        if (hostname.includes("facebook") || hostname.includes("fb.com"))
            return "Facebook";
        if (hostname.includes("twitter") || hostname.includes("x.com"))
            return "Twitter";
        if (hostname.includes("tiktok")) return "TikTok";
        if (hostname.includes("linkedin")) return "LinkedIn";
        if (hostname.includes("pinterest")) return "Pinterest";
        if (hostname.includes("reddit")) return "Reddit";
        if (hostname.includes("snapchat")) return "Snapchat";
        return hostname.replace("www.", "");
    } catch {
        return "Unknown";
    }
}
