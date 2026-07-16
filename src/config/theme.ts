// src/config/theme.ts
import { createTheme, alpha } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

/* ==========================================================================
 * 1. CUSTOM CHART COLORS (For Recharts)
 * ========================================================================== */
export const CHART_COLORS = [
	"#3A6B88", // Primary Blue/Teal
	"#D88C5A", // Secondary Terracotta
	"#82B1D4", // Light Blue
	"#FFAB91", // Soft Coral
	"#9CCC65", // Soft Green
	"#BA68C8", // Soft Purple
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
						main: "#3A6B88",
						light: "#5A8BA8",
						dark: "#2A4B68",
					},
					secondary: {
						main: "#D88C5A",
						light: "#E8AC7A",
						dark: "#B86C3A",
					},
					success: { main: "#4CAF50" },
					warning: { main: "#FF9800" },
					error: { main: "#F44336" },
					background: { default: "#F4F6F8", paper: "#FFFFFF" },
					text: { primary: "#1A1A2E", secondary: "#5C6370" },
					divider: alpha("#1A1A2E", 0.08),
				}
			: {
					primary: {
						main: "#82B1D4",
						light: "#A2C1E4",
						dark: "#6291B4",
					},
					secondary: {
						main: "#FFAB91",
						light: "#FFCBA1",
						dark: "#DF8B71",
					},
					success: { main: "#81C784" },
					warning: { main: "#FFB74D" },
					error: { main: "#E57373" },
					background: { default: "#0F0F0F", paper: "#1A1A1A" },
					text: { primary: "#F5F5F5", secondary: "#B0B0B0" },
					divider: alpha("#F5F5F5", 0.12),
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
						"&:hover": {
							backgroundColor: baseTheme.palette.primary.dark,
							boxShadow: `0px 4px 12px ${alpha(baseTheme.palette.primary.main, 0.4)}`,
						},
					},
					containedSecondary: {
						"&:hover": {
							backgroundColor: baseTheme.palette.secondary.dark,
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
								? "0 4px 24px rgba(58, 107, 136, 0.08)"
								: "0 4px 24px rgba(0, 0, 0, 0.4)",
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
							mode === "light" ? "#FFFFFF" : "#222222",
						transition: "all 0.2s ease",
						"&:hover .MuiOutlinedInput-notchedOutline": {
							borderColor: baseTheme.palette.primary.light,
						},
						"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
							borderWidth: "2px",
							borderColor: baseTheme.palette.primary.main,
							boxShadow: `0 0 0 4px ${alpha(baseTheme.palette.primary.main, 0.12)}`,
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
								? "0 8px 32px rgba(58, 107, 136, 0.12)"
								: "0 8px 32px rgba(0, 0, 0, 0.45)",
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
								? "0 8px 32px rgba(58, 107, 136, 0.12)"
								: "0 8px 32px rgba(0, 0, 0, 0.45)",
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
								0.1,
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
								? "0 12px 40px rgba(58, 107, 136, 0.14)"
								: "0 12px 40px rgba(0, 0, 0, 0.5)",
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
						"&:hover, &.Mui-focusVisible": {
							boxShadow: `0 0 0 8px ${alpha(baseTheme.palette.primary.main, 0.16)}`,
						},
					},
					track: {
						border: "none",
						height: 6,
						borderRadius: 3,
					},
					rail: {
						height: 6,
						borderRadius: 3,
						opacity: 0.3,
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
								0.12,
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
						boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
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
						backgroundColor: alpha("#000000", 0.6),
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
								mode === "light" ? "#FFFFFF" : "#1E1E1E",
							border: `1px solid ${baseTheme.palette.divider}`,
							boxShadow:
								mode === "light"
									? "0px 2px 10px rgba(0, 0, 0, 0.04)"
									: "0px 2px 10px rgba(0, 0, 0, 0.25)",
							transition:
								"transform 0.3s ease, box-shadow 0.3s ease",
							"&:hover": {
								transform: "translateY(-2px)",
								boxShadow:
									mode === "light"
										? "0px 6px 16px rgba(0, 0, 0, 0.06)"
										: "0px 6px 16px rgba(0, 0, 0, 0.35)",
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
								? "0px 4px 12px rgba(0, 0, 0, 0.03)"
								: "0px 4px 12px rgba(0, 0, 0, 0.2)",
						transition: "box-shadow 0.3s ease, transform 0.3s ease",
						"&:hover": {
							boxShadow:
								mode === "light"
									? "0px 8px 24px rgba(0, 0, 0, 0.08)"
									: "0px 8px 24px rgba(0, 0, 0, 0.4)",
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
							boxShadow: `0 2px 8px ${alpha(baseTheme.palette.primary.main, 0.25)}`,
						},
					},
					outlined: {
						backgroundColor: alpha(
							baseTheme.palette.primary.main,
							0.04,
						),
						borderColor: alpha(baseTheme.palette.primary.main, 0.25),
						color: baseTheme.palette.primary.main,
						"&:hover": {
							backgroundColor: alpha(
								baseTheme.palette.primary.main,
								0.1,
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
								0.15,
							),
							color: baseTheme.palette.success.main,
							border: `1px solid ${alpha(baseTheme.palette.success.main, 0.3)}`,
						},
					},
					{
						props: { color: "error", variant: "status" },
						style: {
							backgroundColor: alpha(
								baseTheme.palette.error.main,
								0.15,
							),
							color: baseTheme.palette.error.main,
							border: `1px solid ${alpha(baseTheme.palette.error.main, 0.3)}`,
						},
					},
					{
						props: { color: "warning", variant: "status" },
						style: {
							backgroundColor: alpha(
								baseTheme.palette.warning.main,
								0.15,
							),
							color: baseTheme.palette.warning.main,
							border: `1px solid ${alpha(baseTheme.palette.warning.main, 0.3)}`,
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
						boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
					},
					arrow: {
						color: baseTheme.palette.text.primary,
					},
				},
			},

			/* --- CALENDAR WIDGET --- */
			MuiPickersDay: {
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
							mode === "light" ? "#F5F5F5" : "#252525",
						fontWeight: 700,
					},
					row: {
						"&:hover": {
							backgroundColor: alpha(
								baseTheme.palette.primary.main,
								0.05,
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
								backgroundColor: baseTheme.palette.divider,
								borderRadius: "8px",
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
