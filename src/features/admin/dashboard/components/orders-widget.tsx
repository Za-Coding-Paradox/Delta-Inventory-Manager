import { useMemo } from "react";
import { Stack } from "@mui/material";
import { useAppContext } from "../../../../context/app-context";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";
import { IconStatBox } from "../../../../components/data-display/IconStatBox";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import React from "react";

export const OrdersWidget = React.memo(function OrdersWidget() {
	const { state } = useAppContext();

	const stats = useMemo(() => {
		let current = 0, completed = 0, cancelled = 0;
		state.orders.forEach((o) => {
			if (o.status === "PENDING" || o.status === "PROCESSING" || o.status === "SHIPPED") current++;
			else if (o.status === "DELIVERED") completed++;
			else if (o.status === "CANCELLED") cancelled++;
		});
		return { current, completed, cancelled };
	}, [state.orders]);

	return (
		<WidgetCard title="Orders Overview" sx={{ height: "100%" }}>
			<Stack spacing={2.5}>
				<IconStatBox icon={<LocalShippingRoundedIcon />} label="Active (In Progress)" value={stats.current.toLocaleString()} color="primary" />
				<IconStatBox icon={<DoneAllRoundedIcon />} label="Total Completed" value={stats.completed.toLocaleString()} color="success" />
				<IconStatBox icon={<CancelRoundedIcon />} label="Cancelled" value={stats.cancelled.toLocaleString()} color="error" />
			</Stack>
		</WidgetCard>
	);
});
