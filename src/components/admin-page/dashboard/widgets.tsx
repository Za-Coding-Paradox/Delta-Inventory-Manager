import { Box, Card, Typography, IconButton, Stack, Chip, Button, alpha, Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../../context/app-context";
import { DUMMY_SALES_TIMESERIES } from "../../../config/constants";
import MessagesModal from "./messages-modal";
import ReviewsModal from "./reviews-modal";

export function SystemHealthWidget() {
	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", display: "flex", flexDirection: "column", gap: 2 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6" sx={{ fontWeight: 800 }}>System Health</Typography>
				<Chip label="Optimal" color="success" size="small" sx={{ fontWeight: 700 }} />
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
				<Typography variant="body2" color="text.secondary">Server Uptime</Typography>
				<Typography variant="body1" sx={{ fontWeight: 700 }}>99.9%</Typography>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="body2" color="text.secondary">Database Load</Typography>
				<Typography variant="body1" sx={{ fontWeight: 700 }}>24%</Typography>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="body2" color="text.secondary">API Latency</Typography>
				<Typography variant="body1" sx={{ fontWeight: 700 }}>12ms</Typography>
			</Box>
		</Card>
	);
}

export function OrdersWidget() {
	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", height: "100%" }}>
			<Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Orders Overview</Typography>
			<Stack spacing={2.5}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Box sx={{ p: 1, borderRadius: "12px", backgroundColor: (t) => alpha(t.palette.primary.main, 0.1), color: "primary.main" }}>
						<LocalShippingRoundedIcon />
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Current</Typography>
						<Typography variant="h6" sx={{ fontWeight: 800 }}>1,284</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Box sx={{ p: 1, borderRadius: "12px", backgroundColor: (t) => alpha(t.palette.success.main, 0.1), color: "success.main" }}>
						<DoneAllRoundedIcon />
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Total Completed</Typography>
						<Typography variant="h6" sx={{ fontWeight: 800 }}>8,502</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Box sx={{ p: 1, borderRadius: "12px", backgroundColor: (t) => alpha(t.palette.error.main, 0.1), color: "error.main" }}>
						<CancelRoundedIcon />
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Canceled</Typography>
						<Typography variant="h6" sx={{ fontWeight: 800 }}>42</Typography>
					</Box>
				</Box>
			</Stack>
		</Card>
	);
}

export function MessagesWidget() {
	const [modalOpen, setModalOpen] = useState(false);
	const { state } = useAppContext();
	const latestMessages = state.messages.slice(0, 2);

	return (
		<>
			<Card elevation={0} sx={{ p: 3, borderRadius: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
					<Typography variant="h6" sx={{ fontWeight: 800 }}>Messages</Typography>
					<IconButton size="small" onClick={() => setModalOpen(true)}><MoreVertIcon /></IconButton>
				</Box>
				<Stack spacing={2} sx={{ flex: 1 }}>
					{latestMessages.map((msg) => (
						<Box key={msg.id} sx={{ display: "flex", gap: 2, alignItems: "flex-start", opacity: msg.read ? 0.7 : 1 }}>
							<Avatar sx={{ width: 40, height: 40, bgcolor: msg.read ? "action.disabledBackground" : "primary.main", color: msg.read ? "text.secondary" : "primary.contrastText" }}>
								{msg.sender.charAt(0)}
							</Avatar>
							<Box>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<Typography variant="body2" sx={{ fontWeight: 700 }}>{msg.sender}</Typography>
									{!msg.read && <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main" }} />}
								</Box>
								<Typography variant="caption" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
									{msg.content}
								</Typography>
							</Box>
						</Box>
					))}
				</Stack>
				<Button variant="contained" fullWidth sx={{ mt: 2, borderRadius: "10px", fontWeight: 700 }} onClick={() => setModalOpen(true)}>
					View All Messages
				</Button>
			</Card>
			<MessagesModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</>
	);
}

export function ReviewsWidget() {
	const [modalOpen, setModalOpen] = useState(false);
	const theme = useTheme();

	return (
		<>
			<Card elevation={0} sx={{ p: 3, borderRadius: "20px", display: "flex", flexDirection: "column", height: "100%" }}>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
					<Box>
						<Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>Store Reviews</Typography>
						<Typography variant="body2" color="text.secondary">Current: 4.8 / Best: 5.0</Typography>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, backgroundColor: (t) => alpha(t.palette.warning.main, 0.1), p: 1, borderRadius: "12px" }}>
						<StarRoundedIcon color="warning" />
						<Typography variant="h6" sx={{ fontWeight: 800, color: "warning.dark" }}>4.8</Typography>
					</Box>
				</Box>
				<Box sx={{ flex: 1, minHeight: 60, mt: 1, mb: 2 }}>
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={DUMMY_SALES_TIMESERIES.slice(0, 7)}>
							<Line type="monotone" dataKey="revenue" stroke={theme.palette.warning.main} strokeWidth={3} dot={false} />
						</LineChart>
					</ResponsiveContainer>
				</Box>
				<Box sx={{ mt: "auto", pt: 2 }}>
					<Button variant="outlined" fullWidth color="inherit" onClick={() => setModalOpen(true)} sx={{ borderRadius: "10px", fontWeight: 700 }}>
						View Detailed Chart
					</Button>
				</Box>
			</Card>
			<ReviewsModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</>
	);
}

export function QuickActionsWidget() {
	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", display: "flex", flexDirection: "column", gap: 2 }}>
			<Typography variant="h6" sx={{ fontWeight: 800 }}>Quick Actions</Typography>
			<Stack spacing={1.5}>
				<Button variant="contained" size="medium" sx={{ borderRadius: "10px", justifyContent: "flex-start", px: 2 }}>
					Create New Order
				</Button>
				<Button variant="outlined" size="medium" sx={{ borderRadius: "10px", justifyContent: "flex-start", px: 2 }}>
					Update Inventory
				</Button>
				<Button variant="outlined" size="medium" sx={{ borderRadius: "10px", justifyContent: "flex-start", px: 2 }}>
					Generate Report
				</Button>
			</Stack>
		</Card>
	);
}

export function ActiveUsersWidget() {
	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", display: "flex", flexDirection: "column", gap: 2 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6" sx={{ fontWeight: 800 }}>Active Users</Typography>
				<Chip label="Live" color="success" size="small" sx={{ fontWeight: 700 }} />
			</Box>
			<Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
				243
			</Typography>
			<Typography variant="body2" color="text.secondary">
				Currently browsing the store
			</Typography>
		</Card>
	);
}
