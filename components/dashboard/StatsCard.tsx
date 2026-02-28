import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<{ className?: string }>;
}

export default function StatsCard({ title, value, subtitle, icon: Icon }: StatsCardProps) {
    return (
        <div className="card card-hover rounded-xl p-5 border border-solid border-[#2b2b2b] bg-[#111111]">
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#e5e5e5] border border-[#2b2b2b] shadow-md flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#111111]" />
                </div>
            </div>
            <p className="text-3xl font-medium text-[#e5e5e5] mb-1">{value}</p>
            <p className="text-sm font-bold uppercase tracking-widest text-[#a3a3a3]">{title}</p>
            {subtitle && <p className="text-xs font-semibold uppercase tracking-wider text-[#737373] mt-1">{subtitle}</p>}
        </div>
    );
}
