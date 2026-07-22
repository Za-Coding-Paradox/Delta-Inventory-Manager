import { useAppContext } from "../../../context/app-context";
import { DUMMY_SALES_TIMESERIES } from "../../../config/constants";
import { useMemo } from "react";
import { WidgetCard } from "../../../components/data-display/WidgetCard";
import RevenueAreaChart from "./components/revenue-area-chart";
import React from "react";

const RevenueChart = React.memo(function RevenueChart() {
	const { state } = useAppContext();

	const derivedTimeSeries = useMemo(() => {
		const dailyMap: Record<string, { revenue: number; orders: number }> = {};
		state.orders.forEach((o) => {
			const date = new Date(o.timestamp).toISOString().split("T")[0];
			if (!dailyMap[date]) dailyMap[date] = { revenue: 0, orders: 0 };
			dailyMap[date].orders += 1;
			if (o.status === "DELIVERED") dailyMap[date].revenue += o.total;
		});

		return Array.from({ length: 30 }, (_, i) => {
			const d = new Date();
			d.setDate(d.getDate() - (29 - i));
			const key = d.toISOString().split("T")[0];
			const dayData = dailyMap[key] || { revenue: 0, orders: 0 };
			return { date: key, revenue: dayData.revenue, orders: dayData.orders, visitors: 0, conversionRate: 0 };
		});
	}, [state.orders]);

	const hasRealData = state.orders.length > 0;
	const chartData = hasRealData ? derivedTimeSeries : DUMMY_SALES_TIMESERIES;

	return (
		<WidgetCard title={`Revenue Over Time ${!hasRealData ? "(Sample Data)" : ""}`} sx={{ height: 400 }}>
			<RevenueAreaChart data={chartData} />
		</WidgetCard>
	);
});

export default RevenueChart;
