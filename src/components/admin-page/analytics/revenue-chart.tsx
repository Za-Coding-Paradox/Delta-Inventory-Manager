// src/components/admin-page/analytics/revenue-chart.tsx
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../../context/app-context";
import { DUMMY_SALES_TIMESERIES } from "../../../config/constants";
import { useMemo } from "react";

export default function RevenueChart() {
	const theme = useTheme(); // gives us access to the current MUI theme (colors, shadows, etc.)
	const isDark = theme.palette.mode === "dark"; // true when the user has dark mode enabled — used to pick the right shadow depth for the tooltip
	const { state } = useAppContext(); // pulls global app state (including all orders) from the shared context

	// useMemo re-runs this function only when state.orders changes, not on every render.
	// This avoids looping through potentially hundreds of orders unnecessarily on unrelated re-renders.
	const derivedTimeSeries = useMemo(() => {
		// dailyMap groups orders by their date string (e.g. "2026-07-15").
		// Each key holds the total revenue and order count for that day.
		// Record<string, ...> means the object's keys are strings and values are the revenue/orders shape.
		const dailyMap: Record<string, { revenue: number; orders: number }> = {};

		state.orders.forEach((o) => {
			const date = new Date(o.timestamp).toISOString().split("T")[0]; // extract just the date part "YYYY-MM-DD" from the full ISO timestamp
			if (!dailyMap[date]) {
				dailyMap[date] = { revenue: 0, orders: 0 }; // initialise a blank entry for a date we haven't seen yet
			}
			dailyMap[date].orders += 1; // count every order regardless of status
			if (o.status === "DELIVERED") {
				// only add to revenue if the order was actually delivered —
				// pending or cancelled orders haven't generated real income yet
				dailyMap[date].revenue += o.total;
			}
		});

		// Build last 30 days series.
		// Array.from({ length: 30 }) creates an array with 30 empty slots.
		// The mapping function (_, i) runs once per slot: i goes from 0 to 29.
		// For each i, we calculate the date that is (29 - i) days ago, so the
		// result is a chronologically ordered array from 30 days ago → today.
		const series = Array.from({ length: 30 }, (_, i) => {
			const d = new Date();
			d.setDate(d.getDate() - (29 - i)); // step back in time: i=0 → 29 days ago, i=29 → today
			const key = d.toISOString().split("T")[0]; // format as "YYYY-MM-DD" to match the keys in dailyMap
			const dayData = dailyMap[key] || { revenue: 0, orders: 0 }; // if no orders on that day, default to zeros
			return {
				date: key,
				revenue: dayData.revenue,
				orders: dayData.orders,
				visitors: 0,       // placeholder fields — not tracked yet but kept for data shape consistency
				conversionRate: 0,
			};
		});

		return series;
	}, [state.orders]); // re-compute only when the orders array changes

	// If state.orders is empty (e.g. fresh install with no data), the chart would show a flat line,
	// which looks broken. We fall back to pre-made dummy data so the chart always looks meaningful.
	const hasRealData = state.orders.length > 0;
	const chartData = hasRealData ? derivedTimeSeries : DUMMY_SALES_TIMESERIES;

	return (
		<Card variant="widget" sx={{ height: 400, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
				Revenue Over Time {!hasRealData && "(Sample Data)"} {/* shows a label so the user knows they're looking at dummy data */}
			</Typography>
			<Box sx={{ flex: 1, minHeight: 0 }}> {/* flex: 1 lets this box expand to fill the card; minHeight: 0 is a CSS flex fix that prevents the chart from overflowing the card */}
				{/* ResponsiveContainer automatically resizes the chart to match its parent element's width and height */}
				<ResponsiveContainer width="100%" height="100%">
					{/* AreaChart is the top-level Recharts component that draws the axes, grid, and area series */}
					<AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						{/* <defs> is an SVG section for reusable definitions — here we define a gradient fill for the area under the line */}
						<defs>
							{/*
							 * linearGradient defines a top-to-bottom colour fade (x1/y1=top → x2/y2=bottom).
							 * The first <stop> at 5% from the top uses the primary colour at 30% opacity (slightly visible).
							 * The second <stop> at 95% from the top fades to 0% opacity (fully transparent).
							 * This creates the shaded area under the chart line that fades out as it goes down.
							 * The Area component references this gradient by its id="colorRevenue".
							 */}
							<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} /> {/* top of gradient: 30% opaque */}
								<stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />  {/* bottom of gradient: fully transparent */}
							</linearGradient>
						</defs>
						{/* CartesianGrid draws the faint horizontal lines behind the chart; vertical={false} removes vertical lines to reduce visual clutter */}
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
						<XAxis
							dataKey="date" // which field in each data object to use as the X-axis label
							tickFormatter={(val) => {
								const d = new Date(val);
								return `${d.getMonth() + 1}/${d.getDate()}`; // converts "2026-07-15" → "7/15" to keep labels short
							}}
							axisLine={false}  // hides the solid line running along the X-axis
							tickLine={false}  // hides the small tick marks below each label
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }} // styles the date labels to match the theme's secondary text colour
							dy={10} // shifts the labels 10px downward so they don't sit too close to the chart area
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
							// tickFormatter converts large numbers to a compact format for readability:
							// values >= 1000 become e.g. "$1.5k" instead of "$1500", keeping the axis tidy
							tickFormatter={(val) => val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val}`}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: theme.palette.background.paper, // tooltip background matches the current theme (light or dark)
								borderRadius: "12px",
								border: `1px solid ${theme.palette.divider}`,
								boxShadow: theme.shadows[isDark ? 8 : 4], // use a stronger shadow in dark mode so the tooltip stands out against the dark background
							}}
							// formatter receives the raw data value and returns a [displayValue, label] pair.
							// Recharts uses index 0 as the formatted value shown in the tooltip row,
							// and index 1 as the series label (replaces the raw dataKey name "revenue" with "Revenue").
							formatter={(value: unknown) => [`$${(value as number).toLocaleString()}`, "Revenue"]}
							labelFormatter={(label) => new Date(label as string).toLocaleDateString()} // converts the raw "YYYY-MM-DD" date key into a human-readable date for the tooltip header
						/>
						{/* Area is the actual filled chart line.
						 * type="monotone" smooths the line with a curve instead of sharp corners.
						 * stroke sets the line colour; strokeWidth makes it 3px thick.
						 * fill="url(#colorRevenue)" applies the SVG gradient defined above as the fill under the line.
						 */}
						<Area
							type="monotone"
							dataKey="revenue" // which field in the data to plot on the Y-axis
							stroke={theme.palette.primary.main}
							strokeWidth={3}
							fillOpacity={1} // keeps the gradient fill at full opacity (the gradient itself controls the fade)
							fill="url(#colorRevenue)" // references the linearGradient defined in <defs> above
						/>
					</AreaChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
}
