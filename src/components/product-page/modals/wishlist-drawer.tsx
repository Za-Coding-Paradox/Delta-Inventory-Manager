// src/components/product-page/modals/wishlist-drawer.tsx
import {
	Drawer,
	Box,
	Typography,
	IconButton,
	Button,
	Divider,
	Card,
	CardMedia,
	CardContent,
	Chip,
	Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useAppContext } from "../../../context/app-context";
import {
	canAddToCart,
	getLiveProduct,
	getMaxAddableQty,
	getRemainingStock,
} from "../../../utils/cart-sync";
import type { Product } from "../../../config/types";

interface Props {
	open: boolean;
	onClose: () => void;
	onMoveToCheckout: (product: Product) => void;
}

export default function WishlistDrawer({
	open,
	onClose,
	onMoveToCheckout,
}: Props) {
	const { state, dispatch } = useAppContext();

	const handleAddToCart = (item: Product) => {
		const live = getLiveProduct(state.products, item.id) ?? item;
		if (!canAddToCart(live)) return;

		const qty = getMaxAddableQty(
			state.cart,
			live,
			live.colors[0].name,
			1,
		);
		if (qty <= 0) return;

		dispatch({
			type: "ADD_TO_CART",
			payload: {
				product: live,
				selectedColorName: live.colors[0].name,
				quantity: qty,
			},
		});
	};

	return (
		<Drawer anchor="right" open={open} onClose={onClose}>
			<Box
				sx={{
					width: { xs: "100vw", sm: 420 },
					p: 3,
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 2,
					}}
				>
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						Your Wishlist
					</Typography>
					<IconButton onClick={onClose} size="small">
						<CloseIcon />
					</IconButton>
				</Box>
				<Divider sx={{ mb: 2 }} />

				<Box sx={{ flexGrow: 1, overflowY: "auto" }}>
					{state.wishlist.length === 0 ? (
						<Typography
							sx={{ textAlign: "center", mt: 5 }}
							color="text.secondary"
						>
							Your wishlist is empty.
						</Typography>
					) : (
						state.wishlist.map((item) => {
							const live =
								getLiveProduct(state.products, item.id) ?? item;
							const isAvailable = canAddToCart(live);
							const wasComingSoon =
								item.status === "COMING_SOON" &&
								live.status === "IN_STOCK";
							const remaining = getRemainingStock(
								state,
								live.id,
							);

							return (
								<Card
									key={item.id}
									elevation={0}
									sx={{
										display: "flex",
										mb: 2,
										p: 1.5,
										alignItems: "center",
										borderRadius: "16px",
										border: 1,
										borderColor: wasComingSoon
											? "success.main"
											: "divider",
										background: (t) =>
											wasComingSoon
												? t.palette.mode === "light"
													? "rgba(76, 175, 80, 0.04)"
													: "rgba(129, 199, 132, 0.08)"
												: "background.paper",
									}}
								>
									<CardMedia
										component="img"
										image={live.defaultImageUrl}
										sx={{
											width: 80,
											height: 80,
											borderRadius: "12px",
											objectFit: "cover",
										}}
									/>
									<CardContent
										sx={{ flexGrow: 1, py: "8px !important" }}
									>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												gap: 1,
												mb: 0.5,
											}}
										>
											<Typography
												variant="body2"
												sx={{ fontWeight: 600 }}
											>
												{live.name}
											</Typography>
											{wasComingSoon && (
												<Chip
													label="Now Available"
													size="small"
													color="success"
													sx={{
														height: 20,
														fontSize: "0.65rem",
														fontWeight: 700,
													}}
												/>
											)}
										</Box>
										<Typography
											variant="body2"
											color="primary"
											sx={{ fontWeight: 700 }}
										>
											${live.price.toFixed(2)}
										</Typography>
										<Typography
											variant="caption"
											color="text.secondary"
											sx={{ display: "block", mb: 1 }}
										>
											{live.status === "IN_STOCK"
												? `${remaining} available`
												: live.status === "COMING_SOON"
													? "Coming soon"
													: "Out of stock"}
										</Typography>
										<Stack direction="row" spacing={1}>
											<Button
												size="small"
												variant="outlined"
												startIcon={
													<ShoppingCartOutlinedIcon />
												}
												disabled={!isAvailable || remaining <= 0}
												onClick={() => handleAddToCart(live)}
											>
												Add to Cart
											</Button>
											{isAvailable && remaining > 0 && (
												<Button
													size="small"
													variant="contained"
													color="secondary"
													startIcon={
														<ShoppingBagOutlinedIcon />
													}
													onClick={() =>
														onMoveToCheckout(live)
													}
												>
													Checkout
												</Button>
											)}
										</Stack>
									</CardContent>
									<IconButton
										onClick={() =>
											dispatch({
												type: "TOGGLE_WISHLIST",
												payload: live,
											})
										}
										color="error"
										size="small"
									>
										<DeleteOutlinedIcon fontSize="small" />
									</IconButton>
								</Card>
							);
						})
					)}
				</Box>
			</Box>
		</Drawer>
	);
}
