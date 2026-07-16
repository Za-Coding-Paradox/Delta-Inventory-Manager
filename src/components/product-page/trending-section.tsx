// src/components/product-page/trending-section.tsx
import {
	Box,
	Typography,
	Card,
	CardMedia,
	CardContent,
	Chip,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../../context/app-context";
import type { Product } from "../../config/types";

export default function TrendingSection() {
	const { state } = useAppContext();
	const { onQuickView } = useOutletContext<{
		onQuickView: (p: Product) => void;
	}>();

	// Just grab the first 4 items as "trending" for this dummy setup
	const trendingItems = state.products.slice(0, 4);

	return (
		<Box
			id="trending"
			sx={{
				py: 8,
				backgroundColor: (t) =>
					t.palette.mode === "light" ? "#F0F4F8" : "#1A1A1A",
			}}
		>
			<Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 4 } }}>
				<Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
					Trending & Highlights
				</Typography>
				<Box sx={{ display: "flex", gap: 3, overflowX: "auto", pb: 2 }}>
					{trendingItems.map((item) => (
						<Card
							key={item.id}
							onClick={() => onQuickView(item)}
							sx={{
								minWidth: 300,
								cursor: "pointer",
								flex: "0 0 auto",
								transition: "transform 0.3s",
								"&:hover": {
									transform: "translateY(-8px)",
									boxShadow: 6,
								},
							}}
						>
							<Box sx={{ position: "relative" }}>
								<CardMedia
									component="img"
									height="200"
									image={item.defaultImageUrl}
									alt={item.name}
								/>
								<Chip
									label="Trending"
									color="secondary"
									size="small"
									sx={{
										position: "absolute",
										top: 12,
										left: 12,
										fontWeight: 700,
									}}
								/>
							</Box>
							<CardContent>
								<Typography
									variant="h6"
									sx={{ fontWeight: 600 }}
								>
									{item.name}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mt: 1 }}
								>
									{item.description.substring(0, 60)}...
								</Typography>
								<Typography
									variant="h6"
									color="primary"
									sx={{ mt: 1, fontWeight: 700 }}
								>
									${item.price.toFixed(2)}
								</Typography>
							</CardContent>
						</Card>
					))}
				</Box>
			</Box>
		</Box>
	);
}
