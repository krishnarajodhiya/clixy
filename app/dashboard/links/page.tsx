import { createClient } from "@/lib/supabase/server";
import DashboardHeader from "@/components/dashboard/Header";
import LinkCard from "@/components/links/LinkCard";
import Link from "next/link";
import { Plus, Link2 } from "lucide-react";
import { headers } from "next/headers";

export default async function LinksPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: links } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

    // Get click counts for each link
    const linkIds = links?.map((l) => l.id) ?? [];
    const { data: clicks } =
        linkIds.length > 0
            ? await supabase
                .from("clicks")
                .select("link_id")
                .in("link_id", linkIds)
            : { data: [] };

    const linksWithCounts = (links ?? []).map((link) => ({
        ...link,
        click_count: (clicks ?? []).filter((c) => c.link_id === link.id).length,
    }));

    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    return (
        <div>
            <DashboardHeader title="My Links" />
            <div className="p-6 animate-fade-in">
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-gray-400 text-sm">
                            {linksWithCounts.length} tracking link
                            {linksWithCounts.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <Link
                        href="/dashboard/links/create"
                        id="create-new-link-btn"
                        className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Plus className="w-4 h-4" /> New Link
                    </Link>
                </div>

                {linksWithCounts.length === 0 ? (
                    <div className="glass-card rounded-2xl flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center mb-4">
                            <Link2 className="w-7 h-7 text-violet-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            No links yet
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 max-w-sm">
                            Create your first tracking link to start capturing analytics from
                            your audience.
                        </p>
                        <Link
                            href="/dashboard/links/create"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all"
                        >
                            <Plus className="w-4 h-4" /> Create First Link
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {linksWithCounts.map((link) => (
                            <LinkCard key={link.id} link={link} baseUrl={baseUrl} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
