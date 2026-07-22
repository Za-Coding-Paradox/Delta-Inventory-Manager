// src/components/product-page/pricing-section.tsx
import {
	Box,
	Typography,
	Grid,
	Card,
	CardContent,
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const tiers = [
	{
		name: "Standard",
		price: "Free",
		features: [
			"Standard Shipping (5-7 days)",
			"Email Support",
			"Access to Base Catalog",
		],
		cta: "Sign Up",
		featured: false,
	},
	{
		name: "Premium",
		price: "$9.99/mo",
		features: [
			"Free Express Shipping (2 days)",
			"Priority Support",
			"Early Access to Drops",
			"10% Off All Orders",
		],
		cta: "Go Premium",
		featured: true,
	},
	{
		name: "Business",
		price: "$49.99/mo",
		features: [
			"Bulk Order Discounts",
			"Dedicated Account Manager",
			"Custom Tailoring Options",
		],
		cta: "Contact Sales",
		featured: false,
	},
];

export default function PricingSection() {
	return (
		<Box
			id="pricing"
			sx={{ maxWidth: 1200, mx: "auto", py: 8, px: { xs: 2, md: 4 } }}
		>
			<Typography
				variant="h4"
				align="center"
				sx={{ fontWeight: 800, mb: 6 }}
			>
				Membership Tiers
			</Typography>
			<Grid container spacing={4} sx={{ justifyContent: "center" }}>
				{tiers.map((tier) => (
					<Grid size={{ xs: 12, md: 4 }} key={tier.name}>
						<Card
							sx={{
								height: "100%",
								borderRadius: "20px",
								border: tier.featured
									? "2px solid"
									: "1px solid",
								borderColor: tier.featured
									? "primary.main"
									: "divider",
								transform: tier.featured
									? "scale(1.05)"
									: "none",
								boxShadow: tier.featured ? 6 : 1,
							}}
						>
							<CardContent sx={{ p: 4, textAlign: "center" }}>
								<Typography
									variant="h5"
									sx={{ fontWeight: 700, mb: 1 }}
								>
									{tier.name}
								</Typography>
								<Typography
									variant="h3"
									color="primary"
									sx={{ fontWeight: 800, mb: 3 }}
								>
									{tier.price}
								</Typography>
								<Button
									variant={
										tier.featured ? "contained" : "outlined"
									}
									fullWidth
									size="large"
									sx={{ mb: 3 }}
								>
									{tier.cta}
								</Button>
								<List>
									{tier.features.map((feature, i) => (
										<ListItem key={i} disableGutters>
											<ListItemIcon
												sx={{
													minWidth: 32,
													color: "success.main",
												}}
											>
												<CheckCircleIcon fontSize="small" />
											</ListItemIcon>
											<ListItemText
												primary={feature}
												slotProps={{
													primary: {
														variant: "body2",
														color: "text.secondary",
													},
												}}
											/>
										</ListItem>
									))}
								</List>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
