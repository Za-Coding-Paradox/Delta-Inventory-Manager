// src/components/product-page/testimonials-section.tsx
import { useState } from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Avatar,
	MobileStepper,
	IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const reviews = [
	{
		name: "Sarah J.",
		text: "The quality of the AURA clothing is unmatched. The white chinos are my new summer staple!",
		avatar: "SJ",
	},
	{
		name: "Michael T.",
		text: "Fast shipping and beautiful packaging. The teal shirt fits perfectly. Will buy again.",
		avatar: "MT",
	},
	{
		name: "Emma R.",
		text: "I love that I could see exactly what the product looks like in different colors before buying.",
		avatar: "ER",
	},
];

export default function TestimonialsSection() {
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = reviews.length;

	const handleNext = () => setActiveStep((prev) => prev + 1);
	const handleBack = () => setActiveStep((prev) => prev - 1);

	return (
		<Box sx={{ maxWidth: 800, mx: "auto", py: 8, px: 2 }}>
			<Typography
				variant="h4"
				align="center"
				sx={{ fontWeight: 800, mb: 6 }}
			>
				What Our Customers Say
			</Typography>

			<Card
				sx={{
					borderRadius: "16px",
					minHeight: 250,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<CardContent sx={{ p: 4, textAlign: "center" }}>
					<Avatar
						sx={{
							width: 60,
							height: 60,
							mx: "auto",
							mb: 2,
							bgcolor: "primary.main",
							fontWeight: 700,
						}}
					>
						{reviews[activeStep].avatar}
					</Avatar>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: 1,
						}}
					>
						{[...Array(5)].map((_, i) => (
							<StarIcon
								key={i}
								sx={{ color: "secondary.main", fontSize: 20 }}
							/>
						))}
					</Box>
					<Typography
						variant="h6"
						color="text.secondary"
						sx={{ mb: 2, fontStyle: "italic" }}
					>
						"{reviews[activeStep].text}"
					</Typography>
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						{reviews[activeStep].name}
					</Typography>
				</CardContent>
			</Card>

			<MobileStepper
				steps={maxSteps}
				position="static"
				activeStep={activeStep}
				sx={{
					justifyContent: "center",
					mt: 2,
					background: "transparent",
				}}
				nextButton={
					<IconButton
						size="small"
						onClick={handleNext}
						disabled={activeStep === maxSteps - 1}
					>
						<KeyboardArrowRight />
					</IconButton>
				}
				backButton={
					<IconButton
						size="small"
						onClick={handleBack}
						disabled={activeStep === 0}
					>
						<KeyboardArrowLeft />
					</IconButton>
				}
			/>
		</Box>
	);
}
