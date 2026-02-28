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
                <div className="card rounded-xl border border-solid border-[#2b2b2b] bg-[#111111]">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-solid border-[#2b2b2b]">
                        <p className="text-sm font-medium uppercase tracking-widest text-[#e5e5e5]">Recent links</p>
                        <Link href="/dashboard/links" className="text-xs text-[#ffffff] hover:text-[#e5e5e5] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors">
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {recentLinks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                            <div className="w-12 h-12 rounded-xl bg-[#e5e5e5] border border-[#2b2b2b] shadow-md flex items-center justify-center mb-4">
                                <Link2 className="w-6 h-6 text-[#111111]" />
                            </div>
                            <p className="text-sm font-medium uppercase tracking-widest text-[#e5e5e5] mb-1">No links yet</p>
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3] mb-6">Create your first tracking link to start</p>
                            <Link href="/dashboard/links/create"
                                className="btn-primary flex items-center gap-1.5 px-6 py-3 text-xs w-auto shadow-md hover:shadow-md">
                                <Plus className="w-4 h-4" /> Create link
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-dashed divide-[#2b2b2b]">
                            {recentLinks.map((link) => (
                                <div key={link.id} className="flex items-center justify-between px-5 py-4 hover:bg-[#1c1c1c] transition-colors">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <p className="text-sm font-bold text-[#e5e5e5] truncate">{link.name}</p>
                                        <p className="text-xs font-mono font-semibold text-[#a3a3a3] truncate mt-1">/r/{link.slug}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-[#e5e5e5]">{link.click_count}</p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#737373]">clicks</p>
                                        </div>
                                        <Link href={`/dashboard/links/${link.id}`}
                                            className="p-2 rounded-lg hover:bg-[#262626] text-[#a3a3a3] hover:text-[#ffffff] border border-transparent hover:border-[#ffffff] transition-all">
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
                            className="card card-hover rounded-xl p-5 flex items-center gap-4 group border border-solid border-[#2b2b2b] bg-[#111111]">
                            <div className="w-10 h-10 rounded-xl bg-[#e5e5e5] border border-[#2b2b2b] shadow-md group-hover:shadow-md transition-shadow flex items-center justify-center flex-shrink-0">
                                <a.icon className="w-5 h-5 text-[#111111]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium uppercase tracking-widest text-[#e5e5e5]">{a.title}</p>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3] mt-1">{a.sub}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#737373] group-hover:text-[#ffffff] transition-colors" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
