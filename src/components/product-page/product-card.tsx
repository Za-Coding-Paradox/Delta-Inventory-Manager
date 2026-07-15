// src/components/user/ProductCard.tsx
import { useState } from "react";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Box,
	Chip,
	IconButton,
	Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import type { Product } from "../../config/types";
import { useAppContext } from "../../context/app-context";

export default function ProductCard({ product }: { product: Product }) {
	const { state, dispatch } = useAppContext();
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);

	const isWishlisted = state.wishlist.some((p) => p.id === product.id);

	const handleAddToCart = () => {
		dispatch({
			type: "ADD_TO_CART",
			payload: {
				product,
				selectedColorName: selectedColor.name,
				quantity: 1,
			},
		});
	};

	return (
		<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<Box sx={{ position: "relative" }}>
				<CardMedia
					component="img"
					height="250"
					image={selectedColor.imageUrl}
					alt={product.name}
					sx={{ objectFit: "cover" }}
				/>
				<Chip
					label={product.status.replace("_", " ")}
					size="small"
					sx={{
						position: "absolute",
						top: 12,
						left: 12,
						textTransform: "capitalize",
						fontWeight: 700,
						backgroundColor: (t) =>
							product.status === "IN_STOCK"
								? t.palette.success.main
								: product.status === "COMING_SOON"
									? t.palette.warning.main
									: t.palette.error.main,
						color: "#fff",
					}}
				/>
				<IconButton
					onClick={() =>
						dispatch({ type: "TOGGLE_WISHLIST", payload: product })
					}
					sx={{
						position: "absolute",
						top: 8,
						right: 8,
						backgroundColor: "rgba(255,255,255,0.7)",
						"&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
					}}
				>
					{isWishlisted ? (
						<FavoriteIcon color="error" />
					) : (
						<FavoriteBorderIcon />
					)}
				</IconButton>
			</Box>

			<CardContent
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					gap: 1,
				}}
			>
				<Typography
					variant="h6"
					component="div"
					sx={{ fontWeight: 600 }}
				>
					{product.name}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ flexGrow: 1 }}
				>
					{product.description}
				</Typography>

				<Box sx={{ display: "flex", gap: 1, mt: 1 }}>
					{product.colors.map((color) => (
						<Box
							key={color.name}
							onClick={() => setSelectedColor(color)}
							sx={{
								width: 24,
								height: 24,
								borderRadius: "50%",
								backgroundColor: color.hex,
								border: (t) =>
									selectedColor.name === color.name
										? `2px solid ${t.palette.primary.main}`
										: "2px solid transparent",
								cursor: "pointer",
								transition: "border 0.2s ease",
								"&:hover": { transform: "scale(1.1)" },
							}}
						/>
					))}
				</Box>

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mt: 2,
					}}
				>
					<Typography
						variant="h6"
						color="primary"
						sx={{ fontWeight: 700 }}
					>
						${product.price.toFixed(2)}
					</Typography>
					<Button
						variant="contained"
						size="small"
						startIcon={<ShoppingCartOutlinedIcon />}
						onClick={handleAddToCart}
						disabled={product.status === "OUT_OF_STOCK"}
					>
						Add
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
}
