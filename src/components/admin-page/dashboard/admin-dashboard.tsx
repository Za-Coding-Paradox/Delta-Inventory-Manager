// src/components/admin-page/dashboard/admin-dashboard.tsx
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import AggregatesWidget from "./kpi-cards";
import CalendarWidget from "./calendar-widget";
import NotificationsPanel from "./notifications-panel";
import SupplyChainAlerts from "./supply-chain-alerts";
import { SystemHealthWidget, OrdersWidget, MessagesWidget, ReviewsWidget, QuickActionsWidget } from "./widgets";

export default function AdminDashboard() {
	return (
		<Box sx={{ p: { xs: 2, md: 4 } }}>
			<Grid container spacing={3}>
				{/* Left Column: Aggregates, Notifications, Health */}
				<Grid size={{ xs: 12, lg: 3 }}>
					<Stack spacing={3} sx={{ height: "100%" }}>
						<AggregatesWidget />
						<NotificationsPanel />
						<Box sx={{ flexGrow: 1 }} />
						<QuickActionsWidget />
					</Stack>
				</Grid>

				{/* Right Area */}
				<Grid size={{ xs: 12, lg: 9 }}>
					<Grid container spacing={3}>
						
						{/* Top Section */}
						<Grid size={{ xs: 12 }}>
							<Grid container spacing={3}>
								{/* Middle Column (Orders, Reviews, Messages) */}
								<Grid size={{ xs: 12, lg: 8 }}>
									<Stack spacing={3} sx={{ height: "100%" }}>
										{/* Orders and Reviews side-by-side */}
										<Grid container spacing={3}>
											<Grid size={{ xs: 12, sm: 6 }}>
												<OrdersWidget />
											</Grid>
											<Grid size={{ xs: 12, sm: 6 }}>
												<ReviewsWidget />
											</Grid>
										</Grid>
										{/* Messages spanning full width below Orders & Reviews */}
										<MessagesWidget />
									</Stack>
								</Grid>

								{/* Far Right Column (Calendar and System Health) */}
								<Grid size={{ xs: 12, lg: 4 }}>
									<Stack spacing={3} sx={{ height: "100%" }}>
										<CalendarWidget />
										<SystemHealthWidget />
									</Stack>
								</Grid>
							</Grid>
						</Grid>

						{/* Bottom Section: Supply Chain */}
						<Grid size={{ xs: 12 }}>
							<SupplyChainAlerts />
						</Grid>
						
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}
