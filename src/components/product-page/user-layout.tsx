// src/components/layout/UserLayout.tsx
import { Outlet } from "react-router-dom";
import { Toolbar, Box } from "@mui/material";
import UserNavbar from "./user-navbar";

export default function UserLayout() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<UserNavbar />
			{/* Toolbar acts as a spacer to offset the fixed AppBar */}
			<Toolbar />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<Outlet />
			</Box>
		</Box>
	);
}
