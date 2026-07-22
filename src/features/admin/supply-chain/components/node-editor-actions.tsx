import React, { useState, memo } from "react";
import { Box, Button, useTheme } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { ConfirmDialog } from "../../../../components/feedback/ConfirmDialog";

interface Props {
	onSave: () => void;
	onDelete: () => void;
}

export const NodeEditorActions = memo(({ onSave, onDelete }: Props) => {
	const theme = useTheme();
	const [confirmOpen, setConfirmOpen] = useState(false);
	return (
		<>
			<Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, display: "flex", gap: 1 }}>
				<Button
					variant="contained" fullWidth startIcon={<SaveRoundedIcon />}
					onClick={onSave} sx={{ borderRadius: "8px" }}
				>
					Save
				</Button>
				<Button
					variant="outlined" color="error" onClick={() => setConfirmOpen(true)}
					sx={{ minWidth: 48, p: 0, borderRadius: "8px" }}
				>
					<DeleteRoundedIcon />
				</Button>
			</Box>
			<ConfirmDialog
				open={confirmOpen}
				title="Delete Node"
				description="Are you sure you want to delete this node? This action cannot be undone."
				isDestructive
				onConfirm={() => { setConfirmOpen(false); onDelete(); }}
				onClose={() => setConfirmOpen(false)}
			/>
		</>
	);
});
