import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Order } from "../../../../config/types";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";

export interface ActiveDeliveriesWidgetProps {
	orders: Order[];
}

export const ActiveDeliveriesWidget = React.memo(function ActiveDeliveriesWidget({ orders }: ActiveDeliveriesWidgetProps) {
	const activeCount = useMemo(() => {
		return orders.filter(o => o.status === "SHIPPED").length;
	}, [orders]);

	return (
		<WidgetCard title="Active Deliveries" contentSx={{ pb: 1 }}>
			<Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
				{activeCount}
			</Typography>
			<Typography variant="caption" color="text.secondary">In transit today</Typography>
		</WidgetCard>
	);
});
