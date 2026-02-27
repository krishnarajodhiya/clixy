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
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-[#a3a3a3] font-bold uppercase tracking-widest text-xs">
                            {linksWithCounts.length} tracking link{linksWithCounts.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <Link
                        href="/dashboard/links/create"
                        id="create-new-link-btn"
                        className="btn-primary flex items-center gap-2 px-5 py-3 text-xs w-auto shadow-[4px_4px_0_#f4f2e9] hover:shadow-[6px_6px_0_#f4f2e9]"
                    >
                        <Plus className="w-4 h-4" /> New Link
                    </Link>
                </div>

                {linksWithCounts.length === 0 ? (
                    <div className="card rounded-xl border-2 border-dashed border-[#f4f2e9] bg-[#0d0d0c] flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 rounded-xl bg-[#0d0d0c] border-2 border-[#f4f2e9] shadow-[4px_4px_0_#ff6b4a] flex items-center justify-center mb-6">
                            <Link2 className="w-8 h-8 text-[#52ff7a]" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-widest text-[#f4f2e9] mb-2">
                            No links yet
                        </h3>
                        <p className="text-[#a3a3a3] font-semibold uppercase tracking-wider text-xs mb-8 max-w-md mx-auto leading-relaxed">
                            Create your first tracking link to start capturing analytics from your audience.
                        </p>
                        <Link
                            href="/dashboard/links/create"
                            className="btn-primary flex items-center gap-2 px-6 py-3 text-xs w-auto shadow-[4px_4px_0_#f4f2e9] hover:shadow-[6px_6px_0_#f4f2e9]"
                        >
                            <Plus className="w-4 h-4" /> Create First Link
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {linksWithCounts.map((link) => (
                            <LinkCard key={link.id} link={link} baseUrl={baseUrl} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
