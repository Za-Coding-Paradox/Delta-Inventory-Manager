// src/config/theme.ts
import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

// Base typography and overrides shared between light and dark
const sharedConfig: ThemeOptions = {
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h1: { fontWeight: 700, letterSpacing: "-1.5px" },
		h2: { fontWeight: 700, letterSpacing: "-1px" },
		h3: { fontWeight: 700, letterSpacing: "-0.5px" },
		h4: { fontWeight: 600 },
		h5: { fontWeight: 600 },
		h6: { fontWeight: 600 },
		button: { textTransform: "none", fontWeight: 600 },
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: "12px",
					boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
					border: "none",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: "8px",
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: "16px",
				},
			},
		},
	},
};

export const getTheme = (mode: "light" | "dark") => {
	const palette =
		mode === "light"
			? {
					primary: { main: "#3A6B88" }, // Muted Teal/Blue
					secondary: { main: "#D88C5A" }, // Warm Terracotta
					background: {
						default: "#F9F9F9", // Off-white
						paper: "#FFFFFF",
					},
					text: {
						primary: "#1A1A1A",
						secondary: "#555555",
					},
				}
			: {
					primary: { main: "#82B1D4" }, // Brighter Teal
					secondary: { main: "#FFAB91" }, // Soft Coral
					background: {
						default: "#121212", // Deep Dark
						paper: "#1E1E1E", // Dark Paper
					},
					text: {
						primary: "#F5F5F5",
						secondary: "#B0B0B0",
					},
				};

	return createTheme({
		...sharedConfig,
		palette: {
			mode,
			...palette,
		},
	});
};
