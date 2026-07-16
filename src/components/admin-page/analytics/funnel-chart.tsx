// src/components/admin-page/analytics/funnel-chart.tsx
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../../context/app-context";
import { DUMMY_CUSTOMER_ANALYTICS } from "../../../config/constants";

export default function FunnelChart() {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";
	const { state } = useAppContext();

	// Derive funnel stages from live state:
	// Site Visits: baseline from customer analytics (totalActiveUsers × a visit multiplier)
	const siteVisits = DUMMY_CUSTOMER_ANALYTICS.totalActiveUsers * 10;
	// Product Views: estimated based on products available (each product averages views)
	const productViews = Math.round(siteVisits * 0.55);
	// Added to Cart: based on total cart quantity across all orders placed (historical)
	const totalCartItems = state.orders.reduce(
		(sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
		0
	);
	// Also add current cart items (in-session)
	const currentCartItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
	const addedToCart = totalCartItems + currentCartItems + state.products.length * 3;
	// Checkout Started: orders that moved past PENDING stage
	const checkoutStarted = state.orders.filter(
		(o) => o.status !== "PENDING"
	).length + Math.round(state.orders.length * 0.1); // +10% who started but abandoned
	// Purchased: only completed (DELIVERED) orders
	const purchased = state.orders.filter((o) => o.status === "DELIVERED").length;

	const data = [
		{ step: "Site Visits", count: siteVisits },
		{ step: "Product Views", count: productViews },
		{ step: "Add to Cart", count: Math.max(addedToCart, purchased + 5) },
		{ step: "Checkout", count: Math.max(checkoutStarted, purchased + 2) },
		{ step: "Purchase", count: purchased },
	];

	return (
		<Card variant="widget" sx={{ height: 400, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
				Sales Funnel
			</Typography>
			<Box sx={{ flex: 1, minHeight: 0 }}>
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
						<CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme.palette.divider} />
						<XAxis type="number" hide />
						<YAxis
							dataKey="step"
							type="category"
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
							width={100}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: theme.palette.background.paper,
								borderRadius: "12px",
								border: `1px solid ${theme.palette.divider}`,
								boxShadow: theme.shadows[isDark ? 8 : 4],
							}}
							cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
						/>
						<Bar
							dataKey="count"
							fill={theme.palette.secondary.main}
							radius={[0, 4, 4, 0]}
							barSize={32}
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
}
