import { useMemo } from "react";
import { deterministicRegion } from "../utils/geo-utils";

interface Order {
	id: string;
	total: number;
}

export function useGeoSalesData(orders: Order[]) {
	return useMemo(() => {
		const regionMap: Record<string, { orders: number; revenue: number }> = {};
		orders.forEach((o) => {
			const region = deterministicRegion(o.id);
			if (!regionMap[region]) regionMap[region] = { orders: 0, revenue: 0 };
			regionMap[region].orders += 1;
			regionMap[region].revenue += o.total;
		});

		const rawData = Object.entries(regionMap).map(([name, stats]) => ({
			name,
			orders: stats.orders,
			revenue: stats.revenue,
		}));

		if (rawData.length === 0) return { data: [], maxOrders: 10, maxRevenue: 1000 };
		const maxOrders = Math.max(...rawData.map((g) => g.orders));
		
		const data = rawData.map((geo) => ({
			name: geo.name,
			x: geo.orders,
			y: geo.revenue,
			z: Math.round((geo.orders / maxOrders) * 500) + 60,
			orders: geo.orders,
			revenue: geo.revenue,
		}));

		const actualMaxOrders = Math.max(...data.map((g) => g.orders));
		const actualMaxRevenue = Math.max(...data.map((g) => g.revenue));

		return { data, maxOrders: actualMaxOrders, maxRevenue: actualMaxRevenue };
	}, [orders]);
}
