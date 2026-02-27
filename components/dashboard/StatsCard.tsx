import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<{ className?: string }>;
}

export default function StatsCard({ title, value, subtitle, icon: Icon }: StatsCardProps) {
    return (
        <div className="card card-hover rounded-xl p-5 border-2 border-dashed border-[#f4f2e9] bg-[#0d0d0c]">
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#f4f2e9] border-2 border-[#f4f2e9] shadow-[3px_3px_0_#ff6b4a] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0d0d0c]" />
                </div>
            </div>
            <p className="text-3xl font-black text-[#f4f2e9] mb-1">{value}</p>
            <p className="text-sm font-bold uppercase tracking-widest text-[#a3a3a3]">{title}</p>
            {subtitle && <p className="text-xs font-semibold uppercase tracking-wider text-[#737373] mt-1">{subtitle}</p>}
        </div>
    );
}
