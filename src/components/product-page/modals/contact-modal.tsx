// src/components/product-page/modals/contact-modal.tsx
import {
	Modal,
	Box,
	Typography,
	Button,
	TextField,
	IconButton,
	Backdrop,
	Fade,
	InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

export default function ContactModal({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	return (
		<Modal
			open={open}
			onClose={onClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
					sx: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
				},
			}}
		>
			<Fade in={open}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: { xs: "90%", sm: 480 },
						bgcolor: "background.paper",
						borderRadius: "24px",
						boxShadow: (t) =>
							t.palette.mode === "light"
								? "0 24px 48px rgba(0,0,0,0.1)"
								: "0 24px 48px rgba(0,0,0,0.8)",
						p: { xs: 3, md: 5 },
						overflow: "hidden",
					}}
				>
					{/* Decorative Gradient Blob */}
					<Box
						sx={{
							position: "absolute",
							top: -50,
							right: -50,
							width: 150,
							height: 150,
							background: "linear-gradient(135deg, #111111 0%, transparent 100%)",
							borderRadius: "50%",
							opacity: (t) => (t.palette.mode === "light" ? 0.05 : 0.2),
							filter: "blur(30px)",
							pointerEvents: "none",
						}}
					/>

					<IconButton
						onClick={onClose}
						sx={{
							position: "absolute",
							right: 16,
							top: 16,
							zIndex: 10,
							backgroundColor: "background.paper",
							"&:hover": { backgroundColor: "action.hover", transform: "rotate(90deg)" },
							transition: "all 0.3s ease",
						}}
					>
						<CloseIcon />
					</IconButton>

					<Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
						Get in Touch
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
						Have a question or feedback? We'd love to hear from you. Drop us a message below.
					</Typography>

					<Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
						<TextField
							fullWidth
							label="Full Name"
							variant="outlined"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<PersonOutlineRoundedIcon sx={{ color: "text.secondary" }} />
										</InputAdornment>
									),
								},
							}}
						/>
						<TextField
							fullWidth
							label="Email Address"
							variant="outlined"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AlternateEmailIcon sx={{ color: "text.secondary" }} />
										</InputAdornment>
									),
								},
							}}
						/>
						<TextField
							fullWidth
							label="Your Message"
							multiline
							rows={4}
							variant="outlined"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
											<ChatBubbleOutlineRoundedIcon sx={{ color: "text.secondary" }} />
										</InputAdornment>
									),
								},
							}}
						/>
						<Button
							variant="contained"
							size="large"
							endIcon={<SendIcon />}
							onClick={onClose}
							sx={{
								mt: 1,
								py: 1.5,
								borderRadius: "12px",
								fontWeight: 700,
								textTransform: "none",
								fontSize: "1.05rem",
								boxShadow: "none",
								"&:hover": {
									boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
									transform: "translateY(-2px)",
								},
								transition: "all 0.3s ease",
							}}
						>
							Send Message
						</Button>
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
}
