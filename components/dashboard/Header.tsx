import { createClient } from "@/lib/supabase/server";

export default async function DashboardHeader({ title, children }: { title: string, children?: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const initials = user?.email?.slice(0, 2).toUpperCase() ?? "LT";

    return (
        <header className="h-14 flex items-center justify-between px-6 border-b border-solid border-[#2b2b2b] bg-[#111111] sticky top-0 z-10">
            <h1 className="text-sm font-medium uppercase tracking-wider text-[#e5e5e5] truncate mr-4">{title}</h1>
            <div className="flex items-center gap-3 flex-shrink-0">
                {children}
                <div className="w-8 h-8 rounded-full bg-[#ffffff] border border-[#2b2b2b] flex items-center justify-center text-[#111111] text-xs font-medium shadow-md">
                    {initials}
                </div>
            </div>
        </header>
    );
}
