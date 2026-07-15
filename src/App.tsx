// src/App.tsx
import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppProvider } from "./context/app-provider";
import { useAppContext } from "./context/app-context";
import { getTheme } from "./config/theme";

// Layout & Pages
import UserLayout from "./components/product-page/user-layout";
import ProductGrid from "./components/product-page/product-grid";

const AppContent = () => {
	const { state } = useAppContext();
	const theme = useMemo(() => getTheme(state.theme), [state.theme]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<UserLayout />}>
						<Route index element={<ProductGrid />} />
						{/* Future routes like /product/:id will go here */}
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
