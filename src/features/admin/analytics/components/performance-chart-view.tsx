import { useTheme } from "@mui/material/styles";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Box, Typography } from "@mui/material";

export function PerformanceChartView({ data }: { data: any[] }) {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	if (data.length === 0) {
		return (
			<Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
				<Typography variant="body2" color="text.secondary">No products available.</Typography>
			</Box>
		);
	}
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
				<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
				<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: theme.palette.text.secondary }} dy={10} />
				<YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: theme.palette.text.secondary }} />
				<YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: theme.palette.text.secondary }} />
				<Tooltip
					contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: "12px", border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[isDark ? 8 : 4] }}
					cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
				/>
				<Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px", color: theme.palette.text.secondary }} />
				<Bar yAxisId="left" dataKey="sales" name="Units Sold" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
				<Bar yAxisId="right" dataKey="views" name="Views" fill={theme.palette.secondary.main} radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
}
