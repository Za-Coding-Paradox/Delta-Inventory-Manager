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
import type { Product } from "../../../config/types";
import { useAppContext } from "../../../context/app-context";

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
	const [prevProductId, setPrevProductId] = useState(product?.id);

	// React 18+ pattern to reset state when prop changes without using useEffect
	if (product?.id !== prevProductId) {
		setPrevProductId(product?.id);
		setSelectedColor(product?.colors[0]);
	}

	if (!product) return null;

	const isWishlisted = state.wishlist.some((p) => p.id === product.id);
	const relatedItems = state.products
		.filter(
			(p) =>
				p.id !== product.id &&
				p.tags.some((tag) => product.tags.includes(tag)),
		)
		.slice(0, 6);

	const handleAddToCart = () => {
		dispatch({
			type: "ADD_TO_CART",
			payload: {
				product,
				selectedColorName: selectedColor?.name || "",
				quantity: 1,
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
					width: { xs: "90%", md: "800px" },
					maxHeight: "90vh",
					overflowY: "auto",
					bgcolor: "background.paper",
					borderRadius: "20px",
					boxShadow: 24,
					p: 4,
				}}
			>
				<IconButton
					onClick={onClose}
					sx={{ position: "absolute", right: 16, top: 16 }}
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
								borderRadius: "12px",
							}}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								mb: 2,
							}}
						>
							<Typography
								variant="h5"
								color="primary"
								sx={{ fontWeight: 700 }}
							>
								${product.price.toFixed(2)}
							</Typography>
							<Chip
								label={product.status.replace("_", " ")}
								size="small"
								sx={{
									textTransform: "capitalize",
									fontWeight: 700,
									backgroundColor: (t) =>
										product.status === "IN_STOCK"
											? t.palette.success.main
											: t.palette.error.main,
									color: "#fff",
								}}
							/>
						</Box>
						<Typography
							variant="body1"
							color="text.secondary"
							sx={{ mb: 3 }}
						>
							{product.description}
						</Typography>
						<Typography variant="subtitle2" sx={{ mb: 1 }}>
							Select Color:
						</Typography>
						<Box sx={{ display: "flex", gap: 1, mb: 4 }}>
							{product.colors.map((color) => (
								<Box
									key={color.name}
									onClick={() => setSelectedColor(color)}
									sx={{
										width: 32,
										height: 32,
										borderRadius: "50%",
										backgroundColor: color.hex,
										border: (t) =>
											selectedColor?.name === color.name
												? `3px solid ${t.palette.primary.main}`
												: "3px solid transparent",
										cursor: "pointer",
										"&:hover": { transform: "scale(1.1)" },
									}}
								/>
							))}
						</Box>
						<Box sx={{ display: "flex", gap: 2 }}>
							<Button
								variant="contained"
								size="large"
								fullWidth
								startIcon={<ShoppingCartOutlinedIcon />}
								onClick={handleAddToCart}
								disabled={product.status === "OUT_OF_STOCK"}
							>
								Add to Cart
							</Button>
							<Button
								variant="outlined"
								size="large"
								onClick={() =>
									dispatch({
										type: "TOGGLE_WISHLIST",
										payload: product,
									})
								}
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
						<Typography variant="h6" sx={{ mb: 2 }}>
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
									onClick={() => onQuickView(item)}
									sx={{
										minWidth: 200,
										cursor: "pointer",
										"&:hover": {
											transform: "translateY(-5px)",
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
