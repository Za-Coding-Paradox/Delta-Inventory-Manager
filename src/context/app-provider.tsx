// src/context/app-provider.tsx
import React, { useReducer, useEffect, useMemo } from "react"; // useReducer manages complex state; useEffect runs side-effects after render; useMemo caches computed values
import type {
	AppState,
	AppAction,
	CartItem,
	CartSuggestion,
	Product,
	AdminNotification,
} from "../config/types"; // TypeScript type imports only — these don't exist at runtime
import { AppContext } from "./app-context"; // the context object we created to share state globally
import {
	STORAGE_KEYS, // string keys like "ecom_cart" used for localStorage
	DUMMY_PRODUCTS,
	DUMMY_NOTIFICATIONS,
	DUMMY_CALENDAR_EVENTS,
	COLOR_COMPLEMENTS, // a map that tells us which colors complement each other (used for cart suggestions)
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
} from "../utils/cart-sync"; // utility functions for cart/stock validation

/* ==========================================================================
 * 1. INITIAL STATE & LOCAL STORAGE HYDRATION
 * When the app first loads, we check localStorage for previously saved data.
 * If nothing is saved yet, we fall back to the dummy/seed data.
 * ========================================================================== */

// Safely reads and parses a JSON value from localStorage.
// If parsing fails (corrupted data), it returns the fallback value instead of crashing.
// The generic <T> means this function works for any data type (products, cart items, etc.)
function loadFromStorage<T>(key: string, fallback: T): T {
	try {
		const stored = localStorage.getItem(key); // read the raw JSON string from the browser's localStorage
		return stored ? (JSON.parse(stored) as T) : fallback; // parse it if it exists, otherwise use the fallback
	} catch (e) {
		console.error("Failed to parse localStorage", e); // log the error but don't crash the app
		return fallback; // return fallback so the app still works
	}
}

// Ensures all products have the stockQuantity field set.
// Old data saved in localStorage before this field was added might be missing it,
// so we default it to 0 to prevent crashes when we read product.stockQuantity.
function hydrateProducts(stored: Product[]): Product[] {
	return stored.map((product) => ({
		...product, // keep all existing product fields
		stockQuantity: product.stockQuantity ?? 0, // ?? is the "nullish coalescing" operator — use 0 if stockQuantity is null or undefined
	}));
}

// Load products from localStorage, falling back to DUMMY_PRODUCTS if none are saved
const storedProducts = loadFromStorage<Product[]>(
	STORAGE_KEYS.PRODUCTS,
	DUMMY_PRODUCTS,
);

// If the stored list has fewer products than the dummy data (e.g., first-ever load),
// use the dummy data to ensure we have the full product catalog.
// Otherwise, use what was saved (so admin edits persist across reloads).
const initialProducts = hydrateProducts(
	storedProducts.length < DUMMY_PRODUCTS.length
		? DUMMY_PRODUCTS
		: storedProducts,
);

// The starting state of the entire application.
// Each field is either loaded from localStorage (to survive page refreshes)
// or initialized with a sensible default value.
const initialState: AppState = {
	theme: loadFromStorage<"light" | "dark">(STORAGE_KEYS.THEME, "light"), // remembered theme preference
	products: initialProducts, // product catalog (admin-editable)
	cart: syncCartWithProducts(
		loadFromStorage<CartItem[]>(STORAGE_KEYS.CART, []), // restore saved cart items
		initialProducts, // validate them against current stock levels
	),
	wishlist: syncWishlistWithProducts(
		loadFromStorage<Product[]>(STORAGE_KEYS.WISHLIST, []), // restore saved wishlist
		initialProducts, // remove any products that no longer exist
	),
	cartSuggestions: [], // starts empty — computed dynamically when cart changes
	filters: {
		searchQuery: "", // no search query on startup
		tags: [], // no tag filters active
		dateRange: null, // no date filter active
		priceRange: null, // no price filter active
		showInStockOnly: false, // show all products by default
		category: null, // no category filter active
		aiMatchedIds: null, // no AI search results yet
	},
	// Orders & Reviews — loaded from localStorage, fall back to seed data for demo purposes
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
	supplyChainNodes: loadFromStorage( // nodes represent suppliers, warehouses, and stores on the flow diagram
		"ecom_supply_chain_nodes",
		DUMMY_SUPPLY_CHAIN_NODES,
	),
	supplyChainEdges: loadFromStorage( // edges represent the connections (arrows) between nodes
		"ecom_supply_chain_edges",
		DUMMY_SUPPLY_CHAIN_EDGES,
	),
	snackbarMessage: null, // no toast notification on startup
};

