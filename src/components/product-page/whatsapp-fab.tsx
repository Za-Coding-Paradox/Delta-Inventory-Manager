// src/components/product-page/whatsapp-fab.tsx
import { Fab, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export default function WhatsAppFab() {
	return (
		<Tooltip title="Chat with us on WhatsApp" placement="left">
			<Fab
				color="success"
				aria-label="whatsapp"
				sx={{
					position: "fixed",
					bottom: 24,
					left: 24,
					color: "#fff",
					boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
				}}
				onClick={() =>
					window.open("https://wa.me/1234567890", "_blank")
				}
			>
				<ChatIcon />
			</Fab>
		</Tooltip>
	);
}
