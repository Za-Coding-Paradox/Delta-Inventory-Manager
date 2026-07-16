// src/components/admin-page/admin-layout.tsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./admin-sidebar";
import AdminTopbar from "./admin-topbar";

const SECTION_TITLES: Record<string, string> = {
	"/admin": "Dashboard",
	"/admin/products": "Product Manager",
	"/admin/supply-chain": "Supply Chain Viewer",
	"/admin/analytics": "Analytics",
};

export default function AdminLayout() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const location = useLocation();
	const theme = useTheme();

	const sectionTitle =
		SECTION_TITLES[location.pathname] ?? "Admin Panel";

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				overflow: "hidden",
				backgroundColor: "background.default",
			}}
		>
			{/* Sidebar */}
			<AdminSidebar collapsed={sidebarCollapsed} />

			{/* Main Content */}
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
					minWidth: 0,
				}}
			>
				{/* Topbar */}
				<AdminTopbar
					collapsed={sidebarCollapsed}
					onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
					sectionTitle={sectionTitle}
				/>

				{/* Page Content */}
				<Box
					component="main"
					sx={{
						flex: 1,
						overflowY: "auto",
						backgroundColor: theme.palette.background.default,
						position: "relative",
					}}
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={location.pathname}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.22, ease: "easeOut" }}
							style={{ height: "100%" }}
						>
							<Outlet />
						</motion.div>
					</AnimatePresence>
				</Box>
			</Box>
		</Box>
	);
}
