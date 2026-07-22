import { useTheme } from "@mui/material/styles";
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { memo } from "react";

function FunnelComposedChartBase({ data }: { data: any[] }) {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	return (
		<ResponsiveContainer width="100%" height="100%">
			<ComposedChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
				<CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme.palette.divider} />
				<XAxis type="number" hide />
				<YAxis dataKey="step" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} width={100} />
				<Tooltip
					contentStyle={{
						backgroundColor: theme.palette.background.paper,
						borderRadius: "12px",
						border: `1px solid ${theme.palette.divider}`,
						boxShadow: theme.shadows[isDark ? 8 : 4],
					}}
					cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
				/>
				<Bar dataKey="count" fill={theme.palette.secondary.main} radius={[0, 4, 4, 0]} barSize={32} />
			</ComposedChart>
		</ResponsiveContainer>
	);
}

export const FunnelComposedChart = memo(FunnelComposedChartBase);
