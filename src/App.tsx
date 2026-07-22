// src/App.tsx
import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppProvider } from "./context/app-provider";
import { useAppContext } from "./context/app-context";
import { getTheme } from "./config/theme";

import UserLayout from "./features/product/layout/user-layout";
import UserHome from "./features/product/user-home";

import AdminLayout from "./features/admin/admin-layout";
import AdminDashboard from "./features/admin/dashboard/admin-dashboard";
import ProductManager from "./features/admin/crud/product-manager";
import SupplyChainViewer from "./features/admin/supply-chain/supply-chain-viewer";
import AnalyticsPage from "./features/admin/analytics/analytics-page";

import OrderManager from "./features/admin/crud/order-manager";

// AppContent is a separate inner component so it can read from AppContext.
// The context only becomes available INSIDE AppProvider, so AppContent must live as a child of App (which wraps AppProvider).
const AppContent = () => {
	// Consume global state to determine the current theme (light or dark)
	const { state } = useAppContext();

	// useMemo ensures getTheme() is only called again when state.theme changes.
	// Without this, a brand-new MUI theme object would be created on every single render,
	// which is expensive because MUI theme creation involves a lot of computation.
	const theme = useMemo(() => getTheme(state.theme), [state.theme]);

	return (
		// ThemeProvider injects the generated MUI theme into React's context so every
		// MUI component below it (buttons, inputs, etc.) automatically uses the correct colours and typography.
		<ThemeProvider theme={theme}>
			{/* CssBaseline acts like a CSS reset — it removes inconsistent default browser styles
			    (e.g. margin on <body>) so the app looks the same across all browsers. */}
			<CssBaseline />

			{/* BrowserRouter enables client-side routing using the browser's History API.
			    Users can navigate between pages (like /admin) without triggering a full page reload. */}
			<BrowserRouter>
				{/* Routes looks at the current URL and renders the first <Route> that matches it. */}
				<Routes>
					{/* "/" is the root path for the user-facing storefront.
					    The element prop tells React Router which component to render when this path is matched.
					    UserLayout acts as a persistent shell (e.g. with a navbar) and child routes render inside it via <Outlet>. */}
					<Route path="/" element={<UserLayout />}>
						{/* The "index" route renders when the path matches exactly "/" with nothing after it.
						    It's equivalent to writing path="" and avoids having a blank nested route. */}
						<Route index element={<UserHome />} />
					</Route>

					{/* "/admin" is the root path for the admin panel.
					    AdminLayout is the persistent shell for all admin pages (sidebar, header, etc.). */}
					<Route path="/admin" element={<AdminLayout />}>
						{/* index route: renders AdminDashboard at exactly "/admin" */}
						<Route index element={<AdminDashboard />} />

						{/* Each child path is relative to the parent "/admin", so these resolve to:
						    "/admin/products", "/admin/orders", "/admin/supply-chain", "/admin/analytics" */}
						<Route path="products" element={<ProductManager />} />
						<Route path="orders" element={<OrderManager />} />
						<Route
							path="supply-chain"
							element={<SupplyChainViewer />}
						/>
						<Route path="analytics" element={<AnalyticsPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

// App is the true root component exported and used by main.tsx.
// AppProvider wraps AppContent so that the global context (theme, state, dispatch) is available
// to AppContent and ALL of its descendant components via useAppContext().
const App = () => (
	<AppProvider>
		{" "}
		{/* sets up the global app context (state + dispatch) for the whole tree */}
		<AppContent />{" "}
		{/* reads from that context to build the theme and routing tree */}
	</AppProvider>
);

export default App;
