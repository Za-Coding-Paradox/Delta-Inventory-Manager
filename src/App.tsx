// src/App.tsx
import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppProvider } from "./context/app-provider";
import { useAppContext } from "./context/app-context";
import { getTheme } from "./config/theme";

import { AppRoutes } from "./routes";

const AppContent = () => {
	const { state } = useAppContext();
	const theme = useMemo(() => getTheme(state.theme), [state.theme]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<AppRoutes />
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
