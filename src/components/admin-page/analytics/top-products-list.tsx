import { Card, Typography, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from "@mui/material";
import { useAppContext } from "../../../context/app-context";

export default function TopProductsList() {
	const { state } = useAppContext();
	// Pick top 4 products
	const topProducts = state.products.slice(0, 4);

	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
			<Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Top Performing Products</Typography>
			<List sx={{ width: "100%", flex: 1 }}>
				{topProducts.map((product, idx) => (
					<ListItem
						key={product.id}
						alignItems="flex-start"
						sx={{ px: 0, py: 1.5, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: "none" } }}
					>
						<ListItemAvatar>
							<Avatar
								variant="rounded"
								src={product.colors?.[0]?.imageUrl}
								alt={product.name}
								sx={{ width: 48, height: 48, borderRadius: "10px" }}
							/>
						</ListItemAvatar>
						<ListItemText
							primaryTypographyProps={{ component: "div" }}
							secondaryTypographyProps={{ component: "div" }}
							primary={
								<Typography variant="subtitle2" sx={{ fontWeight: 700, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
									{product.name}
								</Typography>
							}
							secondary={
								<Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
									<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
										${product.price.toFixed(2)}
									</Typography>
									<Chip size="small" label={`${340 - idx * 45} Sales`} color="success" sx={{ height: 18, fontSize: "0.65rem", fontWeight: 700 }} />
								</Box>
							}
						/>
					</ListItem>
				))}
			</List>
		</Card>
	);
}
