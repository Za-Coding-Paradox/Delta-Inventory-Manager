// src/components/product-page/product-card.tsx
import { useState } from "react";
import {
	Card,
	CardMedia,
	Typography,
	Box,
	IconButton,
	Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import type { Product } from "../../config/types";
import { useAppContext } from "../../context/app-context";

interface Props {
	product: Product;
	onQuickView: (product: Product) => void;
}

const STATUS_CONFIG = {
	IN_STOCK: { label: "Active", color: "#22c55e" },
	COMING_SOON: { label: "Coming Soon", color: "#f59e0b" },
	OUT_OF_STOCK: { label: "Sold Out", color: "#ef4444" },
};

export default function ProductCard({ product, onQuickView }: Props) {
	const { state, dispatch } = useAppContext();
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const isWishlisted = state.wishlist.some((p) => p.id === product.id);

	const statusCfg = STATUS_CONFIG[product.status];

	const stats = [
		{
			icon: <PaletteOutlinedIcon sx={{ fontSize: 15 }} />,
			value: product.colors.length,
			label: "Colors",
		},
		{
			icon: <LocalOfferOutlinedIcon sx={{ fontSize: 15 }} />,
			value: product.tags.length,
			label: "Tags",
		},
		{
			icon: <CategoryOutlinedIcon sx={{ fontSize: 15 }} />,
			value: product.category.slice(0, 3).toUpperCase(),
			label: "Cat",
		},
		{
			icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 15 }} />,
			value: product.status === "IN_STOCK" ? "Yes" : "No",
			label: "Buy",
		},
	];

	const bottomStats = [
		{ label: "Unit price", value: `$${product.price.toFixed(2)}` },
		{ label: "Category", value: product.category },
		{ label: "Tags", value: product.tags.slice(0, 2).join(", ") },
	];

	return (
		<Card
			sx={{
				borderRadius: "20px",
				overflow: "hidden",
				cursor: "pointer",
				transition: "transform 0.25s ease, box-shadow 0.25s ease",
				"&:hover": {
					transform: "translateY(-5px)",
					boxShadow: (t) =>
						t.palette.mode === "light"
							? "0px 16px 40px rgba(0,0,0,0.12)"
							: "0px 16px 40px rgba(0,0,0,0.5)",
				},
			}}
			onClick={() => onQuickView(product)}
		>
			{/* ── Image ── */}
			<Box sx={{ position: "relative" }}>
				<CardMedia
					component="img"
					height="200"
					image={selectedColor.imageUrl}
					alt={product.name}
					loading="lazy"
					sx={{ objectFit: "cover", display: "block" }}
				/>

				{/* Status badge – top left */}
				<Box
					sx={{
						position: "absolute",
						top: 12,
						left: 12,
						display: "flex",
						alignItems: "center",
						gap: 0.6,
						backgroundColor: "rgba(255,255,255,0.92)",
						backdropFilter: "blur(8px)",
						borderRadius: "20px",
						px: 1.25,
						py: 0.5,
						boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
					}}
				>
					<Box
						sx={{
							width: 7,
							height: 7,
							borderRadius: "50%",
							backgroundColor: statusCfg.color,
							flexShrink: 0,
						}}
					/>
					<Typography
						sx={{
							fontSize: "0.7rem",
							fontWeight: 600,
							color: "#1a1a1a",
							lineHeight: 1,
						}}
					>
						{statusCfg.label}
					</Typography>
				</Box>

				{/* Wishlist – top right */}
				<IconButton
					onClick={(e) => {
						e.stopPropagation();
						dispatch({ type: "TOGGLE_WISHLIST", payload: product });
					}}
					sx={{
						position: "absolute",
						top: 8,
						right: 8,
						backgroundColor: "rgba(255,255,255,0.9)",
						backdropFilter: "blur(4px)",
						"&:hover": { backgroundColor: "#fff" },
						width: 34,
						height: 34,
					}}
				>
					{isWishlisted ? (
						<FavoriteIcon sx={{ fontSize: 16 }} color="error" />
					) : (
						<FavoriteBorderIcon
							sx={{ fontSize: 16, color: "#555" }}
						/>
					)}
				</IconButton>
			</Box>

			{/* ── Body ── */}
			<Box sx={{ p: 2, pt: 1.75 }}>
				{/* Name + Price row */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						mb: 0.25,
					}}
				>
					<Typography
						variant="h6"
						sx={{
							fontWeight: 700,
							fontSize: "1rem",
							lineHeight: 1.3,
							flex: 1,
							pr: 1,
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{product.name}
					</Typography>

					<Box sx={{ textAlign: "right", flexShrink: 0 }}>
						<Typography
							sx={{
								fontSize: "0.65rem",
								color: "text.secondary",
								fontWeight: 500,
								lineHeight: 1,
								mb: 0.25,
							}}
						>
							Unit price
						</Typography>
						<Typography
							sx={{
								fontSize: "1.1rem",
								fontWeight: 800,
								color: "primary.main",
								lineHeight: 1,
							}}
						>
							${product.price.toFixed(2)}
						</Typography>
					</Box>
				</Box>

				{/* Category subtitle */}
				<Typography
					sx={{
						fontSize: "0.78rem",
						color: "text.secondary",
						mb: 1.5,
					}}
				>
					{product.category} · {product.tags[0]}
				</Typography>

				{/* Color swatches + stats row */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1.5,
						mb: 1.5,
					}}
				>
					{/* Color swatches */}
					{product.colors.map((color) => (
						<Box
							key={color.name}
							onClick={(e) => {
								e.stopPropagation();
								setSelectedColor(color);
							}}
							sx={{
								width: 18,
								height: 18,
								borderRadius: "50%",
								backgroundColor: color.hex,
								border: (t) =>
									selectedColor.name === color.name
										? `2px solid ${t.palette.primary.main}`
										: "2px solid transparent",
								outline: (t) =>
									selectedColor.name === color.name
										? `1px solid ${t.palette.primary.main}`
										: "none",
								cursor: "pointer",
								transition: "transform 0.15s",
								"&:hover": { transform: "scale(1.2)" },
								boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
							}}
						/>
					))}

					{/* Stat mini badges */}
					<Box sx={{ display: "flex", gap: 1.5, ml: "auto" }}>
						{stats.slice(0, 2).map((s) => (
							<Box
								key={s.label}
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 0.4,
									color: "text.secondary",
								}}
							>
								{s.icon}
								<Typography
									sx={{
										fontSize: "0.72rem",
										fontWeight: 600,
									}}
								>
									{s.value}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>

				<Divider sx={{ mb: 1.5 }} />

				{/* Bottom 3 stats */}
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
						gap: 0,
					}}
				>
					{bottomStats.map((stat, i) => (
						<Box
							key={stat.label}
							sx={{
								textAlign:
									i === 1
										? "center"
										: i === 2
											? "right"
											: "left",
							}}
						>
							<Typography
								sx={{
									fontSize: "0.63rem",
									color: "text.secondary",
									fontWeight: 500,
									mb: 0.25,
									lineHeight: 1,
								}}
							>
								{stat.label}
							</Typography>
							<Typography
								sx={{
									fontSize: "0.78rem",
									fontWeight: 700,
									color: "primary.main",
									lineHeight: 1,
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
