// src/config/types.ts

/* ==========================================================================
 * 1. USER PAGE: PRODUCTS & FILTERING
 * ========================================================================== */

export type ProductStatus = "IN_STOCK" | "OUT_OF_STOCK" | "COMING_SOON";

export interface ProductColor {
	name: string; // e.g., "Teal"
	hex: string; // e.g., "#008080" (for the UI button background)
	imageUrl: string; // The image URL specific to this color (for live color swapping)
}

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	tags: string[];
	dateAdded: string; // ISO string (for date-range filtering & localStorage safety)
	status: ProductStatus;
	stockQuantity: number;
	colors: ProductColor[]; // Array of available colors with their specific images
	defaultImageUrl: string; // Fallback image if no color is selected
	category: string;
}

// src/config/types.ts (Update FilterState interface)
export interface FilterState {
	searchQuery: string;
	tags: string[];
	dateRange: [string, string] | null;
	priceRange: [number, number] | null;
	showInStockOnly: boolean;
	category: string | null;
	aiMatchedIds?: string[] | null; // Added this line
}

/* ==========================================================================
 * 2. USER PAGE: CART & WISHLIST
 * ========================================================================== */

export interface CartItem {
	product: Product;
	selectedColorName: string; // Ties the cart item to a specific ProductColor.name
	quantity: number;
}

export interface CartSuggestion {
	product: Product;
	reason: string; // e.g., "Matches the 'casual' tag and complements your white pants"
}

/* ==========================================================================
 * 3. ADMIN PAGE: DASHBOARD & ANALYTICS
 * ========================================================================== */

export type NotificationType = "ALERT" | "INFO" | "SUCCESS";

export interface AdminNotification {
	id: string;
	type: NotificationType;
	message: string;
	timestamp: string; // ISO string
	read: boolean;
}

export type CalendarEventType = "RESTOCK" | "PROMOTION" | "MEETING" | "LAUNCH";

export interface CalendarEvent {
	id: string;
	date: string; // ISO string
	title: string;
	type: CalendarEventType;
	description: string;
}

// --- ANALYTICS MODELS ---

// 1. Revenue & Orders over time (For Area/Line Charts)
export interface SalesTimeSeriesData {
	date: string; // e.g., "2024-05-01" or "2024-W22"
	revenue: number;
	orders: number;
	visitors: number;
	conversionRate: number; // Percentage (e.g., 2.5 = 2.5%)
}

// 2. Sales by Category (For Pie/Donut Charts)
export interface CategoryBreakdownData {
	name: string; // e.g., "Tops", "Bottoms"
	salesValue: number; // Total monetary value
	unitsSold: number;
	percentageOfTotal: number; // e.g., 35.5
}

// 3. Top Performing Products (For Bar Charts or DataGrids)
export interface ProductPerformanceData {
	productId: string;
	productName: string;
	unitsSold: number;
	revenueGenerated: number;
	views: number; // How many times the product modal/card was viewed
	cartAbandonmentRate: number; // Percentage of times added to cart but not purchased
}

// 4. Customer Demographics & Acquisition (For Radial/Radar Charts)
interface TrafficSource {
	sourceName: string; // e.g., 'Organic', 'Social', 'Direct', 'Referral'
	visitors: number;
	percentage: number;
}

export interface CustomerAnalyticsData {
	newCustomers: number;
	returningCustomers: number;
	totalActiveUsers: number;
	trafficSources: TrafficSource[];
}

// 5. Sales Funnel Data (For Funnel Charts or stepped Bar Charts)
export interface FunnelStageData {
	stage: string; // e.g., 'Visited Site', 'Viewed Product', 'Added to Cart', 'Purchased'
	count: number;
	dropOffPercentage: number; // Percentage lost from the previous stage
}

// 6. Geographic Sales Distribution (For Maps or horizontal Bar Charts)
export interface GeoSalesData {
	region: string; // e.g., "North America", "Europe"
	revenue: number;
	orders: number;
}

/* ==========================================================================
 * 4. ADMIN PAGE: SUPPLY CHAIN (REACT FLOW)
 * ========================================================================== */

export type SupplyChainNodeType = "SUPPLIER" | "WAREHOUSE" | "STORE";
export type SupplyChainNodeStatus = "NORMAL" | "DELAYED" | "CRITICAL";

// This is the custom data payload attached to React Flow Nodes
export interface SupplyChainNodeData {
	label: string;
	type: SupplyChainNodeType;
	status: SupplyChainNodeStatus;
	details?: string;
	stockLevel?: number; // this means, that this property is optional
}

// This is the custom data payload attached to React Flow Edges
export interface SupplyChainEdgeData {
	transitTime: string; // e.g., "3 days"
	isAnimated: boolean; // For React Flow's animated line property
}

/* ==========================================================================
 * 5. GLOBAL APP STATE & REDUCER (Context API)
 * ========================================================================== */

export interface AppState {
	// Global UI
	theme: "light" | "dark";

	// Data
	products: Product[];

	// User State
	cart: CartItem[];
	wishlist: Product[];
	cartSuggestions: CartSuggestion[];
	filters: FilterState;

	// Admin State
	notifications: AdminNotification[];
	calendarEvents: CalendarEvent[];
}

// Discriminated Union for all Reducer Actions
// This prevents use of undeclared events
// basically compiler flags any event passed to reducer that is not in this union
export type AppAction =
	// Theme
	| { type: "TOGGLE_THEME" }

	// Cart
	| { type: "ADD_TO_CART"; payload: CartItem }
	| {
			type: "REMOVE_FROM_CART";
			payload: { productId: string; selectedColorName: string };
	  }
	| {
			type: "UPDATE_CART_QTY";
			payload: {
				productId: string;
				selectedColorName: string;
				quantity: number;
			};
	  }
	| { type: "SYNC_CART_WISHLIST" }
	| { type: "CLEAR_CART" }
	| { type: "SET_CART_SUGGESTIONS"; payload: CartSuggestion[] }

	// Wishlist
	| { type: "TOGGLE_WISHLIST"; payload: Product }

	// Filters
	| { type: "SET_FILTERS"; payload: Partial<FilterState> }
	| { type: "RESET_FILTERS" }

	// Admin - Products
	| { type: "ADD_PRODUCT"; payload: Product }
	| { type: "UPDATE_PRODUCT"; payload: Product }
	| { type: "DELETE_PRODUCT"; payload: string } // payload is productId

	// Admin - Notifications
	| { type: "ADD_NOTIFICATION"; payload: AdminNotification }
	| { type: "MARK_NOTIFICATION_READ"; payload: string } // payload is notificationId
	| { type: "CLEAR_NOTIFICATIONS" };
