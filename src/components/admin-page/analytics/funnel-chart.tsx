// src/components/admin-page/analytics/funnel-chart.tsx
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ step: "Visitors", count: 15420 },
	{ step: "Product Views", count: 8300 },
	{ step: "Add to Cart", count: 3200 },
	{ step: "Checkout", count: 1800 },
	{ step: "Purchase", count: 1250 },
];

export default function FunnelChart() {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	return (
		<Card variant="widget" sx={{ height: 400, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
				Sales Funnel
			</Typography>
			<Box sx={{ flex: 1, minHeight: 0 }}>
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
						<CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme.palette.divider} />
						<XAxis type="number" hide />
						<YAxis
							dataKey="step"
							type="category"
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
							width={100}
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
						<Bar
							dataKey="count"
							fill={theme.palette.secondary.main}
							radius={[0, 4, 4, 0]}
							barSize={32}
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
}