/* ==========================================================================
 * 2. REDUCER LOGIC
 * The reducer is a pure function: it receives the current state and an action,
 * and returns the NEXT state. It never mutates state directly — it always
 * creates a new object using spread syntax (...state) to ensure React detects the change.
 * ========================================================================== */

const appReducer = (state: AppState, action: AppAction): AppState => {
	switch (action.type) {
		case "TOGGLE_THEME":
			return {
				...state, // keep everything else the same
				theme: state.theme === "light" ? "dark" : "light", // flip the theme
			};

		case "ADD_TO_CART": {
			const { product, selectedColorName, quantity } = action.payload; // extract the details from the action
			const liveProduct =
				state.products.find((p) => p.id === product.id) ?? product; // always use the freshest product data; fall back to the passed product if not found

			if (!canAddToCart(liveProduct)) return state; // if the product is out of stock, do nothing and return unchanged state

			// Calculate how many we can actually add (may be less than requested if stock is low)
			const addQty = getMaxAddableQty(
				state.cart,
				liveProduct,
				selectedColorName,
				quantity,
			);
			if (addQty <= 0) return state; // nothing can be added (cart already at stock limit)

			// Check if this product+color combo already exists in the cart
			const existingItem = state.cart.find(
				(item) =>
					item.product.id === liveProduct.id &&
					item.selectedColorName === selectedColorName,
			);

			// If item already exists, increase its quantity; otherwise append a new cart entry
			const nextCart = existingItem
				? state.cart.map((item) =>
						item.product.id === liveProduct.id &&
						item.selectedColorName === selectedColorName
							? {
									...item,
									product: liveProduct, // update with fresh product data
									quantity: item.quantity + addQty, // add to existing quantity
								}
							: item, // leave all other items unchanged
					)
				: [
						...state.cart, // keep existing cart items
						{
							product: liveProduct,
							selectedColorName,
							quantity: addQty, // start with the calculated safe quantity
						},
					];

			// Create an admin notification so the dashboard shows cart activity in real-time
			const newNotification: AdminNotification = {
				id: `notif_cart_${Date.now()}_${Math.random()}`, // unique ID using timestamp + random number to avoid collisions
				type: "INFO",
				message: `A user added ${addQty}x ${liveProduct.name} to their cart.`,
				timestamp: new Date().toISOString(), // ISO string format for consistent date handling
				read: false, // new notifications start as unread
			};

			return {
				...state,
				cart: syncCartWithProducts(nextCart, state.products), // re-validate the cart against current stock
				wishlist: state.wishlist.filter((p) => p.id !== liveProduct.id), // automatically remove from wishlist when added to cart
				notifications: [newNotification, ...state.notifications], // prepend new notification so it appears at the top
			};
		}

		case "REMOVE_FROM_CART":
			return {
				...state,
				// Keep all cart items EXCEPT the one matching both the product ID and color
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
			const liveProduct = state.products.find((p) => p.id === productId); // get fresh product data for stock validation
			if (!liveProduct) return state; // product was deleted, nothing to update

			const nextCart = state.cart
				.map((item) => {
					if (
						item.product.id !== productId ||
						item.selectedColorName !== selectedColorName
					) {
						return item; // not the item we're updating, keep as-is
					}
					// Clamp the new quantity so it doesn't exceed available stock
					const clamped = clampCartItemQty(
						state.cart,
						item,
						liveProduct,
						quantity,
					);
					return {
						...item,
						product: liveProduct, // always use fresh product data
						quantity: clamped, // apply the validated quantity
					};
				})
				.filter((item) => item.quantity > 0); // remove items whose quantity was clamped to 0

			return {
				...state,
				cart: syncCartWithProducts(nextCart, state.products), // re-validate the whole cart
			};
		}

		case "CLEAR_CART":
			return { ...state, cart: [], cartSuggestions: [] }; // empty the cart and clear suggestions

		case "SET_CART_SUGGESTIONS":
			return { ...state, cartSuggestions: action.payload }; // store computed product recommendations

		case "TOGGLE_WISHLIST": {
			// Use the freshest version of the product from state; fall back to the passed product if not found
			const liveProduct =
				state.products.find((p) => p.id === action.payload.id) ??
				action.payload;
			const exists = state.wishlist.some((p) => p.id === liveProduct.id); // check if it's already in the wishlist
			const newNotification: AdminNotification = {
				id: `notif_wishlist_${Date.now()}_${Math.random()}`,
				type: "INFO",
				// Dynamic message: shows whether it was added or removed from the wishlist
				message: `A user ${exists ? "removed" : "added"} ${liveProduct.name} ${exists ? "from" : "to"} their wishlist.`,
				timestamp: new Date().toISOString(),
				read: false,
			};

			return {
				...state,
				// If it was already in the wishlist, remove it; otherwise add it (toggle behavior)
				wishlist: exists
					? state.wishlist.filter((p) => p.id !== liveProduct.id)
					: [...state.wishlist, liveProduct],
				notifications: [newNotification, ...state.notifications],
			};
		}

		case "SET_FILTERS":
			return {
				...state,
				// Merge the new filter values with the existing ones (partial update pattern)
				// e.g., dispatching { searchQuery: "shoes" } only changes searchQuery, not the other filters
				filters: { ...state.filters, ...action.payload },
			};

		case "RESET_FILTERS":
			return {
				...state,
				filters: {
					searchQuery: "", // clear the search box
					tags: [], // deselect all tag filters
					dateRange: null, // remove date filter
					priceRange: null, // remove price filter
					showInStockOnly: false, // show all products again
					category: null, // deselect category filter
					aiMatchedIds: null, // clear AI search results
				},
			};

		case "ADD_PRODUCT": {
			const product = { ...action.payload }; // create a copy so we can modify it safely
			// Auto-correct status based on stock: a product with 0 stock should be OUT_OF_STOCK
			if (product.stockQuantity === 0 && product.status === "IN_STOCK") {
				product.status = "OUT_OF_STOCK" as const;
			} else if (
				product.stockQuantity > 0 &&
				product.status === "OUT_OF_STOCK"
			) {
				product.status = "IN_STOCK" as const; // auto-activate if stock was added
			}

			const newNotification = {
				id: Date.now().toString(),
				type: "SUCCESS" as const, // "as const" narrows the type from string to the exact literal "SUCCESS"
				title: "Product Added",
				message: `${product.name} was successfully added to inventory.`,
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				products: [...state.products, product], // append the new product to the end of the list
				notifications: [newNotification, ...state.notifications],
				snackbarMessage: newNotification.message, // trigger a toast notification in the UI
			};
		}

		case "UPDATE_PRODUCT": {
			const product = { ...action.payload };
			// Same auto-correction logic as ADD_PRODUCT: keep status in sync with stock quantity
			if (product.stockQuantity === 0 && product.status === "IN_STOCK") {
				product.status = "OUT_OF_STOCK" as const;
			} else if (
				product.stockQuantity > 0 &&
				product.status === "OUT_OF_STOCK"
			) {
				product.status = "IN_STOCK" as const;
			}

			// Replace the old version of this product in the array with the updated one
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
				cart: syncCartWithProducts(state.cart, updatedProducts), // re-validate cart because stock may have changed
				wishlist: syncWishlistWithProducts(
					state.wishlist,
					updatedProducts, // remove wishlist items if they're now unavailable
				),
				notifications: [newNotification, ...state.notifications],
				snackbarMessage: newNotification.message,
			};
		}

		case "DELETE_PRODUCT": {
			const deletedProduct = state.products.find(
				(p) => p.id === action.payload, // find the product by ID so we can use its name in the notification
			);
			const updatedProducts = state.products.filter(
				(p) => p.id !== action.payload, // remove the product with the matching ID
			);
			const newNotification = {
				id: Date.now().toString(),
				type: "ALERT" as const,
				title: "Product Deleted",
				message: `${deletedProduct?.name || "A product"} was removed from inventory.`, // the ?. prevents a crash if the product wasn't found
				timestamp: new Date().toISOString(),
				read: false,
			};
			return {
				...state,
				products: updatedProducts,
				cart: state.cart.filter(
					(item) => item.product.id !== action.payload, // remove this product from cart
				),
				wishlist: state.wishlist.filter((p) => p.id !== action.payload), // remove from wishlist too
				notifications: [newNotification, ...state.notifications],
				snackbarMessage: newNotification.message,
			};
		}

		case "PLACE_ORDER": {
			const newNotifications = [...state.notifications]; // start with a copy of current notifications

			// When an order is placed, reduce the stock of every ordered product
			const updatedProducts = state.products.map((p) => {
				const orderItem = action.payload.items.find(
					(i) => i.productId === p.id, // find the ordered quantity for this product
				);
				if (!orderItem) return p; // product wasn't part of this order, keep unchanged

				// Subtract the ordered quantity from stock (never go below 0)
				const newStock = Math.max(
					0,
					p.stockQuantity - orderItem.quantity,
				);
				let newStatus = p.status;
				if (newStock === 0) newStatus = "OUT_OF_STOCK"; // auto-update status when stock hits 0

				// If stock is critically low (5 or fewer), push an admin alert notification
				if (newStock > 0 && newStock <= 5) {
					newNotifications.unshift({ // unshift adds to the front of the array (newest first)
						id: `notif_low_stock_${p.id}_${Date.now()}`,
						type: "ALERT" as const,
						title: "Low Stock Warning",
						message: `${p.name} is running low on stock (${newStock} remaining).`,
						timestamp: action.payload.timestamp,
						read: false,
					});
				}

				return { ...p, stockQuantity: newStock, status: newStatus }; // return updated product
			});

			// Create an order confirmation notification for the admin dashboard
			const orderNotif = {
				id: `notif_order_${action.payload.id}`,
				type: "SUCCESS" as const,
				title: "New Order Placed",
				// slice(-4) takes the last 4 characters of the order ID for a short reference code
				message: `Order #${action.payload.id.slice(-4).toUpperCase()} placed by ${action.payload.customerName} — $${action.payload.total.toFixed(2)} (${action.payload.deliveryType}).`,
				timestamp: action.payload.timestamp,
				read: false,
			};
			newNotifications.unshift(orderNotif); // add the order notification at the top

			// If the order has a delivery date, automatically add it to the calendar widget
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
				products: updatedProducts, // stock has been reduced
				cart: syncCartWithProducts(state.cart, updatedProducts), // re-validate cart with new stock levels
				wishlist: syncWishlistWithProducts(
					state.wishlist,
					updatedProducts,
				),
				orders: [action.payload, ...state.orders], // prepend new order so newest appears first
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
				reviews: [action.payload, ...state.reviews], // prepend so newest review appears first
				notifications: [reviewNotif, ...state.notifications],
			};
		}

		case "UPDATE_ORDER_STATUS": {
			const order = state.orders.find(
				(o) => o.id === action.payload.orderId, // find the order being updated
			);
			let updatedProducts = state.products; // default: don't change products

			if (
				order &&
				action.payload.status === "CANCELLED" &&
				order.status !== "CANCELLED" // only restock if it wasn't already cancelled
			) {
				// When an order is CANCELLED, add the ordered quantities back to stock (restocking)
				updatedProducts = state.products.map((p) => {
					const orderItem = order.items.find(
						(i) => i.productId === p.id,
					);
					if (!orderItem) return p;
					const newStock = p.stockQuantity + orderItem.quantity; // add back the stock
					return {
						...p,
						stockQuantity: newStock,
						// If restocking brought a previously empty product back, mark it as IN_STOCK
						status:
							newStock > 0 && p.status === "OUT_OF_STOCK"
								? "IN_STOCK"
								: p.status,
					};
				});
			} else if (
				order &&
				order.status === "CANCELLED" &&
				action.payload.status !== "CANCELLED" // order is being UN-cancelled (changed back to active)
			) {
				// Undo the restock that happened when it was cancelled — deduct stock again
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
				// Only re-sync cart/wishlist if products actually changed (optimization to avoid unnecessary re-renders)
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
				// Update only the specific order's status, keep all others unchanged
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
				// Replace the matching order with the updated version, keep all others
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
				orders: state.orders.filter((o) => o.id !== action.payload), // remove the order with this ID
				notifications: [orderNotif, ...state.notifications],
				snackbarMessage: `Order #${action.payload.slice(-4).toUpperCase()} deleted.`,
			};
		}

		case "SYNC_CART_WISHLIST":
			// Re-validates cart and wishlist against the current product list.
			// Dispatched automatically when product data changes.
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
				notifications: [action.payload, ...state.notifications], // add new notification at the top
			};

		case "MARK_NOTIFICATION_READ":
			return {
				...state,
				// Find the notification by ID and set its read flag to true
				notifications: state.notifications.map((n) =>
					n.id === action.payload ? { ...n, read: true } : n,
				),
			};

		case "DELETE_NOTIFICATION":
			return {
				...state,
				notifications: state.notifications.filter(
					(n) => n.id !== action.payload, // keep all notifications except the one being deleted
				),
			};

		case "CLEAR_NOTIFICATIONS":
			return { ...state, notifications: [] }; // wipe all notifications at once

		case "CLEAR_SNACKBAR":
			return { ...state, snackbarMessage: null }; // hide the toast notification

		case "MARK_MESSAGE_READ":
			return {
				...state,
				messages: state.messages.map((m) =>
					m.id === action.payload ? { ...m, read: true } : m, // mark only the matching message as read
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
				messages: [action.payload, ...state.messages], // prepend new message
				notifications: [notif, ...state.notifications],
				snackbarMessage: "Message sent successfully!",
			};
		}

		case "ADD_CALENDAR_EVENT":
			return {
				...state,
				calendarEvents: [...state.calendarEvents, action.payload], // append new event to calendar
			};

		case "UPDATE_CALENDAR_EVENT":
			return {
				...state,
				calendarEvents: state.calendarEvents.map((e) =>
					e.id === action.payload.id ? action.payload : e, // replace matching event with updated version
				),
			};

		case "DELETE_CALENDAR_EVENT":
			return {
				...state,
				calendarEvents: state.calendarEvents.filter(
					(e) => e.id !== action.payload, // remove the event with this ID
				),
			};

		case "SET_SUPPLY_CHAIN_NODES":
			return { ...state, supplyChainNodes: action.payload }; // replace the entire nodes list

		case "SET_SUPPLY_CHAIN_EDGES":
			return { ...state, supplyChainEdges: action.payload }; // replace the entire edges list

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
				// Replace only the node that matches by ID; keep all others unchanged
				supplyChainNodes: state.supplyChainNodes.map((n) =>
					n.id === action.payload.id ? action.payload : n,
				),
				notifications: [notif, ...state.notifications],
				snackbarMessage: "Node updated successfully",
			};
		}

		case "DELETE_SUPPLY_CHAIN_NODE": {
			const nodeToDelete = state.supplyChainNodes.find(
				(n) => n.id === action.payload, // find the node so we can use its label in the notification
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
					(n) => n.id !== action.payload, // remove the node from the list
				),
				// Also remove any edges that connected TO or FROM this deleted node
				// (orphaned edges that point to a non-existent node would cause React Flow errors)
				supplyChainEdges: state.supplyChainEdges.filter(
					(e) =>
						e.source !== action.payload && // edge doesn't START at the deleted node
						e.target !== action.payload, // edge doesn't END at the deleted node
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
				supplyChainNodes: [...state.supplyChainNodes, action.payload], // append new node to the supply chain
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
				supplyChainEdges: [...state.supplyChainEdges, action.payload], // append the new edge (arrow) to the diagram
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
					(e) => e.id !== action.payload, // remove the edge with this ID
				),
				notifications: [notif, ...state.notifications],
			};
		}

		default:
			return state; // for any unknown action, return state unchanged (safety net)
	}
};

