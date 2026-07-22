import { Chip, ChipProps } from "@mui/material";

export interface StatusChipProps extends Omit<ChipProps, "color"> {
	status: string;
	/** Optional mapping to override the default color logic */
	customColors?: Record<string, ChipProps["color"]>;
}

export function StatusChip({ status, customColors, ...props }: StatusChipProps) {
	const getStatusColor = (s: string): ChipProps["color"] => {
		if (customColors && customColors[s]) {
			return customColors[s];
		}
		
		const upper = s.toUpperCase();
		if (upper === "DELIVERED" || upper === "IN_STOCK" || upper === "COMPLETED") return "success";
		if (upper === "SHIPPED" || upper === "ACTIVE") return "info";
		if (upper === "PROCESSING" || upper === "PENDING" || upper === "COMING_SOON") return "warning";
		if (upper === "CANCELLED" || upper === "ERROR" || upper === "OUT_OF_STOCK") return "error";
		
		return "default";
	};

	return (
		<Chip
			variant="status"
			color={getStatusColor(status)}
			label={status.replace(/_/g, " ")}
			{...props}
		/>
	);
}
