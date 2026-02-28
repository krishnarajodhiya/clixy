import { Click } from "@/types";
import { getPlatformFromReferrer } from "@/lib/utils";
import { Monitor, Smartphone, Globe } from "lucide-react";
import LocalTime from "./LocalTime";

export default function RecentClicks({ clicks }: { clicks: Click[] }) {
    if (!clicks || clicks.length === 0) {
        return (
            <div className="flex items-center justify-center p-12 text-[#a3a3a3] text-sm font-bold uppercase tracking-widest border border-solid border-[#262626] m-4 rounded-xl">
                No clicks yet
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-solid border-[#2b2b2b] bg-[#1c1c1c]">
                        {["Time", "Platform", "Device", "Country"].map((h) => (
                            <th key={h} className="text-left py-3 px-4 text-xs font-medium text-[#e5e5e5] uppercase tracking-widest">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {clicks.map((click) => (
                        <tr key={click.id} className="border-b border-solid border-[#262626] hover:bg-[#1c1c1c] transition-colors cursor-default">
                            <td className="py-3 px-4 text-xs font-bold text-[#a3a3a3] whitespace-nowrap">
                                <LocalTime timestamp={click.timestamp} />
                            </td>
                            <td className="py-3 px-4 text-xs text-[#e5e5e5] font-medium uppercase tracking-widest">
                                {getPlatformFromReferrer(click.referrer, click.user_agent)}
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a3a3a3]">
                                    {click.device === "Mobile"
                                        ? <Smartphone className="w-4 h-4 text-[#ffffff]" />
                                        : <Monitor className="w-4 h-4 text-[#e5e5e5]" />}
                                    {click.device || "Unknown"}
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a3a3a3]">
                                    <Globe className="w-4 h-4 text-[#737373]" />
                                    {click.country || "Unknown"}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
