import { Box, Typography, Button, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export interface PageHeaderProps {
	title: string;
	subtitle?: string;
	actionLabel?: string;
	onAction?: () => void;
	actionIcon?: ReactNode;
	sx?: SxProps<Theme>;
}

export function PageHeader({
	title,
	subtitle,
	actionLabel,
	onAction,
	actionIcon,
	sx,
}: PageHeaderProps) {
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, ...sx }}>
			<Box>
				<Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
					{title}
				</Typography>
				{subtitle && (
					<Typography variant="body2" color="text.secondary">
						{subtitle}
					</Typography>
				)}
			</Box>
			{actionLabel && onAction && (
				<Button
					variant="contained"
					startIcon={actionIcon}
					onClick={onAction}
					sx={{ borderRadius: "10px", px: 3, py: 1 }}
				>
					{actionLabel}
				</Button>
			)}
		</Box>
	);
}
