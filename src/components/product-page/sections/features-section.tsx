// src/components/product-page/sections/features-section.tsx
import { Box, Typography, Paper, alpha } from "@mui/material";
import Grid from "@mui/material/Grid";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

const features = [
	{
		icon: <LocalShippingRoundedIcon sx={{ fontSize: 40 }} />,
		title: "Fast, Free Shipping",
		desc: "Enjoy complimentary express shipping on all orders over $150.",
	},
	{
		icon: <AutorenewRoundedIcon sx={{ fontSize: 40 }} />,
		title: "30-Day Returns",
		desc: "Not quite right? Return it within 30 days for a full refund.",
	},
	{
		icon: <VerifiedUserRoundedIcon sx={{ fontSize: 40 }} />,
		title: "Premium Quality",
		desc: "Every item is authenticated and guaranteed for lasting durability.",
	},
];

export default function FeaturesSection() {
	return (
		<Box sx={{ maxWidth: 1200, mx: "auto", py: 10, px: 2 }}>
			<Grid container spacing={4}>
				{features.map((feat, i) => (
					<Grid size={{ xs: 12, md: 4 }} key={i}>
						<Paper
							elevation={0}
							sx={{
								p: 4,
								height: "100%",
								textAlign: "center",
								borderRadius: "24px",
								backgroundColor: (t) =>
									t.palette.mode === "light"
										? alpha(t.palette.primary.main, 0.04)
										: alpha(t.palette.primary.main, 0.08),
								transition: "transform 0.3s ease",
								"&:hover": {
									transform: "translateY(-8px)",
								},
							}}
						>
							<Box sx={{ color: "primary.main", mb: 2 }}>{feat.icon}</Box>
							<Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
								{feat.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{feat.desc}
							</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
