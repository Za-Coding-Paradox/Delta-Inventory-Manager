import { Box } from "@mui/material";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "@mui/material/styles";
import React from "react";

export const WeeklyChart = React.memo(({ weeklyData }: { weeklyData: any[] }) => {
	const theme = useTheme();
	
	return (
		<Box sx={{ height: 300, width: "100%" }}>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
					<defs>
						<linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor={theme.palette.warning.main} stopOpacity={0.8}/>
							<stop offset="95%" stopColor={theme.palette.warning.main} stopOpacity={0}/>
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
					<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
					<YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
					<Tooltip
						contentStyle={{ borderRadius: "12px", border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.paper, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
						formatter={(value: any, _name: any, props: any) => [`${value} ★ (${props.payload?.count || 0} reviews)`, "Avg Rating"]}
					/>
					<Area type="monotone" dataKey="rating" stroke={theme.palette.warning.main} strokeWidth={3} fillOpacity={1} fill="url(#colorRating)" />
				</AreaChart>
			</ResponsiveContainer>
		</Box>
	);
});
