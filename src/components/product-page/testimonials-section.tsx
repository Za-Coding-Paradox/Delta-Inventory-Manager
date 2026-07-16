// src/components/product-page/testimonials-section.tsx
import { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Avatar,
	Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

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
	{
		name: "David L.",
		text: "The search bar made finding exactly what I needed effortless. A truly modern shopping experience.",
		avatar: "DL",
	},
	{
		name: "Priya K.",
		text: "Clean design, smooth checkout, and products that match the photos. Highly recommend AURA.",
		avatar: "PK",
	},
];

const AUTO_INTERVAL_MS = 4000;

export default function TestimonialsSection() {
	const [activeStep, setActiveStep] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (isPaused) return;
		const timer = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % reviews.length);
		}, AUTO_INTERVAL_MS);
		return () => clearInterval(timer);
	}, [isPaused]);

	const review = reviews[activeStep];

	return (
		<Box
			sx={{
				maxWidth: 900,
				mx: "auto",
				py: 8,
				px: 2,
			}}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			<Typography
				variant="h4"
				align="center"
				sx={{ fontWeight: 800, mb: 1 }}
			>
				What Our Customers Say
			</Typography>
			<Typography
				align="center"
				color="text.secondary"
				sx={{ mb: 5, fontSize: "0.95rem" }}
			>
				Trusted by thousands of happy shoppers
			</Typography>

			<Card
				key={activeStep}
				sx={{
					borderRadius: "20px",
					minHeight: 260,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					animation: "fadeSlideIn 0.5s ease-out",
					background: (t) =>
						t.palette.mode === "light"
							? "linear-gradient(135deg, #FFFFFF 0%, #F4F8FB 100%)"
							: "linear-gradient(135deg, #1A1A1A 0%, #1E2830 100%)",
				}}
			>
				<CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: "center" }}>
					<Avatar
						sx={{
							width: 64,
							height: 64,
							mx: "auto",
							mb: 2,
							bgcolor: "primary.main",
							fontWeight: 700,
							fontSize: "1.1rem",
						}}
					>
						{review.avatar}
					</Avatar>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: 2,
							gap: 0.25,
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
						sx={{
							mb: 2,
							fontStyle: "italic",
							fontWeight: 400,
							lineHeight: 1.6,
							maxWidth: 600,
							mx: "auto",
						}}
					>
						&ldquo;{review.text}&rdquo;
					</Typography>
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						{review.name}
					</Typography>
				</CardContent>
			</Card>

			<Stack
				direction="row"
				spacing={1}
				justifyContent="center"
				sx={{ mt: 3 }}
			>
				{reviews.map((_, i) => (
					<Box
						key={i}
						onClick={() => setActiveStep(i)}
						sx={{
							width: activeStep === i ? 28 : 8,
							height: 8,
							borderRadius: 4,
							backgroundColor:
								activeStep === i
									? "primary.main"
									: "action.selected",
							transition: "all 0.3s ease",
							cursor: "pointer",
						}}
					/>
				))}
			</Stack>
		</Box>
	);
}
