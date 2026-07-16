// src/components/product-page/contact-section.tsx
import { useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Grid,
	Snackbar,
	Alert,
	Paper,
} from "@mui/material";

export default function ContactSection() {
	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen(false);

	return (
		<Box id="contact" sx={{ maxWidth: 800, mx: "auto", py: 8, px: 2 }}>
			<Paper
				elevation={0}
				sx={{
					p: { xs: 3, md: 6 },
					borderRadius: "24px",
					backgroundColor: (t) =>
						t.palette.mode === "light" ? "#F5F5F5" : "#0F0F0F",
				}}
			>
				<Typography
					variant="h4"
					align="center"
					sx={{ fontWeight: 800, mb: 2 }}
				>
					Stay in the Loop
				</Typography>
				<Typography
					variant="body1"
					align="center"
					color="text.secondary"
					sx={{ mb: 4 }}
				>
					Subscribe to our newsletter for the latest drops and
					exclusive offers.
				</Typography>

				<Box
					component="form"
					onSubmit={(e) => {
						e.preventDefault();
						setOpen(true);
					}}
					sx={{ display: "flex", gap: 2, mb: 6 }}
				>
					<TextField
						fullWidth
						label="Email Address"
						variant="outlined"
						required
					/>
					<Button
						type="submit"
						variant="contained"
						size="large"
						sx={{ px: 4 }}
					>
						Subscribe
					</Button>
				</Box>

				<Typography
					variant="h5"
					align="center"
					sx={{ fontWeight: 700, mb: 4 }}
				>
					Have a question? Reach out.
				</Typography>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12, md: 6 }}>
						<TextField
							fullWidth
							label="Name"
							variant="outlined"
							required
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<TextField
							fullWidth
							label="Subject"
							variant="outlined"
							required
						/>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<TextField
							fullWidth
							label="Message"
							variant="outlined"
							multiline
							rows={4}
							required
						/>
					</Grid>
					<Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
						<Button
							variant="contained"
							color="secondary"
							size="large"
							onClick={() => setOpen(true)}
						>
							Send Message
						</Button>
					</Grid>
				</Grid>
			</Paper>

			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{ width: "100%" }}
				>
					Success! We have received your submission.
				</Alert>
			</Snackbar>
		</Box>
	);
}
