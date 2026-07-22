import React from "react";
import { useTheme } from "@mui/material/styles";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { useAppContext } from "../../../context/app-context";
import { WidgetCard } from "../../../components/data-display/WidgetCard";
import { useGeoSalesData } from "./hooks/useGeoSalesData";

function GeoSalesChart() {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";
	const { state } = useAppContext();
	const { data, maxOrders, maxRevenue } = useGeoSalesData(state.orders);

	return (
		<WidgetCard title="Regional Sales Distribution" sx={{ height: "100%", minHeight: 400 }} contentSx={{ p: 0 }}>
			<ResponsiveContainer width="100%" height="100%">
				<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
					<CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
					<XAxis
						type="number"
						dataKey="x"
						name="Orders"
						tickLine={false}
						axisLine={false}
						tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
						label={{ value: "Orders", position: "insideBottom", offset: -10, fill: theme.palette.text.secondary, fontSize: 11 }}
						domain={[0, maxOrders + 20]}
					/>
					<YAxis
						type="number"
						dataKey="y"
						name="Revenue"
						tickLine={false}
						axisLine={false}
						tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
						tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
						domain={[0, maxRevenue + 2000]}
					/>
					<ZAxis type="number" dataKey="z" range={[60, 500]} name="Volume" />
					<Tooltip
						cursor={{ strokeDasharray: "3 3" }}
						contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: "12px", border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[isDark ? 8 : 4] }}
						formatter={(value: unknown, _name: unknown, props: { payload?: { name?: string; orders?: number; revenue?: number } }) => {
							if (String(_name) === "Revenue") return [`$${(props.payload?.revenue || 0).toLocaleString()}`, "Revenue"];
							if (String(_name) === "Orders") return [String(props.payload?.orders ?? ""), "Orders"];
							return [String(value), String(_name)];
						}}
						labelFormatter={(_label, payload) => payload?.[0]?.payload?.name || ""}
					/>
					<Scatter name="Regions" data={data} fill={theme.palette.primary.main} fillOpacity={0.6} />
				</ScatterChart>
			</ResponsiveContainer>
		</WidgetCard>
	);
}

export default React.memo(GeoSalesChart);
