import React, { memo } from "react";
import { Box, Typography, Slider } from "@mui/material";
import type { SCNode } from "../../../../config/types";

interface Props {
	form: SCNode;
	onChange: (field: keyof SCNode["data"], value: any) => void;
}

export const NodeEditorSliders = memo(({ form, onChange }: Props) => {
	const stockLevel = form.data.stockLevel || 0;
	const capacity = form.data.capacity || 100;
	return (
		<>
			<Box sx={{ mt: 1 }}>
				<Typography variant="caption" color="text.secondary" gutterBottom>
					Stock Level: {stockLevel} / {capacity}
				</Typography>
				<Slider
					value={stockLevel} max={capacity} onChange={(_, v) => onChange("stockLevel", v as number)}
					valueLabelDisplay="auto" color={stockLevel < 20 ? "error" : "primary"}
				/>
			</Box>
			<Box>
				<Typography variant="caption" color="text.secondary" gutterBottom>
					Capacity: {capacity}
				</Typography>
				<Slider
					value={capacity} min={10} max={500} onChange={(_, v) => onChange("capacity", v as number)}
					valueLabelDisplay="auto" color="secondary"
				/>
			</Box>
		</>
	);
});
