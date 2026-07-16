import { Box, Card, Typography, IconButton, Stack, Chip, Button, alpha, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../../context/app-context";
import MessagesModal from "./messages-modal";
import ReviewsModal from "./reviews-modal";

export function SystemHealthWidget() {
	const { state } = useAppContext();

	// Derive health from live state: more CRITICAL supply chain nodes = worse health
	const criticalNodes = state.supplyChainNodes.filter((n) => n.data.status === "CRITICAL").length;
	const delayedNodes = state.supplyChainNodes.filter((n) => n.data.status === "DELAYED").length;
	
	// DB load proxy: based on interaction metrics
	const dbLoad = Math.min(99, 15 + state.orders.length * 1.5 + state.cart.length * 2 + state.notifications.length * 0.8);
	// API latency proxy: increases with critical supply chain nodes
	const apiLatency = 8 + criticalNodes * 6 + delayedNodes * 3;
	// Overall status
	const overallStatus = criticalNodes >= 2 ? "Degraded" : criticalNodes >= 1 ? "Warning" : "Optimal";
	const statusColor: "success" | "warning" | "error" = criticalNodes >= 2 ? "error" : criticalNodes >= 1 ? "warning" : "success";
	const [uptimeSeconds, setUptimeSeconds] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setUptimeSeconds(prev => prev + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const formatTime = (totalSeconds: number) => {
		const h = Math.floor(totalSeconds / 3600);
		const m = Math.floor((totalSeconds % 3600) / 60);
		const s = totalSeconds % 60;
		return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
	};

	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", display: "flex", flexDirection: "column", gap: 2 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6" sx={{ fontWeight: 800 }}>System Health</Typography>
				<Chip label={overallStatus} color={statusColor} size="small" sx={{ fontWeight: 700 }} />
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
				<Typography variant="body2" color="text.secondary">Server Uptime</Typography>
				<Typography variant="body1" sx={{ fontWeight: 700 }}>{formatTime(uptimeSeconds)}</Typography>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="body2" color="text.secondary">Database Load</Typography>
				<Typography variant="body1" sx={{ fontWeight: 700, color: dbLoad > 70 ? "warning.main" : "text.primary" }}>
					{Math.round(dbLoad)}%
				</Typography>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="body2" color="text.secondary">API Latency</Typography>
				<Typography variant="body1" sx={{ fontWeight: 700, color: apiLatency > 30 ? "warning.main" : "text.primary" }}>
					{apiLatency}ms
				</Typography>
			</Box>
		</Card>
	);
}

export function OrdersWidget() {
	const { state } = useAppContext();

	// Derive order counts from live orders state
	const currentOrders = state.orders.filter(
		(o) => o.status === "PENDING" || o.status === "PROCESSING" || o.status === "SHIPPED"
	).length;
	const totalCompleted = state.orders.filter((o) => o.status === "DELIVERED").length;
	const totalCancelled = state.orders.filter((o) => o.status === "CANCELLED").length;

	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", height: "100%" }}>
			<Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Orders Overview</Typography>
			<Stack spacing={2.5}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Box sx={{ p: 1, borderRadius: "12px", backgroundColor: (t) => alpha(t.palette.primary.main, 0.1), color: "primary.main" }}>
						<LocalShippingRoundedIcon />
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Active (In Progress)</Typography>
						<Typography variant="h6" sx={{ fontWeight: 800 }}>
							{currentOrders.toLocaleString()}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Box sx={{ p: 1, borderRadius: "12px", backgroundColor: (t) => alpha(t.palette.success.main, 0.1), color: "success.main" }}>
						<DoneAllRoundedIcon />
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Total Completed</Typography>
						<Typography variant="h6" sx={{ fontWeight: 800 }}>
							{totalCompleted.toLocaleString()}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Box sx={{ p: 1, borderRadius: "12px", backgroundColor: (t) => alpha(t.palette.error.main, 0.1), color: "error.main" }}>
						<CancelRoundedIcon />
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Cancelled</Typography>
						<Typography variant="h6" sx={{ fontWeight: 800 }}>
							{totalCancelled.toLocaleString()}
						</Typography>
					</Box>
				</Box>
			</Stack>
		</Card>
	);
}

