import React from "react";
import { ListItem, ListItemAvatar, Avatar, Box, Typography, Chip } from "@mui/material";

interface TopProductItemProps {
	product: {
		productId: string;
		name: string;
		unitsSold: number;
		revenue: number;
		imageUrl: string;
		price: number;
	};
}

function TopProductItem({ product }: TopProductItemProps) {
	return (
		<ListItem
			alignItems="flex-start"
			sx={{ px: 0, py: 1.5, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: "none" } }}
		>
			<ListItemAvatar>
				<Avatar
					variant="rounded"
					src={product.imageUrl}
					alt={product.name}
					sx={{ width: 48, height: 48, borderRadius: "10px" }}
				/>
			</ListItemAvatar>
			<Box sx={{ ml: 2, flex: 1 }}>
				<Typography variant="subtitle2" sx={{ fontWeight: 700, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
					{product.name}
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
					<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
						${product.price.toFixed(2)}
					</Typography>
					<Chip
						size="small"
						label={product.unitsSold > 0 ? `${product.unitsSold} Sales` : "No Sales Yet"}
						color={product.unitsSold > 0 ? "success" : "default"}
						sx={{ height: 18, fontSize: "0.65rem", fontWeight: 700 }}
					/>
				</Box>
			</Box>
		</ListItem>
	);
}

export default React.memo(TopProductItem);
