import { useMemo } from "react";
import { useAppContext } from "../../../../context/app-context";

export function useReturnsRate() {
	const { state } = useAppContext();

	const data = useMemo(() => {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const currentMonth = new Date().getMonth();

		return Array.from({ length: 6 }, (_, i) => {
			const monthIdx = (currentMonth - 5 + i + 12) % 12;
			const monthName = months[monthIdx];

			const monthOrders = state.orders.filter((o) => {
				const orderMonth = new Date(o.timestamp).getMonth();
				const yearOffset = new Date(o.timestamp).getFullYear() - new Date().getFullYear();
				return orderMonth === monthIdx && yearOffset >= -1;
			});

			const totalInMonth = monthOrders.length;
			const cancelledInMonth = monthOrders.filter((o) => o.status === "CANCELLED").length;

			const rate = totalInMonth > 0
				? parseFloat(((cancelledInMonth / totalInMonth) * 100).toFixed(1))
				: 0;

			return { name: monthName, rate };
		});
	}, [state.orders]);

	const avgRate = data.length > 0
		? (data.reduce((sum, d) => sum + d.rate, 0) / data.filter((d) => d.rate > 0).length || 0).toFixed(1)
		: "0.0";

	return { data, avgRate };
}
