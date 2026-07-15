// src/App.tsx
import { useMemo } from "react";
import {
	ThemeProvider,
	CssBaseline,
	Box,
	Typography,
	Button,
	Container,
	Paper,
} from "@mui/material";
import { AppProvider } from "./context/app-provider";
import { useAppContext } from "./context/app-context";
import { getTheme } from "./config/theme";

// Inner component that consumes the context
const AppContent = () => {
	const { state, dispatch } = useAppContext();

	// Generate the theme dynamically based on context state
	const theme = useMemo(() => getTheme(state.theme), [state.theme]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth="md" sx={{ mt: 8 }}>
				{/* Using standard Paper and applying widget styles via sx to avoid TS variant errors */}
				<Paper
					elevation={0}
					sx={{
						p: 4,
						textAlign: "center",
						borderRadius: "16px",
						border: (t) => `1px solid ${t.palette.divider}`,
						boxShadow: (t) =>
							t.palette.mode === "light"
								? "0px 2px 10px rgba(0, 0, 0, 0.04)"
								: "0px 2px 10px rgba(0, 0, 0, 0.25)",
					}}
				>
					<Typography variant="h3" color="primary" gutterBottom>
						App Backbone Connected
					</Typography>
					<Typography
						variant="h6"
						color="text.secondary"
						gutterBottom
					>
						Current Theme: {state.theme.toUpperCase()}
					</Typography>

					<Button
						variant="contained"
						color="secondary"
						onClick={() => dispatch({ type: "TOGGLE_THEME" })}
						sx={{ mb: 4 }}
					>
						Toggle Theme
					</Button>

					<Box sx={{ textAlign: "left", mt: 4 }}>
						<Typography variant="h5" gutterBottom>
							Loaded Products ({state.products.length}):
						</Typography>
						{state.products.map((p) => (
							<Box
								key={p.id}
								sx={{
									mb: 1,
									p: 1,
									border: 1,
									borderColor: "divider",
									borderRadius: 1,
								}}
							>
								<Typography
									variant="body1"
									sx={{ fontWeight: 600 }}
								>
									{p.name} - ${p.price}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									Tags: {p.tags.join(", ")}
								</Typography>
							</Box>
						))}
					</Box>
				</Paper>
			</Container>
		</ThemeProvider>
	);
};

// Root component wraps everything in the global AppProvider
const App = () => (
	<AppProvider>
		<AppContent />
	</AppProvider>
);

export default App;
