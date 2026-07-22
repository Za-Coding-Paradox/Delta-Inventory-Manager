import { useTheme } from "@mui/material/styles";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import React, { useMemo } from "react";

export interface RevenueAreaChartProps {
	data: any[];
}

const RevenueAreaChart = React.memo(function RevenueAreaChart({ data }: RevenueAreaChartProps) {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";
	
	const formatXAxis = useMemo(() => (val: string) => {
		const d = new Date(val);
		return `${d.getMonth() + 1}/${d.getDate()}`;
	}, []);
	const formatYAxis = useMemo(() => (val: number) => val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val}`, []);
	const tooltipFormatter = useMemo(() => (value: unknown) => [`$${(value as number).toLocaleString()}`, "Revenue"], []);
	const labelFormatter = useMemo(() => (label: unknown) => new Date(label as string).toLocaleDateString(), []);

	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
				<defs>
					<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
						<stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
				<XAxis dataKey="date" tickFormatter={formatXAxis} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} dy={10} />
				<YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} tickFormatter={formatYAxis} />
				<Tooltip
					contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: "12px", border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[isDark ? 8 : 4] }}
					formatter={tooltipFormatter}
					labelFormatter={labelFormatter}
				/>
				<Area type="monotone" dataKey="revenue" stroke={theme.palette.primary.main} strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
			</AreaChart>
		</ResponsiveContainer>
	);
});

export default RevenueAreaChart;
