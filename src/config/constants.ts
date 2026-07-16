// src/config/constants.ts
import type {
	Product,
	AdminNotification,
	CalendarEvent,
	SalesTimeSeriesData,
	CategoryBreakdownData,
	ProductPerformanceData,
	CustomerAnalyticsData,
	FunnelStageData,
	GeoSalesData,
} from "./types";

/* ==========================================================================
 * 1. LOCAL STORAGE KEYS
 * ========================================================================== */
export const STORAGE_KEYS = {
	CART: "ecom_cart",
	WISHLIST: "ecom_wishlist",
	THEME: "ecom_theme",
	PRODUCTS: "ecom_products",
	NOTIFICATIONS: "ecom_notifications",
};

/* ==========================================================================
 * 2. COLOR COMPLEMENTARY MAP (For Cart Suggestions)
 * ========================================================================== */
export const COLOR_COMPLEMENTS: Record<string, string[]> = {
	White: ["Teal", "Black", "Navy", "Coral"],
	Black: ["White", "Olive", "Silver"],
	Teal: ["White", "Coral", "Gold"],
	Navy: ["White", "Grey"],
	Coral: ["Teal", "White", "Olive"],
	// Add more as needed
};

/* ==========================================================================
 * 3. DUMMY PRODUCT DATA
 * ========================================================================== */
export const DUMMY_PRODUCTS: Product[] = [
	{
		id: "prod_1",
		name: "Classic White Chino Pants",
		description:
			"Comfortable and breathable cotton chinos, perfect for summer outings.",
		price: 49.99,
		tags: ["pants", "summer", "casual"],
		dateAdded: new Date(2024, 2, 15).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 24,
		colors: [
			{
				name: "White",
				hex: "#FFFFFF",
				imageUrl:
					"https://via.placeholder.com/400x400?text=White+Pants",
			},
			{
				name: "Navy",
				hex: "#001F3F",
				imageUrl: "https://via.placeholder.com/400x400?text=Navy+Pants",
			},
		],
		defaultImageUrl: "https://via.placeholder.com/400x400?text=White+Pants",
		category: "Bottoms",
	},
	{
		id: "prod_2",
		name: "Teal Cotton Shirt",
		description:
			"A vibrant teal shirt that pairs perfectly with light-colored pants.",
		price: 39.99,
		tags: ["shirts", "summer", "casual"],
		dateAdded: new Date(2024, 3, 5).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 18,
		colors: [
			{
				name: "Teal",
				hex: "#008080",
				imageUrl: "https://via.placeholder.com/400x400?text=Teal+Shirt",
			},
			{
				name: "Black",
				hex: "#000000",
				imageUrl:
					"https://via.placeholder.com/400x400?text=Black+Shirt",
			},
		],
		defaultImageUrl: "https://via.placeholder.com/400x400?text=Teal+Shirt",
		category: "Tops",
	},
	{
		id: "prod_3",
		name: "Winter Wool Coat (Coming Soon)",
		description: "Heavy-duty wool coat for the upcoming winter season.",
		price: 199.99,
		tags: ["coats", "winter", "formal"],
		dateAdded: new Date(2024, 1, 10).toISOString(),
		status: "COMING_SOON",
		stockQuantity: 0,
		colors: [
			{
				name: "Black",
				hex: "#000000",
				imageUrl: "https://via.placeholder.com/400x400?text=Black+Coat",
			},
		],
		defaultImageUrl: "https://via.placeholder.com/400x400?text=Black+Coat",
		category: "Outerwear",
	},
	{
		id: "prod_4",
		name: "Coral Summer Dress",
		description: "Light and airy coral dress for beach days.",
		price: 59.99,
		tags: ["dresses", "summer", "casual"],
		dateAdded: new Date(2024, 4, 1).toISOString(),
		status: "OUT_OF_STOCK",
		stockQuantity: 0,
		colors: [
			{
				name: "Coral",
				hex: "#FF7F50",
				imageUrl:
					"https://via.placeholder.com/400x400?text=Coral+Dress",
			},
		],
		defaultImageUrl: "https://via.placeholder.com/400x400?text=Coral+Dress",
		category: "Dresses",
	},
	{
		id: "prod_5",
		name: "Wireless Noise-Cancelling Headphones",
		description:
			"Over-ear headphones with active noise cancellation and 30hr battery life.",
		price: 199.99,
		tags: ["audio", "electronics", "travel"],
		dateAdded: new Date(2024, 4, 10).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 12,
		colors: [
			{
				name: "Black",
				hex: "#000000",
				imageUrl:
					"https://via.placeholder.com/400x400?text=Black+Headphones",
			},
			{
				name: "Silver",
				hex: "#C0C0C0",
				imageUrl:
					"https://via.placeholder.com/400x400?text=Silver+Headphones",
			},
		],
		defaultImageUrl:
			"https://via.placeholder.com/400x400?text=Black+Headphones",
		category: "Electronics",
	},
	{
		id: "prod_6",
		name: "Smart Coffee Mug",
		description: "Maintains your coffee temperature perfectly for 2 hours.",
		price: 89.5,
		tags: ["home", "gadgets", "kitchen"],
		dateAdded: new Date(2024, 3, 22).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 30,
		colors: [
			{
				name: "White",
				hex: "#FFFFFF",
				imageUrl: "https://via.placeholder.com/400x400?text=White+Mug",
			},
			{
				name: "Black",
				hex: "#000000",
				imageUrl: "https://via.placeholder.com/400x400?text=Black+Mug",
			},
		],
		defaultImageUrl: "https://via.placeholder.com/400x400?text=White+Mug",
		category: "Home & Kitchen",
	},
	{
		id: "prod_7",
		name: "Mechanical Gaming Keyboard",
		description:
			"RGB mechanical keyboard with hot-swappable blue switches.",
		price: 119.0,
		tags: ["pc", "gaming", "electronics"],
		dateAdded: new Date(2024, 2, 5).toISOString(),
		status: "COMING_SOON",
		stockQuantity: 0,
		colors: [
			{
				name: "Black",
				hex: "#000000",
				imageUrl:
					"https://via.placeholder.com/400x400?text=Black+Keyboard",
			},
		],
		defaultImageUrl:
			"https://via.placeholder.com/400x400?text=Black+Keyboard",
		category: "Electronics",
	},
];

