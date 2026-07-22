import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import AggregatesWidget from "./kpi-cards";
import CalendarWidget from "./calendar-widget";
import NotificationsPanel from "./notifications-panel";
import SupplyChainAlerts from "./supply-chain-alerts";
import { SystemHealthWidget, OrdersWidget, MessagesWidget, ReviewsWidget, QuickActionsWidget, ActiveUsersWidget } from "./widgets";

export default function AdminDashboard() {
	return (
		<Box sx={{ p: { xs: 2, md: 4 } }}>
			<Grid container spacing={3}>
				<Grid size={{ xs: 12, lg: 3 }}>
					<Stack spacing={3} sx={{ height: "100%" }}>
						<AggregatesWidget />
						<NotificationsPanel />
						<ActiveUsersWidget />
						<QuickActionsWidget />
					</Stack>
				</Grid>
				<Grid size={{ xs: 12, lg: 9 }}>
					<Grid container spacing={3}>
						<Grid size={{ xs: 12 }}>
							<Grid container spacing={3}>
								<Grid size={{ xs: 12, lg: 8 }}>
									<Stack spacing={3} sx={{ height: "100%" }}>
										<Grid container spacing={3}>
											<Grid size={{ xs: 12, sm: 6 }}><OrdersWidget /></Grid>
											<Grid size={{ xs: 12, sm: 6 }}><ReviewsWidget /></Grid>
										</Grid>
										<MessagesWidget />
									</Stack>
								</Grid>
								<Grid size={{ xs: 12, lg: 4 }}>
									<Stack spacing={3} sx={{ height: "100%" }}>
										<CalendarWidget />
										<SystemHealthWidget />
									</Stack>
								</Grid>
							</Grid>
						</Grid>
						<Grid size={{ xs: 12 }}><SupplyChainAlerts /></Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}
