import { useMemo } from "react";
import { useAppContext } from "../../../../context/app-context";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";

export function useKpiStats() {
	const { state } = useAppContext();
	const { orders, products } = state;

	return useMemo(() => {
		const totalRevenue = orders.filter((o) => o.status === "DELIVERED").reduce((sum, o) => sum + o.total, 0);
		const inventoryValue = products.reduce((acc, p) => acc + p.price * p.stockQuantity, 0);
		const uniqueCustomers = new Set(orders.map((o) => o.customerName)).size;
		const revMap: Record<string, number> = {}, ordMap: Record<string, number> = {};
		
		orders.forEach(o => {
			const d = new Date(o.timestamp).toISOString().split("T")[0];
			if (o.status === "DELIVERED") revMap[d] = (revMap[d] || 0) + o.total;
			ordMap[d] = (ordMap[d] || 0) + 1;
		});

		const genSeries = (map: Record<string, number>) => Array.from({ length: 10 }, (_, i) => {
			const d = new Date(); d.setDate(d.getDate() - (9 - i));
			const key = d.toISOString().split("T")[0];
			return { date: key, value: map[key] || 0 };
		});

		const seen = new Set<string>();
		const custSeries = Array.from({ length: 10 }, (_, i) => {
			const d = new Date(); d.setDate(d.getDate() - (9 - i));
			const dayStr = d.toISOString().split("T")[0];
			orders.filter(o => new Date(o.timestamp).toISOString().split("T")[0] <= dayStr).forEach(o => seen.add(o.customerName));
			return { date: dayStr, value: seen.size };
		});

		const invSeries = Array.from({ length: 10 }, (_, i) => ({ date: i.toString(), value: inventoryValue * (0.85 + i * 0.015) }));

		return [
			{ title: "Total Revenue", value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: <ShowChartRoundedIcon />, sparkData: genSeries(revMap) },
			{ title: "Total Orders", value: orders.length.toLocaleString(), icon: <ShoppingBagRoundedIcon />, sparkData: genSeries(ordMap) },
			{ title: "Total Customers", value: uniqueCustomers.toLocaleString(), icon: <PeopleRoundedIcon />, sparkData: custSeries },
			{ title: "Inventory Value", value: `$${inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: <InventoryRoundedIcon />, sparkData: invSeries },
		];
	}, [orders, products]);
}
