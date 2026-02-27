import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardHeader from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import SimpleBarChart from "@/components/analytics/BarChart";
import RecentClicks from "@/components/analytics/RecentClicks";
import CopyButton from "@/components/links/CopyButton";
import RefreshButton from "@/components/dashboard/RefreshButton";
import { getPlatformFromReferrer } from "@/lib/utils";
import { MousePointerClick, Smartphone, Globe, Monitor, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

export default async function LinkAnalyticsPage({ params }: { params: Promise<{ linkId: string }> }) {
    const { linkId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: link } = await supabase.from("links").select("*")
        .eq("id", linkId).eq("user_id", user!.id).single();
    if (!link) notFound();

    const { data: clicks } = await supabase.from("clicks").select("*")
        .eq("link_id", linkId).order("timestamp", { ascending: false });

    const allClicks = clicks ?? [];
    const totalClicks = allClicks.length;

    const platformMap: Record<string, number> = {};
    allClicks.forEach((c) => { const p = getPlatformFromReferrer(c.referrer, c.user_agent); platformMap[p] = (platformMap[p] || 0) + 1; });
    const platformData = Object.entries(platformMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

    const deviceMap: Record<string, number> = {};
    allClicks.forEach((c) => { const d = c.device || "Unknown"; deviceMap[d] = (deviceMap[d] || 0) + 1; });
    const deviceData = Object.entries(deviceMap).map(([name, count]) => ({ name, count }));

    const countryMap: Record<string, number> = {};
    allClicks.forEach((c) => { const co = c.country || "Unknown"; countryMap[co] = (countryMap[co] || 0) + 1; });
    const countryData = Object.entries(countryMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);

    const desktopClicks = allClicks.filter((c) => c.device === "Desktop").length;
    const mobileClicks = allClicks.filter((c) => c.device === "Mobile").length;
    const uniqueCountries = new Set(allClicks.map((c) => c.country).filter(Boolean)).size;

    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const shortUrl = `${protocol}://${host}/r/${link.slug}`;

    return (
        <div>
            <DashboardHeader title="Analytics">
                <RefreshButton />
            </DashboardHeader>
            <div className="p-6 space-y-5">
                {/* Back + link info */}
                <div>
                    <Link href="/dashboard/links"
                        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to links
                    </Link>

                    <div className="card rounded-xl p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-base font-bold text-gray-900 mb-1">{link.name}</h2>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-mono text-blue-600">{shortUrl}</span>
                                    <CopyButton text={shortUrl} />
                                </div>
                                <p className="text-xs text-gray-400 mt-1 truncate">→ {link.destination_url}</p>
                            </div>
                            <a href={link.destination_url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors flex-shrink-0">
                                <ExternalLink className="w-4 h-4" /> Open destination
                            </a>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard title="Total Clicks" value={totalClicks} icon={MousePointerClick} />
                    <StatsCard title="Desktop" value={desktopClicks} icon={Monitor}
                        subtitle={totalClicks > 0 ? `${Math.round((desktopClicks / totalClicks) * 100)}%` : "—"} />
                    <StatsCard title="Mobile" value={mobileClicks} icon={Smartphone}
                        subtitle={totalClicks > 0 ? `${Math.round((mobileClicks / totalClicks) * 100)}%` : "—"} />
                    <StatsCard title="Countries" value={uniqueCountries} icon={Globe} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {[
                        { title: "By Platform", data: platformData },
                        { title: "By Device", data: deviceData },
                        { title: "By Country", data: countryData },
                    ].map((chart) => (
                        <div key={chart.title} className="card rounded-xl p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-4">{chart.title}</p>
                            <SimpleBarChart data={chart.data} />
                        </div>
                    ))}
                </div>

                {/* Platform breakdown bar */}
                {platformData.length > 0 && (
                    <div className="card rounded-xl p-5">
                        <p className="text-sm font-semibold text-gray-900 mb-4">Platform breakdown</p>
                        <div className="space-y-3">
                            {platformData.map((p) => {
                                const pct = totalClicks > 0 ? Math.round((p.count / totalClicks) * 100) : 0;
                                return (
                                    <div key={p.name} className="flex items-center gap-3">
                                        <div className="w-24 text-sm text-gray-700 font-medium truncate">{p.name}</div>
                                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${pct}%` }} />
                                        </div>
                                        <div className="w-16 text-right text-xs text-gray-500">{p.count} ({pct}%)</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Recent clicks */}
                <div className="card rounded-xl p-5">
                    <div className="flex items-center justify-between gap-4 mb-4">
                        <p className="text-sm font-semibold text-gray-900">
                            Recent clicks <span className="text-gray-400 font-normal">({Math.min(allClicks.length, 50)} of {totalClicks})</span>
                        </p>
                        <RefreshButton />
                    </div>
                    <RecentClicks clicks={allClicks.slice(0, 50)} />
                </div>
            </div>
        </div>
    );
}
