import { Box, Typography, Divider, ToggleButtonGroup, ToggleButton, Paper, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CartItem } from "../../../../config/types";
import { cartItemKey } from "../../../../utils/cart-sync";
import React from "react";

interface Props {
	checkoutItems: CartItem[];
	deliveryType: string;
	setDeliveryType: (val: string) => void;
	deliveryDate: Date | null;
	setDeliveryDate: (val: Date | null) => void;
	handlePlaceOrder: () => void;
}

export const CartCheckoutStep: React.FC<Props> = ({
	checkoutItems,
	deliveryType,
	setDeliveryType,
	deliveryDate,
	setDeliveryDate,
	handlePlaceOrder,
}) => {
	return (
		<Box>
			<Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
				Checkout Details
			</Typography>
			<Divider sx={{ mb: 3 }} />

			<Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
				1. Select Delivery Type
			</Typography>
			<ToggleButtonGroup
				value={deliveryType}
				exclusive
				onChange={(_e, val) => val && setDeliveryType(val)}
				size="small"
				sx={{ mb: 4, width: "100%", display: "flex", gap: 1 }}
			>
				<ToggleButton value="standard" sx={{ flex: 1, py: 1.5, borderRadius: "12px !important" }}>
					Standard (5–7 Days)
				</ToggleButton>
				<ToggleButton value="express" sx={{ flex: 1, py: 1.5, borderRadius: "12px !important" }}>
					Express (2 Days)
				</ToggleButton>
			</ToggleButtonGroup>

			<Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
				2. Choose Delivery Date
			</Typography>
			<DatePicker
				label="Delivery Date"
				value={deliveryDate}
				onChange={(newValue) => setDeliveryDate(newValue)}
				disablePast
				slotProps={{
					textField: { size: "small", fullWidth: true, sx: { mb: 4 } },
				}}
			/>

			<Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
				3. Order Summary
			</Typography>
			<Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: "16px" }}>
				{checkoutItems.map((item) => (
					<Box
						key={cartItemKey(item.product.id, item.selectedColorName)}
						sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
					>
						<Typography variant="body2">
							{item.product.name} × {item.quantity}
						</Typography>
						<Typography variant="body2">
							${(item.product.price * item.quantity).toFixed(2)}
						</Typography>
					</Box>
				))}
				<Divider sx={{ my: 1 }} />
				<Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
					<Typography variant="body2" color="text.secondary">
						Delivery Type:
					</Typography>
					<Typography variant="body2" sx={{ textTransform: "capitalize" }}>
						{deliveryType}
					</Typography>
				</Box>
				{deliveryDate && (
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
						<Typography variant="body2" color="text.secondary">
							Delivery Date:
						</Typography>
						<Typography variant="body2">
							{deliveryDate.toLocaleDateString()}
						</Typography>
					</Box>
				)}
			</Paper>

			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
				<Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
					${checkoutItems.reduce((a, i) => a + i.product.price * i.quantity, 0).toFixed(2)}
				</Typography>
			</Box>
			<Button
				variant="contained"
				color="secondary"
				fullWidth
				size="large"
				disabled={checkoutItems.length === 0}
				onClick={handlePlaceOrder}
				sx={{ mt: 3, borderRadius: "14px", py: 1.5 }}
			>
				Place Order
			</Button>
		</Box>
	);
};
