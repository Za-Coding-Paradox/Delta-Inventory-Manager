import { Card, Typography, Box, List, ListItem, ListItemAvatar, Avatar, Chip } from "@mui/material";
import { useAppContext } from "../../../context/app-context";
import { useMemo } from "react";

export default function TopProductsList() {
	const { state } = useAppContext();

	// Derive top products from actual order history — count units sold per product
	const topProducts = useMemo(() => {
		// Build a map: productId -> { name, unitsSold, revenue, imageUrl }
		const productSalesMap: Record<string, { name: string; unitsSold: number; revenue: number; imageUrl: string }> = {};

		state.orders.forEach((order) => {
			order.items.forEach((item) => {
				if (!productSalesMap[item.productId]) {
					// Look up the live product for image
					const liveProduct = state.products.find((p) => p.id === item.productId);
					productSalesMap[item.productId] = {
						name: item.productName,
						unitsSold: 0,
						revenue: 0,
						imageUrl: liveProduct?.colors?.[0]?.imageUrl || liveProduct?.defaultImageUrl || "",
					};
				}
				productSalesMap[item.productId].unitsSold += item.quantity;
				productSalesMap[item.productId].revenue += item.quantity * item.priceAtOrder;
			});
		});

		// Sort by units sold, take top 4
		return Object.entries(productSalesMap)
			.sort(([, a], [, b]) => b.unitsSold - a.unitsSold)
			.slice(0, 4)
			.map(([productId, data]) => ({
				productId,
				...data,
				price: state.products.find((p) => p.id === productId)?.price || 0,
			}));
	}, [state.orders, state.products]);

	// Fallback: if no orders, show first 4 products with 0 sales
	const displayProducts = topProducts.length > 0
		? topProducts
		: state.products.slice(0, 4).map((p) => ({
			productId: p.id,
			name: p.name,
			unitsSold: 0,
			revenue: 0,
			imageUrl: p.colors?.[0]?.imageUrl || p.defaultImageUrl,
			price: p.price,
		}));

	return (
		<Card elevation={0} sx={{ p: 3, borderRadius: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
			<Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Top Performing Products</Typography>
			<List sx={{ width: "100%", flex: 1 }}>
				{displayProducts.map((product) => (
					<ListItem
						key={product.productId}
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
				))}
			</List>
		</Card>
	);
}
