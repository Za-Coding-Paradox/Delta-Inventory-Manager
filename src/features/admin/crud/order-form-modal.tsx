import { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Box,
	MenuItem,
	Typography,
	IconButton,
	Autocomplete,
} from "@mui/material";
import { DeleteRounded as DeleteRoundedIcon } from "@mui/icons-material";
import { useAppContext } from "../../../context/app-context";
import type { Order, OrderItem, Product, OrderStatus } from "../../../config/types";

interface OrderFormModalProps {
	open: boolean;
	order: Order | null;
	onClose: () => void;
}

export default function OrderFormModal({ open, order, onClose }: OrderFormModalProps) {
	const { state, dispatch } = useAppContext();

	const [customerName, setCustomerName] = useState("");
	const [status, setStatus] = useState<OrderStatus>("PENDING");
	const [deliveryType, setDeliveryType] = useState<"standard" | "express">("standard");
	const [items, setItems] = useState<OrderItem[]>([]);

	useEffect(() => {
		if (open) {
			if (order) {
				setCustomerName(order.customerName);
				setStatus(order.status);
				setDeliveryType(order.deliveryType);
				setItems(order.items);
			} else {
				setCustomerName("");
				setStatus("PENDING");
				setDeliveryType("standard");
				setItems([]);
			}
		}
	}, [open, order]);

	const total = items.reduce((acc, item) => acc + item.priceAtOrder * item.quantity, 0);

	const handleAddItem = (product: Product | null) => {
		if (!product) return;
		const newItem: OrderItem = {
			productId: product.id,
			productName: product.name,
			selectedColorName: product.colors?.[0]?.name || "Default",
			quantity: 1,
			priceAtOrder: product.price,
		};
		setItems((prev) => [...prev, newItem]);
	};

	const handleUpdateItemQty = (index: number, quantity: number) => {
		const newItems = [...items];
		newItems[index].quantity = Math.max(1, quantity);
		setItems(newItems);
	};

	const handleRemoveItem = (index: number) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!customerName.trim() || items.length === 0) return;

		if (order) {
			const updatedOrder: Order = {
				...order,
				customerName,
				status,
				deliveryType,
				items,
				total,
			};
			dispatch({ type: "UPDATE_ORDER", payload: updatedOrder });
		} else {
			const newOrder: Order = {
				id: `ord_${Date.now().toString(36)}`,
				customerName,
				status,
				deliveryType,
				items,
				total,
				timestamp: new Date().toISOString(),
				deliveryDate: null,
			};
			dispatch({ type: "PLACE_ORDER", payload: newOrder });
		}
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ "& .MuiDialog-paper": { borderRadius: "16px" } }}>
			<form onSubmit={handleSubmit}>
				<DialogTitle sx={{ fontWeight: 800 }}>
					{order ? "Edit Order" : "Create New Order"}
				</DialogTitle>
				<DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
					<TextField
						label="Customer Name"
						fullWidth
						required
						value={customerName}
						onChange={(e) => setCustomerName(e.target.value)}
					/>
					<Box sx={{ display: "flex", gap: 2 }}>
						<TextField
							select
							label="Status"
							fullWidth
							value={status}
							onChange={(e) => setStatus(e.target.value as OrderStatus)}
						>
							{["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
								<MenuItem key={s} value={s}>{s}</MenuItem>
							))}
						</TextField>
						<TextField
							select
							label="Delivery Type"
							fullWidth
							value={deliveryType}
							onChange={(e) => setDeliveryType(e.target.value as "standard" | "express")}
						>
							<MenuItem value="standard">Standard</MenuItem>
							<MenuItem value="express">Express</MenuItem>
						</TextField>
					</Box>

					<Box>
						<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Order Items</Typography>
						<Autocomplete
							options={state.products}
							getOptionLabel={(option) => option.name}
							onChange={(_, newValue) => handleAddItem(newValue)}
							renderInput={(params) => <TextField {...params} label="Add Product..." size="small" />}
							sx={{ mb: 2 }}
						/>
						{items.map((item, idx) => (
							<Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
								<Typography variant="body2" sx={{ flex: 1, fontWeight: 600 }}>
									{item.productName}
								</Typography>
								<TextField
									type="number"
									size="small"
									sx={{ width: 80 }}
									value={item.quantity}
									onChange={(e) => handleUpdateItemQty(idx, parseInt(e.target.value) || 1)}
									slotProps={{ htmlInput: { min: 1 } }}
								/>
								<Typography variant="body2" sx={{ width: 80, textAlign: "right" }}>
									${(item.priceAtOrder * item.quantity).toFixed(2)}
								</Typography>
								<IconButton size="small" color="error" onClick={() => handleRemoveItem(idx)}>
									<DeleteRoundedIcon fontSize="small" />
								</IconButton>
							</Box>
						))}
						{items.length === 0 && (
							<Typography variant="caption" color="error">
								Must add at least one item.
							</Typography>
						)}
					</Box>

					<Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
						<Typography variant="h6" sx={{ fontWeight: 800 }}>
							Total: ${total.toFixed(2)}
						</Typography>
					</Box>
				</DialogContent>
				<DialogActions sx={{ p: 2, px: 3 }}>
					<Button onClick={onClose} variant="outlined" sx={{ borderRadius: "8px" }}>Cancel</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={!customerName.trim() || items.length === 0}
						sx={{ borderRadius: "8px" }}
					>
						{order ? "Save Changes" : "Create Order"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
