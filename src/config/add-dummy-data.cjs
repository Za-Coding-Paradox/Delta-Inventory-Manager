// Temporary script to append DUMMY_ORDERS and DUMMY_REVIEWS to constants.ts
const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, 'constants.ts');
let content = fs.readFileSync(constantsPath, 'utf8');

const appendix = `

/* ==========================================================================
 * 6. DUMMY ORDERS DATA (Seeded historical orders — drives analytics)
 * ========================================================================== */

// Helper: create a date N days ago as ISO string
function daysAgo(n: number): string {
\tconst d = new Date();
\td.setDate(d.getDate() - n);
\treturn d.toISOString();
}

export const DUMMY_ORDERS: Order[] = [
\t{
\t\tid: "order_001",
\t\titems: [
\t\t\t{ productId: "prod_1", productName: "Classic White Chino Pants", selectedColorName: "White", quantity: 2, priceAtOrder: 49.99 },
\t\t\t{ productId: "prod_2", productName: "Teal Cotton Shirt", selectedColorName: "Teal", quantity: 1, priceAtOrder: 39.99 },
\t\t],
\t\ttotal: 139.97, deliveryType: "standard", deliveryDate: daysAgo(-5), timestamp: daysAgo(28), status: "DELIVERED", customerName: "Alex Johnson",
\t},
\t{
\t\tid: "order_002",
\t\titems: [{ productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", selectedColorName: "Black", quantity: 1, priceAtOrder: 199.99 }],
\t\ttotal: 199.99, deliveryType: "express", deliveryDate: daysAgo(-2), timestamp: daysAgo(25), status: "DELIVERED", customerName: "Sarah Chen",
\t},
\t{
\t\tid: "order_003",
\t\titems: [{ productId: "prod_6", productName: "Smart Coffee Mug", selectedColorName: "White", quantity: 2, priceAtOrder: 89.50 }],
\t\ttotal: 179.00, deliveryType: "standard", deliveryDate: daysAgo(-3), timestamp: daysAgo(22), status: "DELIVERED", customerName: "Marcus Williams",
\t},
\t{
\t\tid: "order_004",
\t\titems: [{ productId: "prod_2", productName: "Teal Cotton Shirt", selectedColorName: "Black", quantity: 3, priceAtOrder: 39.99 }],
\t\ttotal: 119.97, deliveryType: "standard", deliveryDate: daysAgo(-1), timestamp: daysAgo(20), status: "DELIVERED", customerName: "Emma Davis",
\t},
\t{
\t\tid: "order_005",
\t\titems: [
\t\t\t{ productId: "prod_1", productName: "Classic White Chino Pants", selectedColorName: "Navy", quantity: 1, priceAtOrder: 49.99 },
\t\t\t{ productId: "prod_6", productName: "Smart Coffee Mug", selectedColorName: "Black", quantity: 1, priceAtOrder: 89.50 },
\t\t],
\t\ttotal: 139.49, deliveryType: "express", deliveryDate: daysAgo(0), timestamp: daysAgo(18), status: "DELIVERED", customerName: "James Park",
\t},
\t{
\t\tid: "order_006",
\t\titems: [{ productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", selectedColorName: "Silver", quantity: 1, priceAtOrder: 199.99 }],
\t\ttotal: 199.99, deliveryType: "express", deliveryDate: daysAgo(1), timestamp: daysAgo(15), status: "SHIPPED", customerName: "Olivia Martinez",
\t},
\t{
\t\tid: "order_007",
\t\titems: [
\t\t\t{ productId: "prod_2", productName: "Teal Cotton Shirt", selectedColorName: "Teal", quantity: 2, priceAtOrder: 39.99 },
\t\t\t{ productId: "prod_1", productName: "Classic White Chino Pants", selectedColorName: "White", quantity: 1, priceAtOrder: 49.99 },
\t\t],
\t\ttotal: 129.97, deliveryType: "standard", deliveryDate: daysAgo(3), timestamp: daysAgo(12), status: "SHIPPED", customerName: "Noah Kim",
\t},
\t{
\t\tid: "order_008",
\t\titems: [{ productId: "prod_6", productName: "Smart Coffee Mug", selectedColorName: "White", quantity: 1, priceAtOrder: 89.50 }],
\t\ttotal: 89.50, deliveryType: "standard", deliveryDate: daysAgo(4), timestamp: daysAgo(10), status: "PROCESSING", customerName: "Ava Thompson",
\t},
\t{
\t\tid: "order_009",
\t\titems: [
\t\t\t{ productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", selectedColorName: "Black", quantity: 1, priceAtOrder: 199.99 },
\t\t\t{ productId: "prod_2", productName: "Teal Cotton Shirt", selectedColorName: "Teal", quantity: 1, priceAtOrder: 39.99 },
\t\t],
\t\ttotal: 239.98, deliveryType: "express", deliveryDate: daysAgo(2), timestamp: daysAgo(8), status: "PROCESSING", customerName: "Liam Garcia",
\t},
\t{
\t\tid: "order_010",
\t\titems: [{ productId: "prod_1", productName: "Classic White Chino Pants", selectedColorName: "White", quantity: 2, priceAtOrder: 49.99 }],
\t\ttotal: 99.98, deliveryType: "standard", deliveryDate: daysAgo(6), timestamp: daysAgo(6), status: "PENDING", customerName: "Mia Wilson",
\t},
\t{
\t\tid: "order_011",
\t\titems: [{ productId: "prod_6", productName: "Smart Coffee Mug", selectedColorName: "Black", quantity: 3, priceAtOrder: 89.50 }],
\t\ttotal: 268.50, deliveryType: "express", deliveryDate: daysAgo(5), timestamp: daysAgo(4), status: "PENDING", customerName: "Ethan Robinson",
\t},
\t{
\t\tid: "order_012",
\t\titems: [
\t\t\t{ productId: "prod_2", productName: "Teal Cotton Shirt", selectedColorName: "Black", quantity: 1, priceAtOrder: 39.99 },
\t\t\t{ productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", selectedColorName: "Silver", quantity: 1, priceAtOrder: 199.99 },
\t\t],
\t\ttotal: 239.98, deliveryType: "standard", deliveryDate: daysAgo(7), timestamp: daysAgo(3), status: "PENDING", customerName: "Isabella Clark",
\t},
\t{
\t\tid: "order_013",
\t\titems: [{ productId: "prod_1", productName: "Classic White Chino Pants", selectedColorName: "Navy", quantity: 1, priceAtOrder: 49.99 }],
\t\ttotal: 49.99, deliveryType: "standard", deliveryDate: daysAgo(8), timestamp: daysAgo(2), status: "PENDING", customerName: "Aiden Lewis",
\t},
\t{
\t\tid: "order_014",
\t\titems: [{ productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", selectedColorName: "Black", quantity: 2, priceAtOrder: 199.99 }],
\t\ttotal: 399.98, deliveryType: "express", deliveryDate: daysAgo(0), timestamp: daysAgo(1), status: "PROCESSING", customerName: "Charlotte Hall",
\t},
\t{
\t\tid: "order_015",
\t\titems: [
\t\t\t{ productId: "prod_6", productName: "Smart Coffee Mug", selectedColorName: "White", quantity: 2, priceAtOrder: 89.50 },
\t\t\t{ productId: "prod_2", productName: "Teal Cotton Shirt", selectedColorName: "Teal", quantity: 2, priceAtOrder: 39.99 },
\t\t],
\t\ttotal: 259.00, deliveryType: "standard", deliveryDate: daysAgo(9), timestamp: daysAgo(26), status: "DELIVERED", customerName: "Lucas Young",
\t},
\t{
\t\tid: "order_016",
\t\titems: [{ productId: "prod_1", productName: "Classic White Chino Pants", selectedColorName: "White", quantity: 1, priceAtOrder: 49.99 }],
\t\ttotal: 49.99, deliveryType: "standard", deliveryDate: daysAgo(0), timestamp: daysAgo(24), status: "CANCELLED", customerName: "Harper Scott",
\t},
\t{
\t\tid: "order_017",
\t\titems: [{ productId: "prod_2", productName: "Teal Cotton Shirt", selectedColorName: "Teal", quantity: 4, priceAtOrder: 39.99 }],
\t\ttotal: 159.96, deliveryType: "standard", deliveryDate: daysAgo(-4), timestamp: daysAgo(21), status: "DELIVERED", customerName: "Benjamin Allen",
\t},
\t{
\t\tid: "order_018",
\t\titems: [
\t\t\t{ productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", selectedColorName: "Silver", quantity: 1, priceAtOrder: 199.99 },
\t\t\t{ productId: "prod_6", productName: "Smart Coffee Mug", selectedColorName: "Black", quantity: 1, priceAtOrder: 89.50 },
\t\t],
\t\ttotal: 289.49, deliveryType: "express", deliveryDate: daysAgo(-1), timestamp: daysAgo(16), status: "DELIVERED", customerName: "Amelia Wright",
\t},
\t{
\t\tid: "order_019",
\t\titems: [{ productId: "prod_1", productName: "Classic White Chino Pants", selectedColorName: "Navy", quantity: 2, priceAtOrder: 49.99 }],
\t\ttotal: 99.98, deliveryType: "standard", deliveryDate: daysAgo(2), timestamp: daysAgo(9), status: "SHIPPED", customerName: "Henry Turner",
\t},
\t{
\t\tid: "order_020",
\t\titems: [
\t\t\t{ productId: "prod_6", productName: "Smart Coffee Mug", selectedColorName: "White", quantity: 1, priceAtOrder: 89.50 },
\t\t\t{ productId: "prod_2", productName: "Teal Cotton Shirt", selectedColorName: "Black", quantity: 2, priceAtOrder: 39.99 },
\t\t],
\t\ttotal: 169.48, deliveryType: "express", deliveryDate: daysAgo(1), timestamp: daysAgo(5), status: "PROCESSING", customerName: "Evelyn Mitchell",
\t},
];

/* ==========================================================================
 * 7. DUMMY REVIEWS DATA (Seeded product reviews — drives ratings & analytics)
 * ========================================================================== */

export const DUMMY_REVIEWS: Review[] = [
\t{ id: "rev_001", productId: "prod_1", productName: "Classic White Chino Pants", rating: 5, comment: "Perfect fit and great quality!", customerName: "Alex Johnson", timestamp: daysAgo(27) },
\t{ id: "rev_002", productId: "prod_2", productName: "Teal Cotton Shirt", rating: 4, comment: "Love the color, very comfortable.", customerName: "Emma Davis", timestamp: daysAgo(25) },
\t{ id: "rev_003", productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", rating: 5, comment: "Excellent sound quality. Best headphones owned.", customerName: "Sarah Chen", timestamp: daysAgo(24) },
\t{ id: "rev_004", productId: "prod_6", productName: "Smart Coffee Mug", rating: 4, comment: "Keeps my coffee hot for hours. Very handy!", customerName: "Marcus Williams", timestamp: daysAgo(21) },
\t{ id: "rev_005", productId: "prod_1", productName: "Classic White Chino Pants", rating: 5, comment: "Ordered twice already. Absolutely love these.", customerName: "James Park", timestamp: daysAgo(19) },
\t{ id: "rev_006", productId: "prod_2", productName: "Teal Cotton Shirt", rating: 5, comment: "Great for the summer. Pairs with everything.", customerName: "Lucas Young", timestamp: daysAgo(18) },
\t{ id: "rev_007", productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", rating: 4, comment: "Good noise cancellation. Battery life is impressive.", customerName: "Olivia Martinez", timestamp: daysAgo(15) },
\t{ id: "rev_008", productId: "prod_6", productName: "Smart Coffee Mug", rating: 5, comment: "The perfect desk companion. Worth every penny.", customerName: "Ava Thompson", timestamp: daysAgo(12) },
\t{ id: "rev_009", productId: "prod_2", productName: "Teal Cotton Shirt", rating: 4, comment: "Good quality fabric, true to size.", customerName: "Noah Kim", timestamp: daysAgo(10) },
\t{ id: "rev_010", productId: "prod_1", productName: "Classic White Chino Pants", rating: 4, comment: "Comfortable and stylish. Great for casual wear.", customerName: "Benjamin Allen", timestamp: daysAgo(8) },
\t{ id: "rev_011", productId: "prod_5", productName: "Wireless Noise-Cancelling Headphones", rating: 5, comment: "Game changer for working from home.", customerName: "Amelia Wright", timestamp: daysAgo(5) },
\t{ id: "rev_012", productId: "prod_6", productName: "Smart Coffee Mug", rating: 4, comment: "Solid product. Would recommend.", customerName: "Liam Garcia", timestamp: daysAgo(2) },
];
`;

fs.writeFileSync(constantsPath, content + appendix, 'utf8');
console.log('Successfully appended DUMMY_ORDERS and DUMMY_REVIEWS to constants.ts');
console.log('New line count:', (content + appendix).split('\n').length);