export function MessagesWidget() {
	const [modalOpen, setModalOpen] = useState(false);
	const { state } = useAppContext();

	return (
		<>
			<Card elevation={0} sx={{ p: 3, borderRadius: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
					<Typography variant="h6" sx={{ fontWeight: 800 }}>Messages</Typography>
					<IconButton size="small" onClick={() => setModalOpen(true)}><MoreVertIcon /></IconButton>
				</Box>
				<Box sx={{ flex: 1, maxHeight: 170, overflowY: "auto", pr: 1 }}>
					<Stack spacing={2}>
						{state.messages.slice(0, 10).map((msg) => (
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
				</Box>
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
	const { state } = useAppContext();

	// Compute average rating from live reviews state
	const avgRating = state.reviews.length > 0
		? (state.reviews.reduce((sum, r) => sum + r.rating, 0) / state.reviews.length)
		: 0;

	// Build weekly sparkline data from reviews (last 7 days)
	const sparklineData = Array.from({ length: 7 }, (_, i) => {
		const dayStart = new Date();
		dayStart.setDate(dayStart.getDate() - (6 - i));
		dayStart.setHours(0, 0, 0, 0);
		const dayEnd = new Date(dayStart);
		dayEnd.setHours(23, 59, 59, 999);

		const dayReviews = state.reviews.filter((r) => {
			const ts = new Date(r.timestamp);
			return ts >= dayStart && ts <= dayEnd;
		});
		const dayAvg = dayReviews.length > 0
			? dayReviews.reduce((sum, r) => sum + r.rating, 0) / dayReviews.length
			: null;
		// If no reviews that day, use overall average as baseline
		return { day: i, rating: dayAvg ?? avgRating };
	});

	return (
		<>
			<Card elevation={0} sx={{ p: 3, borderRadius: "20px", display: "flex", flexDirection: "column", height: "100%" }}>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
					<Box>
						<Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>Store Reviews</Typography>
						<Typography variant="body2" color="text.secondary">
							{state.reviews.length} total · Avg: {avgRating.toFixed(1)} / 5.0
						</Typography>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, backgroundColor: (t) => alpha(t.palette.warning.main, 0.1), p: 1, borderRadius: "12px" }}>
						<StarRoundedIcon color="warning" />
						<Typography variant="h6" sx={{ fontWeight: 800, color: "warning.dark" }}>
							{avgRating.toFixed(1)}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ flex: 1, minHeight: 60, mt: 1, mb: 2 }}>
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={sparklineData}>
							<Line type="monotone" dataKey="rating" stroke={theme.palette.warning.main} strokeWidth={3} dot={false} />
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
	const navigate = useNavigate();
	const { dispatch } = useAppContext();

	const handleGenerateReport = () => {
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
	};

	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", display: "flex", flexDirection: "column", gap: 2 }}>
			<Typography variant="h6" sx={{ fontWeight: 800 }}>Quick Actions</Typography>
			<Stack spacing={1.5}>
				<Button variant="contained" size="medium" sx={{ borderRadius: "10px", justifyContent: "flex-start", px: 2 }} onClick={() => navigate("/")}>
					Create New Order
				</Button>
				<Button variant="outlined" size="medium" sx={{ borderRadius: "10px", justifyContent: "flex-start", px: 2 }} onClick={() => navigate("/admin/products")}>
					Update Inventory
				</Button>
				<Button variant="outlined" size="medium" sx={{ borderRadius: "10px", justifyContent: "flex-start", px: 2 }} onClick={handleGenerateReport}>
					Generate Report
				</Button>
			</Stack>
		</Card>
	);
}

// Hook to simulate live-ish "active users" count derived from state + a ticking counter
function useLiveUserCount(baseCount: number): number {
	const [jitter, setJitter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			// Fluctuate slightly between -1 and +2 around the base, but never accumulate permanently
			setJitter(Math.floor(Math.random() * 3) - 1);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	// Never drop below 1 since the admin is always online
	return Math.max(1, baseCount + jitter);
}

export function ActiveUsersWidget() {

	const base = 1;

	const liveCount = useLiveUserCount(base);

	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", display: "flex", flexDirection: "column", gap: 2 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6" sx={{ fontWeight: 800 }}>Active Users</Typography>
				<Chip label="Live" color="success" size="small" sx={{ fontWeight: 700 }} />
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
				<PeopleAltRoundedIcon sx={{ fontSize: 40, color: "primary.main", opacity: 0.8 }} />
				<Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
					{liveCount}
				</Typography>
			</Box>
			<Typography variant="body2" color="text.secondary">
				Currently browsing the store
			</Typography>
		</Card>
	);
}
