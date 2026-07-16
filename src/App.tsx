// src/App.tsx
import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppProvider } from "./context/app-provider";
import { useAppContext } from "./context/app-context";
import { getTheme } from "./config/theme";

import UserLayout from "./components/product-page/user-layout";
import UserHome from "./components/product-page/user-home";

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
