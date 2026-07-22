// src/components/product-page/trending-section.tsx
import {
	Box,
	Typography,
	Card,
	CardMedia,
	CardContent,
	Chip,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../../../context/app-context";
import type { Product } from "../../../config/types";

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 12px)); }
`;

export default function TrendingSection() {
	const { state } = useAppContext();
	const { onQuickView } = useOutletContext<{
		onQuickView: (p: Product) => void;
	}>();

	// Grab top products as trending and duplicate them for the infinite marquee
	const trendingItems = state.products.slice(0, 5);
	const marqueeItems = [...trendingItems, ...trendingItems];

	return (
		<Box
			id="trending"
			sx={{
				py: { xs: 6, md: 10 },
				backgroundColor: (t) =>
					t.palette.mode === "light" ? "#F5F5F5" : "#0A0A0A",
				overflow: "hidden", // Hide horizontal overflow
			}}
		>
			<Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 4 }, mb: 5 }}>
				<Typography variant="h4" sx={{ fontWeight: 800 }}>
					Trending & Highlights
				</Typography>
				<Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
					Discover the season's most sought-after pieces.
				</Typography>
			</Box>

			{/* Marquee Container */}
			<Box
				sx={{
					display: "flex",
					gap: 3,
					width: "max-content",
					animation: `${scrollAnimation} 25s linear infinite`,
					px: 3,
					"&:hover": {
						animationPlayState: "paused",
					},
				}}
			>
				{marqueeItems.map((item, index) => (
					<Card
						key={`${item.id}-${index}`}
						onClick={() => onQuickView(item)}
						sx={{
							width: 320,
							flexShrink: 0,
							cursor: "pointer",
							borderRadius: "16px",
							overflow: "hidden",
							transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
							border: "1px solid",
							borderColor: "divider",
							boxShadow: "none",
							"&:hover": {
								transform: "translateY(-12px)",
								boxShadow: (t) =>
									t.palette.mode === "light"
										? "0 20px 40px rgba(0,0,0,0.08)"
										: "0 20px 40px rgba(0,0,0,0.5)",
								borderColor: "primary.main",
							},
						}}
					>
						<Box sx={{ position: "relative", overflow: "hidden" }}>
							<CardMedia
								component="img"
								height="240"
								image={item.defaultImageUrl}
								alt={item.name}
								sx={{
									transition: "transform 0.5s ease",
									"&:hover": {
										transform: "scale(1.05)",
									},
								}}
							/>
							<Chip
								label="Trending"
								size="small"
								sx={{
									position: "absolute",
									top: 16,
									left: 16,
									fontWeight: 800,
									backgroundColor: (t) => t.palette.mode === "light" ? "#111" : "#FFF",
									color: (t) => t.palette.mode === "light" ? "#FFF" : "#111",
								}}
							/>
						</Box>
						<CardContent sx={{ p: 3 }}>
							<Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1 }}>
								{item.name}
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{
									display: "-webkit-box",
									WebkitLineClamp: 2,
									WebkitBoxOrient: "vertical",
									overflow: "hidden",
								}}
							>
								{item.description}
							</Typography>
							<Typography
								variant="h6"
								sx={{ mt: 2, fontWeight: 800, color: "text.primary" }}
							>
								${item.price.toFixed(2)}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Box>
		</Box>
	);
}
