import { Box, Typography, List } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { useAppContext } from "../../../context/app-context";
import { AnimatePresence } from "framer-motion";
import { WidgetCard } from "../../../components/data-display/WidgetCard";
import { NotificationItem } from "./components/notification-item";
import { useCallback } from "react";

export default function NotificationsPanel() {
	const { state, dispatch } = useAppContext();
	const handleRead = useCallback((id: string) => dispatch({ type: "MARK_NOTIFICATION_READ", payload: id }), [dispatch]);

	return (
		<WidgetCard
			title="Recent Notifications"
			headerAction={<NotificationsRoundedIcon sx={{ color: "text.secondary" }} />}
			sx={{ flex: 1, minHeight: 0, maxHeight: 170 }}
			contentSx={{ overflowY: "auto", pr: 1, maxHeight: 80 }}
		>
			{state.notifications.length === 0 ? (
				<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
					No new notifications
				</Typography>
			) : (
				<List disablePadding>
					<AnimatePresence>
						{state.notifications.slice(0, 10).map((notif) => (
							<NotificationItem key={notif.id} notif={notif} onRead={handleRead} />
						))}
					</AnimatePresence>
				</List>
			)}
		</WidgetCard>
	);
}
