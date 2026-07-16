import { Card, Typography, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
	{ name: "Jan", rate: 2.1 },
	{ name: "Feb", rate: 2.3 },
	{ name: "Mar", rate: 1.8 },
	{ name: "Apr", rate: 3.2 },
	{ name: "May", rate: 2.8 },
	{ name: "Jun", rate: 1.5 },
];

export default function ReturnsRateChart() {
	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
			<Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Returns Rate</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				Monthly percentage of returned orders
			</Typography>
			<Box sx={{ flex: 1, minHeight: 200 }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey="name" axisLine={false} tickLine={false} />
						<YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
						<Tooltip
							contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
							formatter={(value: any) => [`${value}%`, "Returns"]}
						/>
						<Line type="monotone" dataKey="rate" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
					</LineChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
}
