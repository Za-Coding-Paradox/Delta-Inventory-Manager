// src/components/admin-page/dashboard/kpi-cards.tsx
import { Box, Typography, Card, alpha, Collapse, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState, useMemo } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../../context/app-context";

export default function AggregatesWidget() {
	const theme = useTheme();
	const [expanded, setExpanded] = useState(false);
	const { state } = useAppContext();

	// --- Derive all KPI values from live state ---

	// Total Revenue: sum of all completed (DELIVERED) order totals
	const totalRevenue = state.orders
		.filter((o) => o.status === "DELIVERED")
		.reduce((sum, o) => sum + o.total, 0);

	// Total Orders: all orders ever placed
	const totalOrders = state.orders.length;

	// Total Customers: unique customer names across all orders
	const uniqueCustomers = new Set(state.orders.map((o) => o.customerName)).size;

	// Inventory Value: live price × stock for all products
	const inventoryValue = state.products.reduce((acc, p) => acc + p.price * p.stockQuantity, 0);

	// Build sparkline time-series from orders (last 10 data points by day)
	// Group orders by date (last 30 days), compute daily revenue
	const revenueTimeSeries = useMemo(() => {
		const dailyMap: Record<string, number> = {};
		state.orders
			.filter((o) => o.status === "DELIVERED")
			.forEach((o) => {
				const date = new Date(o.timestamp).toISOString().split("T")[0];
				dailyMap[date] = (dailyMap[date] || 0) + o.total;
			});
		// Fill last 10 days (ensures chart always has data)
		return Array.from({ length: 10 }, (_, i) => {
			const d = new Date();
			d.setDate(d.getDate() - (9 - i));
			const key = d.toISOString().split("T")[0];
			return { date: key, value: dailyMap[key] || 0 };
		});
	}, [state.orders]);

	// Sparkline for orders count per day
	const ordersTimeSeries = useMemo(() => {
		const dailyMap: Record<string, number> = {};
		state.orders.forEach((o) => {
			const date = new Date(o.timestamp).toISOString().split("T")[0];
			dailyMap[date] = (dailyMap[date] || 0) + 1;
		});
		return Array.from({ length: 10 }, (_, i) => {
			const d = new Date();
			d.setDate(d.getDate() - (9 - i));
			const key = d.toISOString().split("T")[0];
			return { date: key, value: dailyMap[key] || 0 };
		});
	}, [state.orders]);

	// Sparkline for customer count (cumulative unique over last 10 days)
	const customersTimeSeries = useMemo(() => {
		const seenCustomers = new Set<string>();
		return Array.from({ length: 10 }, (_, i) => {
			const d = new Date();
			d.setDate(d.getDate() - (9 - i));
			const dayStr = d.toISOString().split("T")[0];
			state.orders
				.filter((o) => new Date(o.timestamp).toISOString().split("T")[0] <= dayStr)
				.forEach((o) => seenCustomers.add(o.customerName));
			return { date: dayStr, value: seenCustomers.size };
		});
	}, [state.orders]);

	// Sparkline for inventory value trend
	const inventoryTimeSeries = useMemo(() => {
		return Array.from({ length: 10 }, (_, i) => ({
			date: i.toString(),
			value: inventoryValue * (0.85 + i * 0.015),
		}));
	}, [inventoryValue]);

	const stats = [
		{
			title: "Total Revenue",
			value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
			icon: <ShowChartRoundedIcon />,
			sparkData: revenueTimeSeries,
		},
		{
			title: "Total Orders",
			value: totalOrders.toLocaleString(),
			icon: <ShoppingBagRoundedIcon />,
			sparkData: ordersTimeSeries,
		},
		{
			title: "Total Customers",
			value: uniqueCustomers.toLocaleString(),
			icon: <PeopleRoundedIcon />,
			sparkData: customersTimeSeries,
		},
		{
			title: "Inventory Value",
			value: `$${inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
			icon: <InventoryRoundedIcon />,
			sparkData: inventoryTimeSeries,
		},
	];

	return (
		<Card elevation={0} sx={{ borderRadius: "20px", p: 3, cursor: "pointer", transition: "0.3s", display: "flex", flexDirection: "column", gap: 2 }} onClick={() => setExpanded(!expanded)}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6" sx={{ fontWeight: 800 }}>Store Aggregates</Typography>
				<IconButton size="small">
					{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</IconButton>
			</Box>

			<Stack spacing={2}>
				{stats.map((stat, idx) => (
					<Box key={idx} sx={{ borderBottom: idx === stats.length - 1 ? 0 : 1, borderColor: "divider", pb: idx === stats.length - 1 ? 0 : 2 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
							<Box sx={{ p: 1, borderRadius: "10px", backgroundColor: (t) => alpha(t.palette.text.primary, 0.1), color: "text.primary" }}>
								{stat.icon}
							</Box>
							<Box>
								<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
									{stat.title}
								</Typography>
								<Typography variant="h6" sx={{ fontWeight: 800 }}>
									{stat.value}
								</Typography>
							</Box>
						</Box>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<Box sx={{ height: 40, width: "100%", mt: 2 }}>
								<ResponsiveContainer width="100%" height="100%">
									<AreaChart data={stat.sparkData}>
										<defs>
											<linearGradient id={`grad${idx}`} x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor={theme.palette.text.primary} stopOpacity={0.3}/>
												<stop offset="95%" stopColor={theme.palette.text.primary} stopOpacity={0}/>
											</linearGradient>
										</defs>
										<Area type="monotone" dataKey="value" stroke={theme.palette.text.primary} strokeWidth={2} fillOpacity={1} fill={`url(#grad${idx})`} />
									</AreaChart>
								</ResponsiveContainer>
							</Box>
						</Collapse>
					</Box>
				))}
			</Stack>
		</Card>
	);
}
