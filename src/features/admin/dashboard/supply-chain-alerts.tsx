// src/components/admin-page/dashboard/supply-chain-alerts.tsx
import { Box, Card, Typography, Chip, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import { useAppContext } from "../../../context/app-context";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function NodeIcon({ type }: { type: string }) {
	if (type === "supplierNode") return <LocalShippingRoundedIcon fontSize="small" />;
	if (type === "warehouseNode") return <Inventory2RoundedIcon fontSize="small" />;
	return <StoreRoundedIcon fontSize="small" />;
}

export default function SupplyChainAlerts() {
	const { state } = useAppContext();
	const theme = useTheme();
	const navigate = useNavigate();
	const isDark = theme.palette.mode === "dark";

	const alerts = state.supplyChainNodes.filter(
		(n) => n.data.status === "DELAYED" || n.data.status === "CRITICAL"
	);

	return (
		<Card variant="widget" sx={{ flex: 1, minWidth: 320, display: "flex", flexDirection: "column", height: "100%", maxHeight: 400 }}>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<WarningRoundedIcon sx={{ color: "warning.main" }} />
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						Supply Chain Alerts
					</Typography>
				</Box>
				<Chip label={`${alerts.length} Issues`} size="small" color={alerts.length > 0 ? "warning" : "success"} />
			</Box>

			<Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
				{alerts.length === 0 ? (
					<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
						All supply chain nodes operating normally.
					</Typography>
				) : (
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
						<AnimatePresence>
							{alerts.map((node, i) => (
								<motion.div
									key={node.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 }}
								>
									<Box
										onClick={() => navigate("/admin/supply-chain")}
										sx={{
											p: 2,
											borderRadius: "12px",
											border: `1px solid ${
												node.data.status === "CRITICAL"
													? alpha(theme.palette.error.main, 0.4)
													: alpha(theme.palette.warning.main, 0.4)
											}`,
											backgroundColor:
												node.data.status === "CRITICAL"
													? alpha(theme.palette.error.main, isDark ? 0.15 : 0.05)
													: alpha(theme.palette.warning.main, isDark ? 0.15 : 0.05),
											cursor: "pointer",
											transition: "all 0.2s ease",
											"&:hover": {
												transform: "translateY(-2px)",
												boxShadow: `0 4px 12px ${
													node.data.status === "CRITICAL"
														? alpha(theme.palette.error.main, 0.2)
														: alpha(theme.palette.warning.main, 0.2)
												}`,
											},
										}}
									>
										<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
											<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
												<Box
													sx={{
														color: node.data.status === "CRITICAL" ? "error.main" : "warning.main",
														display: "flex",
													}}
												>
													<NodeIcon type={node.type} />
												</Box>
												<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
													{node.data.label as string}
												</Typography>
											</Box>
											<Chip
												label={node.data.status}
												size="small"
												color={node.data.status === "CRITICAL" ? "error" : "warning"}
												sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700 }}
											/>
										</Box>
										<Typography variant="body2" color="text.secondary">
											{node.data.details}
										</Typography>
									</Box>
								</motion.div>
							))}
						</AnimatePresence>
					</Box>
				)}
			</Box>
		</Card>
	);
}
