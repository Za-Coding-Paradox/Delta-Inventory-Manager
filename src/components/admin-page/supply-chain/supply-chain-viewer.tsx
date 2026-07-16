// src/components/admin-page/supply-chain/supply-chain-viewer.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import type {
	Connection,
	Edge,
	NodeChange,
} from "@xyflow/react";
import {
	ReactFlow,
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
import { useAppContext } from "../../../context/app-context";
import SupplierNode from "./supplier-node";
import WarehouseNode from "./warehouse-node";
import StoreNode from "./store-node";
import NodeEditorPanel from "./node-editor-panel";
import type { SCNode, SCEdge, SupplyChainNodeType } from "../../../config/types";
import { DUMMY_SUPPLY_CHAIN_NODES, DUMMY_SUPPLY_CHAIN_EDGES } from "../../../config/constants";

export default function SupplyChainViewer() {
	const { state, dispatch } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const [nodes, setNodes, onNodesChange] = useNodesState(state.supplyChainNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(state.supplyChainEdges);

	const [selectedNode, setSelectedNode] = useState<SCNode | null>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const nodeTypes = useMemo(
		() => ({
			supplierNode: SupplierNode,
			warehouseNode: WarehouseNode,
			storeNode: StoreNode,
		}),
		[]
	);

	// Sync local flow state with context when context changes (e.g. after edit/delete)
	// In a real app we might debounce this or handle it more carefully
	useEffect(() => {
		setNodes(state.supplyChainNodes);
		setEdges(state.supplyChainEdges);
	}, [state.supplyChainNodes, state.supplyChainEdges, setNodes, setEdges]);

	const onConnect = useCallback(
		(params: Connection | Edge) => {
			const newEdge: SCEdge = {
				...params,
				id: `e${params.source}-${params.target}`,
				animated: true,
				style: { stroke: isDark ? "#60a5fa" : "#3b82f6", strokeWidth: 2 },
			} as unknown as SCEdge;
			dispatch({ type: "ADD_SUPPLY_CHAIN_EDGE", payload: newEdge });
		},
		[dispatch, isDark]
	);

	const handleNodeClick = useCallback(
		(_: React.MouseEvent, node: SCNode) => {
			setSelectedNode(node);
		},
		[]
	);

	const handlePaneClick = useCallback(() => {
		setSelectedNode(null);
	}, []);

	// Flow events
	const handleNodesChange = useCallback(
		(changes: NodeChange<any>[]) => {
			onNodesChange(changes as any);
			// Update position in global state if dragged
			changes.forEach((change) => {
				if (change.type === "position" && change.position && !change.dragging) {
					const node = state.supplyChainNodes.find((n) => n.id === change.id);
					if (node) {
						dispatch({
							type: "UPDATE_SUPPLY_CHAIN_NODE",
							payload: { ...node, position: change.position },
						});
					}
				}
			});
		},
		[onNodesChange, state.supplyChainNodes, dispatch]
	);

	const handleAddNode = (type: SupplyChainNodeType) => {
		const newNode: SCNode = {
			id: `node_${Date.now()}`,
			type: type === "SUPPLIER" ? "supplierNode" : type === "WAREHOUSE" ? "warehouseNode" : "storeNode",
			position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
			data: {
				label: `New ${type}`,
				type: type,
				status: "NORMAL",
				details: "Newly added node.",
				stockLevel: 50,
				capacity: 100,
			},
		};
		dispatch({ type: "ADD_SUPPLY_CHAIN_NODE", payload: newNode });
		setSelectedNode(newNode);
	};

	const handleReset = () => {
		dispatch({ type: "SET_SUPPLY_CHAIN_NODES", payload: DUMMY_SUPPLY_CHAIN_NODES });
		dispatch({ type: "SET_SUPPLY_CHAIN_EDGES", payload: DUMMY_SUPPLY_CHAIN_EDGES });
		setSelectedNode(null);
	};

	return (
		<Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3, flex: 1, minHeight: 0 }}>
			<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
				<Box>
					<Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-1px" }}>
						Supply Chain Editor
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Design and monitor your logistics network with a visual node graph.
					</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 1 }}>
					<Button
						variant="outlined"
						startIcon={<RestoreRoundedIcon />}
						onClick={handleReset}
						sx={{ borderRadius: "10px" }}
					>
						Reset
					</Button>
					<Button
						variant="contained"
						startIcon={<AddRoundedIcon />}
						onClick={() => handleAddNode("WAREHOUSE")}
						sx={{ borderRadius: "10px" }}
					>
						Add Node
					</Button>
				</Box>
			</Box>

			{/* Main Editor Area */}
			<Box sx={{ display: "flex", gap: 3, flex: 1, minHeight: 0 }}>
				
				{/* Left Sidebar (Fixed) */}
				<Box sx={{ width: 320, display: "flex", flexDirection: "column", gap: 2, flexShrink: 0, overflowY: "auto", pr: 1 }}>
					{/* Status Summary Widget */}
					<Box
						sx={{
							backgroundColor: "background.paper",
							p: 2,
							borderRadius: "16px",
							boxShadow: theme.shadows[1],
							border: `1px solid ${theme.palette.divider}`,
						}}
					>
						<Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>Network Status</Typography>
						<Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
							<Typography variant="body2" color="text.secondary">Healthy Nodes</Typography>
							<Typography variant="body2" sx={{ fontWeight: 700, color: "success.main" }}>
								{nodes.filter(n => (n.data as any)?.status === "NORMAL").length}
							</Typography>
						</Box>
						<Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
							<Typography variant="body2" color="text.secondary">Delayed</Typography>
							<Typography variant="body2" sx={{ fontWeight: 700, color: "warning.main" }}>
								{nodes.filter(n => (n.data as any)?.status === "DELAYED").length}
							</Typography>
						</Box>
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<Typography variant="body2" color="text.secondary">Critical</Typography>
							<Typography variant="body2" sx={{ fontWeight: 700, color: "error.main" }}>
								{nodes.filter(n => (n.data as any)?.status === "CRITICAL").length}
							</Typography>
						</Box>
					</Box>

					<Box
						sx={{
							backgroundColor: "background.paper",
							p: 2,
							borderRadius: "16px",
							boxShadow: theme.shadows[1],
							border: `1px solid ${theme.palette.divider}`,
						}}
					>
						<Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>Inventory Value</Typography>
						<Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
							$1.24M
						</Typography>
						<Typography variant="caption" color="text.secondary">Across all warehouses</Typography>
					</Box>

					{/* Active Deliveries Widget */}
					<Box
						sx={{
							backgroundColor: "background.paper",
							p: 2,
							borderRadius: "16px",
							boxShadow: theme.shadows[1],
							border: `1px solid ${theme.palette.divider}`,
						}}
					>
						<Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>Active Deliveries</Typography>
						<Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
							42
						</Typography>
						<Typography variant="caption" color="text.secondary">In transit today</Typography>
					</Box>

					<NodeEditorPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
				</Box>

				{/* Right Canvas (Flexible) */}
				<Box
					sx={isFullscreen ? {
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 9999,
						backgroundColor: isDark ? "#0a0a0a" : "#f8fafc",
					} : {
						flex: 1,
						borderRadius: "24px",
						overflow: "hidden",
						border: `1px solid ${theme.palette.divider}`,
						backgroundColor: isDark ? "#0a0a0a" : "#f8fafc",
						position: "relative",
						boxShadow: theme.shadows[isDark ? 8 : 4],
					}}
				>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						onClick={() => setIsFullscreen(!isFullscreen)}
						startIcon={isFullscreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />}
						sx={{
							position: "absolute",
							top: 16,
							right: 16,
							zIndex: 10,
							borderRadius: "8px",
						}}
					>
						{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
					</Button>
					<ReactFlow
						nodes={nodes as any[]}
						edges={edges as any[]}
						onNodesChange={handleNodesChange as any}
						onEdgesChange={onEdgesChange as any}
						onConnect={onConnect}
						onNodeClick={handleNodeClick as any}
						onPaneClick={handlePaneClick}
						nodeTypes={nodeTypes}
						fitView
						attributionPosition="bottom-right"
						proOptions={{ hideAttribution: true }}
					>
						<Background color={isDark ? "#333" : "#ccc"} gap={16} />
						<Controls style={{ backgroundColor: theme.palette.background.paper }} />
						<MiniMap
							nodeColor={(n) => {
								if (n.type === "supplierNode") return isDark ? "#1e40af" : "#93c5fd";
								if (n.type === "warehouseNode") return isDark ? "#86198f" : "#f0abfc";
								return isDark ? "#166534" : "#86efac";
							}}
							maskColor={isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)"}
							style={{ backgroundColor: theme.palette.background.paper }}
						/>
					</ReactFlow>
				</Box>
			</Box>
		</Box>
	);
}
