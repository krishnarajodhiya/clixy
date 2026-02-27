import { createClient } from "@/lib/supabase/server";
import DashboardHeader from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import Link from "next/link";
import { Link2, MousePointerClick, Globe, Smartphone, Plus, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: links } = await supabase
        .from("links").select("id, name, slug, destination_url, created_at")
        .eq("user_id", user!.id).order("created_at", { ascending: false });

    const linkIds = links?.map((l) => l.id) ?? [];
    const { data: clicks } = linkIds.length
        ? await supabase.from("clicks").select("id, link_id, device, country").in("link_id", linkIds)
        : { data: [] };

    const totalLinks = links?.length ?? 0;
    const totalClicks = clicks?.length ?? 0;
    const mobileClicks = clicks?.filter((c) => c.device === "Mobile").length ?? 0;
    const uniqueCountries = new Set(clicks?.map((c) => c.country).filter(Boolean)).size;

    const recentLinks = (links ?? []).slice(0, 5).map((link) => ({
        ...link,
        click_count: clicks?.filter((c) => c.link_id === link.id).length ?? 0,
    }));

    return (
        <div>
            <DashboardHeader title="Overview" />
            <div className="p-6 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard title="Total Links" value={totalLinks} icon={Link2} subtitle="Created" />
                    <StatsCard title="Total Clicks" value={totalClicks} icon={MousePointerClick} subtitle="All links" />
                    <StatsCard title="Mobile" value={mobileClicks} icon={Smartphone}
                        subtitle={totalClicks > 0 ? `${Math.round((mobileClicks / totalClicks) * 100)}%` : "—"} />
                    <StatsCard title="Countries" value={uniqueCountries} icon={Globe} subtitle="Unique" />
                </div>

                {/* Recent Links */}
                <div className="card rounded-xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">Recent links</p>
                        <Link href="/dashboard/links" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                            View all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {recentLinks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-14 text-center px-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                                <Link2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-1">No links yet</p>
                            <p className="text-xs text-gray-400 mb-4">Create your first tracking link to start</p>
                            <Link href="/dashboard/links/create"
                                className="btn-primary flex items-center gap-1.5 px-4 py-2 text-xs">
                                <Plus className="w-3.5 h-3.5" /> Create link
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {recentLinks.map((link) => (
                                <div key={link.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <p className="text-sm font-medium text-gray-900 truncate">{link.name}</p>
                                        <p className="text-xs font-mono text-gray-400 truncate">/r/{link.slug}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-blue-600">{link.click_count}</p>
                                            <p className="text-[10px] text-gray-400">clicks</p>
                                        </div>
                                        <Link href={`/dashboard/links/${link.id}`}
                                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { href: "/dashboard/links/create", icon: Plus, title: "Create new link", sub: "Set up tracking in seconds" },
                        { href: "/dashboard/links", icon: Link2, title: "Manage links", sub: "View and edit all your links" },
                    ].map((a) => (
                        <Link key={a.href} href={a.href}
                            className="card card-hover rounded-xl p-4 flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <a.icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                                <p className="text-xs text-gray-400">{a.sub}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
