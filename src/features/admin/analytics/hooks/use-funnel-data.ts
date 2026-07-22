import { useMemo } from "react";
import { useAppContext } from "../../../../context/app-context";
import { DUMMY_CUSTOMER_ANALYTICS } from "../../../../constants";

export function useFunnelData() {
	const { state } = useAppContext();

	return useMemo(() => {
		const siteVisits = DUMMY_CUSTOMER_ANALYTICS.totalActiveUsers * 10;
		const productViews = Math.round(siteVisits * 0.55);
		const totalCartItems = state.orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
		const currentCartItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
		const addedToCart = totalCartItems + currentCartItems + state.products.length * 3;
		const checkoutStarted = state.orders.filter((o) => o.status !== "PENDING").length + Math.round(state.orders.length * 0.1);
		const purchased = state.orders.filter((o) => o.status === "DELIVERED").length;

		return [
			{ step: "Site Visits", count: siteVisits },
			{ step: "Product Views", count: productViews },
			{ step: "Add to Cart", count: Math.max(addedToCart, purchased + 5) },
			{ step: "Checkout", count: Math.max(checkoutStarted, purchased + 2) },
			{ step: "Purchase", count: purchased },
		];
	}, [state.orders, state.cart, state.products.length]);
}
