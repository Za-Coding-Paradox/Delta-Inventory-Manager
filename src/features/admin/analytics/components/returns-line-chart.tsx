import { useTheme } from "@mui/material/styles";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { memo } from "react";

function ReturnsLineChartBase({ data }: { data: any[] }) {
	const theme = useTheme();

	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
				<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
				<YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
				<Tooltip
					contentStyle={{
						borderRadius: "12px",
						border: `1px solid ${theme.palette.divider}`,
						backgroundColor: theme.palette.background.paper,
						boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
					}}
					formatter={(value: unknown) => [`${value}%`, "Cancellation Rate"]}
				/>
				<Line type="monotone" dataKey="rate" stroke={theme.palette.error.main} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: theme.palette.background.paper, stroke: theme.palette.error.main }} activeDot={{ r: 6 }} />
			</LineChart>
		</ResponsiveContainer>
	);
}

export const ReturnsLineChart = memo(ReturnsLineChartBase);
