// src/context/app-provider.tsx
import React, { useReducer, useEffect, useMemo } from "react";
import type {
	AppState,
	AppAction,
	CartItem,
	CartSuggestion,
	Product,
} from "../config/types";
import { AppContext } from "./app-context";
import {
	STORAGE_KEYS,
	DUMMY_PRODUCTS,
	DUMMY_NOTIFICATIONS,
	DUMMY_CALENDAR_EVENTS,
	COLOR_COMPLEMENTS,
} from "../config/constants";
import {
	canAddToCart,
	clampCartItemQty,
	getMaxAddableQty,
	syncCartWithProducts,
	syncWishlistWithProducts,
} from "../utils/cart-sync";

/* ==========================================================================
 * 1. INITIAL STATE & LOCAL STORAGE HYDRATION
 * ========================================================================== */

function loadFromStorage<T>(key: string, fallback: T): T {
	try {
		const stored = localStorage.getItem(key);
		return stored ? (JSON.parse(stored) as T) : fallback;
	} catch (e) {
		console.error("Failed to parse localStorage", e);
		return fallback;
	}
}

function hydrateProducts(stored: Product[]): Product[] {
	return stored.map((product) => ({
		...product,
		stockQuantity: product.stockQuantity ?? 0,
	}));
}

const initialProducts = hydrateProducts(
	loadFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, DUMMY_PRODUCTS),
);

const initialState: AppState = {
	theme: loadFromStorage<"light" | "dark">(STORAGE_KEYS.THEME, "light"),
	products: initialProducts,
	cart: syncCartWithProducts(
		loadFromStorage<CartItem[]>(STORAGE_KEYS.CART, []),
		initialProducts,
	),
	wishlist: syncWishlistWithProducts(
		loadFromStorage<Product[]>(STORAGE_KEYS.WISHLIST, []),
		initialProducts,
	),
	cartSuggestions: [],
	filters: {
		searchQuery: "",
		tags: [],
		dateRange: null,
		priceRange: null,
		showInStockOnly: false,
		category: null,
		aiMatchedIds: null,
	},
	notifications: loadFromStorage(
		STORAGE_KEYS.NOTIFICATIONS,
		DUMMY_NOTIFICATIONS,
	),
	calendarEvents: DUMMY_CALENDAR_EVENTS,
};

/* ==========================================================================
 * 2. REDUCER LOGIC
 * ========================================================================== */

const appReducer = (state: AppState, action: AppAction): AppState => {
	switch (action.type) {
		case "TOGGLE_THEME":
			return {
				...state,
				theme: state.theme === "light" ? "dark" : "light",
			};

		case "ADD_TO_CART": {
			const { product, selectedColorName, quantity } = action.payload;
			const liveProduct =
				state.products.find((p) => p.id === product.id) ?? product;

			if (!canAddToCart(liveProduct)) return state;

			const addQty = getMaxAddableQty(
				state.cart,
				liveProduct,
				selectedColorName,
				quantity,
			);
			if (addQty <= 0) return state;

			const existingItem = state.cart.find(
				(item) =>
					item.product.id === liveProduct.id &&
					item.selectedColorName === selectedColorName,
			);

			const nextCart = existingItem
				? state.cart.map((item) =>
						item.product.id === liveProduct.id &&
						item.selectedColorName === selectedColorName
							? {
									...item,
									product: liveProduct,
									quantity: item.quantity + addQty,
								}
							: item,
					)
				: [
						...state.cart,
						{
							product: liveProduct,
							selectedColorName,
							quantity: addQty,
						},
					];

			return {
				...state,
				cart: syncCartWithProducts(nextCart, state.products),
			};
		}

		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: state.cart.filter(
					(item) =>
						!(
							item.product.id === action.payload.productId &&
							item.selectedColorName ===
								action.payload.selectedColorName
						),
				),
			};

		case "UPDATE_CART_QTY": {
			const { productId, selectedColorName, quantity } = action.payload;
			const liveProduct = state.products.find((p) => p.id === productId);
			if (!liveProduct) return state;

			const nextCart = state.cart
				.map((item) => {
					if (
						item.product.id !== productId ||
						item.selectedColorName !== selectedColorName
					) {
						return item;
					}
					const clamped = clampCartItemQty(
						state.cart,
						item,
						liveProduct,
						quantity,
					);
					return {
						...item,
						product: liveProduct,
						quantity: clamped,
					};
				})
				.filter((item) => item.quantity > 0);

			return {
				...state,
				cart: syncCartWithProducts(nextCart, state.products),
			};
		}

		case "CLEAR_CART":
			return { ...state, cart: [], cartSuggestions: [] };

		case "SET_CART_SUGGESTIONS":
			return { ...state, cartSuggestions: action.payload };

		case "TOGGLE_WISHLIST": {
			const liveProduct =
				state.products.find((p) => p.id === action.payload.id) ??
				action.payload;
			const exists = state.wishlist.some(
				(p) => p.id === liveProduct.id,
			);
			return {
				...state,
				wishlist: exists
					? state.wishlist.filter((p) => p.id !== liveProduct.id)
					: [...state.wishlist, liveProduct],
			};
		}

		case "SET_FILTERS":
			return {
				...state,
				filters: { ...state.filters, ...action.payload },
			};

		case "RESET_FILTERS":
			return {
				...state,
				filters: {
					searchQuery: "",
					tags: [],
					dateRange: null,
					priceRange: null,
					showInStockOnly: false,
					category: null,
					aiMatchedIds: null,
				},
			};

		case "ADD_PRODUCT":
			return { ...state, products: [...state.products, action.payload] };

		case "UPDATE_PRODUCT": {
			const updatedProducts = state.products.map((p) =>
				p.id === action.payload.id ? action.payload : p,
			);
			return {
				...state,
				products: updatedProducts,
				cart: syncCartWithProducts(state.cart, updatedProducts),
				wishlist: syncWishlistWithProducts(
					state.wishlist,
					updatedProducts,
				),
			};
		}

		case "DELETE_PRODUCT": {
			const updatedProducts = state.products.filter(
				(p) => p.id !== action.payload,
			);
			return {
				...state,
				products: updatedProducts,
				cart: state.cart.filter(
					(item) => item.product.id !== action.payload,
				),
				wishlist: state.wishlist.filter((p) => p.id !== action.payload),
			};
		}

		case "SYNC_CART_WISHLIST":
			return {
				...state,
				cart: syncCartWithProducts(state.cart, state.products),
				wishlist: syncWishlistWithProducts(
					state.wishlist,
					state.products,
				),
			};

		case "ADD_NOTIFICATION":
			return {
				...state,
				notifications: [action.payload, ...state.notifications],
			};

		case "MARK_NOTIFICATION_READ":
			return {
				...state,
				notifications: state.notifications.map((n) =>
					n.id === action.payload ? { ...n, read: true } : n,
				),
			};

		case "CLEAR_NOTIFICATIONS":
			return { ...state, notifications: [] };

		default:
			return state;
	}
};

