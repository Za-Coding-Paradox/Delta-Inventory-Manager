import { Card, CardMedia, CardContent, Typography, Chip, Box, SxProps, Theme } from "@mui/material";

export interface ProductCardProps {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	tagLabel?: string;
	onClick?: () => void;
	sx?: SxProps<Theme>;
}

export function ProductCard({
	name,
	description,
	price,
	imageUrl,
	tagLabel,
	onClick,
	sx,
}: ProductCardProps) {
	return (
		<Card
			onClick={onClick}
			sx={{
				width: 320,
				flexShrink: 0,
				cursor: onClick ? "pointer" : "default",
				borderRadius: "16px",
				overflow: "hidden",
				transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
				border: "1px solid",
				borderColor: "divider",
				boxShadow: "none",
				"&:hover": onClick
					? {
							transform: "translateY(-12px)",
							boxShadow: (t) =>
								t.palette.mode === "light"
									? "0 20px 40px rgba(0,0,0,0.08)"
									: "0 20px 40px rgba(0,0,0,0.5)",
							borderColor: "primary.main",
					  }
					: {},
				...sx,
			}}
		>
			<Box sx={{ position: "relative", overflow: "hidden" }}>
				<CardMedia
					component="img"
					height="240"
					image={imageUrl}
					alt={name}
					sx={{
						transition: "transform 0.5s ease",
						"&:hover": onClick
							? {
									transform: "scale(1.05)",
							  }
							: {},
					}}
				/>
				{tagLabel && (
					<Chip
						label={tagLabel}
						size="small"
						sx={{
							position: "absolute",
							top: 16,
							left: 16,
							fontWeight: 800,
							backgroundColor: (t) => (t.palette.mode === "light" ? "#111" : "#FFF"),
							color: (t) => (t.palette.mode === "light" ? "#FFF" : "#111"),
						}}
					/>
				)}
			</Box>
			<CardContent sx={{ p: 3 }}>
				<Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1 }}>
					{name}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{description}
				</Typography>
				<Typography variant="h6" sx={{ mt: 2, fontWeight: 800, color: "text.primary" }}>
					${price.toFixed(2)}
				</Typography>
			</CardContent>
		</Card>
	);
}
