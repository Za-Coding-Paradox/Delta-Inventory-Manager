// src/components/admin-page/analytics/revenue-chart.tsx
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../../context/app-context";
import { DUMMY_SALES_TIMESERIES } from "../../../config/constants";
import { useMemo } from "react";

export default function RevenueChart() {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";
	const { state } = useAppContext();

	// Derive time series from state.orders: group delivered orders by date, sum totals
	const derivedTimeSeries = useMemo(() => {
		const dailyMap: Record<string, { revenue: number; orders: number }> = {};

		state.orders.forEach((o) => {
			const date = new Date(o.timestamp).toISOString().split("T")[0];
			if (!dailyMap[date]) {
				dailyMap[date] = { revenue: 0, orders: 0 };
			}
			dailyMap[date].orders += 1;
			if (o.status === "DELIVERED") {
				dailyMap[date].revenue += o.total;
			}
		});

		// Build last 30 days series
		const series = Array.from({ length: 30 }, (_, i) => {
			const d = new Date();
			d.setDate(d.getDate() - (29 - i));
			const key = d.toISOString().split("T")[0];
			const dayData = dailyMap[key] || { revenue: 0, orders: 0 };
			return {
				date: key,
				revenue: dayData.revenue,
				orders: dayData.orders,
				visitors: 0,
				conversionRate: 0,
			};
		});

		return series;
	}, [state.orders]);

	// If no orders yet (fresh install), fall back to DUMMY_SALES_TIMESERIES
	const hasRealData = state.orders.length > 0;
	const chartData = hasRealData ? derivedTimeSeries : DUMMY_SALES_TIMESERIES;

	return (
		<Card variant="widget" sx={{ height: 400, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
				Revenue Over Time {!hasRealData && "(Sample Data)"}
			</Typography>
			<Box sx={{ flex: 1, minHeight: 0 }}>
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						<defs>
							<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
								<stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
						<XAxis
							dataKey="date"
							tickFormatter={(val) => {
								const d = new Date(val);
								return `${d.getMonth() + 1}/${d.getDate()}`;
							}}
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
							tickFormatter={(val) => val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val}`}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: theme.palette.background.paper,
								borderRadius: "12px",
								border: `1px solid ${theme.palette.divider}`,
								boxShadow: theme.shadows[isDark ? 8 : 4],
							}}
							formatter={(value: unknown) => [`$${(value as number).toLocaleString()}`, "Revenue"]}
							labelFormatter={(label) => new Date(label as string).toLocaleDateString()}
						/>
						<Area
							type="monotone"
							dataKey="revenue"
							stroke={theme.palette.primary.main}
							strokeWidth={3}
							fillOpacity={1}
							fill="url(#colorRevenue)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
}
