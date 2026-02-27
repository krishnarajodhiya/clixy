import { createClient } from "@/lib/supabase/server";

export default async function DashboardHeader({ title, children }: { title: string, children?: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const initials = user?.email?.slice(0, 2).toUpperCase() ?? "LT";

    return (
        <header className="h-14 flex items-center justify-between px-6 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h1 className="text-sm font-semibold text-gray-900 truncate mr-4">{title}</h1>
            <div className="flex items-center gap-3 flex-shrink-0">
                {children}
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                    {initials}
                </div>
            </div>
        </header>
    );
}
