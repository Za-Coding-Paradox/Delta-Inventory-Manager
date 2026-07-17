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
	SCNode,
	SCEdge,
	Message,
	Order,
	Review,
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
	ORDERS: "ecom_orders",
	REVIEWS: "ecom_reviews",
	MESSAGES: "ecom_messages",
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
const BASE_PRODUCTS: Product[] = [
	{
		id: "prod_1",
		name: "Aura Heavyweight Crewneck",
		description: "Premium heavyweight organic cotton sweatshirt with a soft brushed fleece interior. Relaxed fit with dropped shoulders.",
		price: 79.99,
		tags: ["sweatshirt", "hoodie", "cozy"],
		dateAdded: new Date(2024, 2, 15).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 32,
		colors: [
			{
				name: "Sage Green",
				hex: "#7D8C7B",
				imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
			},
			{
				name: "Charcoal",
				hex: "#363636",
				imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop",
			},
		],
		defaultImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
		category: "Tops",
	},
	{
		id: "prod_2",
		name: "Minimalist Supima Tee",
		description: "A premium wardrobe staple made from ultra-soft long-staple Supima cotton. Classic fit, durable ribbed crew neck, and breathable weave.",
		price: 29.99,
		tags: ["shirts", "summer", "casual"],
		dateAdded: new Date(2024, 3, 5).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 45,
		colors: [
			{
				name: "Off-White",
				hex: "#F5F2EB",
				imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
			},
			{
				name: "Jet Black",
				hex: "#111111",
				imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
			},
		],
		defaultImageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
		category: "Tops",
	},
	{
		id: "prod_3",
		name: "Classic Tailored Chinos",
		description: "Tailored chinos cut from mid-weight stretch twill cotton. Perfect transition piece from casual workdays to weekend getaways.",
		price: 69.99,
		tags: ["pants", "chinos", "classic"],
		dateAdded: new Date(2024, 1, 10).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 28,
		colors: [
			{
				name: "Khaki",
				hex: "#C2B280",
				imageUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop",
			},
			{
				name: "Olive",
				hex: "#556B2F",
				imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
			},
		],
		defaultImageUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop",
		category: "Bottoms",
	},
	{
		id: "prod_4",
		name: "Relaxed Corduroy Overshirt",
		description: "Classic vintage-inspired button-up shirt crafted from soft 12-wale corduroy cotton. Features double chest pockets.",
		price: 59.99,
		tags: ["shirts", "outerwear", "casual"],
		dateAdded: new Date(2024, 4, 1).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 18,
		colors: [
			{
				name: "Tan",
				hex: "#D2B48C",
				imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
			},
			{
				name: "Rust",
				hex: "#A0522D",
				imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",
			},
		],
		defaultImageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
		category: "Tops",
	},
	{
		id: "prod_5",
		name: "Urban Ripstop Cargo Pants",
		description: "Utility cargo pants designed with tough ripstop fabric, multiple secure snap pockets, and adjustable ankle cuffs for customizable styling.",
		price: 89.99,
		tags: ["pants", "cargo", "streetwear"],
		dateAdded: new Date(2024, 4, 10).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 15,
		colors: [
			{
				name: "Black",
				hex: "#1E1E1E",
				imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
			},
		],
		defaultImageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
		category: "Bottoms",
	},
	{
		id: "prod_6",
		name: "Activewear Stretch Joggers",
		description: "Flexible, moisture-wicking stretch joggers perfect for working out or lounging around. Complete with secure zipper pockets.",
		price: 49.5,
		tags: ["activewear", "joggers", "cozy"],
		dateAdded: new Date(2024, 3, 22).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 30,
		colors: [
			{
				name: "Grey",
				hex: "#808080",
				imageUrl: "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=600&auto=format&fit=crop",
			},
		],
		defaultImageUrl: "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=600&auto=format&fit=crop",
		category: "Bottoms",
	},
	{
		id: "prod_7",
		name: "Vintage Denim Trucker Jacket",
		description: "Time-tested classic denim jacket with copper hardware and single-needle topstitching. Designed to break in beautifully.",
		price: 99.0,
		tags: ["jacket", "denim", "outerwear"],
		dateAdded: new Date(2024, 2, 5).toISOString(),
		status: "IN_STOCK",
		stockQuantity: 12,
		colors: [
			{
				name: "Classic Blue",
				hex: "#4682B4",
				imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
			},
		],
		defaultImageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
		category: "Outerwear",
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

/* ==========================================================================
 * 7. DUMMY SUPPLY CHAIN DATA
 * ========================================================================== */
export const DUMMY_SUPPLY_CHAIN_NODES: SCNode[] = [
	{
		id: "sup_1",
		type: "supplierNode",
		position: { x: 50, y: 80 },
		data: {
			label: "Fabric Mills Co.",
			type: "SUPPLIER",
			status: "NORMAL",
			details: "Primary raw material supplier — cotton & polyester blends",
			stockLevel: 85,
			capacity: 100,
		},
	},
	{
		id: "sup_2",
		type: "supplierNode",
		position: { x: 50, y: 260 },
		data: {
			label: "Global Textiles Ltd.",
			type: "SUPPLIER",
			status: "DELAYED",
			details: "Secondary supplier — specialty fabrics. Shipment delayed 3 days",
			stockLevel: 40,
			capacity: 100,
		},
	},
	{
		id: "sup_3",
		type: "supplierNode",
		position: { x: 50, y: 440 },
		data: {
			label: "QuickParts Accessories",
			type: "SUPPLIER",
			status: "CRITICAL",
			details: "Buttons, zippers & hardware. Critical stock shortage",
			stockLevel: 12,
			capacity: 100,
		},
	},
	{
		id: "wh_1",
		type: "warehouseNode",
		position: { x: 380, y: 140 },
		data: {
			label: "Warehouse Alpha",
			type: "WAREHOUSE",
			status: "NORMAL",
			details: "Main processing & storage hub — East district",
			stockLevel: 78,
			capacity: 100,
		},
	},
	{
		id: "wh_2",
		type: "warehouseNode",
		position: { x: 380, y: 360 },
		data: {
			label: "Warehouse Beta",
			type: "WAREHOUSE",
			status: "DELAYED",
			details: "Secondary warehouse — West district. Receiving backlog",
			stockLevel: 55,
			capacity: 100,
		},
	},
	{
		id: "store_1",
		type: "storeNode",
		position: { x: 700, y: 80 },
		data: {
			label: "Downtown Flagship",
			type: "STORE",
			status: "NORMAL",
			details: "High-volume retail location",
			stockLevel: 82,
			capacity: 100,
		},
	},
	{
		id: "store_2",
		type: "storeNode",
		position: { x: 700, y: 240 },
		data: {
			label: "Mall Outlet",
			type: "STORE",
			status: "NORMAL",
			details: "Mid-size mall location",
			stockLevel: 67,
			capacity: 100,
		},
	},
	{
		id: "store_3",
		type: "storeNode",
		position: { x: 700, y: 400 },
		data: {
			label: "Online Fulfillment",
			type: "STORE",
			status: "CRITICAL",
			details: "E-commerce fulfillment center — running critically low",
			stockLevel: 18,
			capacity: 100,
		},
	},
];

export const DUMMY_SUPPLY_CHAIN_EDGES: SCEdge[] = [
	{
		id: "e_sup1_wh1",
		source: "sup_1",
		target: "wh_1",
		animated: true,
		data: { transitTime: "2 days", isAnimated: true },
		label: "2d transit",
	},
	{
		id: "e_sup2_wh1",
		source: "sup_2",
		target: "wh_1",
		animated: false,
		data: { transitTime: "4 days", isAnimated: false },
		label: "4d transit",
	},
	{
		id: "e_sup2_wh2",
		source: "sup_2",
		target: "wh_2",
		animated: false,
		data: { transitTime: "3 days", isAnimated: false },
		label: "3d transit",
	},
	{
		id: "e_sup3_wh2",
		source: "sup_3",
		target: "wh_2",
		animated: false,
		data: { transitTime: "5 days", isAnimated: false },
		label: "5d transit",
	},
	{
		id: "e_wh1_store1",
		source: "wh_1",
		target: "store_1",
		animated: true,
		data: { transitTime: "1 day", isAnimated: true },
		label: "1d transit",
	},
	{
		id: "e_wh1_store2",
		source: "wh_1",
		target: "store_2",
		animated: true,
		data: { transitTime: "1 day", isAnimated: true },
		label: "1d transit",
	},
	{
		id: "e_wh2_store2",
		source: "wh_2",
		target: "store_2",
		animated: false,
		data: { transitTime: "2 days", isAnimated: false },
		label: "2d transit",
	},
	{
		id: "e_wh2_store3",
		source: "wh_2",
		target: "store_3",
		animated: false,
		data: { transitTime: "1 day", isAnimated: false },
		label: "1d transit",
	},
];

/* ==========================================================================
 * 5. DUMMY MESSAGES
 * ========================================================================== */
export const DUMMY_MESSAGES: Message[] = [
	{
		id: "msg_1",
		sender: "Supplier Alpha",
		content: "We have an update regarding the shipment schedule for the upcoming batch of Winter Coats.",
		timestamp: new Date().toISOString(),
		read: false,
	},
	{
		id: "msg_2",
		sender: "Logistics Team",
		content: "The delivery truck for the downtown flagship store is slightly delayed due to weather.",
		timestamp: new Date(Date.now() - 3600000).toISOString(),
		read: true,
	},
];


/* ==========================================================================
 * 6. DUMMY ORDERS DATA (Seeded historical orders — drives analytics)
 * This data acts as the historical database that powers the admin dashboard charts.
 * Changing this will directly affect the Recharts components' output.
 * ========================================================================== */

// Helper: create a date N days ago as ISO string
function daysAgo(n: number): string {
	const d = new Date();
	d.setDate(d.getDate() - n);
	return d.toISOString();
}

export const DUMMY_ORDERS: Order[] = [
	{
		id: "order_001",
		items: [
			{ productId: "prod_1", productName: "Aura Heavyweight Crewneck", selectedColorName: "Sage Green", quantity: 1, priceAtOrder: 79.99 },
			{ productId: "prod_2", productName: "Minimalist Supima Tee", selectedColorName: "Off-White", quantity: 2, priceAtOrder: 29.99 },
		],
		total: 139.97, deliveryType: "standard", deliveryDate: daysAgo(-5), timestamp: daysAgo(28), status: "DELIVERED", customerName: "Alex Johnson",
	},
	{
		id: "order_002",
		items: [{ productId: "prod_5", productName: "Urban Ripstop Cargo Pants", selectedColorName: "Black", quantity: 1, priceAtOrder: 89.99 }],
		total: 89.99, deliveryType: "express", deliveryDate: daysAgo(-2), timestamp: daysAgo(25), status: "DELIVERED", customerName: "Sarah Chen",
	},
	{
		id: "order_003",
		items: [{ productId: "prod_3", productName: "Classic Tailored Chinos", selectedColorName: "Khaki", quantity: 2, priceAtOrder: 69.99 }],
		total: 139.98, deliveryType: "standard", deliveryDate: daysAgo(-3), timestamp: daysAgo(22), status: "CANCELLED", customerName: "Marcus Williams",
	},
	{
		id: "order_004",
		items: [{ productId: "prod_2", productName: "Minimalist Supima Tee", selectedColorName: "Jet Black", quantity: 3, priceAtOrder: 29.99 }],
		total: 89.97, deliveryType: "standard", deliveryDate: daysAgo(-1), timestamp: daysAgo(20), status: "DELIVERED", customerName: "Emma Davis",
	},
	{
		id: "order_005",
		items: [
			{ productId: "prod_1", productName: "Aura Heavyweight Crewneck", selectedColorName: "Charcoal", quantity: 1, priceAtOrder: 79.99 },
			{ productId: "prod_4", productName: "Relaxed Corduroy Overshirt", selectedColorName: "Tan", quantity: 1, priceAtOrder: 59.99 },
		],
		total: 139.98, deliveryType: "express", deliveryDate: daysAgo(0), timestamp: daysAgo(17), status: "DELIVERED", customerName: "James Park",
	},
	{
		id: "order_006",
		items: [{ productId: "prod_5", productName: "Urban Ripstop Cargo Pants", selectedColorName: "Black", quantity: 1, priceAtOrder: 89.99 }],
		total: 89.99, deliveryType: "express", deliveryDate: daysAgo(1), timestamp: daysAgo(14), status: "SHIPPED", customerName: "Olivia Martinez",
	},
	{
		id: "order_007",
		items: [
			{ productId: "prod_2", productName: "Minimalist Supima Tee", selectedColorName: "Off-White", quantity: 2, priceAtOrder: 29.99 },
			{ productId: "prod_3", productName: "Classic Tailored Chinos", selectedColorName: "Olive", quantity: 1, priceAtOrder: 69.99 },
		],
		total: 129.97, deliveryType: "standard", deliveryDate: daysAgo(3), timestamp: daysAgo(11), status: "CANCELLED", customerName: "Noah Kim",
	},
	{
		id: "order_008",
		items: [{ productId: "prod_4", productName: "Relaxed Corduroy Overshirt", selectedColorName: "Rust", quantity: 1, priceAtOrder: 59.99 }],
		total: 59.99, deliveryType: "standard", deliveryDate: daysAgo(4), timestamp: daysAgo(8), status: "PROCESSING", customerName: "Ava Thompson",
	},
	{
		id: "order_009",
		items: [
			{ productId: "prod_1", productName: "Aura Heavyweight Crewneck", selectedColorName: "Sage Green", quantity: 1, priceAtOrder: 79.99 },
			{ productId: "prod_2", productName: "Minimalist Supima Tee", selectedColorName: "Off-White", quantity: 1, priceAtOrder: 29.99 },
		],
		total: 109.98, deliveryType: "express", deliveryDate: daysAgo(2), timestamp: daysAgo(5), status: "PROCESSING", customerName: "Liam Garcia",
	},
	{
		id: "order_010",
		items: [{ productId: "prod_3", productName: "Classic Tailored Chinos", selectedColorName: "Khaki", quantity: 2, priceAtOrder: 69.99 }],
		total: 139.98, deliveryType: "standard", deliveryDate: daysAgo(6), timestamp: daysAgo(2), status: "PENDING", customerName: "Mia Wilson",
	},
];

const EXTRA_PRODUCTS_SEEDS = [
	{ name: "Essential Knit Polo", category: "Tops", tags: ["knit", "polo", "classic"], price: 49.99, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop" },
	{ name: "Streetwear Canvas Cap", category: "Accessories", tags: ["cap", "streetwear", "hat"], price: 24.99, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop" },
	{ name: "Wool Blend Beanie", category: "Accessories", tags: ["beanie", "winter", "warm"], price: 19.99, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=600&auto=format&fit=crop" },
	{ name: "Modern Denim Jeans", category: "Bottoms", tags: ["denim", "jeans", "slim"], price: 79.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop" },
	{ name: "Waterproof Windbreaker", category: "Outerwear", tags: ["windbreaker", "jacket", "sporty"], price: 89.99, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop" },
	{ name: "Athletic Compression Shorts", category: "Activewear", tags: ["shorts", "gym", "fit"], price: 34.99, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop" },
	{ name: "Luxe Leather Chelsea Boots", category: "Footwear", tags: ["boots", "leather", "classic"], price: 159.99, image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=600&auto=format&fit=crop" },
	{ name: "Heritage Canvas Tote Bag", category: "Accessories", tags: ["tote", "bag", "canvas"], price: 29.99, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop" },
	{ name: "Relaxed Linen Pants", category: "Bottoms", tags: ["linen", "summer", "relax"], price: 54.99, image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=600&auto=format&fit=crop" },
	{ name: "Sherpa Lined Fleece Jacket", category: "Outerwear", tags: ["fleece", "jacket", "winter"], price: 119.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" },
	{ name: "Minimalist Leather Belt", category: "Accessories", tags: ["belt", "leather", "classic"], price: 39.99, image: "https://images.unsplash.com/photo-1624222247344-550fb8ecf7db?q=80&w=600&auto=format&fit=crop" },
	{ name: "Classic Oxford Cotton Shirt", category: "Tops", tags: ["shirt", "oxford", "formal"], price: 44.99, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600&auto=format&fit=crop" },
	{ name: "Tech Knit Performance Socks", category: "Accessories", tags: ["socks", "tech", "activewear"], price: 14.99, image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=600&auto=format&fit=crop" },
	{ name: "Lightweight Run Tee", category: "Activewear", tags: ["tee", "running", "sporty"], price: 39.99, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop" },
	{ name: "Modern Slim-Fit Joggers", category: "Activewear", tags: ["joggers", "comfort", "casual"], price: 59.99, image: "https://images.unsplash.com/photo-1517438476312-10d79c09b46d?q=80&w=600&auto=format&fit=crop" },
	{ name: "Double-Breasted Trench Coat", category: "Outerwear", tags: ["trench", "coat", "classic"], price: 179.99, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop" },
	{ name: "Retro Leather Sneakers", category: "Footwear", tags: ["sneakers", "retro", "leather"], price: 99.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop" },
];

const generateMoreProducts = (count: number): Product[] => {
	const products: Product[] = [];
	for (let i = 0; i < count; i++) {
		const seed = EXTRA_PRODUCTS_SEEDS[i % EXTRA_PRODUCTS_SEEDS.length];
		const variantNum = Math.floor(i / EXTRA_PRODUCTS_SEEDS.length) + 1;
		const id = `prod_${8 + i}`;
		const name = variantNum > 1 ? `${seed.name} (V${variantNum})` : seed.name;
		const priceOffset = ((i * 7) % 15) - 7;
		const price = Math.max(12.99, parseFloat((seed.price + priceOffset).toFixed(2)));
		const stockQuantity = ((i * 13) % 45) + 5;
		
		products.push({
			id,
			name,
			description: `High-quality ${seed.name.toLowerCase()} featuring premium detailing and styled for active daily wear. Crafted using durable cotton blends.`,
			price,
			tags: [...seed.tags, "casual", "aura"],
			dateAdded: new Date(2024, 1, 1 + (i % 28)).toISOString(),
			status: "IN_STOCK",
			stockQuantity,
			colors: [
				{ name: "Default", hex: "#7F7F7F", imageUrl: seed.image }
			],
			defaultImageUrl: seed.image,
			category: seed.category,
		});
	}
	return products;
};

export const DUMMY_PRODUCTS: Product[] = [
	...BASE_PRODUCTS,
	...generateMoreProducts(43)
];

/* ==========================================================================
 * 7. DUMMY REVIEWS DATA (Seeded product reviews — drives ratings & analytics)
 * ========================================================================== */

export const DUMMY_REVIEWS: Review[] = [
	{ id: "rev_001", productId: "prod_1", productName: "Classic White Chino Pants", rating: 5, comment: "Perfect fit and great quality!", customerName: "Alex Johnson", timestamp: daysAgo(27) },
	{ id: "rev_002", productId: "prod_2", productName: "Teal Cotton Shirt", rating: 4, comment: "Love the color, very comfortable.", customerName: "Emma Davis", timestamp: daysAgo(25) },
	{ id: "rev_003", productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", rating: 5, comment: "Excellent sound quality. Best headphones owned.", customerName: "Sarah Chen", timestamp: daysAgo(24) },
	{ id: "rev_004", productId: "prod_6", productName: "Smart Coffee Mug", rating: 4, comment: "Keeps my coffee hot for hours. Very handy!", customerName: "Marcus Williams", timestamp: daysAgo(21) },
	{ id: "rev_005", productId: "prod_1", productName: "Classic White Chino Pants", rating: 5, comment: "Ordered twice already. Absolutely love these.", customerName: "James Park", timestamp: daysAgo(19) },
	{ id: "rev_006", productId: "prod_2", productName: "Teal Cotton Shirt", rating: 5, comment: "Great for the summer. Pairs with everything.", customerName: "Lucas Young", timestamp: daysAgo(18) },
	{ id: "rev_007", productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", rating: 4, comment: "Good noise cancellation. Battery life is impressive.", customerName: "Olivia Martinez", timestamp: daysAgo(15) },
	{ id: "rev_008", productId: "prod_6", productName: "Smart Coffee Mug", rating: 5, comment: "The perfect desk companion. Worth every penny.", customerName: "Ava Thompson", timestamp: daysAgo(12) },
	{ id: "rev_009", productId: "prod_2", productName: "Teal Cotton Shirt", rating: 4, comment: "Good quality fabric, true to size.", customerName: "Noah Kim", timestamp: daysAgo(10) },
	{ id: "rev_010", productId: "prod_1", productName: "Classic White Chino Pants", rating: 4, comment: "Comfortable and stylish. Great for casual wear.", customerName: "Benjamin Allen", timestamp: daysAgo(8) },
	{ id: "rev_011", productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", rating: 5, comment: "Game changer for working from home.", customerName: "Amelia Wright", timestamp: daysAgo(5) },
	{ id: "rev_012", productId: "prod_6", productName: "Smart Coffee Mug", rating: 4, comment: "Solid product. Would recommend.", customerName: "Liam Garcia", timestamp: daysAgo(2) },
];
