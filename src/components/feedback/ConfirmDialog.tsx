import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";

export interface ConfirmDialogProps {
	open: boolean;
	title: string;
	description: React.ReactNode;
	confirmLabel?: string;
	cancelLabel?: string;
	isDestructive?: boolean;
	onConfirm: () => void;
	onClose: () => void;
}

export function ConfirmDialog({
	open,
	title,
	description,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	isDestructive = false,
	onConfirm,
	onClose,
}: ConfirmDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			sx={{ "& .MuiDialog-paper": { borderRadius: "16px" } }}
		>
			<DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ p: 2, px: 3 }}>
				<Button onClick={onClose} variant="outlined" sx={{ borderRadius: "8px" }}>
					{cancelLabel}
				</Button>
				<Button
					onClick={onConfirm}
					color={isDestructive ? "error" : "primary"}
					variant="contained"
					sx={{ borderRadius: "8px" }}
				>
					{confirmLabel}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
