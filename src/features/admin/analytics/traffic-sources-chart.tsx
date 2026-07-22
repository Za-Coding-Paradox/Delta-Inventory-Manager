// src/components/admin-page/analytics/traffic-sources-chart.tsx
import React, { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { DUMMY_CUSTOMER_ANALYTICS } from "../../../config/constants";
import { WidgetCard } from "../../../components/data-display/WidgetCard";

function TrafficSourcesChart() {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const data = useMemo(() => {
		const maxVisitors = Math.max(...DUMMY_CUSTOMER_ANALYTICS.trafficSources.map((s) => s.visitors));
		return DUMMY_CUSTOMER_ANALYTICS.trafficSources.map((source) => ({
			subject: source.sourceName.replace(" Search", "").replace(" Media", ""),
			visitors: source.visitors,
			percentage: source.percentage,
			A: Math.round((source.visitors / maxVisitors) * 150),
			fullMark: 150,
		}));
	}, []);

	return (
		<WidgetCard title="Traffic Sources" sx={{ height: 400 }} contentSx={{ p: 0 }}>
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
		</WidgetCard>
	);
}

export default React.memo(TrafficSourcesChart);
