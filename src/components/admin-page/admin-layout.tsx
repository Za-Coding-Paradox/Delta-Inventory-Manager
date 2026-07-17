// src/components/admin-page/admin-layout.tsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Outlet renders whatever child route is currently active; useLocation gives us the current URL path
import { Box, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // gives access to the active MUI theme (colors, spacing, etc.)
import { motion, AnimatePresence } from "framer-motion"; // motion adds animations to elements; AnimatePresence handles exit animations when components are removed
import AdminSidebar from "./admin-sidebar";
import AdminTopbar from "./admin-topbar";
import { useAppContext } from "../../context/app-context"; // global app state (e.g. snackbar messages) + dispatch function to trigger state changes

// Maps each admin route path to a human-readable title shown in the topbar
// Record<string, string> means: an object where both keys and values are strings
const SECTION_TITLES: Record<string, string> = {
	"/admin": "Dashboard",
	"/admin/products": "Product Manager",
	"/admin/supply-chain": "Supply Chain Viewer",
	"/admin/analytics": "Analytics",
};

// AdminLayout acts as a shared shell (frame) for all admin pages.
// It renders once and keeps the sidebar + topbar visible while only the inner page content changes.
export default function AdminLayout() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // tracks whether the sidebar is in its narrow (icon-only) or wide (with labels) state
	const { state, dispatch } = useAppContext(); // state holds global data like snackbar text; dispatch lets us send actions to update that state
	const location = useLocation(); // gives us the current URL — e.g. { pathname: "/admin/products" }
	const theme = useTheme(); // pulls the current MUI theme so we can use theme colors in sx props

	// Look up the page title for the current URL path; fall back to "Admin Panel" if no match is found
	const sectionTitle =
		SECTION_TITLES[location.pathname] ?? "Admin Panel";

	return (
		<Box
			sx={{
				display: "flex", // places sidebar and main content side-by-side in a row
				height: "100vh", // fills the full browser viewport height
				overflow: "hidden", // prevents the outer container from scrolling; inner areas handle their own scroll
				backgroundColor: "background.default", // uses the theme's default background color
			}}
		>
			{/* Sidebar */}
			<AdminSidebar collapsed={sidebarCollapsed} /> {/* passes collapse state so the sidebar knows how wide to render */}

			{/* Main Content — takes up the remaining space after the sidebar */}
			<Box
				sx={{
					flex: 1, // expands to fill all horizontal space left by the sidebar
					display: "flex",
					flexDirection: "column", // stacks topbar above the page content vertically
					overflow: "hidden", // prevents this column from overflowing; the inner page Box handles scrolling
					minWidth: 0, // fixes a flexbox bug where children can overflow their container by not shrinking below content size
				}}
			>
				{/* Topbar */}
				<AdminTopbar
					collapsed={sidebarCollapsed} // topbar may adjust its layout when sidebar is collapsed
					onToggleSidebar={() => setSidebarCollapsed((v) => !v)} // flips the collapsed state each time the toggle button is clicked
					sectionTitle={sectionTitle} // displays the current page name in the topbar
				/>

				{/* Page Content — this area scrolls independently from the sidebar/topbar */}
				<Box
					component="main" // renders as a <main> HTML element for proper semantic structure
					sx={{
						flex: 1, // fills remaining vertical space below the topbar
						overflowY: "auto", // allows vertical scrolling when the page content is taller than the viewport
						backgroundColor: theme.palette.background.default, // matches the overall app background color
						position: "relative", // needed so any absolutely positioned children inside are placed relative to this box
						display: "flex",
						flexDirection: "column",
					}}
				>
					{/* AnimatePresence watches its children and plays exit animations before they are removed from the DOM */}
					<AnimatePresence mode="wait"> {/* "wait" means the old page fully finishes its exit animation before the new page enters */}
						<motion.div
							key={location.pathname} // changing the key tells Framer Motion this is a brand-new element, triggering enter/exit animations on route change
							initial={{ opacity: 0, y: 12 }} // page starts invisible and 12px below its final position
							animate={{ opacity: 1, y: 0 }} // animates to fully visible at its normal position
							exit={{ opacity: 0, y: -8 }} // when leaving, fades out and slides 8px upward
							transition={{ duration: 0.22, ease: "easeOut" }} // animation takes 0.22 seconds with a smooth deceleration curve
							style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }} // lets the animated wrapper grow to fill available space
						>
							{/* Outlet is the React Router placeholder — it renders the matched child route component here.
							    For example, when the URL is /admin/products, Outlet renders the Products page. */}
							<Outlet />
						</motion.div>
					</AnimatePresence>
				</Box>
			</Box>
			
			{/* Global Snackbar — a small popup notification shown at the bottom of the screen */}
			<Snackbar
				open={!!state.snackbarMessage} // converts the message string to a boolean: show the snackbar only when a message exists
				autoHideDuration={4000} // automatically hides the snackbar after 4 seconds
				onClose={() => dispatch({ type: "CLEAR_SNACKBAR" })} // dispatches an action to clear the message from global state when the snackbar closes
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // positions the snackbar at the bottom-center of the screen
			>
				<Alert
					onClose={() => dispatch({ type: "CLEAR_SNACKBAR" })} // also allows the user to manually close the alert via its X button
					severity="success" // shows a green success style with a checkmark icon
					variant="filled" // uses a solid background color instead of the outlined or standard style
					sx={{ width: "100%" }} // makes the Alert stretch to fill the full width of the Snackbar
				>
					{state.snackbarMessage} {/* the actual message text pulled from global state */}
				</Alert>
			</Snackbar>
		</Box>
	);
}
