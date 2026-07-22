import { Order } from "../config/types";
import { DUMMY_ORDERS } from "../constants";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ordersApi = {
	getOrders: async (): Promise<Order[]> => {
		await delay(500);
		return DUMMY_ORDERS;
	},
	placeOrder: async (order: Order): Promise<Order> => {
		await delay(500);
		return order;
	},
	updateOrderStatus: async (_orderId: string, _status: Order["status"]): Promise<void> => {
		await delay(500);
	},
	updateOrder: async (order: Order): Promise<Order> => {
		await delay(500);
		return order;
	},
	deleteOrder: async (_id: string): Promise<void> => {
		await delay(500);
	}
};
