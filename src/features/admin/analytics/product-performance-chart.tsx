import { WidgetCard } from "../../../components/data-display/WidgetCard";
import { useProductPerformance } from "./hooks/use-product-performance";
import { PerformanceChartView } from "./components/performance-chart-view";
import React from "react";

export default function ProductPerformanceChart() {
	const data = useProductPerformance();

	return (
		<WidgetCard title="Product Performance" sx={{ height: 400 }}>
			<PerformanceChartView data={data} />
		</WidgetCard>
	);
}
