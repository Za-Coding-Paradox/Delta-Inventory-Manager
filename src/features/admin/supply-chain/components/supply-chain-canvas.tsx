import { Box, Button } from "@mui/material";
import React, { useMemo, useState } from "react";
import { ReactFlow, MiniMap, Controls, Background, Connection, Edge, NodeChange } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
import { useTheme } from "@mui/material/styles";
import SupplierNode from "../supplier-node";
import WarehouseNode from "../warehouse-node";
import StoreNode from "../store-node";
import { SCNode } from "../../../../config/types";

export interface SupplyChainCanvasProps {
	nodes: any[];
	edges: any[];
	onNodesChange: (changes: NodeChange[]) => void;
	onEdgesChange: (changes: any) => void;
	onConnect: (params: Connection | Edge) => void;
	onNodeClick: (_: React.MouseEvent, node: SCNode) => void;
	onPaneClick: () => void;
	isDark: boolean;
}

export const SupplyChainCanvas = React.memo(function SupplyChainCanvas({
	nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick, onPaneClick, isDark
}: SupplyChainCanvasProps) {
	const theme = useTheme();
	const [isFullscreen, setIsFullscreen] = useState(false);

	const nodeTypes = useMemo(() => ({
		supplierNode: SupplierNode, warehouseNode: WarehouseNode, storeNode: StoreNode,
	}), []);

	const minimapColor = (n: any) => {
		if (n.type === "supplierNode") return isDark ? "#1e40af" : "#93c5fd";
		if (n.type === "warehouseNode") return isDark ? "#86198f" : "#f0abfc";
		return isDark ? "#166534" : "#86efac";
	};

	return (
		<Box sx={isFullscreen ? { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: isDark ? "#0a0a0a" : "#f8fafc" } : { flex: 1, borderRadius: "24px", overflow: "hidden", border: `1px solid ${theme.palette.divider}`, backgroundColor: isDark ? "#0a0a0a" : "#f8fafc", position: "relative", boxShadow: theme.shadows[isDark ? 8 : 4] }}>
			<Button variant="contained" color="secondary" size="small" onClick={() => setIsFullscreen(!isFullscreen)} startIcon={isFullscreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />} sx={{ position: "absolute", top: 16, right: 16, zIndex: 10, borderRadius: "8px" }}>
				{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
			</Button>
			<ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={onNodeClick as any} onPaneClick={onPaneClick} nodeTypes={nodeTypes} fitView attributionPosition="bottom-right" proOptions={{ hideAttribution: true }}>
				<Background color={isDark ? "#333" : "#ccc"} gap={16} />
				<Controls style={{ backgroundColor: theme.palette.background.paper }} />
				<MiniMap nodeColor={minimapColor} maskColor={isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)"} style={{ backgroundColor: theme.palette.background.paper }} />
			</ReactFlow>
		</Box>
	);
});
