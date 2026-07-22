import { useState, useCallback } from "react";
import { useAppContext } from "../../../../context/app-context";
import { productsApi } from "../../../../api";
import { Product } from "../../../../config/types";

export function useProductMutations() {
	const { dispatch } = useAppContext();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const addProduct = useCallback(async (product: Product) => {
		setLoading(true);
		setError(null);
		try {
			const newProduct = await productsApi.addProduct(product);
			dispatch({ type: "ADD_PRODUCT", payload: newProduct });
		} catch (err: any) {
			setError(err.message || "Failed to add product");
		} finally {
			setLoading(false);
		}
	}, [dispatch]);

	const updateProduct = useCallback(async (product: Product) => {
		setLoading(true);
		setError(null);
		try {
			const updatedProduct = await productsApi.updateProduct(product);
			dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
		} catch (err: any) {
			setError(err.message || "Failed to update product");
		} finally {
			setLoading(false);
		}
	}, [dispatch]);

	const deleteProduct = useCallback(async (id: string) => {
		setLoading(true);
		setError(null);
		try {
			await productsApi.deleteProduct(id);
			dispatch({ type: "DELETE_PRODUCT", payload: id });
		} catch (err: any) {
			setError(err.message || "Failed to delete product");
		} finally {
			setLoading(false);
		}
	}, [dispatch]);

	return { addProduct, updateProduct, deleteProduct, loading, error };
}
