import { Typography } from "@mui/material";
import { WidgetCard } from "../../../components/data-display/WidgetCard";
import { useReturnsRate } from "./hooks/use-returns-rate";
import { ReturnsLineChart } from "./components/returns-line-chart";
import React from "react";

export default function ReturnsRateChart() {
	const { data, avgRate } = useReturnsRate();

	return (
		<WidgetCard
			title="Returns Rate"
			sx={{ height: "100%" }}
			contentSx={{ display: "flex", flexDirection: "column", minHeight: 250 }}
		>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				Monthly cancellation rate · Avg: {avgRate}%
			</Typography>
			<div style={{ flex: 1, minHeight: 0 }}>
				<ReturnsLineChart data={data} />
			</div>
		</WidgetCard>
	);
}
