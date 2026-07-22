// src/components/admin-page/analytics/geo-sales-chart.tsx
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { useAppContext } from "../../../context/app-context";
import { useMemo } from "react";

// Deterministic hash to assign a region to an order ID since address isn't in Order type
function deterministicRegion(id: string): string {
	const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];
	let hash = 0;
	for (let i = 0; i < id.length; i++) {
		hash = (hash << 5) - hash + id.charCodeAt(i);
		hash |= 0;
	}
	return regions[Math.abs(hash) % regions.length];
}

export default function GeoSalesChart() {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";
	const { state } = useAppContext();

	// Derive regional sales from live orders
	const data = useMemo(() => {
		const regionMap: Record<string, { orders: number; revenue: number }> = {};
		
		state.orders.forEach((o) => {
			const region = deterministicRegion(o.id);
			if (!regionMap[region]) regionMap[region] = { orders: 0, revenue: 0 };
			regionMap[region].orders += 1;
			regionMap[region].revenue += o.total;
		});

		const rawData = Object.entries(regionMap).map(([name, stats]) => ({
			name,
			orders: stats.orders,
			revenue: stats.revenue,
		}));

		if (rawData.length === 0) return [];

		const maxOrders = Math.max(...rawData.map((g) => g.orders));
		
		return rawData.map((geo) => ({
			name: geo.name,
			x: geo.orders,
			y: geo.revenue,
			z: Math.round((geo.orders / maxOrders) * 500) + 60,
			orders: geo.orders,
			revenue: geo.revenue,
		}));
	}, [state.orders]);

	const maxOrders = data.length > 0 ? Math.max(...data.map((g) => g.orders)) : 10;
	const maxRevenue = data.length > 0 ? Math.max(...data.map((g) => g.revenue)) : 1000;

	return (
		<Card variant="widget" sx={{ height: "100%", minHeight: 400, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
				Regional Sales Distribution
			</Typography>
			<Box sx={{ flex: 1, minHeight: 0 }}>
				<ResponsiveContainer width="100%" height="100%">
					<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
						<CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
						<XAxis
							type="number"
							dataKey="x"
							name="Orders"
							tickLine={false}
							axisLine={false}
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
							label={{ value: "Orders", position: "insideBottom", offset: -10, fill: theme.palette.text.secondary, fontSize: 11 }}
							domain={[0, maxOrders + 20]}
						/>
						<YAxis
							type="number"
							dataKey="y"
							name="Revenue"
							tickLine={false}
							axisLine={false}
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
							tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
							domain={[0, maxRevenue + 2000]}
						/>
						<ZAxis type="number" dataKey="z" range={[60, 500]} name="Volume" />
						<Tooltip
							cursor={{ strokeDasharray: "3 3" }}
							contentStyle={{
								backgroundColor: theme.palette.background.paper,
								borderRadius: "12px",
								border: `1px solid ${theme.palette.divider}`,
								boxShadow: theme.shadows[isDark ? 8 : 4],
							}}
							formatter={(value: unknown, _name: unknown, props: { payload?: { name?: string; orders?: number; revenue?: number } }) => {
								if (String(_name) === "Revenue") return [`$${(props.payload?.revenue || 0).toLocaleString()}`, "Revenue"];
								if (String(_name) === "Orders") return [String(props.payload?.orders ?? ""), "Orders"];
								return [String(value), String(_name)];
							}}
							labelFormatter={(_label, payload) => payload?.[0]?.payload?.name || ""}
						/>
						<Scatter name="Regions" data={data} fill={theme.palette.primary.main} fillOpacity={0.6} />
					</ScatterChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
}
