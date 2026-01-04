import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200">
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-sm text-[#BB2A1D]">
                    {payload[0].value} members
                </p>
            </div>
        );
    }
    return null;
};

const MembersBarGraph = ({ data, xKey, barKey, title }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 mb-6">
            {/* Title */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-montserrat font-bold text-gray-800">
                    {title}
                </h3>
                <div className="h-[2px] flex-1 ml-4 bg-gradient-to-r from-[#BB2A1D] to-transparent"></div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                    <XAxis
                        dataKey={xKey}
                        tick={{ fill: "#374151", fontSize: 12 }}
                        interval={0}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: "#374151", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
                    <Bar
                        dataKey={barKey}
                        fill="url(#colorUv)"
                        radius={[8, 8, 0, 0]}
                        barSize={20}
                        activeBar={false}

                    />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#BB2A1D" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#BB2A1D" stopOpacity={0.6} />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MembersBarGraph;
