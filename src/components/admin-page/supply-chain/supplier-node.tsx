// src/components/admin-page/supply-chain/supplier-node.tsx
import { Handle, Position } from "@xyflow/react";
import { Box, Typography, Chip, LinearProgress, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import type { SupplyChainNodeData } from "../../../config/types";

interface Props {
	data: SupplyChainNodeData;
	selected: boolean;
}

export default function SupplierNode({ data, selected }: Props) {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const getBorderColor = () => {
		if (data.status === "CRITICAL") return theme.palette.error.main;
		if (data.status === "DELAYED") return theme.palette.warning.main;
		return selected ? theme.palette.primary.main : theme.palette.divider;
	};

	const getBgColor = () => {
		if (data.status === "CRITICAL") return alpha(theme.palette.error.main, isDark ? 0.2 : 0.05);
		if (data.status === "DELAYED") return alpha(theme.palette.warning.main, isDark ? 0.2 : 0.05);
		return theme.palette.background.paper;
	};

	return (
		<Box
			sx={{
				minWidth: 200,
				borderRadius: "16px",
				border: `2px solid ${getBorderColor()}`,
				backgroundColor: getBgColor(),
				boxShadow: selected
					? `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`
					: theme.shadows[isDark ? 4 : 2],
				transition: "all 0.2s ease",
			}}
		>
			<Box sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Box
					sx={{
						width: 32,
						height: 32,
						borderRadius: "8px",
						backgroundColor: alpha(theme.palette.primary.main, 0.1),
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: theme.palette.primary.main,
					}}
				>
					<LocalShippingRoundedIcon fontSize="small" />
				</Box>
				<Typography variant="subtitle2" sx={{ flex: 1, fontWeight: 700 }} noWrap>
					{data.label}
				</Typography>
			</Box>
			<Box sx={{ p: 1.5 }}>
				<Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
					<Typography variant="caption" color="text.secondary">Status</Typography>
					<Chip
						label={data.status}
						size="small"
						color={data.status === "CRITICAL" ? "error" : data.status === "DELAYED" ? "warning" : "success"}
						sx={{ height: 16, fontSize: "0.6rem", fontWeight: 700 }}
					/>
				</Box>
				{data.stockLevel !== undefined && data.capacity !== undefined && (
					<Box>
						<Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
							<Typography variant="caption" color="text.secondary">Stock</Typography>
							<Typography variant="caption" sx={{ fontWeight: 600 }}>
								{data.stockLevel} / {data.capacity}
							</Typography>
						</Box>
						<LinearProgress
							variant="determinate"
							value={(data.stockLevel / data.capacity) * 100}
							color={data.stockLevel < 20 ? "error" : "primary"}
							sx={{ height: 6, borderRadius: 3 }}
						/>
					</Box>
				)}
			</Box>
			<Handle type="source" position={Position.Right} style={{ width: 10, height: 10 }} />
		</Box>
	);
}
