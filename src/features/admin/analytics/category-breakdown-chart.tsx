import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAppContext } from "../../../context/app-context";
import { WidgetCard } from "../../../components/data-display/WidgetCard";
import React, { useMemo } from "react";

const CategoryBreakdownChart = React.memo(function CategoryBreakdownChart() {
	const { state } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const data = useMemo(() => {
		const counts = state.products.reduce((acc, p) => {
			acc[p.category] = (acc[p.category] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);
		return Object.entries(counts).map(([name, value]) => ({ name, value }));
	}, [state.products]);

	const COLORS = useMemo(() => [
		theme.palette.primary.main,
		theme.palette.secondary.main,
		isDark ? "#34d399" : "#059669",
		isDark ? "#fbbf24" : "#d97706",
		isDark ? "#a78bfa" : "#7c3aed",
		isDark ? "#f472b6" : "#db2777",
	], [theme.palette, isDark]);

	return (
		<WidgetCard title="Products by Category" sx={{ height: 400 }}>
			{data.length === 0 ? (
				<Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
					<Typography variant="body2" color="text.secondary">No products available.</Typography>
				</Box>
			) : (
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
							{data.map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}
						</Pie>
						<Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: "12px", border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[isDark ? 8 : 4] }} />
						<Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px", color: theme.palette.text.secondary }} />
					</PieChart>
				</ResponsiveContainer>
			)}
		</WidgetCard>
	);
});

export default CategoryBreakdownChart;
