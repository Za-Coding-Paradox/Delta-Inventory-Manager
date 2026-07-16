// src/components/admin-page/analytics/returns-rate-chart.tsx
import { Card, Typography, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../../../context/app-context";
import { useMemo } from "react";

export default function ReturnsRateChart() {
	const theme = useTheme();
	const { state } = useAppContext();

	// Derive monthly returns-rate proxy from state:
	// "Returns" = orders that were CANCELLED after being placed
	// Rate = cancelled / total * 100 per month
	const data = useMemo(() => {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const currentMonth = new Date().getMonth();

		// Build monthly buckets for the last 6 months
		return Array.from({ length: 6 }, (_, i) => {
			const monthIdx = (currentMonth - 5 + i + 12) % 12;
			const monthName = months[monthIdx];

			// Filter orders that fall in this month
			const monthOrders = state.orders.filter((o) => {
				const orderMonth = new Date(o.timestamp).getMonth();
				const yearOffset = new Date(o.timestamp).getFullYear() - new Date().getFullYear();
				// Approximate: match month within the past year
				return orderMonth === monthIdx && yearOffset >= -1;
			});

			const totalInMonth = monthOrders.length;
			const cancelledInMonth = monthOrders.filter((o) => o.status === "CANCELLED").length;

			// Return rate as percentage; use 0 if no orders in that month
			const rate = totalInMonth > 0
				? parseFloat(((cancelledInMonth / totalInMonth) * 100).toFixed(1))
				: 0;

			return { name: monthName, rate };
		});
	}, [state.orders]);

	const avgRate = data.length > 0
		? (data.reduce((sum, d) => sum + d.rate, 0) / data.filter((d) => d.rate > 0).length || 0).toFixed(1)
		: "0.0";

	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
			<Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Returns Rate</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				Monthly cancellation rate · Avg: {avgRate}%
			</Typography>
			<Box sx={{ flex: 1, minHeight: 200 }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tickFormatter={(val) => `${val}%`}
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
						/>
						<Tooltip
							contentStyle={{
								borderRadius: "12px",
								border: `1px solid ${theme.palette.divider}`,
								backgroundColor: theme.palette.background.paper,
								boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
							}}
							formatter={(value: unknown) => [`${value}%`, "Cancellation Rate"]}
						/>
						<Line
							type="monotone"
							dataKey="rate"
							stroke={theme.palette.error.main}
							strokeWidth={3}
							dot={{ r: 4, strokeWidth: 2, fill: theme.palette.background.paper, stroke: theme.palette.error.main }}
							activeDot={{ r: 6 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
}
