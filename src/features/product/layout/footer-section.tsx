// src/components/product-page/footer-section.tsx
import {
	Box,
	Typography,
	Grid,
	Link,
	Divider,
	IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function FooterSection() {
	return (
		<Box
			sx={{
				backgroundColor: (t) =>
					t.palette.mode === "light" ? "#1A1A1A" : "#0F0F0F",
				color: "#fff",
				mt: 8,
				pt: 8,
				pb: 4,
			}}
		>
			<Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 4 } }}>
				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 4 }}>
						<Typography
							variant="h5"
							sx={{ fontWeight: 800, mb: 2 }}
						>
							AURA
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: "rgba(255,255,255,0.7)",
								maxWidth: 300,
							}}
						>
							Premium products, curated for you. Upgrade your
							lifestyle with AURA.
						</Typography>
						<Box sx={{ mt: 2 }}>
							<IconButton sx={{ color: "#fff" }}>
								<FacebookIcon />
							</IconButton>
							<IconButton sx={{ color: "#fff" }}>
								<TwitterIcon />
							</IconButton>
							<IconButton sx={{ color: "#fff" }}>
								<InstagramIcon />
							</IconButton>
						</Box>
					</Grid>

					<Grid size={{ xs: 6, md: 2 }}>
						<Typography
							variant="subtitle1"
							sx={{ fontWeight: 700, mb: 2 }}
						>
							Shop
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1,
							}}
						>
							<Link
								href="#products"
								color="inherit"
								underline="hover"
							>
								Products
							</Link>
							<Link
								href="#trending"
								color="inherit"
								underline="hover"
							>
								Trending
							</Link>
							<Link
								href="#pricing"
								color="inherit"
								underline="hover"
							>
								Pricing
							</Link>
						</Box>
					</Grid>

					<Grid size={{ xs: 6, md: 2 }}>
						<Typography
							variant="subtitle1"
							sx={{ fontWeight: 700, mb: 2 }}
						>
							Company
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1,
							}}
						>
							<Link href="#" color="inherit" underline="hover">
								About Us
							</Link>
							<Link href="#" color="inherit" underline="hover">
								Careers
							</Link>
							<Link
								href="#contact"
								color="inherit"
								underline="hover"
							>
								Contact
							</Link>
						</Box>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<Typography
							variant="subtitle1"
							sx={{ fontWeight: 700, mb: 2 }}
						>
							Newsletter
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}
						>
							Subscribe to get the latest updates and exclusive
							offers.
						</Typography>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

				<Typography
					variant="body2"
					align="center"
					sx={{ color: "rgba(255,255,255,0.5)" }}
				>
					© 2024 AURA. All rights reserved.
				</Typography>
			</Box>
		</Box>
	);
}
