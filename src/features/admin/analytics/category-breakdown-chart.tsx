// src/components/admin-page/analytics/category-breakdown-chart.tsx
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAppContext } from "../../../context/app-context";

export default function CategoryBreakdownChart() {
	const { state } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	// Calculate category counts
	const counts = state.products.reduce((acc, p) => {
		acc[p.category] = (acc[p.category] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

	// Nice color palette for pie chart
	const COLORS = [
		theme.palette.primary.main,
		theme.palette.secondary.main,
		isDark ? "#34d399" : "#059669",
		isDark ? "#fbbf24" : "#d97706",
		isDark ? "#a78bfa" : "#7c3aed",
		isDark ? "#f472b6" : "#db2777",
	];

	return (
		<Card variant="widget" sx={{ height: 400, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
				Products by Category
			</Typography>
			<Box sx={{ flex: 1, minHeight: 0 }}>
				{data.length === 0 ? (
					<Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Typography variant="body2" color="text.secondary">No products available.</Typography>
					</Box>
				) : (
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={100}
								paddingAngle={5}
								dataKey="value"
								stroke="none"
							>
								{data.map((_, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: theme.palette.background.paper,
									borderRadius: "12px",
									border: `1px solid ${theme.palette.divider}`,
									boxShadow: theme.shadows[isDark ? 8 : 4],
								}}
							/>
							<Legend
								verticalAlign="bottom"
								height={36}
								iconType="circle"
								wrapperStyle={{ fontSize: "12px", color: theme.palette.text.secondary }}
							/>
						</PieChart>
					</ResponsiveContainer>
				)}
			</Box>
		</Card>
	);
}
