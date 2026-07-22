import React, { useMemo } from "react";
import { List } from "@mui/material";
import { useAppContext } from "../../../context/app-context";
import { WidgetCard } from "../../../components/data-display/WidgetCard";
import TopProductItem from "./components/top-product-item";

function TopProductsList() {
	const { state } = useAppContext();

	const topProducts = useMemo(() => {
		const productSalesMap: Record<string, { name: string; unitsSold: number; revenue: number; imageUrl: string }> = {};

		state.orders.forEach((order) => {
			order.items.forEach((item) => {
				if (!productSalesMap[item.productId]) {
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

		return Object.entries(productSalesMap)
			.sort(([, a], [, b]) => b.unitsSold - a.unitsSold)
			.slice(0, 4)
			.map(([productId, data]) => ({
				productId,
				...data,
				price: state.products.find((p) => p.id === productId)?.price || 0,
			}));
	}, [state.orders, state.products]);

	const displayProducts = useMemo(() => {
		return topProducts.length > 0
			? topProducts
			: state.products.slice(0, 4).map((p) => ({
				productId: p.id,
				name: p.name,
				unitsSold: 0,
				revenue: 0,
				imageUrl: p.colors?.[0]?.imageUrl || p.defaultImageUrl,
				price: p.price,
			}));
	}, [topProducts, state.products]);

	return (
		<WidgetCard title="Top Performing Products" sx={{ height: "100%" }} noPadding={false}>
			<List sx={{ width: "100%", flex: 1, p: 0 }}>
				{displayProducts.map((product) => (
					<TopProductItem key={product.productId} product={product} />
				))}
			</List>
		</WidgetCard>
	);
}

export default React.memo(TopProductsList);
