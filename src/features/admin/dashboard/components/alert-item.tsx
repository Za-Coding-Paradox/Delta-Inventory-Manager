import { Box, Typography, Chip, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

function NodeIcon({ type }: { type: string }) {
	if (type === "supplierNode") return <LocalShippingRoundedIcon fontSize="small" />;
	if (type === "warehouseNode") return <Inventory2RoundedIcon fontSize="small" />;
	return <StoreRoundedIcon fontSize="small" />;
}

export const AlertItem = React.memo(({ node }: { node: any }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const isDark = theme.palette.mode === "dark";
	const isCritical = node.data.status === "CRITICAL";

	const onClick = useCallback(() => navigate("/admin/supply-chain"), [navigate]);

	return (
		<Box
			onClick={onClick}
			sx={{
				p: 2,
				borderRadius: "12px",
				border: `1px solid ${alpha(isCritical ? theme.palette.error.main : theme.palette.warning.main, 0.4)}`,
				backgroundColor: alpha(isCritical ? theme.palette.error.main : theme.palette.warning.main, isDark ? 0.15 : 0.05),
				cursor: "pointer",
				transition: "all 0.2s ease",
				"&:hover": { transform: "translateY(-2px)", boxShadow: `0 4px 12px ${alpha(isCritical ? theme.palette.error.main : theme.palette.warning.main, 0.2)}` },
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<Box sx={{ color: isCritical ? "error.main" : "warning.main", display: "flex" }}>
						<NodeIcon type={node.type} />
					</Box>
					<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{node.data.label as string}</Typography>
				</Box>
				<Chip label={node.data.status} size="small" color={isCritical ? "error" : "warning"} sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700 }} />
			</Box>
			<Typography variant="body2" color="text.secondary">{node.data.details}</Typography>
		</Box>
	);
});
