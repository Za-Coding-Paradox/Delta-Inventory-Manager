import type { AppState, CartItem, Product } from "../config/types";

export const cartItemKey = (productId: string, colorName: string) =>
	`${productId}::${colorName}`;

export const getLiveProduct = (
	products: Product[],
	productId: string,
): Product | undefined => products.find((p) => p.id === productId);

export const getCartQtyForProduct = (
	cart: CartItem[],
	productId: string,
	excludeColor?: string,
): number =>
	cart
		.filter(
			(item) =>
				item.product.id === productId &&
				(excludeColor === undefined ||
					item.selectedColorName !== excludeColor),
		)
		.reduce((sum, item) => sum + item.quantity, 0);

export const getMaxAddableQty = (
	cart: CartItem[],
	product: Product,
	selectedColorName: string,
	requestedQty: number,
): number => {
	const otherQty = getCartQtyForProduct(cart, product.id, selectedColorName);
	const available = Math.max(0, product.stockQuantity - otherQty);
	return Math.min(requestedQty, available);
};

export const clampCartItemQty = (
	cart: CartItem[],
	item: CartItem,
	product: Product,
	desiredQty: number,
): number => {
	const otherQty = getCartQtyForProduct(
		cart,
		product.id,
		item.selectedColorName,
	);
	return Math.max(0, Math.min(desiredQty, product.stockQuantity - otherQty));
};

export const syncCartWithProducts = (
	cart: CartItem[],
	products: Product[],
): CartItem[] =>
	cart
		.map((item) => {
			const live = getLiveProduct(products, item.product.id);
			if (!live || live.status !== "IN_STOCK" || live.stockQuantity <= 0) {
				return null;
			}
			const qty = clampCartItemQty(cart, item, live, item.quantity);
			if (qty <= 0) return null;
			return { ...item, product: live, quantity: qty };
		})
		.filter((item): item is CartItem => item !== null);

export const syncWishlistWithProducts = (
	wishlist: Product[],
	products: Product[],
): Product[] =>
	wishlist
		.map((item) => getLiveProduct(products, item.id) ?? null)
		.filter((item): item is Product => item !== null);

export const canAddToCart = (product: Product): boolean =>
	product.status === "IN_STOCK" && product.stockQuantity > 0;

export const getRemainingStock = (
	state: Pick<AppState, "cart" | "products">,
	productId: string,
): number => {
	const product = getLiveProduct(state.products, productId);
	if (!product) return 0;
	return Math.max(
		0,
		product.stockQuantity - getCartQtyForProduct(state.cart, productId),
	);
};
