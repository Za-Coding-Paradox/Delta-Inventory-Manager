// src/components/admin-page/analytics/geo-sales-chart.tsx
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";

const data = [
	{ name: "North America", x: 100, y: 200, z: 200 },
	{ name: "Europe", x: 120, y: 100, z: 260 },
	{ name: "Asia", x: 170, y: 300, z: 400 },
	{ name: "South America", x: 140, y: 250, z: 280 },
	{ name: "Australia", x: 150, y: 400, z: 500 },
	{ name: "Africa", x: 110, y: 280, z: 200 },
];

export default function GeoSalesChart() {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	return (
		<Card variant="widget" sx={{ height: "100%", minHeight: 400, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
				Regional Sales Distribution
			</Typography>
			<Box sx={{ flex: 1, minHeight: 0 }}>
				<ResponsiveContainer width="100%" height="100%">
					<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
						<CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
						<XAxis type="number" dataKey="x" name="Orders" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
						<YAxis type="number" dataKey="y" name="Revenue" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
						<ZAxis type="number" dataKey="z" range={[60, 400]} name="Volume" />
						<Tooltip
							cursor={{ strokeDasharray: "3 3" }}
							contentStyle={{
								backgroundColor: theme.palette.background.paper,
								borderRadius: "12px",
								border: `1px solid ${theme.palette.divider}`,
								boxShadow: theme.shadows[isDark ? 8 : 4],
							}}
						/>
						<Scatter name="Regions" data={data} fill={theme.palette.primary.main} fillOpacity={0.6} />
					</ScatterChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
}
