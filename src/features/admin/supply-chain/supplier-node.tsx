// src/components/admin-page/supply-chain/supplier-node.tsx
// This is a custom React Flow node that visually represents a SUPPLIER in the supply chain diagram.
// Suppliers are the START of the chain — they ship goods outward to warehouses.
import { Handle, Position } from "@xyflow/react"; // Handle = connection dot; Position = which side of the node
import { Box, Typography, alpha } from "@mui/material"; // alpha() adds transparency to a color
import { useTheme } from "@mui/material/styles"; // reads MUI theme colors
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded"; // truck icon — represents shipping/supply
import type { SupplyChainNodeData } from "../../../config/types";

interface Props {
	data: SupplyChainNodeData; // custom data for this node (label, status, capacity, etc.)
	selected: boolean; // true when the user has clicked this node in the React Flow canvas
}

export default function SupplierNode({ data, selected }: Props) {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	// Returns the appropriate status indicator color based on the node's health
	const getDotColor = () => {
		if (data.status === "CRITICAL") return theme.palette.error.main; // red
		if (data.status === "DELAYED") return theme.palette.warning.main; // orange
		return theme.palette.success.main; // green
	};

	return (
		<Box
			sx={{
				minWidth: 160,
				borderRadius: "16px",
				border: `1px solid ${selected ? theme.palette.text.primary : theme.palette.divider}`, // highlight border when selected
				backgroundColor: "background.paper",
				boxShadow: selected
					? `0 0 0 2px ${alpha(theme.palette.text.primary, 0.2)}` // ring glow effect when selected
					: theme.shadows[isDark ? 4 : 1],
				transition: "all 0.2s ease",
				p: 2,
				position: "relative", // needed so status dot can use absolute positioning
			}}
		>
			{/*
				Handle with type="source" means this node can SEND edges out to other nodes.
				Suppliers initiate the supply chain flow, so they only have an outgoing (source) handle.
				position={Position.Right} puts the connection point on the right side of the card.
				When a user drags from this dot to another node, it creates a new edge in the diagram.
			*/}
			<Handle
				type="source"
				position={Position.Right}
				style={{
					width: 8,
					height: 8,
					backgroundColor: theme.palette.text.secondary,
					border: "none",
				}}
			/>

			{/* Colored status dot in the top-right corner — glows with the status color */}
			<Box
				sx={{
					position: "absolute",
					top: 12,
					right: 12,
					width: 10,
					height: 10,
					borderRadius: "50%", // makes this a perfect circle
					backgroundColor: getDotColor(),
					boxShadow: `0 0 4px ${getDotColor()}`, // soft outer glow matching the dot color
				}}
			/>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					{/* Icon wrapper */}
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
						<LocalShippingRoundedIcon fontSize="small" />
					</Box>
					{/* pr: 2 prevents the text from overlapping the status dot in the top-right corner */}
					<Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, flex: 1, pr: 2 }}>
						{data.label}
					</Typography>
				</Box>

				{/* Capacity info — only shown if the node has capacity data defined */}
				{data.capacity !== undefined && (
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
						<Typography variant="caption" color="text.secondary">Capacity</Typography>
						{/* data.stockLevel || 0 uses 0 as fallback if stockLevel is undefined */}
						<Typography variant="caption" sx={{ fontWeight: 700 }}>{data.stockLevel || 0} / {data.capacity}</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
}
