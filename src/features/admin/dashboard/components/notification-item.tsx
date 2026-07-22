import { ListItem, ListItemIcon, Box, Typography, Tooltip, IconButton, alpha, useTheme } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { formatDistanceToNow } from "date-fns";
import type { AdminNotification } from "../../../../config/types";
import { memo } from "react";
import { motion } from "framer-motion";

function NotifIcon({ type }: { type: AdminNotification["type"] }) {
	if (type === "ALERT") return <ErrorRoundedIcon sx={{ color: "error.main" }} />;
	if (type === "SUCCESS") return <CheckCircleRoundedIcon sx={{ color: "success.main" }} />;
	return <InfoRoundedIcon sx={{ color: "info.main" }} />;
}

export const NotificationItem = memo(({ notif, onRead }: { notif: AdminNotification; onRead: (id: string) => void }) => {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";
	return (
		<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
			<ListItem sx={{
				p: 1.5, mb: 1, borderRadius: "12px",
				backgroundColor: notif.read ? "transparent" : alpha(theme.palette.primary.main, isDark ? 0.1 : 0.05),
				border: `1px solid ${notif.read ? theme.palette.divider : alpha(theme.palette.primary.main, 0.2)}`,
				alignItems: "flex-start", boxShadow: notif.read ? "none" : theme.shadows[1],
				transition: "background-color 0.2s, box-shadow 0.2s",
				"&:hover": { backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.15 : 0.08) }
			}}>
				<ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}><NotifIcon type={notif.type} /></ListItemIcon>
				<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
					<Typography variant="body2" sx={{ fontWeight: notif.read ? 500 : 700 }} color="text.primary">{notif.message}</Typography>
					<Typography variant="caption" color="text.secondary">{formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}</Typography>
				</Box>
				{!notif.read && (
					<Tooltip title="Mark as read">
						<IconButton size="small" onClick={() => onRead(notif.id)}><CheckRoundedIcon fontSize="small" /></IconButton>
					</Tooltip>
				)}
			</ListItem>
		</motion.div>
	);
});
