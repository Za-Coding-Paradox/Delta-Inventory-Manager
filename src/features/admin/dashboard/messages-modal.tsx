import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton, List, ListItem, ListItemAvatar, Avatar, Tooltip } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useAppContext } from "../../../context/app-context";

interface MessagesModalProps {
	open: boolean;
	onClose: () => void;
}

export default function MessagesModal({ open, onClose }: MessagesModalProps) {
	const { state, dispatch } = useAppContext();
	const { messages } = state;

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ "& .MuiDialog-paper": { borderRadius: "20px" } }}>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1, fontWeight: 800 }}>
				All Messages
				<IconButton onClick={onClose} size="small"><CloseRoundedIcon /></IconButton>
			</DialogTitle>
			<DialogContent>
				<List sx={{ width: "100%", p: 0 }}>
					{messages.map((msg) => (
						<ListItem
							key={msg.id}
							alignItems="flex-start"
							sx={{
								px: 2,
								py: 2,
								mb: 1,
								borderRadius: "12px",
								backgroundColor: msg.read ? "transparent" : "action.hover",
								border: "1px solid",
								borderColor: "divider",
							}}
							secondaryAction={
								!msg.read && (
									<Tooltip title="Mark as read">
										<IconButton edge="end" onClick={() => dispatch({ type: "MARK_MESSAGE_READ", payload: msg.id })}>
											<CheckCircleOutlineRoundedIcon color="primary" />
										</IconButton>
									</Tooltip>
								)
							}
						>
							<ListItemAvatar>
								<Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
									{msg.sender.charAt(0)}
								</Avatar>
							</ListItemAvatar>
							<Box sx={{ flex: 1, ml: 2, display: "flex", flexDirection: "column" }}>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{msg.sender}</Typography>
									{!msg.read && <CircleIcon color="primary" sx={{ fontSize: 8 }} />}
								</Box>
								<Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
									{new Date(msg.timestamp).toLocaleString()}
								</Typography>
								<Typography variant="body2" color="text.primary">
									{msg.content}
								</Typography>
							</Box>
						</ListItem>
					))}
					{messages.length === 0 && (
						<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
							No messages.
						</Typography>
					)}
				</List>
			</DialogContent>
		</Dialog>
	);
}
