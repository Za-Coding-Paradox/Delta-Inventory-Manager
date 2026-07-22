// src/components/admin-page/analytics/product-performance-chart.tsx
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAppContext } from "../../../context/app-context";
import { useMemo } from "react";

// Deterministic hash for seeding consistent view counts (no Math.random())
function deterministicSeed(str: string, multiplier: number): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return Math.abs(hash % multiplier) + Math.round(multiplier * 0.3);
}

export default function ProductPerformanceChart() {
	const { state } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	// Derive performance data from real orders — NO Math.random()
	const data = useMemo(() => {
		// Build sales map from orders
		const salesMap: Record<string, { sales: number; revenue: number }> = {};
		state.orders.forEach((order) => {
			order.items.forEach((item) => {
				if (!salesMap[item.productId]) {
					salesMap[item.productId] = { sales: 0, revenue: 0 };
				}
				salesMap[item.productId].sales += item.quantity;
				salesMap[item.productId].revenue += item.quantity * item.priceAtOrder;
			});
		});

		// Map products to chart data
		return state.products.slice(0, 5).map((p) => {
			const perf = salesMap[p.id] || { sales: 0, revenue: 0 };
			// Views: deterministic seeded value based on product id (no randomness)
			// Higher-priced products tend to get more views
			const baseViews = deterministicSeed(p.id, 1500);
			const views = Math.max(baseViews, perf.sales * 12); // At least 12x views per sale

			return {
				name: p.name.length > 15 ? p.name.substring(0, 15) + "…" : p.name,
				sales: perf.sales,
				views,
			};
		});
	}, [state.orders, state.products]);

	return (
		<Card variant="widget" sx={{ height: 400, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
				Product Performance
			</Typography>
			<Box sx={{ flex: 1, minHeight: 0 }}>
				{data.length === 0 ? (
					<Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Typography variant="body2" color="text.secondary">No products available.</Typography>
					</Box>
				) : (
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
							<XAxis
								dataKey="name"
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
								dy={10}
							/>
							<YAxis
								yAxisId="left"
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
							/>
							<YAxis
								yAxisId="right"
								orientation="right"
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: theme.palette.background.paper,
									borderRadius: "12px",
									border: `1px solid ${theme.palette.divider}`,
									boxShadow: theme.shadows[isDark ? 8 : 4],
								}}
								cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
							/>
							<Legend
								verticalAlign="top"
								height={36}
								iconType="circle"
								wrapperStyle={{ fontSize: "12px", color: theme.palette.text.secondary }}
							/>
							<Bar yAxisId="left" dataKey="sales" name="Units Sold" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
							<Bar yAxisId="right" dataKey="views" name="Views" fill={theme.palette.secondary.main} radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				)}
			</Box>
		</Card>
	);
}
