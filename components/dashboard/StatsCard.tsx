import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: "up" | "down" | "neutral";
    icon: React.ComponentType<{ className?: string }>;
    color?: "violet" | "blue" | "emerald" | "amber";
}

const colorMap = {
    violet: {
        bg: "bg-violet-600/20",
        border: "border-violet-500/20",
        icon: "text-violet-300",
        value: "text-violet-300",
    },
    blue: {
        bg: "bg-blue-600/20",
        border: "border-blue-500/20",
        icon: "text-blue-300",
        value: "text-blue-300",
    },
    emerald: {
        bg: "bg-emerald-600/20",
        border: "border-emerald-500/20",
        icon: "text-emerald-300",
        value: "text-emerald-300",
    },
    amber: {
        bg: "bg-amber-600/20",
        border: "border-amber-500/20",
        icon: "text-amber-300",
        value: "text-amber-300",
    },
};

export default function StatsCard({
    title,
    value,
    subtitle,
    trend,
    icon: Icon,
    color = "violet",
}: StatsCardProps) {
    const colors = colorMap[color];

    return (
        <div className="glass-card rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div
                    className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center border",
                        colors.bg,
                        colors.border
                    )}
                >
                    <Icon className={cn("w-5 h-5", colors.icon)} />
                </div>
                {trend && (
                    <div
                        className={cn(
                            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg",
                            trend === "up" && "bg-emerald-500/10 text-emerald-400",
                            trend === "down" && "bg-red-500/10 text-red-400",
                            trend === "neutral" && "bg-gray-500/10 text-gray-400"
                        )}
                    >
                        {trend === "up" && <TrendingUp className="w-3 h-3" />}
                        {trend === "down" && <TrendingDown className="w-3 h-3" />}
                        {trend === "neutral" && <Minus className="w-3 h-3" />}
                    </div>
                )}
            </div>
            <p className={cn("text-3xl font-bold mb-1", colors.value)}>{value}</p>
            <p className="text-sm font-medium text-gray-300">{title}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
    );
}