/* ==========================================================================
 * 3. PROVIDER COMPONENT (Includes LocalStorage Sync & Auto-Suggestions)
 * AppProvider is the component that actually RUNS the reducer and provides
 * state to the entire app. It wraps around all other components in App.tsx.
 * ========================================================================== */

// React.FC<{ children: React.ReactNode }> means this is a React Function Component
// that accepts child elements (anything you put between <AppProvider> and </AppProvider>)
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// useReducer works like useState but for complex state.
	// It takes a reducer function and the initial state, and returns the current state
	// plus a dispatch function to send actions to the reducer.
	const [state, dispatch] = useReducer(appReducer, initialState);

	// Each useEffect below automatically saves a piece of state to localStorage
	// whenever it changes. The dependency array [state.theme] means:
	// "run this effect every time state.theme changes".
	// This is how user data persists across browser refreshes.

	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(state.theme)); // save theme preference
	}, [state.theme]);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart)); // save cart items
	}, [state.cart]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.WISHLIST,
			JSON.stringify(state.wishlist), // save wishlist products
		);
	}, [state.wishlist]);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEYS.PRODUCTS,
			JSON.stringify(state.products), // save the product catalog (including admin edits)
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

	// When products change, re-sync the cart and wishlist to remove stale data.
	// This runs whenever the admin edits or deletes a product.
	useEffect(() => {
		dispatch({ type: "SYNC_CART_WISHLIST" });
	}, [state.products]);

	// Smart Cart Suggestions Engine:
	// This runs whenever the cart changes and computes recommended products to upsell.
	// It looks at the colors and tags of items already in the cart, then finds other
	// products that complement them (using the COLOR_COMPLEMENTS lookup table).
	useEffect(() => {
		if (state.cart.length === 0) {
			dispatch({ type: "SET_CART_SUGGESTIONS", payload: [] }); // no items in cart = no suggestions
			return;
		}

		const cartProductIds = state.cart.map((item) => item.product.id); // IDs already in cart — we won't suggest these

		// Collect all tags from cart items into a Set for fast lookup
		const cartTags = new Set(
			state.cart.flatMap((item) => item.product.tags), // flatMap flattens the array of tag arrays into one flat array
		);

		// Get the color names of each item currently selected in the cart
		const cartColors = state.cart
			.map((item) => {
				const colorObj = item.product.colors.find(
					(c) => c.name === item.selectedColorName,
				);
				return colorObj?.name || ""; // get the color name string
			})
			.filter(Boolean); // remove empty strings (for items without a valid color match)

		// Look up which colors are considered "complementary" to the cart's colors
		const complementaryColors = new Set<string>();
		cartColors.forEach((color) => {
			const complements = COLOR_COMPLEMENTS[color] || []; // look up this color's complements from the config
			complements.forEach((c) => complementaryColors.add(c)); // add all complements to the set
		});

		// Score and rank non-cart products as potential suggestions
		const suggestions: CartSuggestion[] = state.products
			.filter(
				(p) =>
					!cartProductIds.includes(p.id) && p.status === "IN_STOCK", // only suggest products not already in cart and that are in stock
			)
			.map((product) => {
				let score = 0; // higher score = better recommendation
				let reason = ""; // human-readable reason shown in the suggestion UI

				const productColors = product.colors.map((c) => c.name);
				const hasComplementaryColor = productColors.some((c) =>
					complementaryColors.has(c), // does this product come in a color that complements the cart?
				);
				if (hasComplementaryColor) {
					score += 2; // color match is worth 2 points (stronger signal)
					reason = `Complements the ${cartColors.join(", ")} in your cart`;
				}

				const hasCommonTag = product.tags.some((tag) =>
					cartTags.has(tag), // does this product share any style/category tags with cart items?
				);
				if (hasCommonTag) {
					score += 1; // tag match worth 1 point
					if (!reason) reason = `Matches your selected styles`; // only set reason if not already set by color match
				}

				return { product, score, reason };
			})
			.filter((s) => s.score > 0) // only include products with at least 1 relevance signal
			.sort((a, b) => b.score - a.score) // sort by score descending (best match first)
			.slice(0, 4) // limit to 4 suggestions to avoid overwhelming the user
			.map(({ product, reason }) => ({ product, reason })); // strip out the score — UI doesn't need it

		dispatch({ type: "SET_CART_SUGGESTIONS", payload: suggestions }); // push suggestions into global state
	}, [state.cart, state.products]); // re-run when cart or products change

	// useMemo prevents creating a new { state, dispatch } object on every render.
	// Without this, all context consumers would re-render every time, even if state didn't change.
	const value = useMemo(() => ({ state, dispatch }), [state]);

	// AppContext.Provider makes the value (state + dispatch) available to every
	// component inside it via the useAppContext() hook
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
