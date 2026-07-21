// src/components/product-page/testimonials-section.tsx
import { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Avatar,
	Stack,
	Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

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

const AUTO_INTERVAL_MS = 2500;

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
				maxWidth: 1200,
				mx: "auto",
				py: { xs: 8, md: 12 },
				px: { xs: 2, md: 4 },
			}}
		>
			<Grid
				container
				spacing={{ xs: 4, md: 8 }}
				sx={{ alignItems: "center" }}
			>
				{/* Left Column: Our Promise */}
				<Grid size={{ xs: 12, md: 5 }}>
					<Box sx={{ pr: { md: 4 } }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1.5,
								mb: 3,
							}}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									borderRadius: "12px",
									backgroundColor: (t) =>
										t.palette.mode === "light"
											? "#F5F5F5"
											: "#1A1A1A",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "primary.main",
								}}
							>
								<VerifiedUserIcon />
							</Box>
							<Typography
								variant="overline"
								sx={{
									fontWeight: 800,
									letterSpacing: 2,
									color: "text.secondary",
								}}
							>
								AURA PROMISE
							</Typography>
						</Box>

						<Typography
							variant="h3"
							sx={{ fontWeight: 800, mb: 3, lineHeight: 1.2 }}
						>
							Uncompromising Quality & Care.
						</Typography>

						<Typography
							variant="body1"
							color="text.secondary"
							sx={{ mb: 4, lineHeight: 1.7, fontSize: "1.1rem" }}
						>
							We believe that shopping should be effortless and
							the products you receive should exceed expectations.
							From sustainable sourcing to impeccable design, our
							commitment is to provide you with pieces that stand
							the test of time, accompanied by a world-class
							customer experience.
						</Typography>

						<Stack direction="row" spacing={4}>
							<Box>
								<Typography
									variant="h4"
									sx={{
										fontWeight: 800,
										color: "primary.main",
									}}
								>
									10k+
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ fontWeight: 600 }}
								>
									Happy Customers
								</Typography>
							</Box>
							<Box>
								<Typography
									variant="h4"
									sx={{
										fontWeight: 800,
										color: "primary.main",
									}}
								>
									4.9
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ fontWeight: 600 }}
								>
									Average Rating
								</Typography>
							</Box>
						</Stack>
					</Box>
				</Grid>

				{/* Right Column: Automatic Carousel */}
				<Grid size={{ xs: 12, md: 7 }}>
					<Box
						onMouseEnter={() => setIsPaused(true)}
						onMouseLeave={() => setIsPaused(false)}
						sx={{ position: "relative" }}
					>
						<Card
							key={activeStep}
							sx={{
								borderRadius: "24px",
								minHeight: 320,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								animation:
									"fadeSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
								background: (t) =>
									t.palette.mode === "light"
										? "linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)"
										: "linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)",
								boxShadow: (t) =>
									t.palette.mode === "light"
										? "0 32px 64px rgba(0,0,0,0.06)"
										: "0 32px 64px rgba(0,0,0,0.4)",
								border: "1px solid",
								borderColor: "divider",
							}}
						>
							<CardContent
								sx={{
									p: { xs: 4, md: 6 },
									textAlign: "center",
								}}
							>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										mb: 3,
										gap: 0.5,
									}}
								>
									{[...Array(5)].map((_, i) => (
										<StarIcon
											key={i}
											sx={{
												color: "#FFB400",
												fontSize: 24,
											}}
										/>
									))}
								</Box>
								<Typography
									variant="h5"
									color="text.primary"
									sx={{
										mb: 4,
										fontStyle: "italic",
										fontWeight: 600,
										lineHeight: 1.6,
										maxWidth: 600,
										mx: "auto",
									}}
								>
									&ldquo;{review.text}&rdquo;
								</Typography>

								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: 2,
									}}
								>
									<Avatar
										sx={{
											width: 48,
											height: 48,
											bgcolor: "text.primary",
											color: "background.paper",
											fontWeight: 800,
										}}
									>
										{review.avatar}
									</Avatar>
									<Box sx={{ textAlign: "left" }}>
										<Typography
											variant="subtitle1"
											sx={{
												fontWeight: 800,
												lineHeight: 1.2,
											}}
										>
											{review.name}
										</Typography>
										<Typography
											variant="caption"
											color="text.secondary"
											sx={{ fontWeight: 600 }}
										>
											Verified Buyer
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>

						<Stack
							direction="row"
							spacing={1.5}
							sx={{ mt: 4, justifyContent: "center" }}
						>
							{reviews.map((_, i) => (
								<Box
									key={i}
									onClick={() => setActiveStep(i)}
									sx={{
										width: activeStep === i ? 32 : 10,
										height: 10,
										borderRadius: 5,
										backgroundColor:
											activeStep === i
												? "primary.main"
												: "divider",
										transition:
											"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
										cursor: "pointer",
										"&:hover": {
											backgroundColor:
												activeStep === i
													? "primary.main"
													: "text.disabled",
										},
									}}
								/>
							))}
						</Stack>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
