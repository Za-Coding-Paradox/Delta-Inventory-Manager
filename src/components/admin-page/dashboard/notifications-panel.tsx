// src/components/admin-page/dashboard/notifications-panel.tsx
import { Box, Card, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, alpha, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { formatDistanceToNow } from "date-fns";
import { useAppContext } from "../../../context/app-context";
import type { AdminNotification } from "../../../config/types";
import { motion, AnimatePresence } from "framer-motion";

function NotifIcon({ type }: { type: AdminNotification["type"] }) {
	if (type === "ALERT") return <ErrorRoundedIcon sx={{ color: "error.main" }} />;
	if (type === "SUCCESS") return <CheckCircleRoundedIcon sx={{ color: "success.main" }} />;
	return <InfoRoundedIcon sx={{ color: "info.main" }} />;
}

export default function NotificationsPanel() {
	const { state, dispatch } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	return (
		<Card variant="widget" sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<NotificationsRoundedIcon sx={{ color: "text.secondary" }} />
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						Recent Notifications
					</Typography>
				</Box>
			</Box>
			<Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
				{state.notifications.length === 0 ? (
					<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
						No new notifications
					</Typography>
				) : (
					<List disablePadding>
						<AnimatePresence>
							{state.notifications.slice(0, 10).map((notif) => (
								<motion.div
									key={notif.id}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.2 }}
								>
									<ListItem
										sx={{
											p: 1.5,
											mb: 1,
											borderRadius: "12px",
											backgroundColor: notif.read ? "transparent" : alpha(theme.palette.primary.main, isDark ? 0.1 : 0.05),
											border: `1px solid ${notif.read ? theme.palette.divider : alpha(theme.palette.primary.main, 0.2)}`,
											alignItems: "flex-start",
										}}
									>
										<ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
											<NotifIcon type={notif.type} />
										</ListItemIcon>
										<ListItemText
											primaryTypographyProps={{ component: "div" }}
											secondaryTypographyProps={{ component: "div" }}
											primary={
												<Typography variant="body2" sx={{ fontWeight: notif.read ? 500 : 700 }} color="text.primary">
													{notif.message}
												</Typography>
											}
											secondary={
												<Typography variant="caption" color="text.secondary">
													{formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
												</Typography>
											}
										/>
										<Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
											{!notif.read && (
												<Tooltip title="Mark as read">
													<IconButton
														size="small"
														onClick={() => dispatch({ type: "MARK_NOTIFICATION_READ", payload: notif.id })}
													>
														<CheckRoundedIcon fontSize="small" />
													</IconButton>
												</Tooltip>
											)}
										</Box>
									</ListItem>
								</motion.div>
							))}
						</AnimatePresence>
					</List>
				)}
			</Box>
		</Card>
	);
}
