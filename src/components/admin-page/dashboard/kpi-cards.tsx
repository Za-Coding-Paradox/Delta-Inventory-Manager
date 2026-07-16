// src/components/admin-page/dashboard/kpi-cards.tsx
import { Box, Typography, Card, alpha, Collapse, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../../context/app-context";
import { DUMMY_SALES_TIMESERIES } from "../../../config/constants";

export default function AggregatesWidget() {
	const theme = useTheme();
	const [expanded, setExpanded] = useState(false);
	const { state } = useAppContext();

	const totalValue = state.products.reduce((acc, p) => acc + p.price * p.stockQuantity, 0);

	const stats = [
		{
			title: "Total Revenue",
			value: "$124,563.00",
			icon: <ShowChartRoundedIcon />,
		},
		{
			title: "Total Orders",
			value: "1,284",
			icon: <ShoppingBagRoundedIcon />,
		},
		{
			title: "Total Customers",
			value: "842",
			icon: <PeopleRoundedIcon />,
		},
		{
			title: "Inventory Value",
			value: `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
			icon: <InventoryRoundedIcon />,
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
									<AreaChart data={DUMMY_SALES_TIMESERIES.slice(0, 10)}>
										<defs>
											<linearGradient id={`grad${idx}`} x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor={theme.palette.text.primary} stopOpacity={0.3}/>
												<stop offset="95%" stopColor={theme.palette.text.primary} stopOpacity={0}/>
											</linearGradient>
										</defs>
										<Area type="monotone" dataKey="revenue" stroke={theme.palette.text.primary} strokeWidth={2} fillOpacity={1} fill={`url(#grad${idx})`} />
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
