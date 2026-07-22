import { useCallback } from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../context/app-context";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";
import React from "react";

export const QuickActionsWidget = React.memo(function QuickActionsWidget() {
	const navigate = useNavigate();
	const { dispatch } = useAppContext();

	const handleGenerateReport = useCallback(() => {
		dispatch({
			type: "ADD_NOTIFICATION",
			payload: {
				id: `notif_${Date.now()}`,
				type: "SUCCESS",
				message: "Weekly Analytics Report Generated",
				timestamp: new Date().toISOString(),
				read: false,
			}
		});
	}, [dispatch]);

	const navNewOrder = useCallback(() => navigate("/"), [navigate]);
	const navInventory = useCallback(() => navigate("/admin/products"), [navigate]);

	return (
		<WidgetCard title="Quick Actions">
			<Stack spacing={1.5}>
				<Button variant="contained" size="medium" sx={{ borderRadius: "10px", justifyContent: "flex-start", px: 2 }} onClick={navNewOrder}>
					Create New Order
				</Button>
				<Button variant="outlined" size="medium" sx={{ borderRadius: "10px", justifyContent: "flex-start", px: 2 }} onClick={navInventory}>
					Update Inventory
				</Button>
				<Button variant="outlined" size="medium" sx={{ borderRadius: "10px", justifyContent: "flex-start", px: 2 }} onClick={handleGenerateReport}>
					Generate Report
				</Button>
			</Stack>
		</WidgetCard>
	);
});
