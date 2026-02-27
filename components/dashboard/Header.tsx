import { createClient } from "@/lib/supabase/server";
import { Bell, Search } from "lucide-react";

export default async function DashboardHeader({ title }: { title: string }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const initials = user?.email?.slice(0, 2).toUpperCase() ?? "LT";

    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800/60 bg-gray-900/60 backdrop-blur sticky top-0 z-10">
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-violet-500/20">
                    {initials}
                </div>
            </div>
        </header>
    );
}
