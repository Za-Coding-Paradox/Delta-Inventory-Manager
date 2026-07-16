// src/components/admin-page/admin-topbar.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Badge,
	Box,
	Popover,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Button,
	Chip,
	Divider,
	Tooltip,
	alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { formatDistanceToNow } from "date-fns";
import { useAppContext } from "../../context/app-context";
import type { AdminNotification } from "../../config/types";
import { motion, AnimatePresence } from "framer-motion";

interface AdminTopbarProps {
	collapsed: boolean;
	onToggleSidebar: () => void;
	sectionTitle: string;
}

function NotifIcon({ type }: { type: AdminNotification["type"] }) {
	if (type === "ALERT") return <ErrorRoundedIcon sx={{ color: "error.main", fontSize: "1.1rem" }} />;
	if (type === "SUCCESS") return <CheckCircleRoundedIcon sx={{ color: "success.main", fontSize: "1.1rem" }} />;
	return <InfoRoundedIcon sx={{ color: "info.main", fontSize: "1.1rem" }} />;
}

export default function AdminTopbar({ collapsed, onToggleSidebar, sectionTitle }: AdminTopbarProps) {
	const { state, dispatch } = useAppContext();
	const theme = useTheme();
	const navigate = useNavigate();
	const [notifAnchor, setNotifAnchor] = useState<HTMLElement | null>(null);

	const unreadCount = state.notifications.filter((n) => !n.read).length;

	return (
		<AppBar
			position="sticky"
			elevation={0}
			sx={{
				backgroundColor: alpha(
					theme.palette.background.paper,
					theme.palette.mode === "dark" ? 0.85 : 0.92,
				),
				backdropFilter: "blur(16px)",
				borderBottom: `1px solid ${theme.palette.divider}`,
				borderRadius: 0,
				"&::after": { display: "none" },
			}}
		>
			<Toolbar sx={{ gap: 1.5 }}>
				{/* Sidebar Toggle */}
				<Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
					<IconButton onClick={onToggleSidebar} size="small" color="inherit">
						{collapsed ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
					</IconButton>
				</Tooltip>

				{/* Section Title */}
				<AnimatePresence mode="wait">
					<motion.div
						key={sectionTitle}
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{ duration: 0.2 }}
					>
						<Typography
							variant="h6"
							sx={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.3px" }}
						>
							{sectionTitle}
						</Typography>
					</motion.div>
				</AnimatePresence>

				<Box sx={{ flexGrow: 1 }} />

				{/* Go to Store */}
				<Button
					variant="outlined"
					size="small"
					startIcon={<StorefrontRoundedIcon />}
					onClick={() => navigate("/")}
					sx={{ borderRadius: "10px", fontSize: "0.8rem", display: { xs: "none", sm: "flex" } }}
				>
					View Store
				</Button>

				{/* Theme Toggle */}
				<Tooltip title="Toggle theme">
					<IconButton
						onClick={() => dispatch({ type: "TOGGLE_THEME" })}
						color="inherit"
						sx={{
							backgroundColor: alpha(theme.palette.text.primary, 0.04),
							"&:hover": { backgroundColor: alpha(theme.palette.text.primary, 0.08) },
						}}
					>
						{state.theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
					</IconButton>
				</Tooltip>

				{/* Notifications */}
				<Tooltip title="Notifications">
					<IconButton
						onClick={(e) => setNotifAnchor(e.currentTarget)}
						color="inherit"
						sx={{
							backgroundColor: alpha(theme.palette.text.primary, 0.04),
							"&:hover": { backgroundColor: alpha(theme.palette.text.primary, 0.08) },
						}}
					>
						<Badge
							badgeContent={unreadCount}
							sx={{
								"& .MuiBadge-badge": {
									backgroundColor: theme.palette.error.main,
									color: "#fff",
									animation: unreadCount > 0 ? "pop 0.3s ease-in-out" : "none",
								},
							}}
						>
							<NotificationsRoundedIcon />
						</Badge>
					</IconButton>
				</Tooltip>

				{/* Notification Popover */}
				<Popover
					open={Boolean(notifAnchor)}
					anchorEl={notifAnchor}
					onClose={() => setNotifAnchor(null)}
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					transformOrigin={{ vertical: "top", horizontal: "right" }}
					slotProps={{
						paper: {
							sx: {
								width: 360,
								maxHeight: 480,
								overflow: "hidden",
								display: "flex",
								flexDirection: "column",
							},
						}
					}}
				>
					<Box
						sx={{
							px: 2,
							py: 1.5,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							borderBottom: `1px solid ${theme.palette.divider}`,
						}}
					>
						<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
							Notifications
						</Typography>
						<Box sx={{ display: "flex", gap: 1 }}>
							<Button
								size="small"
								onClick={() => {
									state.notifications.forEach((n) =>
										dispatch({ type: "MARK_NOTIFICATION_READ", payload: n.id }),
									);
								}}
								sx={{ fontSize: "0.75rem" }}
							>
								Mark all read
							</Button>
							<Button
								size="small"
								color="error"
								onClick={() => dispatch({ type: "CLEAR_NOTIFICATIONS" })}
								sx={{ fontSize: "0.75rem" }}
							>
								Clear all
							</Button>
						</Box>
					</Box>
					<Box sx={{ overflowY: "auto", flex: 1 }}>
						{state.notifications.length === 0 ? (
							<Box sx={{ p: 4, textAlign: "center" }}>
								<Typography variant="body2" color="text.secondary">
									No notifications
								</Typography>
							</Box>
						) : (
							<List disablePadding>
								{state.notifications.map((notif, idx) => (
									<Box key={notif.id}>
										<ListItem
											alignItems="flex-start"
											sx={{
												py: 1.5,
												px: 2,
												backgroundColor: notif.read
													? "transparent"
													: alpha(theme.palette.primary.main, 0.04),
												cursor: "pointer",
												"&:hover": {
													backgroundColor: alpha(theme.palette.text.primary, 0.03),
												},
											}}
											onClick={() =>
												dispatch({
													type: "MARK_NOTIFICATION_READ",
													payload: notif.id,
												})
											}
										>
											<ListItemIcon sx={{ minWidth: 32, mt: 0.3 }}>
												<NotifIcon type={notif.type} />
											</ListItemIcon>
											<ListItemText
												primary={
													<Typography sx={{ fontSize: "0.85rem", fontWeight: notif.read ? 400 : 600, lineHeight: 1.4 }}>
														{notif.message}
													</Typography>
												}
												secondary={
													<Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
														{formatDistanceToNow(new Date(notif.timestamp), {
															addSuffix: true,
														})}
													</Typography>
												}
											/>
											{!notif.read && (
												<Box
													sx={{
														width: 8,
														height: 8,
														borderRadius: "50%",
														backgroundColor: theme.palette.primary.main,
														flexShrink: 0,
														mt: 0.5,
													}}
												/>
											)}
										</ListItem>
										{idx < state.notifications.length - 1 && (
											<Divider sx={{ mx: 2 }} />
										)}
									</Box>
								))}
							</List>
						)}
					</Box>
					<Box
						sx={{
							p: 1.5,
							borderTop: `1px solid ${theme.palette.divider}`,
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Chip
							label={`${unreadCount} unread`}
							size="small"
							color={unreadCount > 0 ? "error" : "default"}
							variant="outlined"
						/>
					</Box>
				</Popover>
			</Toolbar>
		</AppBar>
	);
}
