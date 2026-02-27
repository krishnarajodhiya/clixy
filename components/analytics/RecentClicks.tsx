import { Click } from "@/types";
import { formatDateTime, getPlatformFromReferrer } from "@/lib/utils";
import { Monitor, Smartphone, Globe } from "lucide-react";

interface RecentClicksProps {
    clicks: Click[];
}

export default function RecentClicks({ clicks }: RecentClicksProps) {
    if (!clicks || clicks.length === 0) {
        return (
            <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
                No clicks recorded yet
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-800">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Time
                        </th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Platform
                        </th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Device
                        </th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Country
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {clicks.map((click) => (
                        <tr
                            key={click.id}
                            className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                        >
                            <td className="py-2.5 px-3 text-gray-300 whitespace-nowrap">
                                {formatDateTime(click.timestamp)}
                            </td>
                            <td className="py-2.5 px-3">
                                <span className="text-gray-200">
                                    {getPlatformFromReferrer(click.referrer)}
                                </span>
                            </td>
                            <td className="py-2.5 px-3">
                                <div className="flex items-center gap-1.5 text-gray-300">
                                    {click.device === "Mobile" ? (
                                        <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                                    ) : (
                                        <Monitor className="w-3.5 h-3.5 text-violet-400" />
                                    )}
                                    {click.device || "Unknown"}
                                </div>
                            </td>
                            <td className="py-2.5 px-3">
                                <div className="flex items-center gap-1.5 text-gray-300">
                                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
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
