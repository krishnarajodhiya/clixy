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
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#a3a3a3] hover:text-[#ffffff] hover:-translate-x-1 mb-4 transition-all">
                        <ArrowLeft className="w-4 h-4" /> Back to links
                    </Link>

                    <div className="card rounded-xl p-5 border border-solid border-[#2b2b2b] bg-[#111111]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-lg font-medium uppercase tracking-wider text-[#e5e5e5] mb-1">{link.name}</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-[#e5e5e5]">{shortUrl}</span>
                                    <CopyButton text={shortUrl} />
                                </div>
                                <p className="text-xs font-semibold tracking-wider text-[#a3a3a3] mt-2 truncate">→ {link.destination_url}</p>
                            </div>
                            <a href={link.destination_url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-[#2b2b2b] hover:shadow-md hover:-translate-y-0.5 text-[#e5e5e5] rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0">
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
                        <div key={chart.title} className="card rounded-xl p-5 border border-solid border-[#2b2b2b] bg-[#111111]">
                            <p className="text-sm font-medium uppercase tracking-widest text-[#a3a3a3] mb-4">{chart.title}</p>
                            <SimpleBarChart data={chart.data} />
                        </div>
                    ))}
                </div>

                {/* Platform breakdown bar */}
                {platformData.length > 0 && (
                    <div className="card rounded-xl p-5 border border-solid border-[#2b2b2b] bg-[#111111]">
                        <p className="text-sm font-medium uppercase tracking-widest text-[#a3a3a3] mb-5">Platform breakdown</p>
                        <div className="space-y-4">
                            {platformData.map((p) => {
                                const pct = totalClicks > 0 ? Math.round((p.count / totalClicks) * 100) : 0;
                                return (
                                    <div key={p.name} className="flex items-center gap-4">
                                        <div className="w-24 text-xs font-bold uppercase tracking-widest text-[#e5e5e5] truncate">{p.name}</div>
                                        <div className="flex-1 bg-[#1c1c1c] border border-[#1c1c1c] rounded-full h-3 overflow-hidden">
                                            <div className="h-full rounded-full bg-[#ffffff] shadow-md transition-all duration-500" style={{ width: `${pct}%` }} />
                                        </div>
                                        <div className="w-16 text-right text-xs font-bold text-[#a3a3a3]">{p.count} <span className="text-[#737373]">({pct}%)</span></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Recent clicks */}
                <div className="card rounded-xl border border-solid border-[#2b2b2b] bg-[#111111]">
                    <div className="flex items-center justify-between gap-4 p-5 border-b border-solid border-[#2b2b2b]">
                        <p className="text-sm font-medium uppercase tracking-widest text-[#e5e5e5]">
                            Recent clicks <span className="text-[#737373] ml-2">({Math.min(allClicks.length, 50)} of {totalClicks})</span>
                        </p>
                        <RefreshButton />
                    </div>
                    <div className="p-0">
                        <RecentClicks clicks={allClicks.slice(0, 50)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
