import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardHeader from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import SimpleBarChart from "@/components/analytics/BarChart";
import RecentClicks from "@/components/analytics/RecentClicks";
import { getPlatformFromReferrer } from "@/lib/utils";
import {
    MousePointerClick,
    Smartphone,
    Globe,
    Monitor,
    ArrowLeft,
    Link2,
    ExternalLink,
    Copy,
} from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import CopyButton from "@/components/links/CopyButton";

export default async function LinkAnalyticsPage({
    params,
}: {
    params: Promise<{ linkId: string }>;
}) {
    const { linkId } = await params;
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Fetch the link
    const { data: link } = await supabase
        .from("links")
        .select("*")
        .eq("id", linkId)
        .eq("user_id", user!.id)
        .single();

    if (!link) notFound();

    // Fetch all clicks for this link
    const { data: clicks } = await supabase
        .from("clicks")
        .select("*")
        .eq("link_id", linkId)
        .order("timestamp", { ascending: false });

    const allClicks = clicks ?? [];
    const totalClicks = allClicks.length;

    // Platform breakdown
    const platformMap: Record<string, number> = {};
    allClicks.forEach((c) => {
        const platform = getPlatformFromReferrer(c.referrer);
        platformMap[platform] = (platformMap[platform] || 0) + 1;
    });
    const platformData = Object.entries(platformMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    // Device breakdown
    const deviceMap: Record<string, number> = {};
    allClicks.forEach((c) => {
        const device = c.device || "Unknown";
        deviceMap[device] = (deviceMap[device] || 0) + 1;
    });
    const deviceData = Object.entries(deviceMap).map(([name, count]) => ({
        name,
        count,
    }));

    // Country breakdown
    const countryMap: Record<string, number> = {};
    allClicks.forEach((c) => {
        const country = c.country || "Unknown";
        countryMap[country] = (countryMap[country] || 0) + 1;
    });
    const countryData = Object.entries(countryMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    const desktopClicks =
        allClicks.filter((c) => c.device === "Desktop").length;
    const mobileClicks = allClicks.filter((c) => c.device === "Mobile").length;
    const uniqueCountries = new Set(
        allClicks.map((c) => c.country).filter(Boolean)
    ).size;

    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const shortUrl = `${protocol}://${host}/r/${link.slug}`;

    return (
        <div>
            <DashboardHeader title="Analytics" />
            <div className="p-6 space-y-6 animate-fade-in">
                {/* Back + Link info */}
                <div>
                    <Link
                        href="/dashboard/links"
                        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Links
                    </Link>

                    <div className="glass-card rounded-2xl p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-lg font-bold text-white">{link.name}</h2>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-violet-400 font-mono">{shortUrl}</span>
                                    <CopyButton text={shortUrl} />
                                </div>
                                <p className="text-xs text-gray-500 mt-1 truncate">
                                    → {link.destination_url}
                                </p>
                            </div>
                            <a
                                href={link.destination_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 bg-gray-700/60 hover:bg-gray-700 text-gray-200 rounded-xl text-sm font-medium transition-all flex-shrink-0"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Open Destination
                            </a>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Total Clicks"
                        value={totalClicks}
                        icon={MousePointerClick}
                        color="violet"
                    />
                    <StatsCard
                        title="Desktop Clicks"
                        value={desktopClicks}
                        icon={Monitor}
                        color="blue"
                        subtitle={
                            totalClicks > 0
                                ? `${Math.round((desktopClicks / totalClicks) * 100)}% of total`
                                : "—"
                        }
                    />
                    <StatsCard
                        title="Mobile Clicks"
                        value={mobileClicks}
                        icon={Smartphone}
                        color="emerald"
                        subtitle={
                            totalClicks > 0
                                ? `${Math.round((mobileClicks / totalClicks) * 100)}% of total`
                                : "—"
                        }
                    />
                    <StatsCard
                        title="Countries"
                        value={uniqueCountries}
                        icon={Globe}
                        color="amber"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Platform */}
                    <div className="glass-card rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-white mb-4">
                            Traffic by Platform
                        </h3>
                        <SimpleBarChart data={platformData} color="#8b5cf6" />
                    </div>

                    {/* Device */}
                    <div className="glass-card rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-white mb-4">
                            Device Breakdown
                        </h3>
                        <SimpleBarChart data={deviceData} color="#60a5fa" />
                    </div>

                    {/* Country */}
                    <div className="glass-card rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-white mb-4">
                            Top Countries
                        </h3>
                        <SimpleBarChart data={countryData} color="#34d399" />
                    </div>
                </div>

                {/* Platform Table */}
                {platformData.length > 0 && (
                    <div className="glass-card rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-white mb-4">
                            Platform Breakdown Details
                        </h3>
                        <div className="space-y-3">
                            {platformData.map((p) => {
                                const pct =
                                    totalClicks > 0
                                        ? Math.round((p.count / totalClicks) * 100)
                                        : 0;
                                return (
                                    <div key={p.name} className="flex items-center gap-3">
                                        <div className="w-24 text-sm text-gray-300 font-medium truncate">
                                            {p.name}
                                        </div>
                                        <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <div className="w-20 text-right text-sm text-gray-400">
                                            {p.count} ({pct}%)
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Recent Clicks Table */}
                <div className="glass-card rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-4">
                        Recent Clicks ({Math.min(allClicks.length, 50)} of {totalClicks})
                    </h3>
                    <RecentClicks clicks={allClicks.slice(0, 50)} />
                </div>
            </div>
        </div>
    );
}
