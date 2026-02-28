import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor?: string;
}

export default function StatsCard({ title, value, subtitle, icon: Icon, iconColor = "text-text-primary" }: StatsCardProps) {
    return (
        <div className="card rounded-2xl p-5 sm:p-6 border border-border bg-surface hover:border-text-muted hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-text-secondary">{title}</p>
                <div className="w-8 h-8 rounded-lg bg-bg border border-border shadow-sm flex items-center justify-center flex-shrink-0">
                    <Icon className={cn("w-4 h-4", iconColor)} />
                </div>
            </div>
            <div>
                <p className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-1">{value}</p>
                {subtitle && <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{subtitle}</p>}
            </div>
        </div>
    );
}
