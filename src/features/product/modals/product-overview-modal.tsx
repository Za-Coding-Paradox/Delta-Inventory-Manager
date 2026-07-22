// src/components/product-page/modals/product-overview-modal.tsx
import { useState } from "react";
import {
	Modal,
	Box,
	IconButton,
	Typography,
	Button,
	Chip,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Breadcrumbs,
	Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import type { Product } from "../../../config/types";
import { useAppContext } from "../../../context/app-context";
import {
	canAddToCart,
	getMaxAddableQty,
	getRemainingStock,
} from "../../../utils/cart-sync";

interface Props {
	product: Product | null;
	open: boolean;
	onClose: () => void;
	onQuickView: (product: Product) => void;
}

export default function ProductOverviewModal({
	product,
	open,
	onClose,
	onQuickView,
}: Props) {
	const { state, dispatch } = useAppContext();
	const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
	const [quantity, setQuantity] = useState(1);
	const [prevProductId, setPrevProductId] = useState(product?.id);

	if (product?.id !== prevProductId) {
		setPrevProductId(product?.id);
		setSelectedColor(product?.colors[0]);
		setQuantity(1);
	}

	if (!product) return null;

	const liveProduct =
		state.products.find((p) => p.id === product.id) ?? product;
	const isWishlisted = state.wishlist.some((p) => p.id === product.id);
	const remaining = getRemainingStock(state, liveProduct.id);
	const maxQty = getMaxAddableQty(
		state.cart,
		liveProduct,
		selectedColor?.name || liveProduct.colors[0].name,
		remaining,
	);

	const productReviews = state.reviews.filter((r) => r.productId === liveProduct.id);
	const avgRating = productReviews.length > 0 
		? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length 
		: 0;

	const relatedItems = state.products
		.filter(
			(p) =>
				p.id !== product.id &&
				p.tags.some((tag) => product.tags.includes(tag)),
		)
		.slice(0, 6);

	const statusColor =
		liveProduct.status === "IN_STOCK"
			? "success"
			: liveProduct.status === "COMING_SOON"
				? "warning"
				: "error";

	const handleAddToCart = () => {
		if (!canAddToCart(liveProduct) || !selectedColor) return;
		const addQty = getMaxAddableQty(
			state.cart,
			liveProduct,
			selectedColor.name,
			quantity,
		);
		if (addQty <= 0) return;

		dispatch({
			type: "ADD_TO_CART",
			payload: {
				product: liveProduct,
				selectedColorName: selectedColor.name,
				quantity: addQty,
			},
		});
		onClose();
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: { xs: "92%", md: 820 },
					maxHeight: "90vh",
					overflowY: "auto",
					backgroundColor: "background.paper",
					borderRadius: "24px",
					boxShadow: 24,
					p: { xs: 3, md: 4 },
					border: 1,
					borderColor: "divider",
				}}
			>
				<IconButton
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 16,
						top: 16,
						zIndex: 10,
						backgroundColor: "background.paper",
						"&:hover": { backgroundColor: "action.hover" },
					}}
				>
					<CloseIcon />
				</IconButton>

				<Breadcrumbs
					separator={<NavigateNextIcon fontSize="small" />}
					sx={{ mb: 3 }}
				>
					<Link underline="hover" color="inherit" href="/">
						Home
					</Link>
					<Link underline="hover" color="inherit" href="#products">
						{product.category}
					</Link>
					<Typography color="text.primary">{product.name}</Typography>
				</Breadcrumbs>

				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 6 }}>
						<Box
							component="img"
							src={
								selectedColor?.imageUrl ||
								product.defaultImageUrl
							}
							sx={{
								width: "100%",
								height: 400,
								objectFit: "cover",
								borderRadius: "16px",
							}}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<Typography
							variant="h5"
							sx={{ fontWeight: 800, mb: 1, pr: 4 }}
						>
							{liveProduct.name}
						</Typography>

						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 2,
								mb: 2,
							}}
						>
							<Typography
								variant="h5"
								color="primary"
								sx={{ fontWeight: 800 }}
							>
								${liveProduct.price.toFixed(2)}
							</Typography>
							<Chip
								label={liveProduct.status.replace("_", " ")}
								size="small"
								color={statusColor}
								variant="status"
								sx={{ textTransform: "capitalize", fontWeight: 700 }}
							/>
							{liveProduct.status === "IN_STOCK" && (
								<Typography variant="body2" color="text.secondary">
									{remaining} left in stock
								</Typography>
							)}
						</Box>

						{productReviews.length > 0 && (
							<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
								<StarRoundedIcon sx={{ color: "#faaf00", fontSize: 20 }} />
								<Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "text.primary" }}>
									{avgRating.toFixed(1)}
								</Typography>
								<Typography sx={{ fontSize: "0.85rem", color: "text.secondary", ml: 0.5 }}>
									({productReviews.length} reviews)
								</Typography>
							</Box>
						)}

						<Typography
							variant="body1"
							color="text.secondary"
							sx={{ mb: 3, lineHeight: 1.7 }}
						>
							{liveProduct.description}
						</Typography>

						<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
							Select Color:
						</Typography>
						<Box sx={{ display: "flex", gap: 1, mb: 3 }}>
							{liveProduct.colors.map((color) => (
								<Box
									key={color.name}
									onClick={() => setSelectedColor(color)}
									sx={{
										width: 36,
										height: 36,
										borderRadius: "50%",
										backgroundColor: color.hex,
										border: (t) =>
											selectedColor?.name === color.name
												? `3px solid ${t.palette.primary.main}`
												: `3px solid ${t.palette.divider}`,
										cursor: "pointer",
										transition: "transform 0.15s",
										"&:hover": { transform: "scale(1.1)" },
										boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
									}}
								/>
							))}
						</Box>

						{canAddToCart(liveProduct) && (
							<Box sx={{ mb: 3 }}>
								<Typography
									variant="subtitle2"
									sx={{ mb: 1, fontWeight: 600 }}
								>
									Quantity:
								</Typography>
								<Box
									sx={{
										display: "inline-flex",
										alignItems: "center",
										border: 1,
										borderColor: "divider",
										borderRadius: "14px",
										overflow: "hidden",
									}}
								>
									<IconButton
										size="small"
										onClick={() =>
											setQuantity((q) => Math.max(1, q - 1))
										}
										disabled={quantity <= 1}
									>
										<RemoveIcon fontSize="small" />
									</IconButton>
									<Typography
										sx={{
											px: 2,
											fontWeight: 700,
											minWidth: 32,
											textAlign: "center",
										}}
									>
										{quantity}
									</Typography>
									<IconButton
										size="small"
										onClick={() =>
											setQuantity((q) =>
												Math.min(maxQty, q + 1),
											)
										}
										disabled={quantity >= maxQty}
									>
										<AddIcon fontSize="small" />
									</IconButton>
								</Box>
								<Typography
									variant="caption"
									color="text.secondary"
									sx={{ display: "block", mt: 0.5 }}
								>
									Max {maxQty} can be added
								</Typography>
							</Box>
						)}

						<Box sx={{ display: "flex", gap: 2 }}>
							<Button
								variant="contained"
								size="large"
								fullWidth
								startIcon={<ShoppingCartOutlinedIcon />}
								onClick={handleAddToCart}
								disabled={
									!canAddToCart(liveProduct) || maxQty <= 0
								}
								sx={{ borderRadius: "14px", py: 1.25 }}
							>
								Add to Cart
							</Button>
							<Button
								variant="outlined"
								size="large"
								onClick={() =>
									dispatch({
										type: "TOGGLE_WISHLIST",
										payload: liveProduct,
									})
								}
								sx={{ borderRadius: "14px", minWidth: 56 }}
							>
								{isWishlisted ? (
									<FavoriteIcon color="error" />
								) : (
									<FavoriteBorderIcon />
								)}
							</Button>
						</Box>
					</Grid>
				</Grid>

				{relatedItems.length > 0 && (
					<Box sx={{ mt: 5 }}>
						<Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
							Related Items
						</Typography>
						<Box
							sx={{
								display: "flex",
								gap: 2,
								overflowX: "auto",
								pb: 2,
							}}
						>
							{relatedItems.map((item) => (
								<Card
									key={item.id}
									elevation={0}
									onClick={() => onQuickView(item)}
									sx={{
										minWidth: 200,
										cursor: "pointer",
										borderRadius: "16px",
										border: 1,
										borderColor: "divider",
										transition: "transform 0.2s",
										"&:hover": {
											transform: "translateY(-4px)",
											boxShadow: 3,
										},
									}}
								>
									<CardMedia
										component="img"
										height="140"
										image={item.defaultImageUrl}
										alt={item.name}
									/>
									<CardContent>
										<Typography
											variant="body2"
											sx={{ fontWeight: 600 }}
										>
											{item.name}
										</Typography>
										<Typography
											variant="body2"
											color="primary"
											sx={{ fontWeight: 700 }}
										>
											${item.price.toFixed(2)}
										</Typography>
									</CardContent>
								</Card>
							))}
						</Box>
					</Box>
				)}
			</Box>
		</Modal>
	);
}
