// src/components/admin-page/supply-chain/store-node.tsx
import { Handle, Position } from "@xyflow/react";
import { Box, Typography, Chip, LinearProgress, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import type { SupplyChainNodeData } from "../../../config/types";

interface Props {
	data: SupplyChainNodeData;
	selected: boolean;
}

export default function StoreNode({ data, selected }: Props) {
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
				minWidth: 180,
				borderRadius: "24px", // Pill shape for store
				border: `2px solid ${getBorderColor()}`,
				backgroundColor: getBgColor(),
				boxShadow: selected
					? `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`
					: theme.shadows[isDark ? 4 : 2],
				transition: "all 0.2s ease",
			}}
		>
			<Handle type="target" position={Position.Left} style={{ width: 10, height: 10 }} />
			
			<Box sx={{ p: 1.5, px: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
				<Box
					sx={{
						width: 40,
						height: 40,
						borderRadius: "50%",
						backgroundColor: alpha(theme.palette.success.main, 0.1),
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: theme.palette.success.main,
					}}
				>
					<StoreRoundedIcon />
				</Box>
				<Typography variant="subtitle2" align="center" noWrap sx={{ width: "100%", fontWeight: 700 }}>
					{data.label}
				</Typography>
				
				<Chip
					label={data.status}
					size="small"
					color={data.status === "CRITICAL" ? "error" : data.status === "DELAYED" ? "warning" : "success"}
					sx={{ height: 18, fontSize: "0.6rem", fontWeight: 700, width: "100%" }}
				/>
				
				{data.stockLevel !== undefined && data.capacity !== undefined && (
					<Box sx={{ width: "100%", mt: 0.5 }}>
						<LinearProgress
							variant="determinate"
							value={(data.stockLevel / data.capacity) * 100}
							color={data.stockLevel < 20 ? "error" : "success"}
							sx={{ height: 4, borderRadius: 2 }}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
}
