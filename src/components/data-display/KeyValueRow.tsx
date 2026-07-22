import { Box, Typography } from "@mui/material";

export interface KeyValueRowProps {
	label: string;
	value: string | number;
	valueColor?: string;
	valueVariant?: "body1" | "body2" | "h6" | "h5" | "subtitle1";
}

export function KeyValueRow({
	label,
	value,
	valueColor = "text.primary",
	valueVariant = "body1",
}: KeyValueRowProps) {
	return (
		<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
			<Typography variant="body2" color="text.secondary">
				{label}
			</Typography>
			<Typography variant={valueVariant} sx={{ fontWeight: 700, color: valueColor }}>
				{value}
			</Typography>
		</Box>
	);
}
