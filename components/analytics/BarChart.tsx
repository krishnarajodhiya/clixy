"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BarChartProps {
    data: { name: string; count: number }[];
}

export default function SimpleBarChart({ data }: BarChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center p-8 text-[#a3a3a3] text-sm font-bold uppercase tracking-widest border border-solid border-[#262626] m-2 rounded-xl">
                No data yet
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fill: "#a3a3a3", fontSize: 10, fontWeight: 900 }} tickFormatter={(value) => value.toString().toUpperCase()} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#a3a3a3", fontSize: 10, fontWeight: 900 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                    contentStyle={{
                        background: "#111111",
                        border: "2px dashed #e5e5e5",
                        borderRadius: "8px",
                        color: "#e5e5e5",
                        textTransform: "uppercase",
                        fontWeight: 900,
                        fontSize: "12px",
                        boxShadow: "4px 4px 0 #ffffff",
                    }}
                    cursor={{ fill: "rgba(255,107,74,0.1)" }}
                />
                <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                    {data.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#ffffff" : "#1c1c1c"} stroke={i === 0 ? "#111111" : "#262626"} strokeWidth={2} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
