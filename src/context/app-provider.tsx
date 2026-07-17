// src/context/app-provider.tsx
import React, { useReducer, useEffect, useMemo } from "react";
import type {
	AppState,
	AppAction,
	CartItem,
	CartSuggestion,
	Product,
	AdminNotification,
} from "../config/types";
import { AppContext } from "./app-context";
import {
	STORAGE_KEYS,
	DUMMY_PRODUCTS,
	DUMMY_NOTIFICATIONS,
	DUMMY_CALENDAR_EVENTS,
	COLOR_COMPLEMENTS,
	DUMMY_SUPPLY_CHAIN_NODES,
	DUMMY_SUPPLY_CHAIN_EDGES,
	DUMMY_MESSAGES,
	DUMMY_ORDERS,
	DUMMY_REVIEWS,
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

const storedProducts = loadFromStorage<Product[]>(
	STORAGE_KEYS.PRODUCTS,
	DUMMY_PRODUCTS,
);
const initialProducts = hydrateProducts(
	storedProducts.length < DUMMY_PRODUCTS.length
		? DUMMY_PRODUCTS
		: storedProducts,
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
	// Orders & Reviews — derived from state, drive all admin analytics
	orders: loadFromStorage(STORAGE_KEYS.ORDERS, DUMMY_ORDERS),
	reviews: loadFromStorage(STORAGE_KEYS.REVIEWS, DUMMY_REVIEWS),
	notifications: loadFromStorage(
		STORAGE_KEYS.NOTIFICATIONS,
		DUMMY_NOTIFICATIONS,
	),
	messages: loadFromStorage(STORAGE_KEYS.MESSAGES, DUMMY_MESSAGES),
	calendarEvents: loadFromStorage(
		"ecom_calendar_events",
		DUMMY_CALENDAR_EVENTS,
	),
	supplyChainNodes: loadFromStorage(
		"ecom_supply_chain_nodes",
		DUMMY_SUPPLY_CHAIN_NODES,
	),
	supplyChainEdges: loadFromStorage(
		"ecom_supply_chain_edges",
		DUMMY_SUPPLY_CHAIN_EDGES,
	),
	snackbarMessage: null,
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

			const newNotification: AdminNotification = {
				id: `notif_cart_${Date.now()}_${Math.random()}`,
				type: "INFO",
				message: `A user added ${addQty}x ${liveProduct.name} to their cart.`,
				timestamp: new Date().toISOString(),
				read: false,
			};

			return {
				...state,
				cart: syncCartWithProducts(nextCart, state.products),
				wishlist: state.wishlist.filter((p) => p.id !== liveProduct.id),
				notifications: [newNotification, ...state.notifications],
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
			const exists = state.wishlist.some((p) => p.id === liveProduct.id);
			const newNotification: AdminNotification = {
				id: `notif_wishlist_${Date.now()}_${Math.random()}`,
				type: "INFO",
				message: `A user ${exists ? "removed" : "added"} ${liveProduct.name} ${exists ? "from" : "to"} their wishlist.`,
				timestamp: new Date().toISOString(),
				read: false,
			};

			return {
				...state,
				wishlist: exists
					? state.wishlist.filter((p) => p.id !== liveProduct.id)
					: [...state.wishlist, liveProduct],
				notifications: [newNotification, ...state.notifications],
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

		case "ADD_PRODUCT": {
			const product = { ...action.payload };
			if (product.stockQuantity === 0 && product.status === "IN_STOCK") {
				product.status = "OUT_OF_STOCK" as const;
			} else if (
				product.stockQuantity > 0 &&
				product.status === "OUT_OF_STOCK"
			) {
				product.status = "IN_STOCK" as const;
			}

			const newNotification = {
				id: Date.now().toString(),
				type: "SUCCESS" as const,
				title: "Product Added",
				message: `${product.name} was successfully added to inventory.`,
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				products: [...state.products, product],
				notifications: [newNotification, ...state.notifications],
				snackbarMessage: newNotification.message,
			};
		}

		case "UPDATE_PRODUCT": {
			const product = { ...action.payload };
			if (product.stockQuantity === 0 && product.status === "IN_STOCK") {
				product.status = "OUT_OF_STOCK" as const;
			} else if (
				product.stockQuantity > 0 &&
				product.status === "OUT_OF_STOCK"
			) {
				product.status = "IN_STOCK" as const;
			}

			const updatedProducts = state.products.map((p) =>
				p.id === product.id ? product : p,
			);
			const newNotification = {
				id: Date.now().toString(),
				type: "INFO" as const,
				title: "Product Updated",
				message: `${product.name} details were updated.`,
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				products: updatedProducts,
				cart: syncCartWithProducts(state.cart, updatedProducts),
				wishlist: syncWishlistWithProducts(
					state.wishlist,
					updatedProducts,
				),
				notifications: [newNotification, ...state.notifications],
				snackbarMessage: newNotification.message,
			};
		}

		case "DELETE_PRODUCT": {
			const deletedProduct = state.products.find(
				(p) => p.id === action.payload,
			);
			const updatedProducts = state.products.filter(
				(p) => p.id !== action.payload,
			);
			const newNotification = {
				id: Date.now().toString(),
				type: "ALERT" as const,
				title: "Product Deleted",
				message: `${deletedProduct?.name || "A product"} was removed from inventory.`,
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				products: updatedProducts,
				cart: state.cart.filter(
					(item) => item.product.id !== action.payload,
				),
				wishlist: state.wishlist.filter((p) => p.id !== action.payload),
				notifications: [newNotification, ...state.notifications],
				snackbarMessage: newNotification.message,
			};
		}

		case "PLACE_ORDER": {
			const newNotifications = [...state.notifications];
			const updatedProducts = state.products.map((p) => {
				const orderItem = action.payload.items.find(
					(i) => i.productId === p.id,
				);
				if (!orderItem) return p;
				const newStock = Math.max(
					0,
					p.stockQuantity - orderItem.quantity,
				);
				let newStatus = p.status;
				if (newStock === 0) newStatus = "OUT_OF_STOCK";

				if (newStock > 0 && newStock <= 5) {
					newNotifications.unshift({
						id: `notif_low_stock_${p.id}_${Date.now()}`,
						type: "ALERT" as const,
						title: "Low Stock Warning",
						message: `${p.name} is running low on stock (${newStock} remaining).`,
						timestamp: action.payload.timestamp,
						read: false,
					});
				}

				return { ...p, stockQuantity: newStock, status: newStatus };
			});

			// Build the order notification
			const orderNotif = {
				id: `notif_order_${action.payload.id}`,
				type: "SUCCESS" as const,
				title: "New Order Placed",
				message: `Order #${action.payload.id.slice(-4).toUpperCase()} placed by ${action.payload.customerName} — $${action.payload.total.toFixed(2)} (${action.payload.deliveryType}).`,
				timestamp: action.payload.timestamp,
				read: false,
			};
			newNotifications.unshift(orderNotif);

			const newCalendarEvents = [...state.calendarEvents];
			if (action.payload.deliveryDate) {
				newCalendarEvents.push({
					id: `evt_deliv_${action.payload.id}`,
					date: action.payload.deliveryDate,
					title: `Delivery: Order #${action.payload.id.slice(-4).toUpperCase()}`,
					type: "LAUNCH" as const,
					description: `Delivery for ${action.payload.customerName}.`,
				});
			}

			return {
				...state,
				products: updatedProducts,
				cart: syncCartWithProducts(state.cart, updatedProducts),
				wishlist: syncWishlistWithProducts(
					state.wishlist,
					updatedProducts,
				),
				orders: [action.payload, ...state.orders],
				notifications: newNotifications,
				calendarEvents: newCalendarEvents,
				snackbarMessage: `Order placed successfully! Total: $${action.payload.total.toFixed(2)}`,
			};
		}

		case "ADD_REVIEW": {
			const reviewNotif = {
				id: `notif_review_${action.payload.id}`,
				type: "INFO" as const,
				title: "New Product Review",
				message: `${action.payload.customerName} left a ${action.payload.rating}-star review on "${action.payload.productName}".`,
				timestamp: action.payload.timestamp,
				read: false,
			};
			return {
				...state,
				reviews: [action.payload, ...state.reviews],
				notifications: [reviewNotif, ...state.notifications],
			};
		}

		case "UPDATE_ORDER_STATUS": {
			const order = state.orders.find(
				(o) => o.id === action.payload.orderId,
			);
			let updatedProducts = state.products;

			if (
				order &&
				action.payload.status === "CANCELLED" &&
				order.status !== "CANCELLED"
			) {
				// Restock items
				updatedProducts = state.products.map((p) => {
					const orderItem = order.items.find(
						(i) => i.productId === p.id,
					);
					if (!orderItem) return p;
					const newStock = p.stockQuantity + orderItem.quantity;
					return {
						...p,
						stockQuantity: newStock,
						status:
							newStock > 0 && p.status === "OUT_OF_STOCK"
								? "IN_STOCK"
								: p.status,
					};
				});
			} else if (
				order &&
				order.status === "CANCELLED" &&
				action.payload.status !== "CANCELLED"
			) {
				// Undo restock if status changed from cancelled to something else
				updatedProducts = state.products.map((p) => {
					const orderItem = order.items.find(
						(i) => i.productId === p.id,
					);
					if (!orderItem) return p;
					const newStock = Math.max(
						0,
						p.stockQuantity - orderItem.quantity,
					);
					return {
						...p,
						stockQuantity: newStock,
						status: newStock === 0 ? "OUT_OF_STOCK" : p.status,
					};
				});
			}

			const orderNotif = {
				id: `notif_order_update_${action.payload.orderId}_${Date.now()}`,
				type: "INFO" as const,
				title: "Order Status Updated",
				message: `Order #${action.payload.orderId.slice(-4).toUpperCase()} is now ${action.payload.status}.`,
				timestamp: new Date().toISOString(),
				read: false,
			};

			return {
				...state,
				products: updatedProducts,
				cart:
					updatedProducts !== state.products
						? syncCartWithProducts(state.cart, updatedProducts)
						: state.cart,
				wishlist:
					updatedProducts !== state.products
						? syncWishlistWithProducts(
								state.wishlist,
								updatedProducts,
							)
						: state.wishlist,
				orders: state.orders.map((o) =>
					o.id === action.payload.orderId
						? { ...o, status: action.payload.status }
						: o,
				),
				notifications: [orderNotif, ...state.notifications],
				snackbarMessage: `Order status updated to ${action.payload.status}`,
			};
		}

		case "UPDATE_ORDER": {
			const orderNotif = {
				id: `notif_order_update_${action.payload.id}_${Date.now()}`,
				type: "INFO" as const,
				title: "Order Updated",
				message: `Order #${action.payload.id.slice(-4).toUpperCase()} has been manually updated.`,
				timestamp: new Date().toISOString(),
				read: false,
			};

			return {
				...state,
				orders: state.orders.map((o) =>
					o.id === action.payload.id ? action.payload : o,
				),
				notifications: [orderNotif, ...state.notifications],
				snackbarMessage: `Order #${action.payload.id.slice(-4).toUpperCase()} updated successfully!`,
			};
		}

		case "DELETE_ORDER": {
			const orderNotif = {
				id: `notif_order_delete_${action.payload}_${Date.now()}`,
				type: "ALERT" as const,
				title: "Order Deleted",
				message: `Order #${action.payload.slice(-4).toUpperCase()} has been permanently deleted.`,
				timestamp: new Date().toISOString(),
				read: false,
			};

			return {
				...state,
				orders: state.orders.filter((o) => o.id !== action.payload),
				notifications: [orderNotif, ...state.notifications],
				snackbarMessage: `Order #${action.payload.slice(-4).toUpperCase()} deleted.`,
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

		case "DELETE_NOTIFICATION":
			return {
				...state,
				notifications: state.notifications.filter(
					(n) => n.id !== action.payload,
				),
			};

		case "CLEAR_NOTIFICATIONS":
			return { ...state, notifications: [] };

		case "CLEAR_SNACKBAR":
			return { ...state, snackbarMessage: null };

		case "MARK_MESSAGE_READ":
			return {
				...state,
				messages: state.messages.map((m) =>
					m.id === action.payload ? { ...m, read: true } : m,
				),
			};

		case "ADD_MESSAGE": {
			const notif = {
				id: `notif_msg_${action.payload.id}`,
				type: "INFO" as const,
				title: "New Message",
				message: `New message received from ${action.payload.sender}.`,
				timestamp: action.payload.timestamp,
				read: false,
			};
			return {
				...state,
				messages: [action.payload, ...state.messages],
				notifications: [notif, ...state.notifications],
				snackbarMessage: "Message sent successfully!",
			};
		}

		case "ADD_CALENDAR_EVENT":
			return {
				...state,
				calendarEvents: [...state.calendarEvents, action.payload],
			};

		case "UPDATE_CALENDAR_EVENT":
			return {
				...state,
				calendarEvents: state.calendarEvents.map((e) =>
					e.id === action.payload.id ? action.payload : e,
				),
			};

		case "DELETE_CALENDAR_EVENT":
			return {
				...state,
				calendarEvents: state.calendarEvents.filter(
					(e) => e.id !== action.payload,
				),
			};

		case "SET_SUPPLY_CHAIN_NODES":
			return { ...state, supplyChainNodes: action.payload };

		case "SET_SUPPLY_CHAIN_EDGES":
			return { ...state, supplyChainEdges: action.payload };

		case "UPDATE_SUPPLY_CHAIN_NODE": {
			const notif = {
				id: `notif_sc_update_${Date.now()}`,
				type: "INFO" as const,
				title: "Supply Chain Node Updated",
				message: `Node "${action.payload.data.label}" details were updated.`,
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				supplyChainNodes: state.supplyChainNodes.map((n) =>
					n.id === action.payload.id ? action.payload : n,
				),
				notifications: [notif, ...state.notifications],
				snackbarMessage: "Node updated successfully",
			};
		}

		case "DELETE_SUPPLY_CHAIN_NODE": {
			const nodeToDelete = state.supplyChainNodes.find(
				(n) => n.id === action.payload,
			);
			const notif = {
				id: `notif_sc_delete_${Date.now()}`,
				type: "ALERT" as const,
				title: "Supply Chain Node Deleted",
				message: `Node "${nodeToDelete?.data.label || action.payload}" was removed.`,
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				supplyChainNodes: state.supplyChainNodes.filter(
					(n) => n.id !== action.payload,
				),
				supplyChainEdges: state.supplyChainEdges.filter(
					(e) =>
						e.source !== action.payload &&
						e.target !== action.payload,
				),
				notifications: [notif, ...state.notifications],
				snackbarMessage: "Node deleted successfully",
			};
		}

		case "ADD_SUPPLY_CHAIN_NODE": {
			const notif = {
				id: `notif_sc_add_${Date.now()}`,
				type: "SUCCESS" as const,
				title: "Supply Chain Node Added",
				message: `Node "${action.payload.data.label}" was added.`,
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				supplyChainNodes: [...state.supplyChainNodes, action.payload],
				notifications: [notif, ...state.notifications],
				snackbarMessage: "Node added successfully",
			};
		}

		case "ADD_SUPPLY_CHAIN_EDGE": {
			const notif = {
				id: `notif_sc_edge_add_${Date.now()}`,
				type: "SUCCESS" as const,
				title: "Supply Chain Connection Added",
				message: `A new connection was established between nodes.`,
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				supplyChainEdges: [...state.supplyChainEdges, action.payload],
				notifications: [notif, ...state.notifications],
			};
		}

		case "DELETE_SUPPLY_CHAIN_EDGE": {
			const notif = {
				id: `notif_sc_edge_delete_${Date.now()}`,
				type: "ALERT" as const,
				title: "Supply Chain Connection Removed",
				message: `A connection was removed between nodes.`,
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				supplyChainEdges: state.supplyChainEdges.filter(
					(e) => e.id !== action.payload,
				),
				notifications: [notif, ...state.notifications],
			};
		}

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
		localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
	}, [state.orders]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.REVIEWS,
			JSON.stringify(state.reviews),
		);
	}, [state.reviews]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.MESSAGES,
			JSON.stringify(state.messages),
		);
	}, [state.messages]);

	useEffect(() => {
		localStorage.setItem(
			"ecom_calendar_events",
			JSON.stringify(state.calendarEvents),
		);
	}, [state.calendarEvents]);

	useEffect(() => {
		localStorage.setItem(
			"ecom_supply_chain_nodes",
			JSON.stringify(state.supplyChainNodes),
		);
	}, [state.supplyChainNodes]);

	useEffect(() => {
		localStorage.setItem(
			"ecom_supply_chain_edges",
			JSON.stringify(state.supplyChainEdges),
		);
	}, [state.supplyChainEdges]);

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
			.filter(
				(p) =>
					!cartProductIds.includes(p.id) && p.status === "IN_STOCK",
			)
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
