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
import { motion } from "framer-motion"; // framer-motion gives us the motion.div component for smooth animations
import Grid from "@mui/material/Grid";
import ExportModal from "./export-modal";
import { useState } from "react";

export default function AnalyticsPage() {
	const [exportOpen, setExportOpen] = useState(false); // controls whether the export modal is visible or hidden
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
				{/* Main Revenue Chart — no delay (0s), so it animates in first */}
				<Grid size={{ xs: 12, lg: 8 }}>
					{/*
					 * motion.div is a regular <div> with animation superpowers from framer-motion.
					 * initial: the starting state before the animation begins — invisible (opacity 0) and shifted 20px down (y: 20).
					 * animate: the target state to animate towards — fully visible (opacity 1) and back at its natural position (y: 0).
					 * transition.duration: how long the animation takes in seconds (0.4s = 400ms).
					 * No delay here, so this chart fades in immediately when the page mounts.
					 */}
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ height: "100%" }}>
						<RevenueChart />
					</motion.div>
				</Grid>
				
				{/* Sales Funnel — delay: 0.3s, so it starts animating 300ms after the page mounts */}
				<Grid size={{ xs: 12, lg: 4 }}>
					{/*
					 * transition.delay: how many seconds to wait before the animation starts.
					 * This 0.3s delay means FunnelChart begins its fade-in after RevenueChart has already started,
					 * creating a staggered "one after another" entrance effect across the dashboard.
					 */}
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} style={{ height: "100%" }}>
						<FunnelChart />
					</motion.div>
				</Grid>

				{/* Category Breakdown — delay: 0.1s, animates in just after the revenue chart */}
				<Grid size={{ xs: 12, md: 4 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} style={{ height: "100%" }}>
						<CategoryBreakdownChart />
					</motion.div>
				</Grid>

				{/* Returns Rate Chart — delay: 0.2s, third in the stagger sequence */}
				<Grid size={{ xs: 12, md: 4 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} style={{ height: "100%" }}>
						<ReturnsRateChart />
					</motion.div>
				</Grid>

				{/* Traffic Sources — delay: 0.4s, animates in after the funnel chart */}
				<Grid size={{ xs: 12, md: 4 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} style={{ height: "100%" }}>
						<TrafficSourcesChart />
					</motion.div>
				</Grid>

				{/* Geo Sales at the BOTTOM — delay: 0.5s, near the end of the stagger sequence */}
				<Grid size={{ xs: 12, md: 8 }}>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} style={{ height: "100%" }}>
						<GeoSalesChart />
					</motion.div>
				</Grid>

				{/* Top Products at the BOTTOM — delay: 0.6s, last in the stagger sequence so it appears after everything else */}
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
