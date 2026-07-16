// src/components/admin-page/supply-chain/warehouse-node.tsx
import { Handle, Position } from "@xyflow/react";
import { Box, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import type { SupplyChainNodeData } from "../../../config/types";

interface Props {
	data: SupplyChainNodeData;
	selected: boolean;
}

export default function WarehouseNode({ data, selected }: Props) {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const getDotColor = () => {
		if (data.status === "CRITICAL") return theme.palette.error.main;
		if (data.status === "DELAYED") return theme.palette.warning.main;
		return theme.palette.success.main;
	};

	return (
		<Box
			sx={{
				minWidth: 160,
				borderRadius: "16px",
				border: `1px solid ${selected ? theme.palette.text.primary : theme.palette.divider}`,
				backgroundColor: "background.paper",
				boxShadow: selected
					? `0 0 0 2px ${alpha(theme.palette.text.primary, 0.2)}`
					: theme.shadows[isDark ? 4 : 1],
				transition: "all 0.2s ease",
				p: 2,
				position: "relative",
			}}
		>
			<Handle type="target" position={Position.Left} style={{ width: 8, height: 8, backgroundColor: theme.palette.text.secondary, border: "none" }} />
			<Handle type="source" position={Position.Right} style={{ width: 8, height: 8, backgroundColor: theme.palette.text.secondary, border: "none" }} />
			
			{/* Status Dot */}
			<Box
				sx={{
					position: "absolute",
					top: 12,
					right: 12,
					width: 10,
					height: 10,
					borderRadius: "50%",
					backgroundColor: getDotColor(),
					boxShadow: `0 0 4px ${getDotColor()}`,
				}}
			/>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<Box
						sx={{
							width: 32,
							height: 32,
							borderRadius: "8px",
							backgroundColor: alpha(theme.palette.text.primary, 0.05),
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "text.primary",
						}}
					>
						<Inventory2RoundedIcon fontSize="small" />
					</Box>
					<Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, flex: 1, pr: 2 }}>
						{data.label}
					</Typography>
				</Box>
				
				{data.capacity !== undefined && (
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
						<Typography variant="caption" color="text.secondary">Capacity</Typography>
						<Typography variant="caption" sx={{ fontWeight: 700 }}>{data.stockLevel || 0} / {data.capacity}</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
}
