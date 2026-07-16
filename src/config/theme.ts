// src/config/theme.ts
import { createTheme, alpha } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

/* ==========================================================================
 * 1. CUSTOM CHART COLORS (For Recharts) — Monochrome Greyscale Spectrum
 * ========================================================================== */
export const CHART_COLORS = [
	"#111111", // Near-black
	"#555555", // Dark grey
	"#888888", // Mid grey
	"#AAAAAA", // Light grey
	"#CCCCCC", // Pale grey
	"#E0E0E0", // Off-white grey
];

/* ==========================================================================
 * 2. SHARED TYPOGRAPHY
 * ========================================================================== */
const sharedTypography: ThemeOptions["typography"] = {
	fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
	h1: { fontWeight: 800, letterSpacing: "-2px", fontSize: "3.5rem" },
	h2: { fontWeight: 800, letterSpacing: "-1.5px", fontSize: "2.75rem" },
	h3: { fontWeight: 700, letterSpacing: "-1px", fontSize: "2.25rem" },
	h4: { fontWeight: 700, letterSpacing: "-0.5px", fontSize: "1.75rem" },
	h5: { fontWeight: 600, fontSize: "1.5rem" },
	h6: { fontWeight: 600, fontSize: "1.25rem" },
	button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.3px" },
	body1: { fontSize: "1rem", lineHeight: 1.6 },
	body2: { fontSize: "0.875rem", lineHeight: 1.5 },
};

/* ==========================================================================
 * 3. THEME GENERATOR
 * ========================================================================== */
