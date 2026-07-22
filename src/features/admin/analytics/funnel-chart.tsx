import { WidgetCard } from "../../../components/data-display/WidgetCard";
import { useFunnelData } from "./hooks/use-funnel-data";
import { FunnelComposedChart } from "./components/funnel-composed-chart";
import React from "react";

export default function FunnelChart() {
	const data = useFunnelData();

	return (
		<WidgetCard title="Sales Funnel" sx={{ height: 400 }}>
			<div style={{ flex: 1, minHeight: 0, height: "100%" }}>
				<FunnelComposedChart data={data} />
			</div>
		</WidgetCard>
	);
}
