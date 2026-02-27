import { Click } from "@/types";
import { formatDateTime, getPlatformFromReferrer } from "@/lib/utils";
import { Monitor, Smartphone, Globe } from "lucide-react";

export default function RecentClicks({ clicks }: { clicks: Click[] }) {
    if (!clicks || clicks.length === 0) {
        return (
            <div className="flex items-center justify-center h-28 text-gray-400 text-sm">
                No clicks yet
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        {["Time", "Platform", "Device", "Country"].map((h) => (
                            <th key={h} className="text-left py-2 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {clicks.map((click) => (
                        <tr key={click.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-2.5 px-3 text-xs text-gray-500 whitespace-nowrap">
                                {formatDateTime(click.timestamp)}
                            </td>
                            <td className="py-2.5 px-3 text-xs text-gray-700 font-medium">
                                {getPlatformFromReferrer(click.referrer, click.user_agent)}
                            </td>
                            <td className="py-2.5 px-3">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    {click.device === "Mobile"
                                        ? <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                                        : <Monitor className="w-3.5 h-3.5 text-gray-400" />}
                                    {click.device || "Unknown"}
                                </div>
                            </td>
                            <td className="py-2.5 px-3">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <Globe className="w-3.5 h-3.5 text-gray-400" />
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
