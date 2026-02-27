import { createClient } from "@/lib/supabase/server";
import DashboardHeader from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import Link from "next/link";
import {
    Link2,
    MousePointerClick,
    Globe,
    Smartphone,
    Plus,
    ArrowRight,
} from "lucide-react";

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Fetch all links for user
    const { data: links } = await supabase
        .from("links")
        .select("id, name, slug, destination_url, created_at")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

    // Fetch total clicks for each link
    const linkIds = links?.map((l) => l.id) ?? [];

    const { data: clicks } = linkIds.length
        ? await supabase
            .from("clicks")
            .select("id, link_id, device, country")
            .in("link_id", linkIds)
        : { data: [] };

    const totalLinks = links?.length ?? 0;
    const totalClicks = clicks?.length ?? 0;
    const mobileClicks = clicks?.filter((c) => c.device === "Mobile").length ?? 0;
    const countries = new Set(clicks?.map((c) => c.country).filter(Boolean));
    const uniqueCountries = countries.size;

    // Recent links with click counts
    const linksWithCounts = (links ?? []).slice(0, 5).map((link) => ({
        ...link,
        click_count: clicks?.filter((c) => c.link_id === link.id).length ?? 0,
    }));

    return (
        <div>
            <DashboardHeader title="Overview" />
            <div className="p-6 space-y-8 animate-fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Total Links"
                        value={totalLinks}
                        icon={Link2}
                        color="violet"
                        subtitle="Tracking links created"
                    />
                    <StatsCard
                        title="Total Clicks"
                        value={totalClicks}
                        icon={MousePointerClick}
                        color="blue"
                        subtitle="Across all links"
                    />
                    <StatsCard
                        title="Mobile Clicks"
                        value={mobileClicks}
                        icon={Smartphone}
                        color="emerald"
                        subtitle={
                            totalClicks > 0
                                ? `${Math.round((mobileClicks / totalClicks) * 100)}% of total`
                                : "No data yet"
                        }
                    />
                    <StatsCard
                        title="Countries"
                        value={uniqueCountries}
                        icon={Globe}
                        color="amber"
                        subtitle="Unique countries"
                    />
                </div>

                {/* Recent Links */}
                <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-semibold text-white">Recent Links</h2>
                        <Link
                            href="/dashboard/links"
                            className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {linksWithCounts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center mb-3">
                                <Link2 className="w-6 h-6 text-violet-400" />
                            </div>
                            <p className="text-gray-400 mb-4">No links yet. Create your first!</p>
                            <Link
                                href="/dashboard/links/create"
                                className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-all"
                            >
                                <Plus className="w-4 h-4" /> Create Link
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {linksWithCounts.map((link) => (
                                <div
                                    key={link.id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 transition-colors"
                                >
                                    <div className="flex-1 min-w-0 mr-4">
                                        <p className="font-medium text-white truncate">{link.name}</p>
                                        <p className="text-xs text-gray-500 font-mono truncate">
                                            /r/{link.slug}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-violet-300">
                                                {link.click_count}
                                            </p>
                                            <p className="text-xs text-gray-500">clicks</p>
                                        </div>
                                        <Link
                                            href={`/dashboard/links/${link.id}`}
                                            className="p-2 rounded-lg hover:bg-violet-600/20 text-gray-400 hover:text-violet-300 transition-all"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/dashboard/links/create"
                        className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-violet-500/30 transition-all hover:-translate-y-0.5 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Plus className="w-5 h-5 text-violet-300" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">Create New Link</p>
                            <p className="text-xs text-gray-400">Set up tracking in seconds</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-500 ml-auto group-hover:text-violet-300 transition-colors" />
                    </Link>

                    <Link
                        href="/dashboard/links"
                        className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-blue-500/30 transition-all hover:-translate-y-0.5 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Link2 className="w-5 h-5 text-blue-300" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">Manage Links</p>
                            <p className="text-xs text-gray-400">View and edit all your links</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-500 ml-auto group-hover:text-blue-300 transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
