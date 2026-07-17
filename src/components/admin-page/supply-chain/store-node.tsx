// src/components/admin-page/supply-chain/store-node.tsx
// This is a custom React Flow node component that visually represents a retail STORE
// in the supply chain diagram. React Flow renders it on the canvas based on the node's type.
import { Handle, Position } from "@xyflow/react"; // Handle = the small dot on the node's edge that users drag to create connections; Position = enum for Left/Right/Top/Bottom
import { Box, Typography, alpha } from "@mui/material"; // alpha() is an MUI utility that adds opacity to a color (e.g., alpha("#000", 0.2) = rgba(0,0,0,0.2))
import { useTheme } from "@mui/material/styles"; // reads the current MUI theme so we can use its colors
import StoreRoundedIcon from "@mui/icons-material/StoreRounded"; // the icon displayed inside the node card
import type { SupplyChainNodeData } from "../../../config/types"; // TypeScript type for the data stored on each node

// Props passed to this component by React Flow automatically:
// - data: the custom data object attached to this node (label, status, stockLevel, etc.)
// - selected: true when the user has clicked on this node
interface Props {
	data: SupplyChainNodeData;
	selected: boolean;
}

export default function StoreNode({ data, selected }: Props) {
	const theme = useTheme(); // access the current MUI theme (colors, shadows, etc.)
	const isDark = theme.palette.mode === "dark"; // true if the app is in dark mode

	// Returns a color based on the node's operational status.
	// This drives the colored dot in the top-right corner of the node card.
	const getDotColor = () => {
		if (data.status === "CRITICAL") return theme.palette.error.main; // red — serious problem
		if (data.status === "DELAYED") return theme.palette.warning.main; // orange — slow/delayed
		return theme.palette.success.main; // green — everything is fine
	};

	return (
		<Box
			sx={{
				minWidth: 160, // ensure the card is never too narrow to read
				borderRadius: "16px", // rounded corners
				// Border changes color when selected (white/dark outline) vs unselected (subtle divider line)
				border: `1px solid ${selected ? theme.palette.text.primary : theme.palette.divider}`,
				backgroundColor: "background.paper", // uses the theme's paper color (white in light, dark grey in dark mode)
				// Box shadow: thicker glow ring when selected, subtle shadow when not
				boxShadow: selected
					? `0 0 0 2px ${alpha(theme.palette.text.primary, 0.2)}` // alpha() makes the shadow semi-transparent
					: theme.shadows[isDark ? 4 : 1], // deeper shadow in dark mode for visibility
				transition: "all 0.2s ease", // smoothly animate shadow/border changes on selection
				p: 2, // padding = 16px (MUI spacing unit × 8)
				position: "relative", // needed so the status dot can be positioned absolutely inside this box
			}}
		>
			{/*
				Handle is a React Flow component that renders a circular connection point on the node's edge.
				type="target" means edges can POINT TO this node (stores receive goods, they don't send them out).
				position={Position.Left} places the handle on the left side of the node card.
				The style overrides make the handle match the app's design system instead of the default React Flow appearance.
			*/}
			<Handle
				type="target"
				position={Position.Left}
				style={{
					width: 8,
					height: 8,
					backgroundColor: theme.palette.text.secondary,
					border: "none",
				}}
			/>

			{/* Status dot: a small colored circle positioned in the top-right corner of the card */}
			<Box
				sx={{
					position: "absolute", // removed from the normal document flow so it floats over the card
					top: 12,
					right: 12,
					width: 10,
					height: 10,
					borderRadius: "50%", // makes the box a perfect circle
					backgroundColor: getDotColor(), // green/orange/red based on status
					boxShadow: `0 0 4px ${getDotColor()}`, // glowing effect — same color as the dot but blurred outward
				}}
			/>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					{/* Icon container */}
					<Box
						sx={{
							width: 32,
							height: 32,
							borderRadius: "8px",
							backgroundColor: alpha(theme.palette.text.primary, 0.05), // very subtle background tint
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "text.primary",
						}}
					>
						<StoreRoundedIcon fontSize="small" />
					</Box>
					{/* noWrap prevents the label from wrapping to a second line; flex: 1 makes it take remaining space; pr: 2 adds padding-right to avoid overlapping the status dot */}
					<Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, flex: 1, pr: 2 }}>
						{data.label} {/* the human-readable name of this node, e.g. "Main Store" */}
					</Typography>
				</Box>

				{/* Stock display: only shown if the node has stockLevel and capacity data */}
				{data.stockLevel !== undefined && data.capacity !== undefined && (
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
						<Typography variant="caption" color="text.secondary">Stock</Typography>
						<Typography variant="caption" sx={{ fontWeight: 700 }}>{data.stockLevel} / {data.capacity}</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
}
