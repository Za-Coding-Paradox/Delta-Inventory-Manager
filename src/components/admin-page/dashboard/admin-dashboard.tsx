// src/components/admin-page/dashboard/admin-dashboard.tsx
import { Box } from "@mui/material";
import KpiCards from "./kpi-cards";
import CalendarWidget from "./calendar-widget";
import NotificationsPanel from "./notifications-panel";
import SupplyChainAlerts from "./supply-chain-alerts";

export default function AdminDashboard() {
	return (
		<Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3 }}>
			<Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 3, alignItems: "stretch" }}>
				<Box sx={{ flex: { xs: "none", lg: 2 } }}>
					<KpiCards />
				</Box>
				<Box sx={{ flex: { xs: "none", lg: 1 }, display: "flex" }}>
					<CalendarWidget />
				</Box>
			</Box>
			<Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, alignItems: "stretch" }}>
				<NotificationsPanel />
				<SupplyChainAlerts />
			</Box>
		</Box>
	);
}
