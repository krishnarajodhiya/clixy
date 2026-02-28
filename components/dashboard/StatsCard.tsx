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
        <div className="card card-hover rounded-xl p-5 border border-solid border-border bg-bg">
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border shadow-md flex items-center justify-center">
                    <Icon className={cn("w-5 h-5", iconColor)} />
                </div>
            </div>
            <p className="text-3xl font-medium text-text-primary mb-1">{value}</p>
            <p className="text-sm font-bold uppercase tracking-widest text-text-secondary">{title}</p>
            {subtitle && <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mt-1">{subtitle}</p>}
        </div>
    );
}
