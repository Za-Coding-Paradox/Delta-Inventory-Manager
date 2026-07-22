import { Box, Typography, SxProps, Theme } from "@mui/material";

export interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	align?: "left" | "center" | "right";
	sx?: SxProps<Theme>;
}

export function SectionHeader({
	title,
	subtitle,
	align = "left",
	sx,
}: SectionHeaderProps) {
	return (
		<Box sx={{ textAlign: align, mb: 3, ...sx }}>
			<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: subtitle ? 1 : 0 }}>
				{title}
			</Typography>
			{subtitle && (
				<Typography variant="body2" color="text.secondary">
					{subtitle}
				</Typography>
			)}
		</Box>
	);
}
