// src/components/product-page/product-card.tsx
import { useState } from "react";
import {
	Card,
	CardMedia,
	Typography,
	Box,
	IconButton,
	Divider,
	Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import type { Product } from "../../../config/types";
import { useAppContext } from "../../../context/app-context";

interface Props {
	product: Product;
	onQuickView: (product: Product) => void;
}

const STATUS_CONFIG = {
	IN_STOCK: { label: "In Stock", chipColor: "success" as const },
	COMING_SOON: { label: "Coming Soon", chipColor: "warning" as const },
	OUT_OF_STOCK: { label: "Sold Out", chipColor: "error" as const },
};

export default function ProductCard({ product, onQuickView }: Props) {
	const { state, dispatch } = useAppContext();
	const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : { name: "Default", hex: "#000", imageUrl: "https://placehold.co/400x400?text=No+Image" });
	const isWishlisted = state.wishlist.some((p) => p.id === product.id);

	const statusCfg = STATUS_CONFIG[product.status];

	const bottomStats = [
		{ label: "Unit price", value: `$${product.price.toFixed(2)}` },
		{ label: "Stock", value: `${product.stockQuantity} left` },
		{ label: "Tags", value: product.tags.slice(0, 2).join(", ") },
	];

	return (
		<Card
			elevation={0}
			sx={{
				borderRadius: "20px",
				overflow: "hidden",
				cursor: "pointer",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				transition: "transform 0.25s ease, box-shadow 0.25s ease",
				"&:hover": {
					transform: "translateY(-6px)",
					boxShadow: (t) =>
						t.palette.mode === "light"
							? "0px 16px 40px rgba(0, 0, 0, 0.14)"
							: "0px 16px 40px rgba(0, 0, 0, 0.6)",
				},
			}}
			onClick={() => onQuickView(product)}
		>
			<Box sx={{ position: "relative", flexShrink: 0 }}>
				<CardMedia
					component="img"
					height="200"
					image={selectedColor.imageUrl}
					alt={product.name}
					loading="lazy"
					sx={{ objectFit: "cover", display: "block" }}
				/>

				<Chip
					label={statusCfg.label}
					size="small"
					color={statusCfg.chipColor}
					variant="status"
					sx={{
						position: "absolute",
						top: 12,
						left: 12,
						fontWeight: 700,
						fontSize: "0.68rem",
						height: 24,
						zIndex: 1,
					}}
				/>

				<IconButton
					onClick={(e) => {
						e.stopPropagation();
						dispatch({ type: "TOGGLE_WISHLIST", payload: product });
					}}
					sx={{
						position: "absolute",
						top: 8,
						right: 8,
						backgroundColor: (t) =>
							t.palette.mode === "light"
								? "rgba(255,255,255,0.92)"
								: "rgba(30,30,30,0.85)",
						backdropFilter: "blur(8px)",
						width: 36,
						height: 36,
						boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
						"&:hover": {
							backgroundColor: "background.paper",
						},
					}}
				>
					{isWishlisted ? (
						<FavoriteIcon sx={{ fontSize: 18 }} color="error" />
					) : (
						<FavoriteBorderIcon
							sx={{ fontSize: 18, color: "text.secondary" }}
						/>
					)}
				</IconButton>
			</Box>

			<Box
				sx={{
					p: 2,
					pt: 1.75,
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						gap: 1,
						mb: 0.5,
						minHeight: 48,
					}}
				>
					<Typography
						variant="h6"
						sx={{
							fontWeight: 700,
							fontSize: "0.95rem",
							lineHeight: 1.35,
							flex: 1,
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{product.name}
					</Typography>

					<Typography
						sx={{
							fontSize: "1.05rem",
							fontWeight: 800,
							color: "text.primary",
							lineHeight: 1.2,
							flexShrink: 0,
						}}
					>
						${product.price.toFixed(2)}
					</Typography>
				</Box>

				<Typography
					sx={{
						fontSize: "0.78rem",
						color: "text.secondary",
						mb: 1.5,
					}}
				>
					{product.category} · {product.tags[0]}
				</Typography>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
						mb: 1.5,
						mt: "auto",
					}}
				>
					{product.colors.map((color) => (
						<Box
							key={color.name}
							onClick={(e) => {
								e.stopPropagation();
								setSelectedColor(color);
							}}
							sx={{
								width: 20,
								height: 20,
								borderRadius: "50%",
								backgroundColor: color.hex,
								border: (t) =>
									selectedColor.name === color.name
										? `2px solid ${t.palette.primary.main}`
										: `2px solid ${t.palette.divider}`,
								cursor: "pointer",
								transition: "transform 0.15s",
								"&:hover": { transform: "scale(1.15)" },
								boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
							}}
						/>
					))}

					<Box
						sx={{
							display: "flex",
							gap: 1.5,
							ml: "auto",
							color: "text.secondary",
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 0.4,
							}}
						>
							<PaletteOutlinedIcon sx={{ fontSize: 15 }} />
							<Typography sx={{ fontSize: "0.72rem", fontWeight: 600 }}>
								{product.colors.length}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 0.4,
							}}
						>
							<LocalOfferOutlinedIcon sx={{ fontSize: 15 }} />
							<Typography sx={{ fontSize: "0.72rem", fontWeight: 600 }}>
								{product.tags.length}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 0.4,
							}}
						>
							<ShoppingCartOutlinedIcon sx={{ fontSize: 15 }} />
							<Typography sx={{ fontSize: "0.72rem", fontWeight: 600 }}>
								{state.cart
									.filter((i) => i.product.id === product.id)
									.reduce((s, i) => s + i.quantity, 0)}
							</Typography>
						</Box>
					</Box>
				</Box>

				<Divider sx={{ mb: 1.5 }} />

				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
					}}
				>
					{bottomStats.map((stat, i) => (
						<Box
							key={stat.label}
							sx={{
								textAlign:
									i === 1 ? "center" : i === 2 ? "right" : "left",
							}}
						>
							<Typography
								sx={{
									fontSize: "0.63rem",
									color: "text.secondary",
									fontWeight: 500,
									mb: 0.25,
								}}
							>
								{stat.label}
							</Typography>
							<Typography
								sx={{
									fontSize: "0.76rem",
									fontWeight: 700,
									color: "text.primary",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{stat.value}
							</Typography>
						</Box>
					))}
				</Box>
			</Box>
		</Card>
	);
}