export const getTheme = (mode: "light" | "dark") => {
	const palette =
		mode === "light"
			? {
					primary: {
						main: "#111111",
						light: "#333333",
						dark: "#000000",
						contrastText: "#FFFFFF",
					},
					secondary: {
						main: "#555555",
						light: "#777777",
						dark: "#333333",
						contrastText: "#FFFFFF",
					},
					success: { main: "#2E7D32", contrastText: "#FFFFFF" },
					warning: { main: "#8B6914", contrastText: "#FFFFFF" },
					error: { main: "#B71C1C", contrastText: "#FFFFFF" },
					background: { default: "#F5F5F5", paper: "#FFFFFF" },
					text: { primary: "#0A0A0A", secondary: "#5C5C5C" },
					divider: alpha("#0A0A0A", 0.1),
				}
			: {
					primary: {
						main: "#F0F0F0",
						light: "#FFFFFF",
						dark: "#CCCCCC",
						contrastText: "#000000",
					},
					secondary: {
						main: "#A0A0A0",
						light: "#C0C0C0",
						dark: "#787878",
						contrastText: "#000000",
					},
					success: { main: "#66BB6A", contrastText: "#000000" },
					warning: { main: "#FFA726", contrastText: "#000000" },
					error: { main: "#EF5350", contrastText: "#FFFFFF" },
					background: { default: "#000000", paper: "#0F0F0F" },
					text: { primary: "#F5F5F5", secondary: "#A0A0A0" },
					divider: alpha("#F5F5F5", 0.1),
				};

	const baseTheme = createTheme({
		palette: {
			mode,
			...palette,
		},
		typography: sharedTypography,
		custom: {
			charts: {
				colors: CHART_COLORS,
			},
		},
	});

	return createTheme(baseTheme, {
		components: {
			/* --- ICONS --- */
			MuiSvgIcon: {
				defaultProps: {
					fontSize: "small",
				},
				styleOverrides: {
					root: {
						transition:
							"color 150ms ease-in-out, transform 150ms ease-in-out",
					},
				},
			},

			/* --- BUTTONS --- */
			MuiButton: {
				defaultProps: {
					disableElevation: true,
				},
				styleOverrides: {
					root: {
						borderRadius: "10px",
						paddingInline: "20px",
						transition: "all 0.2s ease-in-out",
						"&:hover": {
							transform: "translateY(-2px)",
						},
					},
					containedPrimary: {
						backgroundColor: baseTheme.palette.primary.main,
						color: baseTheme.palette.primary.contrastText,
						"&:hover": {
							backgroundColor: baseTheme.palette.primary.light,
							boxShadow:
								mode === "light"
									? "0px 4px 16px rgba(0, 0, 0, 0.3)"
									: "0px 4px 16px rgba(255, 255, 255, 0.15)",
						},
					},
					containedSecondary: {
						"&:hover": {
							backgroundColor: baseTheme.palette.secondary.light,
							boxShadow: `0px 4px 12px ${alpha(baseTheme.palette.secondary.main, 0.4)}`,
						},
					},
					outlined: {
						borderColor: baseTheme.palette.divider,
						"&:hover": {
							borderColor: baseTheme.palette.primary.main,
							backgroundColor: alpha(
								baseTheme.palette.primary.main,
								0.05,
							),
						},
					},
				},
			},

			/* --- BARS: APP BAR (NAVIGATION) --- */
			MuiAppBar: {
				styleOverrides: {
					root: {
						backgroundColor: alpha(
							baseTheme.palette.background.paper,
							0.92,
						),
						backdropFilter: "blur(16px)",
						color: baseTheme.palette.text.primary,
						borderBottom: "none",
						boxShadow:
							mode === "light"
								? "0 1px 0 rgba(0, 0, 0, 0.08)"
								: "0 1px 0 rgba(255, 255, 255, 0.06)",
						borderRadius: "0 0 28px 28px",
						overflow: "visible",
						transition: "transform 0.3s ease-in-out",
						"&::after": {
							content: '""',
							position: "absolute",
							bottom: -1,
							left: "3%",
							right: "3%",
							height: 1,
							background: `linear-gradient(90deg, transparent, ${baseTheme.palette.divider}, transparent)`,
							borderRadius: "0 0 28px 28px",
						},
					},
				},
			},
			MuiToolbar: {
				styleOverrides: {
					root: {
						minHeight: "64px !important",
						paddingInline: "24px !important",
					},
				},
			},

			/* --- BARS: SEARCH & TEXT FIELDS --- */
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						borderRadius: "14px",
						backgroundColor:
							mode === "light" ? "#FFFFFF" : "#1A1A1A",
						transition: "all 0.2s ease",
						"&:hover .MuiOutlinedInput-notchedOutline": {
							borderColor: baseTheme.palette.primary.light,
						},
						"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
							borderWidth: "2px",
							borderColor: baseTheme.palette.primary.main,
							boxShadow:
								mode === "light"
									? `0 0 0 4px rgba(17, 17, 17, 0.08)`
									: `0 0 0 4px rgba(240, 240, 240, 0.08)`,
						},
					},
					notchedOutline: {
						borderColor: alpha(baseTheme.palette.text.primary, 0.12),
					},
				},
			},

			MuiAutocomplete: {
				styleOverrides: {
					paper: {
						borderRadius: "14px",
						marginTop: 6,
						border: `1px solid ${baseTheme.palette.divider}`,
						boxShadow:
							mode === "light"
								? "0 8px 32px rgba(0, 0, 0, 0.12)"
								: "0 8px 32px rgba(0, 0, 0, 0.6)",
					},
					option: {
						borderRadius: "8px",
						margin: "2px 8px",
						"&:last-of-type": { marginBottom: 8 },
						"&:first-of-type": { marginTop: 8 },
					},
					listbox: {
						padding: 0,
					},
				},
			},

			MuiMenu: {
				styleOverrides: {
					paper: {
						borderRadius: "14px",
						marginTop: 6,
						border: `1px solid ${baseTheme.palette.divider}`,
						boxShadow:
							mode === "light"
								? "0 8px 32px rgba(0, 0, 0, 0.12)"
								: "0 8px 32px rgba(0, 0, 0, 0.6)",
					},
					list: {
						padding: "6px",
					},
				},
			},

			MuiMenuItem: {
				styleOverrides: {
					root: {
						borderRadius: "8px",
						margin: "2px 0",
						fontWeight: 500,
						"&.Mui-selected": {
							backgroundColor: alpha(
								baseTheme.palette.primary.main,
								mode === "light" ? 0.08 : 0.12,
							),
						},
					},
				},
			},

			MuiSelect: {
				styleOverrides: {
					select: {
						borderRadius: "14px",
					},
				},
			},

			MuiPopover: {
				styleOverrides: {
					paper: {
						borderRadius: "16px",
						border: `1px solid ${baseTheme.palette.divider}`,
						boxShadow:
							mode === "light"
								? "0 12px 40px rgba(0, 0, 0, 0.15)"
								: "0 12px 40px rgba(0, 0, 0, 0.7)",
					},
				},
			},

			MuiSlider: {
				styleOverrides: {
					root: {
						height: 6,
					},
					thumb: {
						width: 18,
						height: 18,
						backgroundColor: baseTheme.palette.primary.main,
						"&:hover, &.Mui-focusVisible": {
							boxShadow:
								mode === "light"
									? `0 0 0 8px rgba(17, 17, 17, 0.12)`
									: `0 0 0 8px rgba(240, 240, 240, 0.12)`,
						},
					},
					track: {
						border: "none",
						height: 6,
						borderRadius: 3,
						backgroundColor: baseTheme.palette.primary.main,
					},
					rail: {
						height: 6,
						borderRadius: 3,
						opacity: 0.2,
						backgroundColor: baseTheme.palette.text.primary,
					},
				},
			},

			MuiToggleButton: {
				styleOverrides: {
					root: {
						borderRadius: "12px !important",
						textTransform: "none",
						fontWeight: 600,
						borderColor: baseTheme.palette.divider,
						"&.Mui-selected": {
							backgroundColor: alpha(
								baseTheme.palette.primary.main,
								mode === "light" ? 0.1 : 0.15,
							),
							color: baseTheme.palette.primary.main,
							"&:hover": {
								backgroundColor: alpha(
									baseTheme.palette.primary.main,
									0.18,
								),
							},
						},
					},
				},
			},

			MuiDrawer: {
				styleOverrides: {
					paper: {
						borderRadius: "20px 0 0 20px",
						borderLeft: `1px solid ${baseTheme.palette.divider}`,
					},
				},
			},

			/* --- BARS: TABS (For categories/admin sections) --- */
			MuiTabs: {
				styleOverrides: {
					root: {
						minHeight: "40px",
					},
					indicator: {
						height: "3px",
						borderRadius: "3px",
						backgroundColor: baseTheme.palette.primary.main,
					},
				},
			},
			MuiTab: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontWeight: 600,
						minHeight: "40px",
						transition: "color 0.2s ease",
						"&:hover": {
							color: baseTheme.palette.primary.main,
						},
						"&.Mui-selected": {
							color: baseTheme.palette.primary.main,
						},
					},
				},
			},

			/* --- MODALS / DIALOGS (Used for Product Overview AND Cart) --- */
			MuiDialog: {
				styleOverrides: {
					paper: {
						borderRadius: "20px",
						boxShadow:
							mode === "light"
								? "0 10px 40px rgba(0,0,0,0.2)"
								: "0 10px 40px rgba(0,0,0,0.8)",
						// Make sure cart modal can scroll internally if it gets long
						maxHeight: "90vh",
						display: "flex",
						flexDirection: "column",
					},
				},
			},
			MuiBackdrop: {
				styleOverrides: {
					root: {
						backgroundColor: alpha("#000000", 0.65),
						backdropFilter: "blur(4px)", // Frosted glass effect
					},
				},
			},
			MuiDialogTitle: {
				styleOverrides: {
					root: {
						fontSize: "1.5rem",
						fontWeight: 700,
						borderBottom: `1px solid ${baseTheme.palette.divider}`,
						marginBottom: "0",
						padding: "20px 24px",
					},
				},
			},
			MuiDialogContent: {
				styleOverrides: {
					root: {
						padding: "24px",
						// Ensures the cart or product modal scrolls smoothly if content overflows
						overflowY: "auto",
					},
				},
			},

			/* --- CARDS & WIDGETS --- */
			MuiCard: {
				variants: [
					{
						props: { variant: "widget" },
						style: {
							borderRadius: "16px",
							padding: "24px",
							backgroundColor:
								mode === "light" ? "#FFFFFF" : "#0F0F0F",
							border: `1px solid ${baseTheme.palette.divider}`,
							boxShadow:
								mode === "light"
									? "0px 2px 10px rgba(0, 0, 0, 0.06)"
									: "0px 2px 10px rgba(0, 0, 0, 0.4)",
							transition:
								"transform 0.3s ease, box-shadow 0.3s ease",
							"&:hover": {
								transform: "translateY(-2px)",
								boxShadow:
									mode === "light"
										? "0px 6px 20px rgba(0, 0, 0, 0.1)"
										: "0px 6px 20px rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
				styleOverrides: {
					root: {
						borderRadius: "16px",
						border: `1px solid ${baseTheme.palette.divider}`,
						boxShadow:
							mode === "light"
								? "0px 2px 8px rgba(0, 0, 0, 0.04)"
								: "0px 2px 8px rgba(0, 0, 0, 0.3)",
						transition: "box-shadow 0.3s ease, transform 0.3s ease",
						"&:hover": {
							boxShadow:
								mode === "light"
									? "0px 8px 24px rgba(0, 0, 0, 0.1)"
									: "0px 8px 24px rgba(0, 0, 0, 0.5)",
						},
					},
				},
			},

			/* --- CHIPS (Product Tags & Status Badges) --- */
			MuiChip: {
				styleOverrides: {
					root: {
						borderRadius: "10px",
						fontWeight: 600,
						fontSize: "0.75rem",
						transition: "all 0.2s ease",
					},
					filled: {
						"&.MuiChip-colorPrimary": {
							backgroundColor: baseTheme.palette.primary.main,
							color: baseTheme.palette.primary.contrastText,
							boxShadow:
								mode === "light"
									? "0 2px 8px rgba(17, 17, 17, 0.25)"
									: "0 2px 8px rgba(240, 240, 240, 0.15)",
						},
					},
					outlined: {
						backgroundColor: alpha(
							baseTheme.palette.primary.main,
							0.04,
						),
						borderColor: alpha(baseTheme.palette.primary.main, 0.2),
						color: baseTheme.palette.primary.main,
						"&:hover": {
							backgroundColor: alpha(
								baseTheme.palette.primary.main,
								0.08,
							),
						},
					},
				},
				// Custom variants for product statuses
				variants: [
					{
						props: { color: "success", variant: "status" },
						style: {
							backgroundColor: alpha(
								baseTheme.palette.success.main,
								0.12,
							),
							color: baseTheme.palette.success.main,
							border: `1px solid ${alpha(baseTheme.palette.success.main, 0.25)}`,
						},
					},
					{
						props: { color: "error", variant: "status" },
						style: {
							backgroundColor: alpha(
								baseTheme.palette.error.main,
								0.12,
							),
							color: baseTheme.palette.error.main,
							border: `1px solid ${alpha(baseTheme.palette.error.main, 0.25)}`,
						},
					},
					{
						props: { color: "warning", variant: "status" },
						style: {
							backgroundColor: alpha(
								baseTheme.palette.warning.main,
								0.12,
							),
							color: baseTheme.palette.warning.main,
							border: `1px solid ${alpha(baseTheme.palette.warning.main, 0.25)}`,
						},
					},
				],
			},

			/* --- BADGES (Cart item count in AppBar) --- */
			MuiBadge: {
				styleOverrides: {
					badge: {
						fontWeight: 700,
						fontSize: "0.7rem",
						height: "18px",
						minWidth: "18px",
						padding: "0 4px",
						borderRadius: "9px",
						backgroundColor: baseTheme.palette.primary.main,
						color: baseTheme.palette.primary.contrastText,
					},
				},
			},

			/* --- TOOLTIPS --- */
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						backgroundColor: baseTheme.palette.text.primary,
						color: baseTheme.palette.background.paper,
						fontSize: "0.75rem",
						borderRadius: "6px",
						padding: "6px 10px",
						boxShadow:
							mode === "light"
								? "0 2px 8px rgba(0,0,0,0.2)"
								: "0 2px 8px rgba(0,0,0,0.5)",
					},
					arrow: {
						color: baseTheme.palette.text.primary,
					},
				},
			},

			/* --- CALENDAR WIDGET --- */
			MuiPickerDay: {
				styleOverrides: {
					root: {
						borderRadius: "8px",
						borderWidth: "1px",
						borderStyle: "solid",
						borderColor: "transparent",
						"&.Mui-selected": {
							backgroundColor: baseTheme.palette.primary.main,
							color: baseTheme.palette.primary.contrastText,
							fontWeight: 600,
							"&:hover": {
								backgroundColor: baseTheme.palette.primary.dark,
							},
						},
					},
					today: {
						borderColor: baseTheme.palette.secondary.main,
						color: baseTheme.palette.secondary.main,
						fontWeight: 700,
					},
				},
			},

			/* --- DATA GRID --- */
			MuiDataGrid: {
				styleOverrides: {
					root: {
						border: `1px solid ${baseTheme.palette.divider}`,
						borderRadius: "12px",
						overflow: "hidden",
					},
					columnHeader: {
						backgroundColor:
							mode === "light" ? "#F0F0F0" : "#1A1A1A",
						fontWeight: 700,
					},
					row: {
						"&:hover": {
							backgroundColor: alpha(
								baseTheme.palette.primary.main,
								mode === "light" ? 0.04 : 0.06,
							),
						},
					},
				},
			},

			/* --- SCROLLBARS --- */
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						scrollbarColor: `${baseTheme.palette.divider} transparent`,
						"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
							width: "8px",
							height: "8px",
						},
						"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb":
							{
								backgroundColor:
									mode === "light" ? "#CCCCCC" : "#333333",
								borderRadius: "8px",
								"&:hover": {
									backgroundColor:
										mode === "light"
											? "#AAAAAA"
											: "#555555",
								},
							},
						"&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track":
							{
								backgroundColor: "transparent",
							},
					},
				},
			},
		},
	});
};

declare module "@mui/material/styles" {
	interface Theme {
		custom: {
			charts: {
				colors: string[];
			};
		};
	}
	interface ThemeOptions {
		custom?: {
			charts?: {
				colors?: string[];
			};
		};
	}
}

// Extend Card and Chip props to recognize custom variants in TypeScript
declare module "@mui/material/Paper" {
	interface PaperPropsVariantOverrides {
		widget: true;
	}
}

declare module "@mui/material/Card" {
	interface CardPropsVariantOverrides {
		widget: true;
	}
}

declare module "@mui/material/Chip" {
	interface ChipPropsVariantOverrides {
		status: true;
	}
}
