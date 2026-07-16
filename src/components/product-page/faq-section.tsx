// src/components/product-page/faq-section.tsx
import {
	Box,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	IconButton,
} from "@mui/material";

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
];

export default function FaqSection() {
	return (
		<Box id="faq" sx={{ maxWidth: 800, mx: "auto", py: 8, px: 2 }}>
			<Typography
				variant="h4"
				align="center"
				sx={{ fontWeight: 800, mb: 4 }}
			>
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
						expandIcon={false} // Disable default icon
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
						<IconButton size="small" sx={{ ml: 2 }}>
							{/* MUI automatically toggles the expand icon state inside AccordionSummary if we use the class, but to do it manually is tricky without state. We'll use the default MUI expand icon but styled. */}
						</IconButton>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="body2" color="text.secondary">
							{faq.a}
						</Typography>
					</AccordionDetails>
				</Accordion>
			))}
		</Box>
	);
}
