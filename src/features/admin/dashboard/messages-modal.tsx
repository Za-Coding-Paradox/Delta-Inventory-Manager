import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton, List, ListItem, ListItemAvatar, Avatar, Tooltip } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useAppContext } from "../../../context/app-context";
import { memo, useCallback } from "react";

const MessageItem = memo(({ msg, onRead }: { msg: any; onRead: (id: string) => void }) => (
	<ListItem
		alignItems="flex-start"
		sx={{ px: 2, py: 2, mb: 1, borderRadius: "12px", backgroundColor: msg.read ? "transparent" : "action.hover", border: "1px solid", borderColor: "divider" }}
		secondaryAction={!msg.read && (
			<Tooltip title="Mark as read"><IconButton edge="end" onClick={() => onRead(msg.id)}><CheckCircleOutlineRoundedIcon color="primary" /></IconButton></Tooltip>
		)}
	>
		<ListItemAvatar><Avatar sx={{ bgcolor: "primary.main" }}>{msg.sender.charAt(0)}</Avatar></ListItemAvatar>
		<Box sx={{ flex: 1, ml: 2, display: "flex", flexDirection: "column" }}>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{msg.sender}</Typography>
				{!msg.read && <CircleIcon color="primary" sx={{ fontSize: 8 }} />}
			</Box>
			<Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>{new Date(msg.timestamp).toLocaleString()}</Typography>
			<Typography variant="body2">{msg.content}</Typography>
		</Box>
	</ListItem>
));

export default function MessagesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { state, dispatch } = useAppContext();
	const handleRead = useCallback((id: string) => dispatch({ type: "MARK_MESSAGE_READ", payload: id }), [dispatch]);
	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ "& .MuiDialog-paper": { borderRadius: "20px" } }}>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1, fontWeight: 800 }}>
				All Messages <IconButton onClick={onClose} size="small"><CloseRoundedIcon /></IconButton>
			</DialogTitle>
			<DialogContent>
				<List sx={{ width: "100%", p: 0 }}>
					{state.messages.map((msg) => <MessageItem key={msg.id} msg={msg} onRead={handleRead} />)}
					{state.messages.length === 0 && <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>No messages.</Typography>}
				</List>
			</DialogContent>
		</Dialog>
	);
}
