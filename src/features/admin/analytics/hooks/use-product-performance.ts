import { useMemo } from "react";
import { useAppContext } from "../../../../context/app-context";

function deterministicSeed(str: string, multiplier: number): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	return Math.abs(hash % multiplier) + Math.round(multiplier * 0.3);
}

export function useProductPerformance() {
	const { state } = useAppContext();
	return useMemo(() => {
		const salesMap: Record<string, { sales: number; revenue: number }> = {};
		state.orders.forEach((order) => {
			order.items.forEach((item) => {
				if (!salesMap[item.productId]) salesMap[item.productId] = { sales: 0, revenue: 0 };
				salesMap[item.productId].sales += item.quantity;
				salesMap[item.productId].revenue += item.quantity * item.priceAtOrder;
			});
		});

		return state.products.slice(0, 5).map((p) => {
			const perf = salesMap[p.id] || { sales: 0, revenue: 0 };
			const baseViews = deterministicSeed(p.id, 1500);
			const views = Math.max(baseViews, perf.sales * 12);
			return {
				name: p.name.length > 15 ? p.name.substring(0, 15) + "…" : p.name,
				sales: perf.sales,
				views,
			};
		});
	}, [state.orders, state.products]);
}
