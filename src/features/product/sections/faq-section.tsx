// src/components/product-page/faq-section.tsx
import {
	Box,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Card,
	CardContent,
	CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const faqs = [
	{
		q: "How long does shipping take?",
		a: "Shipping typically takes 3-5 business days within the continental US. International orders may take 7-14 days.",
	},
	{
		q: "What is your return policy?",
		a: "We offer a 30-day hassle-free return policy. Items must be unworn and have original tags attached.",
	},
	{
		q: "Do you restock sold-out items?",
		a: "Yes! Most sold-out items are restocked within 2 weeks. You can click the 'Wishlist' button on an out-of-stock item to be notified.",
	},
	{
		q: "How can I track my order?",
		a: "Once your order ships, you will receive an email with a tracking link. You can also view the status from your account dashboard.",
	},
	{
		q: "Do you ship internationally?",
		a: "We currently ship to select international countries. Shipping costs and delivery times are calculated at checkout based on your location.",
	},
];

export default function FaqSection() {
	return (
		<Box id="faq" sx={{ maxWidth: 1200, mx: "auto", py: 8, px: { xs: 2, md: 4 } }}>
			<Typography
				variant="h4"
				align="center"
				sx={{ fontWeight: 800, mb: 6 }}
			>
				Questions & Insights
			</Typography>

			<Grid container spacing={6}>
				<Grid size={{ xs: 12, md: 6 }}>
					<Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
						Frequently Asked Questions
					</Typography>
					{faqs.map((faq, i) => (
						<Accordion
							key={i}
							sx={{
								mb: 2,
								borderRadius: "12px !important",
								overflow: "hidden",
								boxShadow: (t) =>
									t.palette.mode === "light"
										? "0px 4px 12px rgba(0,0,0,0.05)"
										: "0px 4px 12px rgba(0,0,0,0.2)",
								"&:before": { display: "none" },
							}}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								sx={{
									backgroundColor: (t) =>
										t.palette.mode === "light"
											? "#F9F9F9"
											: "#252525",
									"& .MuiAccordionSummary-content": {
										alignItems: "center",
									},
								}}
							>
								<Typography
									variant="subtitle1"
									sx={{ fontWeight: 600, flexGrow: 1 }}
								>
									{faq.q}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography variant="body2" color="text.secondary">
									{faq.a}
								</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</Grid>

				<Grid size={{ xs: 12, md: 6 }}>
					<Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
						Latest from our Blog
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
						<Card elevation={0} sx={{ display: "flex", borderRadius: "16px", overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
							<CardMedia
								component="img"
								sx={{ width: 140, objectFit: "cover" }}
								image="https://placehold.co/400x400?text=Style+Tips"
								alt="Style Tips"
							/>
							<CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
								<Typography variant="caption" color="primary.main" sx={{ fontWeight: 700, mb: 0.5 }}>
									FASHION GUIDE
								</Typography>
								<Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.2 }}>
									10 Essential Wardrobe Pieces for 2026
								</Typography>
								<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary", mt: "auto", cursor: "pointer", "&:hover": { color: "primary.main" } }}>
									<Typography variant="button" sx={{ fontWeight: 700, textTransform: "none" }}>Read more</Typography>
									<ArrowForwardRoundedIcon fontSize="small" />
								</Box>
							</CardContent>
						</Card>

						<Card elevation={0} sx={{ display: "flex", borderRadius: "16px", overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
							<CardMedia
								component="img"
								sx={{ width: 140, objectFit: "cover" }}
								image="https://placehold.co/400x400?text=Sustainability"
								alt="Sustainability"
							/>
							<CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
								<Typography variant="caption" color="secondary.main" sx={{ fontWeight: 700, mb: 0.5 }}>
									BEHIND THE SCENES
								</Typography>
								<Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.2 }}>
									Our Commitment to Sustainable Sourcing
								</Typography>
								<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary", mt: "auto", cursor: "pointer", "&:hover": { color: "secondary.main" } }}>
									<Typography variant="button" sx={{ fontWeight: 700, textTransform: "none" }}>Read more</Typography>
									<ArrowForwardRoundedIcon fontSize="small" />
								</Box>
							</CardContent>
						</Card>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
