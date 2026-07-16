// src/components/admin-page/admin-sidebar.tsx
import { useNavigate, useLocation } from "react-router-dom";
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	Tooltip,
	Divider,
	alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
	{
		label: "Dashboard",
		icon: <DashboardRoundedIcon />,
		path: "/admin",
		exact: true,
	},
	{
		label: "Products",
		icon: <InventoryRoundedIcon />,
		path: "/admin/products",
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
	collapsed: boolean;
}

import { useState } from "react";

export default function AdminSidebar({ collapsed }: AdminSidebarProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const isActive = (item: (typeof NAV_ITEMS)[0]) => {
		if (item.exact) return location.pathname === item.path;
		return location.pathname.startsWith(item.path);
	};

	return (
		<Box
			component={motion.div}
			animate={{ width: collapsed ? 72 : 240 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			sx={{
				height: "100%",
				backgroundColor: isDark ? "#0A0A0A" : "#FFFFFF",
				borderRight: `1px solid ${theme.palette.divider}`,
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				flexShrink: 0,
				position: "relative",
			}}
		>
			{/* Logo */}
			<Box
				sx={{
					height: 64,
					display: "flex",
					alignItems: "center",
					px: collapsed ? 2 : 3,
					gap: 1.5,
					borderBottom: `1px solid ${theme.palette.divider}`,
					flexShrink: 0,
				}}
			>
				<Box
					sx={{
						width: 36,
						height: 36,
						borderRadius: "10px",
						backgroundColor: theme.palette.primary.main,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexShrink: 0,
					}}
				>
					<StorefrontRoundedIcon
						sx={{
							color: theme.palette.primary.contrastText,
							fontSize: "1.1rem",
						}}
					/>
				</Box>
				<AnimatePresence>
					{!collapsed && (
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -10 }}
							transition={{ duration: 0.2 }}
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 800, letterSpacing: "-0.5px", whiteSpace: "nowrap" }}
							>
								AURA Admin
							</Typography>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>

			{/* Nav Items */}
			<Box sx={{ flex: 1, py: 1.5, px: 1 }}>
				<List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
					{NAV_ITEMS.map((item) => {
						const active = isActive(item);
						const btn = (
							<ListItemButton
								onClick={() => navigate(item.path)}
								sx={{
									borderRadius: "12px",
									px: collapsed ? 1.5 : 2,
									py: 1.2,
									minHeight: 48,
									justifyContent: collapsed ? "center" : "flex-start",
									backgroundColor: active
										? alpha(theme.palette.primary.main, isDark ? 0.15 : 0.08)
										: "transparent",
									"&:hover": {
										backgroundColor: active
											? alpha(theme.palette.primary.main, isDark ? 0.2 : 0.12)
											: alpha(theme.palette.text.primary, 0.04),
									},
									transition: "all 0.2s ease",
									position: "relative",
									overflow: "hidden",
								}}
							>
								{/* Active indicator */}
								{active && (
									<Box
										component={motion.div}
										layoutId="activeIndicator"
										sx={{
											position: "absolute",
											left: 0,
											top: "20%",
											height: "60%",
											width: 3,
											borderRadius: "0 3px 3px 0",
											backgroundColor: theme.palette.primary.main,
										}}
									/>
								)}
								<ListItemIcon
									sx={{
										minWidth: collapsed ? "auto" : 36,
										color: active
											? theme.palette.primary.main
											: theme.palette.text.secondary,
										transition: "color 0.2s ease",
									}}
								>
									{item.icon}
								</ListItemIcon>
								<AnimatePresence>
									{!collapsed && (
										<motion.div
											initial={{ opacity: 0, x: -8 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -8 }}
											transition={{ duration: 0.18 }}
											style={{ overflow: "hidden" }}
										>
											<ListItemText
												primary={
													<Typography
														sx={{
															fontWeight: active ? 700 : 500,
															fontSize: "0.9rem",
															color: active
																? theme.palette.primary.main
																: theme.palette.text.primary,
															whiteSpace: "nowrap",
														}}
													>
														{item.label}
													</Typography>
												}
											/>
										</motion.div>
									)}
								</AnimatePresence>
							</ListItemButton>
						);

						return collapsed ? (
							<Tooltip key={item.path} title={item.label} placement="right" arrow>
								{btn}
							</Tooltip>
						) : (
							<Box key={item.path}>{btn}</Box>
						);
					})}
				</List>
			</Box>

			{/* Footer */}
			<Box sx={{ p: 1, borderTop: `1px solid ${theme.palette.divider}` }}>
				<Divider sx={{ mb: 1 }} />
				<AnimatePresence>
					{!collapsed && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Typography
								variant="caption"
								sx={{
									color: theme.palette.text.secondary,
									display: "block",
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
