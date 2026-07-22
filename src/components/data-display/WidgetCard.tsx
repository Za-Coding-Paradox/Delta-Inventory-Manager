import { Card, CardProps, Box, Typography, SxProps, Theme } from "@mui/material";

export interface WidgetCardProps extends CardProps {
	title?: string;
	noPadding?: boolean;
	headerAction?: React.ReactNode;
	contentSx?: SxProps<Theme>;
}

export function WidgetCard({
	title,
	noPadding = false,
	headerAction,
	contentSx,
	children,
	sx,
	...props
}: WidgetCardProps) {
	return (
		<Card
			variant="widget"
			sx={{
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				...sx,
			}}
			{...props}
		>
			{(title || headerAction) && (
				<Box
					sx={{
						p: 2,
						borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					{title && (
						<Typography variant="h6" sx={{ fontWeight: 600 }}>
							{title}
						</Typography>
					)}
					{headerAction && <Box>{headerAction}</Box>}
				</Box>
			)}
			<Box sx={{ p: noPadding ? 0 : 2, flex: 1, ...contentSx }}>
				{children}
			</Box>
		</Card>
	);
}
