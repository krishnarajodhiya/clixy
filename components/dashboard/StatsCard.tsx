import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<{ className?: string }>;
}

export default function StatsCard({ title, value, subtitle, icon: Icon }: StatsCardProps) {
    return (
        <div className="card card-hover rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-600" />
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{value}</p>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
    );
}
