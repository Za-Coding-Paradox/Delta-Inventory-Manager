import { Box, Typography, Button } from "@mui/material";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";

export interface SupplyChainHeaderProps {
	onReset: () => void;
	onAddNode: () => void;
}

export const SupplyChainHeader = React.memo(function SupplyChainHeader({ onReset, onAddNode }: SupplyChainHeaderProps) {
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
			<Box>
				<Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-1px" }}>Supply Chain Editor</Typography>
				<Typography variant="body2" color="text.secondary">Design and monitor your logistics network with a visual node graph.</Typography>
			</Box>
			<Box sx={{ display: "flex", gap: 1 }}>
				<Button variant="outlined" startIcon={<RestoreRoundedIcon />} onClick={onReset} sx={{ borderRadius: "10px" }}>Reset</Button>
				<Button variant="contained" startIcon={<AddRoundedIcon />} onClick={onAddNode} sx={{ borderRadius: "10px" }}>Add Node</Button>
			</Box>
		</Box>
	);
});
