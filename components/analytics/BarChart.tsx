"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BarChartProps {
    data: { name: string; count: number }[];
}

export default function SimpleBarChart({ data }: BarChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
                No data yet
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                    contentStyle={{
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        color: "#111827",
                        fontSize: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                    cursor={{ fill: "rgba(37,99,235,0.05)" }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {data.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#2563eb" : "#93c5fd"} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
