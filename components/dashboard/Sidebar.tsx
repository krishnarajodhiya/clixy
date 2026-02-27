"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Link2,
    Plus,
    LogOut,
    ChevronRight,
    BarChart3,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/links", icon: Link2, label: "My Links" },
    { href: "/dashboard/links/create", icon: Plus, label: "Create Link" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    }

    return (
        <aside className="fixed inset-y-0 left-0 z-20 w-60 flex flex-col bg-gray-900/80 backdrop-blur border-r border-gray-800/60">
            {/* Logo */}
            <div className="h-16 flex items-center px-5 border-b border-gray-800/60">
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <Link2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold gradient-text">LinkTrack</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <p className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    Navigation
                </p>
                {navItems.map((item) => {
                    const active =
                        item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                active
                                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                            )}
                        >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            {item.label}
                            {active && <ChevronRight className="w-3 h-3 ml-auto" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Analytics note */}
            <div className="px-4 pb-3">
                <div className="rounded-xl bg-violet-600/10 border border-violet-500/15 p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="w-4 h-4 text-violet-400" />
                        <span className="text-xs font-semibold text-violet-300">
                            Analytics
                        </span>
                    </div>
                    <p className="text-xs text-gray-400">
                        Click any link to view detailed analytics.
                    </p>
                </div>
            </div>

            {/* Logout */}
            <div className="p-3 border-t border-gray-800/60">
                <button
                    id="sidebar-logout"
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
