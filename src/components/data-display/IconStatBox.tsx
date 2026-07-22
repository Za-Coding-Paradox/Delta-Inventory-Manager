import { Box, Typography, alpha } from "@mui/material";

export interface IconStatBoxProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

export function IconStatBox({
	icon,
	label,
	value,
	color = "primary",
}: IconStatBoxProps) {
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
			<Box
				sx={{
					p: 1,
					borderRadius: "12px",
					backgroundColor: (t) => alpha(t.palette[color].main, 0.1),
					color: `${color}.main`,
				}}
			>
				{icon}
			</Box>
			<Box sx={{ flex: 1 }}>
				<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
					{label}
				</Typography>
				<Typography variant="h6" sx={{ fontWeight: 800 }}>
					{value}
				</Typography>
			</Box>
		</Box>
	);
}
