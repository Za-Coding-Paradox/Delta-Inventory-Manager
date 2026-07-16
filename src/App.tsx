// src/App.tsx
import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppProvider } from "./context/app-provider";
import { useAppContext } from "./context/app-context";
import { getTheme } from "./config/theme";

import UserLayout from "./components/product-page/layout/user-layout";
import UserHome from "./components/product-page/user-home";

import AdminLayout from "./components/admin-page/admin-layout";
import AdminDashboard from "./components/admin-page/dashboard/admin-dashboard";
import ProductManager from "./components/admin-page/crud/product-manager";
import SupplyChainViewer from "./components/admin-page/supply-chain/supply-chain-viewer";
import AnalyticsPage from "./components/admin-page/analytics/analytics-page";

const AppContent = () => {
	const { state } = useAppContext();
	const theme = useMemo(() => getTheme(state.theme), [state.theme]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<UserLayout />}>
						<Route index element={<UserHome />} />
					</Route>
					<Route path="/admin" element={<AdminLayout />}>
						<Route index element={<AdminDashboard />} />
						<Route path="products" element={<ProductManager />} />
						<Route path="supply-chain" element={<SupplyChainViewer />} />
						<Route path="analytics" element={<AnalyticsPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

const App = () => (
	<AppProvider>
		<AppContent />
	</AppProvider>
);

export default App;
