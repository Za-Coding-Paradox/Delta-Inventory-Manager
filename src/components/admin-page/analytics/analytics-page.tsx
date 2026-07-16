// src/components/admin-page/analytics/analytics-page.tsx
import { Box, Typography, Button } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import RevenueChart from "./revenue-chart";
import CategoryBreakdownChart from "./category-breakdown-chart";
import ProductPerformanceChart from "./product-performance-chart";
import FunnelChart from "./funnel-chart";
import TrafficSourcesChart from "./traffic-sources-chart";
import GeoSalesChart from "./geo-sales-chart";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
	return (
		<Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3, pb: 10 }}>
			<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
				<Box>
					<Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
						Business Analytics
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Comprehensive overview of your store's performance.
					</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 1 }}>
					<Button
						variant="outlined"
						startIcon={<DateRangeRoundedIcon />}
						sx={{ borderRadius: "10px" }}
					>
						Last 30 Days
					</Button>
					<Button
						variant="outlined"
						startIcon={<RefreshRoundedIcon />}
						sx={{ borderRadius: "10px" }}
					>
						Refresh
					</Button>
					<Button
						variant="contained"
						startIcon={<DownloadRoundedIcon />}
						sx={{ borderRadius: "10px" }}
					>
						Export Report
					</Button>
				</Box>
			</Box>

			{/* Charts Grid */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
					gap: 3,
				}}
			>
				{/* Main Revenue Chart */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
					<RevenueChart />
				</motion.div>
				
				{/* Category Breakdown */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
					<CategoryBreakdownChart />
				</motion.div>

				{/* Product Performance */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
					<ProductPerformanceChart />
				</motion.div>

				{/* Sales Funnel */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
					<FunnelChart />
				</motion.div>

				{/* Traffic Sources */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
					<TrafficSourcesChart />
				</motion.div>

				{/* Geo Sales */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
					<GeoSalesChart />
				</motion.div>
			</Box>
		</Box>
	);
}
