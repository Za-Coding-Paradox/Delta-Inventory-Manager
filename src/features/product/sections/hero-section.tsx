// src/components/product-page/hero-section.tsx
import { Box, Typography, Button, Container } from "@mui/material";

export default function HeroSection() {
	return (
		<Box
			sx={{
				position: "relative",
				overflow: "hidden",
				backgroundColor: (t) =>
					t.palette.mode === "light" ? "#0A0A0A" : "#000000",
				py: { xs: 10, md: 16 },
				// Subtle grid pattern overlay
				"&::before": {
					content: '""',
					position: "absolute",
					inset: 0,
					backgroundImage: (t) =>
						t.palette.mode === "light"
							? `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`
							: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
					backgroundSize: "32px 32px",
					pointerEvents: "none",
				},
				// Glowing accent top-right
				"&::after": {
					content: '""',
					position: "absolute",
					top: "-20%",
					right: "-10%",
					width: "50%",
					height: "150%",
					background: (t) =>
						t.palette.mode === "light"
							? "radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)"
							: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
					pointerEvents: "none",
				},
			}}
		>
			<Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
				<Box sx={{ maxWidth: 700 }}>
					{/* Eyebrow label */}
					<Box
						sx={{
							display: "inline-flex",
							alignItems: "center",
							gap: 1,
							px: 1.5,
							py: 0.5,
							mb: 3,
							borderRadius: "100px",
							border: "1px solid rgba(255,255,255,0.15)",
							backgroundColor: "rgba(255,255,255,0.06)",
							backdropFilter: "blur(8px)",
						}}
					>
						<Box
							sx={{
								width: 6,
								height: 6,
								borderRadius: "50%",
								backgroundColor: "#FFFFFF",
								animation: "pulse 2s ease-in-out infinite",
								"@keyframes pulse": {
									"0%, 100%": { opacity: 1 },
									"50%": { opacity: 0.3 },
								},
							}}
						/>
						<Typography
							variant="caption"
							sx={{
								color: "rgba(255,255,255,0.7)",
								fontWeight: 600,
								letterSpacing: "0.05em",
								textTransform: "uppercase",
								fontSize: "0.7rem",
							}}
						>
							New Collection Available
						</Typography>
					</Box>

					<Typography
						variant="h1"
						sx={{
							fontWeight: 900,
							mb: 3,
							lineHeight: 1.08,
							letterSpacing: "-3px",
							color: "#FFFFFF",
							fontSize: { xs: "2.8rem", md: "4.5rem" },
						}}
					>
						Elevate your{" "}
						<Box
							component="span"
							sx={{
								position: "relative",
								display: "inline-block",
								"&::after": {
									content: '""',
									position: "absolute",
									bottom: 4,
									left: 0,
									right: 0,
									height: 3,
									backgroundColor: "rgba(255,255,255,0.4)",
									borderRadius: 2,
								},
							}}
						>
							lifestyle
						</Box>{" "}
						with AURA.
					</Typography>

					<Typography
						variant="h6"
						sx={{
							mb: 5,
							color: "rgba(255,255,255,0.55)",
							fontWeight: 400,
							lineHeight: 1.7,
							maxWidth: 520,
							fontSize: { xs: "1rem", md: "1.1rem" },
						}}
					>
						Discover curated electronics, fashion, and home goods.
						Thoughtfully sourced, beautifully presented.
					</Typography>

					<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
						<Button
							variant="contained"
							size="large"
							href="#products"
							sx={{
								backgroundColor: "#FFFFFF",
								color: "#000000",
								fontWeight: 700,
								px: 4,
								py: 1.5,
								borderRadius: "12px",
								fontSize: "0.95rem",
								"&:hover": {
									backgroundColor: "#E0E0E0",
									transform: "translateY(-3px)",
									boxShadow:
										"0 12px 32px rgba(255,255,255,0.2)",
								},
							}}
						>
							Shop Now
						</Button>
						<Button
							variant="outlined"
							size="large"
							href="#trending"
							sx={{
								borderColor: "rgba(255,255,255,0.25)",
								color: "rgba(255,255,255,0.85)",
								fontWeight: 600,
								px: 4,
								py: 1.5,
								borderRadius: "12px",
								fontSize: "0.95rem",
								"&:hover": {
									borderColor: "rgba(255,255,255,0.6)",
									backgroundColor: "rgba(255,255,255,0.06)",
									transform: "translateY(-3px)",
								},
							}}
						>
							View Trending
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
