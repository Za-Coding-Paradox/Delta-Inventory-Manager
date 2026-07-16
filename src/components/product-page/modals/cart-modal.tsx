// src/components/product-page/modals/contact-modal.tsx
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

export default function ContactModal({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					borderRadius: 4,
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Contact Us
				</Typography>
				<TextField fullWidth label="Name" size="small" sx={{ mb: 2 }} />
				<TextField
					fullWidth
					label="Email"
					size="small"
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					label="Message"
					multiline
					rows={4}
					sx={{ mb: 2 }}
				/>
				<Button variant="contained" fullWidth onClick={onClose}>
					Send
				</Button>
			</Box>
		</Modal>
	);
}
