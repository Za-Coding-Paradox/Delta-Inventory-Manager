import type { AppState, CartItem, Product } from "../config/types";

// Builds a unique string key for a cart item using its product ID and chosen color.
// Used as a stable identifier so we can look up or compare cart items without ambiguity
// (the same product in two different colors counts as two separate cart entries).
export const cartItemKey = (productId: string, colorName: string) =>
	`${productId}::${colorName}`;

// Finds a product from the live product list by its ID.
// "Live" means the product data freshly fetched from the server,
// as opposed to the possibly stale snapshot stored inside a CartItem.
export const getLiveProduct = (
	products: Product[],
	productId: string,
): Product | undefined => products.find((p) => p.id === productId);

// Counts how many units of a specific product are already in the cart,
// optionally skipping one color variant so we don't count the item being edited against itself.
// Used to enforce the rule: total cart quantity for a product must never exceed its total stock.
export const getCartQtyForProduct = (
	cart: CartItem[],
	productId: string,
	excludeColor?: string, // when editing an existing cart item, pass its color here so we only count OTHER colors
): number =>
	cart
		.filter(
			(item) =>
				item.product.id === productId && // only look at items for this product
				(excludeColor === undefined ||
					item.selectedColorName !== excludeColor), // skip the color we're currently editing
		)
		.reduce((sum, item) => sum + item.quantity, 0); // add up all remaining quantities

// Calculates the maximum number of units the user is actually allowed to add
// for a specific color, given how much stock is left after accounting for other colors already in the cart.
// Used by the "Add to Cart" and quantity-increase flows to cap the request at a safe number.
export const getMaxAddableQty = (
	cart: CartItem[],
	product: Product,
	selectedColorName: string,
	requestedQty: number,
): number => {
	// otherQty = units of THIS product already in the cart under DIFFERENT colors.
	// We subtract this first because those units already consume part of the shared stock.
	const otherQty = getCartQtyForProduct(cart, product.id, selectedColorName);

	// available = how many units are still free to be added for the selected color.
	// Math.max(0, ...) prevents a negative result if otherQty somehow exceeds stock.
	const available = Math.max(0, product.stockQuantity - otherQty);

	// Return whichever is smaller: what the user asked for, or what's actually available.
	// This is the "clamp from above" — we never let the user add more than stock allows.
	return Math.min(requestedQty, available);
};

// Clamps an existing cart item's desired quantity so it never exceeds remaining stock.
// "Clamping" means forcing a number to stay within a valid range — here [0, availableStock].
// Used when syncing the cart after stock levels change (e.g. another user bought some units).
export const clampCartItemQty = (
	cart: CartItem[],
	item: CartItem,
	product: Product,
	desiredQty: number,
): number => {
	// Sum up units for the same product but different colors — those already use up part of the stock
	const otherQty = getCartQtyForProduct(
		cart,
		product.id,
		item.selectedColorName, // exclude this item's own color so we don't double-count it
	);

	// Clamp desiredQty between 0 and (totalStock - unitsUsedByOtherColors).
	// Math.min caps it so we can't exceed remaining stock.
	// Math.max(0, ...) ensures the result is never negative (which would be nonsensical).
	return Math.max(0, Math.min(desiredQty, product.stockQuantity - otherQty));
};

// Walks through the entire cart and brings it in line with the latest product data.
// Called whenever the product list refreshes (e.g. after a server fetch) to prevent
// the cart from holding stale quantities or products that are no longer available.
export const syncCartWithProducts = (
	cart: CartItem[],
	products: Product[],
): CartItem[] =>
	cart
		.map((item) => {
			// Look up the freshest version of this product from the server data
			const live = getLiveProduct(products, item.product.id);

			// Drop the cart item entirely if the product was deleted, is out of stock, or has zero units left
			if (!live || live.status !== "IN_STOCK" || live.stockQuantity <= 0) {
				return null; // will be filtered out below
			}

			// Re-clamp the stored quantity against current stock in case stock dropped since the item was added
			const qty = clampCartItemQty(cart, item, live, item.quantity);

			// If clamping brought the quantity to 0 or below, remove the item entirely
			if (qty <= 0) return null;

			// Spread the existing cart item, but overwrite product with the live snapshot and use the safe qty
			return { ...item, product: live, quantity: qty };
		})
		// The TypeScript type predicate "item is CartItem" tells the compiler that after this filter,
		// the array contains only CartItem objects — no nulls — so the return type is CartItem[]
		.filter((item): item is CartItem => item !== null);

// Refreshes the wishlist to match the latest product data.
// Replaces each stored product snapshot with its live version, and silently drops
// products that have been removed from the catalogue entirely.
export const syncWishlistWithProducts = (
	wishlist: Product[],
	products: Product[],
): Product[] =>
	wishlist
		// Replace each wishlist entry with the live product data; use null if the product no longer exists
		.map((item) => getLiveProduct(products, item.id) ?? null)
		// Filter out nulls — same type predicate trick as syncCartWithProducts above
		.filter((item): item is Product => item !== null);

// Quick eligibility check used before showing an "Add to Cart" button.
// Returns true only if the product is explicitly marked IN_STOCK AND has at least 1 unit available.
// Keeps the eligibility logic in one place so UI components don't repeat this condition.
export const canAddToCart = (product: Product): boolean =>
	product.status === "IN_STOCK" && product.stockQuantity > 0;

// Computes how many units of a product are still available to be added to the cart.
// Accounts for units already reserved in the cart so the displayed "X left" figure is accurate.
// Pick<AppState, "cart" | "products"> means we only need the cart and products slices of state,
// not the whole AppState — keeps the function flexible and easy to test in isolation.
export const getRemainingStock = (
	state: Pick<AppState, "cart" | "products">,
	productId: string,
): number => {
	const product = getLiveProduct(state.products, productId);

	// If the product doesn't exist in the live list, treat remaining stock as 0
	if (!product) return 0;

	return Math.max(
		0, // never return a negative number even if cart quantities somehow exceed stock
		product.stockQuantity - getCartQtyForProduct(state.cart, productId),
		// subtract ALL cart units for this product (all colors combined) to get the true remainder
	);
};
