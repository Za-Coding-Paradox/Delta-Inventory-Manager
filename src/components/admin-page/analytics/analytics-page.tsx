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
import ReturnsRateChart from "./returns-rate-chart";
import TopProductsList from "./top-products-list";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import ExportModal from "./export-modal";
import { useState } from "react";

export default function AnalyticsPage() {
	const [exportOpen, setExportOpen] = useState(false);
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
						onClick={() => window.location.reload()}
					>
						Refresh
					</Button>
					<Button
						variant="contained"
						startIcon={<DownloadRoundedIcon />}
						sx={{ borderRadius: "10px" }}
						onClick={() => setExportOpen(true)}
					>
						Export Report
					</Button>
				</Box>
			</Box>

			{/* Charts Grid */}
			<Grid container spacing={3}>
				{/* Main Revenue Chart */}
				<Grid size={{ xs: 12, lg: 8 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ height: "100%" }}>
						<RevenueChart />
					</motion.div>
				</Grid>
				
				{/* Sales Funnel */}
				<Grid size={{ xs: 12, lg: 4 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} style={{ height: "100%" }}>
						<FunnelChart />
					</motion.div>
				</Grid>

				{/* Category Breakdown */}
				<Grid size={{ xs: 12, md: 4 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} style={{ height: "100%" }}>
						<CategoryBreakdownChart />
					</motion.div>
				</Grid>

				{/* Returns Rate Chart */}
				<Grid size={{ xs: 12, md: 4 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} style={{ height: "100%" }}>
						<ReturnsRateChart />
					</motion.div>
				</Grid>

				{/* Traffic Sources */}
				<Grid size={{ xs: 12, md: 4 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} style={{ height: "100%" }}>
						<TrafficSourcesChart />
					</motion.div>
				</Grid>

				{/* Geo Sales at the BOTTOM */}
				<Grid size={{ xs: 12, md: 8 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} style={{ height: "100%" }}>
						<GeoSalesChart />
					</motion.div>
				</Grid>

				{/* Top Products at the BOTTOM */}
				<Grid size={{ xs: 12, md: 4 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }} style={{ height: "100%" }}>
						<TopProductsList />
					</motion.div>
				</Grid>

				{/* Product Performance at the BOTTOM */}
				<Grid size={{ xs: 12 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} style={{ height: "100%" }}>
						<ProductPerformanceChart />
					</motion.div>
				</Grid>
			</Grid>

			<ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
		</Box>
	);
}
