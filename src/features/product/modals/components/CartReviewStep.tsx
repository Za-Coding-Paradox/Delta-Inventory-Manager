import { Box, Typography, Paper, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { AppState } from "../../../../config/types";
import { CartItem } from "../../../../config/types";
import {
	cartItemKey,
	clampCartItemQty,
	getLiveProduct,
	getRemainingStock,
} from "../../../../utils/cart-sync";
import React from "react";

interface Props {
	state: AppState;
	handleQtyChange: (item: CartItem, delta: number) => void;
	handleRemove: (item: CartItem) => void;
}

export const CartReviewStep: React.FC<Props> = ({ state, handleQtyChange, handleRemove }) => {
	if (state.cart.length === 0) {
		return (
			<Typography sx={{ textAlign: "center", mt: 5 }} color="text.secondary">
				Your cart is empty.
			</Typography>
		);
	}

	return (
		<>
			{state.cart.map((item) => {
				const live = getLiveProduct(state.products, item.product.id);
				const remaining = live
					? getRemainingStock(state, item.product.id) + item.quantity
					: 0;
				const atMax =
					live &&
					item.quantity >= clampCartItemQty(state.cart, item, live, remaining);

				return (
					<Paper
						key={cartItemKey(item.product.id, item.selectedColorName)}
						elevation={0}
						sx={{
							p: 2,
							mb: 2,
							display: "flex",
							alignItems: "center",
							borderRadius: "16px",
							border: 1,
							borderColor: "divider",
						}}
					>
						<Box
							component="img"
							src={
								item.product.colors.find(
									(c) => c.name === item.selectedColorName
								)?.imageUrl
							}
							sx={{
								width: 64,
								height: 64,
								borderRadius: "12px",
								mr: 2,
								objectFit: "cover",
							}}
						/>
						<Box sx={{ flexGrow: 1 }}>
							<Typography variant="body2" sx={{ fontWeight: 600 }}>
								{item.product.name}
							</Typography>
							<Typography variant="caption" color="text.secondary">
								{item.selectedColorName}
							</Typography>

							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									mt: 1,
									border: 1,
									borderColor: "divider",
									borderRadius: "12px",
									width: "fit-content",
									overflow: "hidden",
								}}
							>
								<IconButton
									size="small"
									onClick={() => handleQtyChange(item, -1)}
								>
									<RemoveIcon fontSize="small" />
								</IconButton>
								<Typography
									variant="body2"
									sx={{
										px: 1.5,
										fontWeight: 700,
										minWidth: 24,
										textAlign: "center",
									}}
								>
									{item.quantity}
								</Typography>
								<IconButton
									size="small"
									disabled={!!atMax}
									onClick={() => handleQtyChange(item, 1)}
								>
									<AddIcon fontSize="small" />
								</IconButton>
							</Box>
							{live && (
								<Typography
									variant="caption"
									color="text.secondary"
									sx={{ mt: 0.5, display: "block" }}
								>
									{remaining} in stock
								</Typography>
							)}
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end",
							}}
						>
							<Typography
								variant="body2"
								sx={{
									mb: 1,
									fontWeight: 700,
									color: "primary.main",
								}}
							>
								${(item.product.price * item.quantity).toFixed(2)}
							</Typography>
							<IconButton
								size="small"
								color="error"
								onClick={() => handleRemove(item)}
							>
								<DeleteOutlinedIcon fontSize="small" />
							</IconButton>
						</Box>
					</Paper>
				);
			})}
		</>
	);
};
