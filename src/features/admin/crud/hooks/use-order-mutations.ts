import { useState, useCallback } from "react";
import { useAppContext } from "../../../../context/app-context";
import { ordersApi } from "../../../../api";
import { Order } from "../../../../config/types";

export function useOrderMutations() {
	const { dispatch } = useAppContext();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const placeOrder = useCallback(async (order: Order) => {
		setLoading(true);
		setError(null);
		try {
			const newOrder = await ordersApi.placeOrder(order);
			dispatch({ type: "PLACE_ORDER", payload: newOrder });
		} catch (err: any) {
			setError(err.message || "Failed to place order");
		} finally {
			setLoading(false);
		}
	}, [dispatch]);

	const updateOrderStatus = useCallback(async (orderId: string, status: Order["status"]) => {
		setLoading(true);
		setError(null);
		try {
			await ordersApi.updateOrderStatus(orderId, status);
			dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status } });
		} catch (err: any) {
			setError(err.message || "Failed to update order status");
		} finally {
			setLoading(false);
		}
	}, [dispatch]);

	const deleteOrder = useCallback(async (id: string) => {
		setLoading(true);
		setError(null);
		try {
			await ordersApi.deleteOrder(id);
			dispatch({ type: "DELETE_ORDER", payload: id });
		} catch (err: any) {
			setError(err.message || "Failed to delete order");
		} finally {
			setLoading(false);
		}
	}, [dispatch]);

	const updateOrder = useCallback(async (order: Order) => {
		setLoading(true);
		setError(null);
		try {
			const updatedOrder = await ordersApi.updateOrder(order);
			dispatch({ type: "UPDATE_ORDER", payload: updatedOrder });
		} catch (err: any) {
			setError(err.message || "Failed to update order");
		} finally {
			setLoading(false);
		}
	}, [dispatch]);

	return { placeOrder, updateOrderStatus, deleteOrder, updateOrder, loading, error };
}
