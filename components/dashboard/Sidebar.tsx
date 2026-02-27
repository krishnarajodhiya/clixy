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
        <>
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-20 w-56 hidden md:flex flex-col bg-[#0d0d0c] border-r-2 border-dashed border-[#f4f2e9]">
                {/* Logo */}
                <div className="h-14 flex items-center px-5 border-b-2 border-dashed border-[#f4f2e9]">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-[#f4f2e9] text-[#0d0d0c] rounded uppercase font-black tracking-tight transform -skew-y-2 border-2 border-dashed border-[#0d0d0c] shadow-[2px_2px_0_#ff6b4a] text-sm">
                            CLIXY™
                        </div>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
                    <p className="px-2 py-2 text-[10px] font-black text-[#a3a3a3] uppercase tracking-widest">
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
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all border-2",
                                    active
                                        ? "bg-[#ff6b4a] text-[#0d0d0c] border-[#f4f2e9] shadow-[3px_3px_0_#f4f2e9] translate-x-1"
                                        : "bg-transparent text-[#a3a3a3] border-transparent hover:text-[#f4f2e9] hover:bg-[#1a1a19] hover:border-[#333]"
                                )}
                            >
                                <item.icon className={cn("w-4 h-4", active ? "text-[#0d0d0c]" : "text-[#a3a3a3]")} />
                                {item.label}
                                {active && <ChevronRight className="w-4 h-4 ml-auto text-[#0d0d0c]" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t-2 border-dashed border-[#f4f2e9]">
                    <button
                        id="sidebar-logout"
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide text-[#a3a3a3] hover:text-[#0d0d0c] hover:bg-[#ff4a4a] border-2 border-transparent hover:border-[#f4f2e9] hover:shadow-[3px_3px_0_#f4f2e9] transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0d0d0c] border-t-2 border-dashed border-[#f4f2e9] flex md:hidden items-center justify-around h-16 px-2 pb-safe">
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
                                "flex flex-col items-center justify-center p-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex-1",
                                active ? "text-[#ff6b4a]" : "text-[#a3a3a3] hover:text-[#f4f2e9]"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 mb-1", active ? "text-[#ff6b4a]" : "text-[#737373]")} />
                            <span className="truncate">{item.label}</span>
                        </Link>
                    );
                })}
                <button
                    onClick={handleLogout}
                    className="flex flex-col items-center justify-center p-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#a3a3a3] hover:text-[#ff4a4a] transition-colors flex-1"
                >
                    <LogOut className="w-5 h-5 mb-1 text-[#737373]" />
                    <span>Sign out</span>
                </button>
            </nav>
        </>
    );
}