/* ==========================================================================
 * 4. DUMMY ADMIN DATA
 * ========================================================================== */
export const DUMMY_NOTIFICATIONS: AdminNotification[] = [
	{
		id: "notif_1",
		type: "ALERT",
		message:
			"Supplier A is delayed. Warehouse X stock will be low in 3 days.",
		timestamp: new Date().toISOString(),
		read: false,
	},
	{
		id: "notif_2",
		type: "INFO",
		message: "5 new products were added to the catalog.",
		timestamp: new Date().toISOString(),
		read: false,
	},
];

export const DUMMY_CALENDAR_EVENTS: CalendarEvent[] = [
	{
		id: "evt_1",
		date: new Date(2024, 5, 15).toISOString(),
		title: "Summer Collection Launch",
		type: "LAUNCH",
		description: "Launch of the new summer line on the user storefront.",
	},
	{
		id: "evt_2",
		date: new Date(2024, 5, 20).toISOString(),
		title: "Restock Cotton Tees",
		type: "RESTOCK",
		description: "Warehouse B receiving 500 units of cotton tees.",
	},
];

/* ==========================================================================
 * 5. DUMMY ANALYTICS DATA (DETAILED)
 * ========================================================================== */

// 1. Time Series Data (Daily for a month)
export const DUMMY_SALES_TIMESERIES: SalesTimeSeriesData[] = Array.from(
	{ length: 30 },
	(_, i: number) => {
		// the first parameter is value at index,
		// and since for this array like object all values are undefined
		// so we don't pass the values of this array
		// js treats any object with a number to be array like
		// so to js this {length: 30} means an array with 30 slots
		const date = new Date(2024, 4, i + 1).toISOString().split("T")[0];
		const baseRevenue = 1000 + Math.floor(Math.random() * 500);
		const orders = 10 + Math.floor(Math.random() * 20);
		const visitors = 400 + Math.floor(Math.random() * 200);
		return {
			date,
			revenue: baseRevenue + i * 50, // Trending upwards
			orders,
			visitors,
			conversionRate: parseFloat(((orders / visitors) * 100).toFixed(2)),
		};
	},
);

