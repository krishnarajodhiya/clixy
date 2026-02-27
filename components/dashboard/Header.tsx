import { createClient } from "@/lib/supabase/server";

export default async function DashboardHeader({ title, children }: { title: string, children?: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const initials = user?.email?.slice(0, 2).toUpperCase() ?? "LT";

    return (
        <header className="h-14 flex items-center justify-between px-6 border-b-2 border-dashed border-[#f4f2e9] bg-[#0d0d0c] sticky top-0 z-10">
            <h1 className="text-sm font-black uppercase tracking-wider text-[#f4f2e9] truncate mr-4">{title}</h1>
            <div className="flex items-center gap-3 flex-shrink-0">
                {children}
                <div className="w-8 h-8 rounded-full bg-[#ff6b4a] border-2 border-[#f4f2e9] flex items-center justify-center text-[#0d0d0c] text-xs font-black shadow-[2px_2px_0_#f4f2e9]">
                    {initials}
                </div>
            </div>
        </header>
    );
}
