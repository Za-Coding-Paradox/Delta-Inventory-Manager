// src/components/admin-page/admin-sidebar.tsx
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate lets us programmatically change the URL; useLocation gives us the current URL path
import {
	Box,
	List,
	ListItemButton, // a clickable list row that has built-in hover/active styles
	ListItemIcon,   // the left-side icon slot inside a list row
	ListItemText,   // the text label slot inside a list row
	Typography,
	Tooltip,        // wraps an element and shows a small popup label when the user hovers over it
	Divider,
	alpha,          // MUI helper: takes a color and an opacity (0–1) and returns a semi-transparent version of that color
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // gives us the active MUI theme for reading colors and palette values
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import { motion, AnimatePresence } from "framer-motion"; // motion animates elements; AnimatePresence plays exit animations when elements leave the DOM

// Each object here defines one navigation link in the sidebar.
// The sidebar loops over this array to render the buttons — adding a new route means just adding a new entry here.
const NAV_ITEMS = [
	{
		label: "Dashboard",
		icon: <DashboardRoundedIcon />,
		path: "/admin",
		exact: true, // "exact" means this item is only "active" when the URL is exactly "/admin", not "/admin/anything-else"
	},
	{
		label: "Products",
		icon: <InventoryRoundedIcon />,
		path: "/admin/products",
	},
	{
		label: "Orders",
		icon: <ReceiptRoundedIcon />,
		path: "/admin/orders",
	},
	{
		label: "Supply Chain",
		icon: <AccountTreeRoundedIcon />,
		path: "/admin/supply-chain",
	},
	{
		label: "Analytics",
		icon: <BarChartRoundedIcon />,
		path: "/admin/analytics",
	},
];

interface AdminSidebarProps {
	collapsed: boolean; // when true the sidebar shows only icons (narrow); when false it shows icons + labels (wide)
}


export default function AdminSidebar({ collapsed }: AdminSidebarProps) {
	const navigate = useNavigate(); // function we call to send the user to a different route when they click a nav item
	const location = useLocation(); // gives the current URL so we can highlight the active nav item
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark"; // true when the app is in dark mode, used to pick slightly different highlight opacities

	// Checks whether a given nav item matches the current URL.
	// For the Dashboard (exact: true), we need an exact match.
	// For all other items, we use startsWith so sub-routes (e.g. /admin/products/123) also keep the item highlighted.
	const isActive = (item: (typeof NAV_ITEMS)[0]) => {
		if (item.exact) return location.pathname === item.path;
		return location.pathname.startsWith(item.path);
	};

	return (
		// Box is used as a motion.div so Framer Motion can animate its width when the sidebar collapses/expands
		<Box
			component={motion.div}
			animate={{ width: collapsed ? 72 : 240 }} // smoothly resizes: 72px when collapsed (icon only), 240px when expanded (icon + label)
			transition={{ duration: 0.3, ease: "easeInOut" }} // width change takes 0.3 seconds with a smooth in-out curve
			sx={{
				height: "100%", // sidebar stretches the full height of the layout
				backgroundColor: isDark ? "#0A0A0A" : "#FFFFFF", // near-black in dark mode, white in light mode
				borderRight: `1px solid ${theme.palette.divider}`, // thin separator line between sidebar and main content
				display: "flex",
				flexDirection: "column", // stacks logo, nav items, and footer vertically
				overflow: "hidden", // clips content so nothing spills outside the sidebar width during the animation
				flexShrink: 0, // prevents the sidebar from getting squished by the main content area
				position: "relative",
			}}
		>
			{/* Logo area at the top of the sidebar */}
			<Box
				sx={{
					height: 64, // fixed height matching the topbar so they line up perfectly
					display: "flex",
					alignItems: "center",
					px: collapsed ? 2 : 3, // less horizontal padding when collapsed so the icon stays centered
					gap: 1.5, // space between the logo icon and the brand name text
					borderBottom: `1px solid ${theme.palette.divider}`, // dividing line below the logo area
					flexShrink: 0, // keeps logo area at fixed height; doesn't shrink when content grows
				}}
			>
				{/* Colored square containing the storefront icon — acts as the app logo */}
				<Box
					sx={{
						width: 36,
						height: 36,
						borderRadius: "10px", // slightly rounded corners
						backgroundColor: theme.palette.primary.main, // fills with the primary brand color
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexShrink: 0, // prevents the logo box from shrinking when the sidebar is narrow
					}}
				>
					<StorefrontRoundedIcon
						sx={{
							color: theme.palette.primary.contrastText, // color that's readable on top of the primary background (usually white)
							fontSize: "1.1rem",
						}}
					/>
				</Box>
				{/* AnimatePresence lets the brand name text animate out when the sidebar collapses */}
				<AnimatePresence>
					{!collapsed && ( // only render the brand name when the sidebar is expanded
						<motion.div
							initial={{ opacity: 0, x: -10 }} // starts invisible and 10px to the left
							animate={{ opacity: 1, x: 0 }}   // slides in and fades to full opacity
							exit={{ opacity: 0, x: -10 }}     // slides back out and fades away on collapse
							transition={{ duration: 0.2 }}
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 800, letterSpacing: "-0.5px", whiteSpace: "nowrap" }} // bold title; nowrap prevents text from wrapping during animation
							>
								AURA Admin
							</Typography>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>

			{/* Nav Items — the main navigation links */}
			<Box sx={{ flex: 1, py: 1.5, px: 1 }}> {/* flex: 1 makes this section grow to fill the space between the logo and the footer */}
				<List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}> {/* disablePadding removes MUI's default list indent; gap adds small spacing between buttons */}
					{NAV_ITEMS.map((item) => {
						const active = isActive(item); // check if this specific nav item matches the current page

						// Build the button element separately so we can optionally wrap it in a Tooltip
						const btn = (
							<ListItemButton
								onClick={() => navigate(item.path)} // navigates to this item's route when clicked — equivalent to clicking a link
								sx={{
									borderRadius: "12px", // rounded pill-like button shape
									px: collapsed ? 1.5 : 2, // less horizontal padding when collapsed (icon-only mode)
									py: 1.2,
									minHeight: 48, // ensures a comfortable click/tap target size
									justifyContent: collapsed ? "center" : "flex-start", // centers the icon when collapsed; left-aligns icon + text when expanded
									// Active item gets a soft tinted background; inactive items are transparent
									backgroundColor: active
										? alpha(theme.palette.primary.main, isDark ? 0.15 : 0.08) // semi-transparent primary color highlight
										: "transparent",
									"&:hover": {
										// Slightly stronger tint on hover for active items; subtle grey tint for inactive items
										backgroundColor: active
											? alpha(theme.palette.primary.main, isDark ? 0.2 : 0.12)
											: alpha(theme.palette.text.primary, 0.04),
									},
									transition: "all 0.2s ease", // smoothly animates background color changes on hover/active
									position: "relative", // needed so the absolute-positioned active indicator bar is positioned inside this button
									overflow: "hidden",
								}}
							>
								{/* Active indicator — a thin vertical colored bar on the left edge of the active button */}
								{active && (
									<Box
										component={motion.div}
										layoutId="activeIndicator" // Framer Motion's layoutId: smoothly slides this bar from one nav item to the next when the active route changes
										sx={{
											position: "absolute",
											left: 0,       // anchored to the left edge of the button
											top: "20%",    // starts 20% from the top, making it vertically centered
											height: "60%", // 60% of the button height
											width: 3,      // thin 3px bar
											borderRadius: "0 3px 3px 0", // rounded on the right side only
											backgroundColor: theme.palette.primary.main,
										}}
									/>
								)}
								<ListItemIcon
									sx={{
										minWidth: collapsed ? "auto" : 36, // "auto" removes extra space so the icon is perfectly centered when sidebar is collapsed
										color: active
											? theme.palette.primary.main    // primary color for the active route's icon
											: theme.palette.text.secondary, // muted grey for inactive icons
										transition: "color 0.2s ease", // smoothly changes icon color when active state changes
									}}
								>
									{item.icon} {/* renders the icon defined in NAV_ITEMS (e.g. DashboardRoundedIcon) */}
								</ListItemIcon>
								{/* AnimatePresence lets the label text animate out when collapsing the sidebar */}
								<AnimatePresence>
									{!collapsed && ( // only show the text label when the sidebar is expanded
										<motion.div
											initial={{ opacity: 0, x: -8 }} // slides in from slightly left
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -8 }}   // slides back out when collapsing
											transition={{ duration: 0.18 }}
											style={{ overflow: "hidden" }}  // clips text during the slide animation
										>
											<ListItemText
												primary={
													<Typography
														sx={{
															fontWeight: active ? 700 : 500, // bold for active route, medium weight for others
															fontSize: "0.9rem",
															color: active
																? theme.palette.primary.main    // primary color text for active item
																: theme.palette.text.primary,   // normal text color for inactive items
															whiteSpace: "nowrap", // prevents label from wrapping onto a second line during sidebar animation
														}}
													>
														{item.label} {/* the nav item's display name, e.g. "Dashboard", "Products" */}
													</Typography>
												}
											/>
										</motion.div>
									)}
								</AnimatePresence>
							</ListItemButton>
						);

						// When collapsed, wrap each button in a Tooltip so hovering over an icon shows the route name.
						// When expanded, the label is already visible so no Tooltip is needed.
						return collapsed ? (
							/* shows label to the right of the icon on hover */
							<Tooltip key={item.path} title={item.label} placement="right" arrow>
								{btn}
							</Tooltip>
						) : (
							<Box key={item.path}>{btn}</Box>
						);
					})}
				</List>
			</Box>

			{/* Footer — shown at the very bottom of the sidebar */}
			<Box sx={{ p: 1, borderTop: `1px solid ${theme.palette.divider}` }}> {/* thin line separating footer from nav items */}
				<Divider sx={{ mb: 1 }} /> {/* extra visual separator with bottom margin */}
				{/* AnimatePresence lets the version text fade out when the sidebar collapses */}
				<AnimatePresence>
					{!collapsed && ( // only show the version text when the sidebar is expanded
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }} // fades out when sidebar collapses
						>
							<Typography
								variant="caption" // smallest text style, suitable for secondary/footer info
								sx={{
									color: theme.palette.text.secondary, // muted grey color so it doesn't distract from nav items
									display: "block", // makes the caption take its own full line (caption is inline by default)
									textAlign: "center",
									pb: 0.5,
								}}
							>
								v1.0.0 · Delta Inventory
							</Typography>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Box>
	);
}
