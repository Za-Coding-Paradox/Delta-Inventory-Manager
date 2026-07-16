// src/components/admin-page/analytics/traffic-sources-chart.tsx
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
	{ subject: "Direct", A: 120, fullMark: 150 },
	{ subject: "Social", A: 98, fullMark: 150 },
	{ subject: "Search", A: 86, fullMark: 150 },
	{ subject: "Email", A: 99, fullMark: 150 },
	{ subject: "Referral", A: 85, fullMark: 150 },
	{ subject: "Ads", A: 65, fullMark: 150 },
];

export default function TrafficSourcesChart() {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	return (
		<Card variant="widget" sx={{ height: 400, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
				Traffic Sources
			</Typography>
			<Box sx={{ flex: 1, minHeight: 0 }}>
				<ResponsiveContainer width="100%" height="100%">
					<RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
						<PolarGrid stroke={theme.palette.divider} />
						<PolarAngleAxis dataKey="subject" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
						<PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
						<Radar
							name="Visitors"
							dataKey="A"
							stroke={theme.palette.primary.main}
							fill={theme.palette.primary.main}
							fillOpacity={0.5}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: theme.palette.background.paper,
								borderRadius: "12px",
								border: `1px solid ${theme.palette.divider}`,
								boxShadow: theme.shadows[isDark ? 8 : 4],
							}}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
}