// 2. Category Breakdown
export const DUMMY_CATEGORY_BREAKDOWN: CategoryBreakdownData[] = [
	{
		name: "Tops",
		salesValue: 12500,
		unitsSold: 310,
		percentageOfTotal: 42.1,
	},
	{
		name: "Bottoms",
		salesValue: 8200,
		unitsSold: 180,
		percentageOfTotal: 27.6,
	},
	{
		name: "Outerwear",
		salesValue: 4500,
		unitsSold: 45,
		percentageOfTotal: 15.2,
	},
	{
		name: "Accessories",
		salesValue: 4500,
		unitsSold: 150,
		percentageOfTotal: 15.1,
	},
];

// 3. Product Performance
export const DUMMY_PRODUCT_PERFORMANCE: ProductPerformanceData[] = [
	{
		productId: "prod_2",
		productName: "Teal Cotton Shirt",
		unitsSold: 120,
		revenueGenerated: 4798.8,
		views: 3400,
		cartAbandonmentRate: 35.5,
	},
	{
		productId: "prod_1",
		productName: "Classic White Chino Pants",
		unitsSold: 95,
		revenueGenerated: 4749.05,
		views: 2800,
		cartAbandonmentRate: 28.2,
	},
	{
		productId: "prod_4",
		productName: "Coral Summer Dress",
		unitsSold: 0,
		revenueGenerated: 0,
		views: 1500,
		cartAbandonmentRate: 100.0,
	},
	{
		productId: "prod_3",
		productName: "Winter Wool Coat",
		unitsSold: 12,
		revenueGenerated: 2399.88,
		views: 900,
		cartAbandonmentRate: 15.0,
	},
];

// 4. Customer Analytics
export const DUMMY_CUSTOMER_ANALYTICS: CustomerAnalyticsData = {
	newCustomers: 450,
	returningCustomers: 820,
	totalActiveUsers: 1270,
	trafficSources: [
		{ sourceName: "Organic Search", visitors: 5600, percentage: 45.2 },
		{ sourceName: "Social Media", visitors: 3200, percentage: 25.8 },
		{ sourceName: "Direct", visitors: 2400, percentage: 19.4 },
		{ sourceName: "Referral", visitors: 1200, percentage: 9.6 },
	],
};

// 5. Sales Funnel
export const DUMMY_FUNNEL_DATA: FunnelStageData[] = [
	{ stage: "Site Visits", count: 12000, dropOffPercentage: 0 },
	{ stage: "Product Views", count: 8500, dropOffPercentage: 29.2 },
	{ stage: "Added to Cart", count: 2100, dropOffPercentage: 75.3 },
	{ stage: "Checkout Started", count: 1400, dropOffPercentage: 33.3 },
	{ stage: "Purchased", count: 950, dropOffPercentage: 32.1 },
];

// 6. Geographic Sales
export const DUMMY_GEO_SALES: GeoSalesData[] = [
	{ region: "North America", revenue: 15400, orders: 155 },
	{ region: "Europe", revenue: 11200, orders: 120 },
	{ region: "Asia Pacific", revenue: 8600, orders: 85 },
	{ region: "Latin America", revenue: 3200, orders: 30 },
	{ region: "Middle East & Africa", revenue: 1800, orders: 15 },
];
