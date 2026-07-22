import { Routes, Route } from "react-router-dom";
import UserLayout from "../features/product/layout/user-layout";
import UserHome from "../features/product/user-home";
import AdminLayout from "../features/admin/admin-layout";
import AdminDashboard from "../features/admin/dashboard/admin-dashboard";
import ProductManager from "../features/admin/crud/product-manager";
import SupplyChainViewer from "../features/admin/supply-chain/supply-chain-viewer";
import AnalyticsPage from "../features/admin/analytics/analytics-page";
import OrderManager from "../features/admin/crud/order-manager";

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<UserLayout />}>
				<Route index element={<UserHome />} />
			</Route>
			<Route path="/admin" element={<AdminLayout />}>
				<Route index element={<AdminDashboard />} />
				<Route path="products" element={<ProductManager />} />
				<Route path="orders" element={<OrderManager />} />
				<Route path="supply-chain" element={<SupplyChainViewer />} />
				<Route path="analytics" element={<AnalyticsPage />} />
			</Route>
		</Routes>
	);
}
