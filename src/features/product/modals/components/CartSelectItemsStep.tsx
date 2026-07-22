import { Box, Typography, Chip } from "@mui/material";
import { AppState, CartItem } from "../../../../config/types";
import { cartItemKey } from "../../../../utils/cart-sync";
import React from "react";

interface Props {
	state: AppState;
	checkoutItems: CartItem[];
	handleToggleCheckout: (item: CartItem) => void;
}

export const CartSelectItemsStep: React.FC<Props> = ({ state, checkoutItems, handleToggleCheckout }) => {
	return (
		<Box>
			<Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
				Select items to checkout:
			</Typography>
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
				{state.cart.map((item) => {
					const key = cartItemKey(item.product.id, item.selectedColorName);
					const isAdded = checkoutItems.some(
						(i) => cartItemKey(i.product.id, i.selectedColorName) === key
					);
					return (
						<Chip
							key={key}
							label={`${item.product.name} (×${item.quantity})`}
							clickable
							color={isAdded ? "primary" : "default"}
							variant={isAdded ? "filled" : "outlined"}
							onClick={() => handleToggleCheckout(item)}
							sx={{ py: 2.5, height: "auto" }}
						/>
					);
				})}
			</Box>
		</Box>
	);
};
