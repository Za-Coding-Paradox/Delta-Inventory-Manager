import { Product } from "../config/types";
import { DUMMY_PRODUCTS } from "../constants";

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productsApi = {
	getProducts: async (): Promise<Product[]> => {
		await delay(500);
		// In a real app, this would be a fetch call
		return DUMMY_PRODUCTS;
	},
	addProduct: async (product: Product): Promise<Product> => {
		await delay(500);
		return product;
	},
	updateProduct: async (product: Product): Promise<Product> => {
		await delay(500);
		return product;
	},
	deleteProduct: async (_id: string): Promise<void> => {
		await delay(500);
	}
};
