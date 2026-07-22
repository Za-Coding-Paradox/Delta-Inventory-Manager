import { useState, useMemo, useCallback } from "react";
import { Box, IconButton, Stack, Button, Avatar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppContext } from "../../../../context/app-context";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";
import MessagesModal from "../messages-modal";
import React from "react";

export const MessagesWidget = React.memo(function MessagesWidget() {
	const [modalOpen, setModalOpen] = useState(false);
	const { state } = useAppContext();

	const handleOpen = useCallback(() => setModalOpen(true), []);
	const handleClose = useCallback(() => setModalOpen(false), []);

	const messages = useMemo(() => state.messages.slice(0, 10), [state.messages]);

	const headerAction = (
		<IconButton size="small" onClick={handleOpen}>
			<MoreVertIcon />
		</IconButton>
	);

	return (
		<>
			<WidgetCard title="Messages" headerAction={headerAction} sx={{ flexGrow: 1 }} contentSx={{ display: "flex", flexDirection: "column" }}>
				<Box sx={{ flex: 1, maxHeight: 170, overflowY: "auto", pr: 1, mb: 2 }}>
					<Stack spacing={2}>
						{messages.map((msg) => (
							<Box key={msg.id} sx={{ display: "flex", gap: 2, alignItems: "flex-start", opacity: msg.read ? 0.7 : 1 }}>
								<Avatar sx={{ width: 40, height: 40, bgcolor: msg.read ? "action.disabledBackground" : "primary.main", color: msg.read ? "text.secondary" : "primary.contrastText" }}>
									{msg.sender.charAt(0)}
								</Avatar>
								<Box>
									<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
										<Typography variant="body2" sx={{ fontWeight: 700 }}>{msg.sender}</Typography>
										{!msg.read && <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main" }} />}
									</Box>
									<Typography variant="caption" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
										{msg.content}
									</Typography>
								</Box>
							</Box>
						))}
					</Stack>
				</Box>
				<Button variant="contained" fullWidth sx={{ borderRadius: "10px", fontWeight: 700 }} onClick={handleOpen}>
					View All Messages
				</Button>
			</WidgetCard>
			<MessagesModal open={modalOpen} onClose={handleClose} />
		</>
	);
});
