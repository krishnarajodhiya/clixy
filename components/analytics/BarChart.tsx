"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface BarChartProps {
    data: { name: string; count: number }[];
    color?: string;
}

const COLORS = [
    "#8b5cf6",
    "#60a5fa",
    "#34d399",
    "#f59e0b",
    "#f87171",
    "#a78bfa",
    "#2dd4bf",
];

export default function SimpleBarChart({ data, color }: BarChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
                No data yet
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <XAxis
                    dataKey="name"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                />
                <Tooltip
                    contentStyle={{
                        background: "#1e293b",
                        border: "1px solid rgba(148,163,184,0.1)",
                        borderRadius: "12px",
                        color: "#f1f5f9",
                        fontSize: "12px",
                    }}
                    cursor={{ fill: "rgba(139,92,246,0.08)" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={color || COLORS[index % COLORS.length]}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
