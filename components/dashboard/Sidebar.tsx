"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Link2,
    Plus,
    LogOut,
    ChevronRight,
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
        <aside className="fixed inset-y-0 left-0 z-20 w-56 flex flex-col bg-white border-r border-gray-100">
            {/* Logo */}
            <div className="h-14 flex items-center px-5 border-b border-gray-100">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
                        <Link2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Clixy</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
                <p className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    Menu
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
                                "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors",
                                active
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4", active ? "text-blue-600" : "text-gray-400")} />
                            {item.label}
                            {active && <ChevronRight className="w-3 h-3 ml-auto text-blue-400" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-gray-100">
                <button
                    id="sidebar-logout"
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign out
                </button>
            </div>
        </aside>
    );
}
