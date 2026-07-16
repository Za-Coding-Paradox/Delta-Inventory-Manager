// src/components/product-page/hero-section.tsx
import { Box, Typography, Button, Container } from "@mui/material";

export default function HeroSection() {
	return (
		<Box
			sx={{
				backgroundColor: (t) =>
					t.palette.mode === "light" ? "#F0F4F8" : "#1A1A1A",
				py: { xs: 8, md: 12 },
				borderBottom: 1,
				borderColor: "divider",
			}}
		>
			<Container maxWidth="lg">
				<Box sx={{ maxWidth: 600 }}>
					<Typography
						variant="h2"
						sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}
					>
						Upgrade your lifestyle with{" "}
						<span style={{ color: "#3A6B88" }}>AURA</span>.
					</Typography>
					<Typography
						variant="h6"
						color="text.secondary"
						sx={{ mb: 4 }}
					>
						Discover curated electronics, fashion, and home goods.
						Fast shipping, premium quality, and seamless shopping.
					</Typography>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Button
							variant="contained"
							size="large"
							href="#products"
						>
							Shop Now
						</Button>
						<Button
							variant="outlined"
							size="large"
							href="#trending"
						>
							View Trending
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
