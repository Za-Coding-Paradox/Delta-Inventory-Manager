// src/components/admin-page/crud/order-manager.tsx
import { useState } from "react";
import {
	Box,
	Card,
	Typography,
	Button,
	IconButton,
	TextField,
	Menu,
	MenuItem,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
	SearchRounded as SearchRoundedIcon,
	FilterListRounded as FilterListRoundedIcon,
	AddRounded as AddRoundedIcon,
	EditRounded as EditRoundedIcon,
	DeleteRounded as DeleteRoundedIcon,
} from "@mui/icons-material";
import { useAppContext } from "../../../context/app-context";
import type { Order } from "../../../config/types";
import OrderFormModal from "./order-form-modal";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function OrderManager() {
	const { state, dispatch } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<string | null>(null);
	const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

	const [formOpen, setFormOpen] = useState(false);
	const [editingOrder, setEditingOrder] = useState<Order | null>(null);
	
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

	const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

	const filteredOrders = state.orders.filter((o) => {
		if (!o) return false;
		const customerName = o.customerName || "";
		const id = o.id || "";
		const searchLower = search.toLowerCase();
		const matchesSearch = customerName.toLowerCase().includes(searchLower) || 
							  id.toLowerCase().includes(searchLower);
		const matchesStatus = statusFilter ? o.status === statusFilter : true;
		
		return matchesSearch && matchesStatus;
	});

	const handleOpenForm = (order: Order | null = null) => {
		setEditingOrder(order);
		setFormOpen(true);
	};

	const handleDeleteRequest = (order: Order) => {
		setOrderToDelete(order);
		setDeleteConfirmOpen(true);
	};

	const handleConfirmDelete = () => {
		if (orderToDelete) {
			dispatch({ type: "DELETE_ORDER", payload: orderToDelete.id });
			setDeleteConfirmOpen(false);
			setOrderToDelete(null);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "DELIVERED": return "success";
			case "SHIPPED": return "info";
			case "PROCESSING": return "warning";
			case "CANCELLED": return "error";
			default: return "default";
		}
	};

	return (
		<Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
			<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
				<Box>
					<Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
						Order Manager
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Manage customer orders, track statuses, and issue manual updates.
					</Typography>
				</Box>
				<Button
					variant="contained"
					startIcon={<AddRoundedIcon />}
					onClick={() => handleOpenForm()}
					sx={{ borderRadius: "10px", px: 3, py: 1 }}
				>
					Create Order
				</Button>
			</Box>

			<Card variant="widget" sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", p: 0 }}>
				{/* Toolbar */}
				<Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, display: "flex", gap: 2, alignItems: "center" }}>
					<TextField
						placeholder="Search by customer or ID..."
						size="small"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						sx={{ width: 280 }}
						slotProps={{
							input: {
								startAdornment: <SearchRoundedIcon color="action" fontSize="small" sx={{ mr: 1 }} />,
							}
						}}
					/>
					<Button
						variant="outlined"
						size="small"
						startIcon={<FilterListRoundedIcon />}
						onClick={(e) => setFilterAnchorEl(e.currentTarget)}
						sx={{ borderRadius: "10px", borderColor: statusFilter ? theme.palette.primary.main : undefined }}
					>
						{statusFilter || "All Statuses"}
					</Button>
					<Menu
						anchorEl={filterAnchorEl}
						open={Boolean(filterAnchorEl)}
						onClose={() => setFilterAnchorEl(null)}
					>
						<MenuItem onClick={() => { setStatusFilter(null); setFilterAnchorEl(null); }}>
							All Statuses
						</MenuItem>
						{statuses.map((s) => (
							<MenuItem key={s} onClick={() => { setStatusFilter(s); setFilterAnchorEl(null); }}>
								{s}
							</MenuItem>
						))}
					</Menu>
					<Box sx={{ flexGrow: 1 }} />
					<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
						Showing {filteredOrders.length} of {state.orders.length} orders
					</Typography>
				</Box>

				{/* Custom Table */}
				<Box sx={{ flex: 1, overflow: "auto" }}>
					<Box sx={{ minWidth: 900 }}>
						<Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1.5fr 80px", p: 2, borderBottom: `1px solid ${theme.palette.divider}`, backgroundColor: isDark ? "#141414" : "#F8F8F8" }}>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Order ID</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Customer</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Total</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Status</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Date</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary" align="right">Actions</Typography>
						</Box>

						<AnimatePresence>
							{filteredOrders.map((order) => (
								<motion.div
									key={order.id}
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Box
										sx={{
											display: "grid",
											gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1.5fr 80px",
											p: 2,
											alignItems: "center",
											borderBottom: `1px solid ${theme.palette.divider}`,
											"&:hover": {
												backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.05 : 0.02),
											},
										}}
									>
										<Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "monospace" }}>
											#{order.id.slice(-6).toUpperCase()}
										</Typography>
										<Typography variant="body2" sx={{ fontWeight: 700 }}>
											{order.customerName}
										</Typography>
										<Typography variant="body2" sx={{ fontWeight: 600 }}>
											${order.total.toFixed(2)}
										</Typography>
										<Box>
											<Chip
												variant="status"
												color={getStatusColor(order.status) as any}
												label={order.status}
											/>
										</Box>
										<Typography variant="body2" color="text.secondary">
											{format(new Date(order.timestamp), "MMM dd, yyyy HH:mm")}
										</Typography>
										<Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
											<IconButton size="small" onClick={() => handleOpenForm(order)}>
												<EditRoundedIcon fontSize="small" />
											</IconButton>
											<IconButton size="small" color="error" onClick={() => handleDeleteRequest(order)}>
												<DeleteRoundedIcon fontSize="small" />
											</IconButton>
										</Box>
									</Box>
								</motion.div>
							))}
						</AnimatePresence>

						{filteredOrders.length === 0 && (
							<Box sx={{ p: 8, textAlign: "center" }}>
								<Typography variant="body1" color="text.secondary">
									No orders found matching your search.
								</Typography>
							</Box>
						)}
					</Box>
				</Box>
			</Card>

			<OrderFormModal
				open={formOpen}
				order={editingOrder}
				onClose={() => setFormOpen(false)}
			/>

			{/* Delete Confirmation */}
			<Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} sx={{ '& .MuiDialog-paper': { borderRadius: "16px" } }}>
				<DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to permanently delete order <strong>#{orderToDelete?.id.slice(-6).toUpperCase()}</strong>? This action cannot be undone and will not restock items.
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ p: 2, px: 3 }}>
					<Button onClick={() => setDeleteConfirmOpen(false)} variant="outlined" sx={{ borderRadius: "8px" }}>Cancel</Button>
					<Button onClick={handleConfirmDelete} color="error" variant="contained" sx={{ borderRadius: "8px" }}>Delete Order</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