/* ==========================================================================
 * 3. PROVIDER COMPONENT (Includes LocalStorage Sync & Auto-Suggestions)
 * ========================================================================== */

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(state.theme));
	}, [state.theme]);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.WISHLIST,
			JSON.stringify(state.wishlist),
		);
	}, [state.wishlist]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.PRODUCTS,
			JSON.stringify(state.products),
		);
	}, [state.products]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.NOTIFICATIONS,
			JSON.stringify(state.notifications),
		);
	}, [state.notifications]);

	useEffect(() => {
		dispatch({ type: "SYNC_CART_WISHLIST" });
	}, [state.products]);

	useEffect(() => {
		if (state.cart.length === 0) {
			dispatch({ type: "SET_CART_SUGGESTIONS", payload: [] });
			return;
		}

		const cartProductIds = state.cart.map((item) => item.product.id);
		const cartTags = new Set(
			state.cart.flatMap((item) => item.product.tags),
		);
		const cartColors = state.cart
			.map((item) => {
				const colorObj = item.product.colors.find(
					(c) => c.name === item.selectedColorName,
				);
				return colorObj?.name || "";
			})
			.filter(Boolean);

		const complementaryColors = new Set<string>();
		cartColors.forEach((color) => {
			const complements = COLOR_COMPLEMENTS[color] || [];
			complements.forEach((c) => complementaryColors.add(c));
		});

		const suggestions: CartSuggestion[] = state.products
			.filter((p) => !cartProductIds.includes(p.id))
			.map((product) => {
				let score = 0;
				let reason = "";

				const productColors = product.colors.map((c) => c.name);
				const hasComplementaryColor = productColors.some((c) =>
					complementaryColors.has(c),
				);
				if (hasComplementaryColor) {
					score += 2;
					reason = `Complements the ${cartColors.join(", ")} in your cart`;
				}

				const hasCommonTag = product.tags.some((tag) =>
					cartTags.has(tag),
				);
				if (hasCommonTag) {
					score += 1;
					if (!reason) reason = `Matches your selected styles`;
				}

				return { product, score, reason };
			})
			.filter((s) => s.score > 0)
			.sort((a, b) => b.score - a.score)
			.slice(0, 4)
			.map(({ product, reason }) => ({ product, reason }));

		dispatch({ type: "SET_CART_SUGGESTIONS", payload: suggestions });
	}, [state.cart, state.products]);

	const value = useMemo(() => ({ state, dispatch }), [state]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
