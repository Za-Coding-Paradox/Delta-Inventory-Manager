import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React from "react";
import RevenueChart from "../revenue-chart";
import CategoryBreakdownChart from "../category-breakdown-chart";
import ProductPerformanceChart from "../product-performance-chart";
import FunnelChart from "../funnel-chart";
import TrafficSourcesChart from "../traffic-sources-chart";
import GeoSalesChart from "../geo-sales-chart";
import ReturnsRateChart from "../returns-rate-chart";
import TopProductsList from "../top-products-list";

const AnimatedGridItem = React.memo(({ children, size, delay }: { children: React.ReactNode; size: any; delay: number }) => (
	<Grid size={size}>
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }} style={{ height: "100%" }}>
			{children}
		</motion.div>
	</Grid>
));

const ChartsGrid = React.memo(function ChartsGrid() {
	return (
		<Grid container spacing={3}>
			<AnimatedGridItem size={{ xs: 12, lg: 8 }} delay={0}>
				<RevenueChart />
			</AnimatedGridItem>
			<AnimatedGridItem size={{ xs: 12, lg: 4 }} delay={0.3}>
				<FunnelChart />
			</AnimatedGridItem>
			<AnimatedGridItem size={{ xs: 12, md: 4 }} delay={0.1}>
				<CategoryBreakdownChart />
			</AnimatedGridItem>
			<AnimatedGridItem size={{ xs: 12, md: 4 }} delay={0.2}>
				<ReturnsRateChart />
			</AnimatedGridItem>
			<AnimatedGridItem size={{ xs: 12, md: 4 }} delay={0.4}>
				<TrafficSourcesChart />
			</AnimatedGridItem>
			<AnimatedGridItem size={{ xs: 12, md: 8 }} delay={0.5}>
				<GeoSalesChart />
			</AnimatedGridItem>
			<AnimatedGridItem size={{ xs: 12, md: 4 }} delay={0.6}>
				<TopProductsList />
			</AnimatedGridItem>
			<AnimatedGridItem size={{ xs: 12 }} delay={0.2}>
				<ProductPerformanceChart />
			</AnimatedGridItem>
		</Grid>
	);
});

export default ChartsGrid;
