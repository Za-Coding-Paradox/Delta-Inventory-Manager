// src/components/admin-page/dashboard/kpi-cards.tsx
import { Box, Typography, Card, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { motion } from "framer-motion";
import { useAppContext } from "../../../context/app-context";
import {
	DUMMY_SALES_TIMESERIES,
} from "../../../config/constants";

const MotionCard = motion(Card);

interface KpiCardProps {
	title: string;
	value: string;
	change: number;
	icon: React.ReactNode;
	color: string;
	delay: number;
}

function KpiCard({ title, value, change, icon, color, delay }: KpiCardProps) {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";
	const isPositive = change >= 0;

	return (
		<MotionCard
			variant="widget"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay, duration: 0.4, ease: "easeOut" }}
			sx={{
				position: "relative",
				overflow: "hidden",
				flex: 1,
				minWidth: 180,
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: 3,
					background: color,
					borderRadius: "16px 16px 0 0",
				},
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
				<Box>
					<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
						{title}
					</Typography>
					<Typography
						variant="h4"
						sx={{ fontWeight: 800, mt: 0.5, letterSpacing: "-1px", lineHeight: 1.1 }}
					>
						{value}
					</Typography>
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
						{isPositive ? (
							<TrendingUpRoundedIcon sx={{ fontSize: "1rem", color: "success.main" }} />
						) : (
							<TrendingDownRoundedIcon sx={{ fontSize: "1rem", color: "error.main" }} />
						)}
						<Typography
							variant="caption"
							sx={{
								fontWeight: 700,
								color: isPositive ? "success.main" : "error.main",
							}}
						>
							{isPositive ? "+" : ""}
							{change}%
						</Typography>
						<Typography variant="caption" color="text.secondary">
							vs last month
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						width: 48,
						height: 48,
						borderRadius: "14px",
						backgroundColor: alpha(color, isDark ? 0.2 : 0.1),
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: color,
						flexShrink: 0,
					}}
				>
					{icon}
				</Box>
			</Box>
		</MotionCard>
	);
}

export default function KpiCards() {
	const { state } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const totalRevenue = DUMMY_SALES_TIMESERIES.reduce((s, d) => s + d.revenue, 0);
	const totalOrders = DUMMY_SALES_TIMESERIES.reduce((s, d) => s + d.orders, 0);
	const avgConversion =
		DUMMY_SALES_TIMESERIES.reduce((s, d) => s + d.conversionRate, 0) /
		DUMMY_SALES_TIMESERIES.length;

	const accentBlue = isDark ? "#60a5fa" : "#2563eb";
	const accentGreen = isDark ? "#34d399" : "#059669";
	const accentAmber = isDark ? "#fbbf24" : "#d97706";
	const accentPurple = isDark ? "#a78bfa" : "#7c3aed";

	const cards: KpiCardProps[] = [
		{
			title: "Total Revenue",
			value: `$${(totalRevenue / 1000).toFixed(1)}k`,
			change: 12.4,
			icon: <ShowChartRoundedIcon sx={{ fontSize: "1.4rem" }} />,
			color: accentBlue,
			delay: 0,
		},
		{
			title: "Total Orders",
			value: totalOrders.toLocaleString(),
			change: 8.1,
			icon: <ShoppingBagRoundedIcon sx={{ fontSize: "1.4rem" }} />,
			color: accentGreen,
			delay: 0.05,
		},
		{
			title: "Active Products",
			value: state.products.length.toString(),
			change: state.products.filter((p) => p.status === "IN_STOCK").length > 4 ? 3.2 : -1.5,
			icon: <InventoryRoundedIcon sx={{ fontSize: "1.4rem" }} />,
			color: accentAmber,
			delay: 0.1,
		},
		{
			title: "Avg. Conversion",
			value: `${avgConversion.toFixed(1)}%`,
			change: -2.3,
			icon: <PeopleRoundedIcon sx={{ fontSize: "1.4rem" }} />,
			color: accentPurple,
			delay: 0.15,
		},
	];

	return (
		<Box
			sx={{
				display: "flex",
				gap: 2,
				flexWrap: "wrap",
			}}
		>
			{cards.map((card) => (
				<KpiCard key={card.title} {...card} />
			))}
		</Box>
	);
}
