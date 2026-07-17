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
	const { state, dispatch } = useAppContext(); // pull the global app state and the dispatch function to send actions to the reducer
	const theme = useTheme(); // gives us access to the active MUI theme (colors, shadows, spacing, etc.)
	const isDark = theme.palette.mode === "dark"; // true when the user has the dark theme enabled — used to switch colors throughout

	// useNodesState is a React Flow hook that returns 3 things:
	//   [0] nodes         — the current array of node objects React Flow will render on the canvas
	//   [1] setNodes      — a setter to replace the entire nodes array directly (bypasses React Flow's change system)
	//   [2] onNodesChange — a handler React Flow calls internally for every node event (drag, select, remove)
	// We seed it with the nodes already saved in global state so the graph matches what was last saved.
	const [nodes, setNodes, onNodesChange] = useNodesState(state.supplyChainNodes);

	// useEdgesState works the same way as useNodesState but for edges (the connecting lines between nodes):
	//   [0] edges         — current array of edge objects that React Flow renders as connecting lines
	//   [1] setEdges      — direct setter to replace the entire edges array
	//   [2] onEdgesChange — handler React Flow calls for edge change events (select, remove)
	const [edges, setEdges, onEdgesChange] = useEdgesState(state.supplyChainEdges);

	const [selectedNode, setSelectedNode] = useState<SCNode | null>(null); // tracks which node the user clicked so we can open its editor panel; null means nothing is selected
	const [isFullscreen, setIsFullscreen] = useState(false); // toggles the canvas between a fixed full-window overlay and its normal inline layout

	// nodeTypes tells React Flow which React component to render for each custom node type string.
	// For example, when a node has type "supplierNode", React Flow renders the <SupplierNode> component.
	//
	// IMPORTANT: this object MUST be wrapped in useMemo (or defined outside the component).
	// React Flow compares nodeTypes by reference on every render — if this object is re-created
	// each render, React Flow thinks the type definitions changed and tries to remount all nodes,
	// causing an infinite re-render loop and serious performance problems.
	const nodeTypes = useMemo(
		() => ({
			supplierNode: SupplierNode,   // renders for nodes with type === "supplierNode"
			warehouseNode: WarehouseNode, // renders for nodes with type === "warehouseNode"
			storeNode: StoreNode,         // renders for nodes with type === "storeNode"
		}),
		[] // empty dependency array — created once and never re-created, which is safe because these components never change
	);

	// This effect keeps the local React Flow state in sync whenever the global app state changes.
	// For example, when the user adds a node via the toolbar, the global state updates first,
	// and this effect then pushes that change into React Flow's local node/edge arrays.
	//
	// Dependency array explained:
	//   state.supplyChainNodes — re-run whenever the node list in global state changes (add/update/delete node)
	//   state.supplyChainEdges — re-run whenever the edge list in global state changes (add/delete edge)
	//   setNodes / setEdges   — stable references returned by useNodesState/useEdgesState; listed for ESLint but won't cause extra runs
	//   isDark                — re-run when the theme changes so edge colors are immediately recalculated to match the new theme
	useEffect(() => {
		// Push the latest nodes from global state into React Flow's local visual state
		setNodes(state.supplyChainNodes);
		
		// Dynamically compute edge styles based on the health status of the connected nodes.
		// We derive styling here rather than storing it in global state so that edge appearance
		// always reflects the live current status of nodes without any extra dispatches.
		const dynamicEdges = state.supplyChainEdges.map((edge) => {
			// Look up the actual node objects for both ends of this edge using their IDs
			const sourceNode = state.supplyChainNodes.find(n => n.id === edge.source); // the node this edge originates from
			const targetNode = state.supplyChainNodes.find(n => n.id === edge.target); // the node this edge points to

			// An edge is "disrupted" if either its source or target node has a problem status.
			// DELAYED = running slower than expected; CRITICAL = serious issue needing immediate attention.
			const isDisrupted = 
				(sourceNode && (sourceNode.data.status === "DELAYED" || sourceNode.data.status === "CRITICAL")) ||
				(targetNode && (targetNode.data.status === "DELAYED" || targetNode.data.status === "CRITICAL"));
				
			return {
				...edge, // keep all existing edge properties (id, source, target, label, etc.)
				animated: !isDisrupted, // healthy edges get a flowing "marching ants" animation; disrupted edges are shown as static dashes
				style: { 
					stroke: isDisrupted ? "#ef4444" : (isDark ? "#60a5fa" : "#3b82f6"), // red for disrupted edges; blue (dark/light variant) for healthy ones
					strokeWidth: isDisrupted ? 3 : 2,           // thicker line for disrupted edges so problems are immediately visible
					strokeDasharray: isDisrupted ? "5,5" : "none" // "5,5" creates a dashed pattern (5px dash, 5px gap) for disrupted; solid for healthy
				}
			};
		});
		
		setEdges(dynamicEdges); // push the re-styled edges into React Flow's local edge state so the canvas updates
	}, [state.supplyChainNodes, state.supplyChainEdges, setNodes, setEdges, isDark]);

	// onConnect is called by React Flow when the user draws a new connection between two nodes
	// by dragging from one node's handle (the small dot on the node border) to another node's handle.
	// React Flow passes a Connection object: { source, target, sourceHandle, targetHandle }
	// where source/target are node IDs and sourceHandle/targetHandle identify which port was used.
	//
	// useCallback keeps the function reference stable so React Flow's internals don't re-render
	// unnecessarily when this component re-renders for unrelated reasons.
	const onConnect = useCallback(
		(params: Connection | Edge) => {
			// Build a complete SCEdge (our custom edge type) from the raw Connection data
			const newEdge: SCEdge = {
				...params,                                 // spread source, target, sourceHandle, targetHandle from the Connection
				id: `e${params.source}-${params.target}`, // generate a unique and readable ID in the format "eSourceId-TargetId"
				animated: true,                            // new edges start with a flowing animation (healthy by default)
				style: { stroke: isDark ? "#60a5fa" : "#3b82f6", strokeWidth: 2 }, // themed blue color matching the current dark/light mode
			} as unknown as SCEdge;
			dispatch({ type: "ADD_SUPPLY_CHAIN_EDGE", payload: newEdge }); // persist the new edge to global state so it is not lost on navigation
		},
		[dispatch, isDark] // re-create only if dispatch reference or theme mode changes
	);

	// handleNodeClick is fired by React Flow whenever the user clicks on any node on the canvas.
	// The first argument (_) is the raw mouse event, which we ignore here.
	// The second argument is the full node object that was clicked.
	const handleNodeClick = useCallback(
		(_: React.MouseEvent, node: SCNode) => {
			setSelectedNode(node); // store the clicked node so the NodeEditorPanel sidebar can display and edit its properties
		},
		[] // no dependencies — setSelectedNode is a stable React state setter that never changes
	);

	// handlePaneClick is fired by React Flow when the user clicks on the empty canvas background (not on any node or edge).
	// We use it to deselect whatever node is currently selected, which hides the editor panel.
	const handlePaneClick = useCallback(() => {
		setSelectedNode(null);
	}, []);

	// handleNodesChange performs a TWO-STEP UPDATE whenever React Flow reports any node change event
	// (drag, select, delete, position update, etc.). This split is needed because:
	// - React Flow's local state must update instantly for smooth 60fps drag interactions
	// - Global state must also be updated for persistence, but only after dragging ends (not on every pixel moved)
	const handleNodesChange = useCallback(
		(changes: NodeChange<any>[]) => {
			// STEP 1 — immediately forward the changes to React Flow's internal state handler.
			// This keeps dragging feeling instant and smooth without waiting for a global store round-trip.
			onNodesChange(changes as any);

			// STEP 2 — after the user finishes dragging, save the final position to global state.
			// React Flow sends an array of change objects; we loop over each one.
			changes.forEach((change) => {
				// change.type === "position" means this change is about a node being moved.
				// change.dragging is true while the mouse button is still held — it becomes false (or undefined)
				// the moment the user releases the mouse, signalling the drag is complete.
				// We wait for !change.dragging so we dispatch only once with the settled final position,
				// not on every pixel moved during the drag.
				if (change.type === "position" && change.position && !change.dragging) {
					const node = state.supplyChainNodes.find((n) => n.id === change.id); // find the moved node in global state by its ID
					if (node) {
						dispatch({
							type: "UPDATE_SUPPLY_CHAIN_NODE",
							payload: { ...node, position: change.position }, // copy all existing node data and override only the position field
						});
					}
				}
			});
		},
		[onNodesChange, state.supplyChainNodes, dispatch]
		// depends on: the React Flow change handler, the node list (to look up node data by ID), and dispatch
	);

	// handleAddNode creates a brand-new supply chain node of the requested type and adds it to the graph.
	const handleAddNode = (type: SupplyChainNodeType) => {
		const newNode: SCNode = {
			id: `node_${Date.now()}`, // use the current timestamp (ms since epoch) as a unique ID — collisions are practically impossible
			// Map our semantic business type (SUPPLIER / WAREHOUSE / STORE) to the React Flow nodeType string
			// that selects which custom component renders this node on the canvas
			type: type === "SUPPLIER" ? "supplierNode" : type === "WAREHOUSE" ? "warehouseNode" : "storeNode",
			position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 }, // random position in the top-left area so new nodes don't stack exactly on top of each other
			data: {
				label: `New ${type}`,   // default display name shown inside the node card
				type: type,             // semantic type stored in the node's data for business logic (e.g., status rules)
				status: "NORMAL",       // all newly created nodes start in a healthy state
				details: "Newly added node.",
				stockLevel: 50,         // default stock starts at 50% of capacity
				capacity: 100,
			},
		};
		dispatch({ type: "ADD_SUPPLY_CHAIN_NODE", payload: newNode }); // save to global state — the useEffect above will then sync it into React Flow's canvas
		setSelectedNode(newNode); // immediately open the editor panel for this new node so the user can configure it right away
	};

	// handleReset wipes all current nodes and edges and restores the original demo data set.
	const handleReset = () => {
		dispatch({ type: "SET_SUPPLY_CHAIN_NODES", payload: DUMMY_SUPPLY_CHAIN_NODES }); // replace the entire node list with hard-coded demo nodes
		dispatch({ type: "SET_SUPPLY_CHAIN_EDGES", payload: DUMMY_SUPPLY_CHAIN_EDGES }); // replace the entire edge list with hard-coded demo edges
		setSelectedNode(null); // close the editor panel since the previously selected node no longer exists after the reset
	};

	return (
		// Outer page wrapper — flex column so the header row and editor area stack vertically
		<Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3, flex: 1, minHeight: 0 }}>
			{/* Page header row — title on the left, action buttons on the right */}
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
						onClick={() => handleAddNode("WAREHOUSE")} // always inserts a WAREHOUSE-type node from the toolbar
						sx={{ borderRadius: "10px" }}
					>
						Add Node
					</Button>
				</Box>
			</Box>

			{/* Main Editor Area — side-by-side layout: fixed-width left sidebar + flexible right canvas */}
			<Box sx={{ display: "flex", gap: 3, flex: 1, minHeight: 0 }}>
				
				{/* Left Sidebar — fixed at 320px wide; contains status stats widgets and the node editor panel */}
				<Box sx={{ width: 320, display: "flex", flexDirection: "column", gap: 2, flexShrink: 0, overflowY: "auto", pr: 1 }}>

					{/* Network Status Widget — counts nodes in each health category */}
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
								{nodes.filter(n => (n.data as any)?.status === "NORMAL").length} {/* count how many nodes are currently at NORMAL status */}
							</Typography>
						</Box>
						<Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
							<Typography variant="body2" color="text.secondary">Delayed</Typography>
							<Typography variant="body2" sx={{ fontWeight: 700, color: "warning.main" }}>
								{nodes.filter(n => (n.data as any)?.status === "DELAYED").length} {/* count nodes with DELAYED status */}
							</Typography>
						</Box>
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<Typography variant="body2" color="text.secondary">Critical</Typography>
							<Typography variant="body2" sx={{ fontWeight: 700, color: "error.main" }}>
								{nodes.filter(n => (n.data as any)?.status === "CRITICAL").length} {/* count nodes with CRITICAL status */}
							</Typography>
						</Box>
					</Box>

					{/* Inventory Value Widget — sums price × quantity for all products and shows total in thousands */}
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
							{/* sum (price × stockQuantity) across all products, divide by 1000 to get thousands, display as "$XXX.Xk" */}
							${(state.products.reduce((acc, p) => acc + (p.price * p.stockQuantity), 0) / 1000).toFixed(1)}k
						</Typography>
						<Typography variant="caption" color="text.secondary">Across all warehouses</Typography>
					</Box>

					{/* Active Deliveries Widget — shows orders that are currently on their way to customers */}
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
							{state.orders.filter(o => o.status === "SHIPPED").length} {/* count orders with SHIPPED status, meaning they are currently in transit */}
						</Typography>
						<Typography variant="caption" color="text.secondary">In transit today</Typography>
					</Box>

					{/* NodeEditorPanel is shown only when a node is selected (selectedNode !== null).
					    When selectedNode is null, the panel renders nothing (effectively hidden).
					    When a node is selected, it shows a form to edit that node's label, status,
					    stock level, capacity, and details — changes are dispatched to global state. */}
					<NodeEditorPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
				</Box>

				{/* Right Canvas — stretches to fill all remaining horizontal space beside the sidebar.
				    When isFullscreen is true, the Box becomes a fixed-position overlay covering the full viewport
				    at z-index 9999, sitting above all other page elements. */}
				<Box
					sx={isFullscreen ? {
						position: "fixed",  // pulls the element out of the normal document flow and anchors it to the viewport
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 9999,       // ensures the canvas covers the sidebar, header, and any other UI element
						backgroundColor: isDark ? "#0a0a0a" : "#f8fafc",
					} : {
						flex: 1,            // in normal mode, grow to fill all remaining width next to the sidebar
						borderRadius: "24px",
						overflow: "hidden", // clips the React Flow canvas so it doesn't render outside the rounded corners
						border: `1px solid ${theme.palette.divider}`,
						backgroundColor: isDark ? "#0a0a0a" : "#f8fafc",
						position: "relative", // needed so the absolute-positioned fullscreen button inside is positioned relative to this box
						boxShadow: theme.shadows[isDark ? 8 : 4], // stronger shadow in dark mode for better depth contrast
					}}
				>
					{/* Fullscreen toggle button — floats absolutely in the top-right corner of the canvas area */}
					<Button
						variant="contained"
						color="secondary"
						size="small"
						onClick={() => setIsFullscreen(!isFullscreen)}
						startIcon={isFullscreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />} // icon swaps based on current fullscreen state
						sx={{
							position: "absolute", // positioned relative to the parent Box (which has position: relative/fixed)
							top: 16,
							right: 16,
							zIndex: 10, // sits above the React Flow canvas layers but below the fullscreen overlay itself
							borderRadius: "8px",
						}}
					>
						{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
					</Button>
					{/* 
						ReactFlow is the core interactive canvas component from @xyflow/react.
						It handles canvas rendering, zooming, panning, node layout, and all
						interaction events through a prop-based event system.
					*/}
					<ReactFlow
						nodes={nodes as any[]}                   // the current node array from useNodesState — React Flow reads this to know what nodes to render
						edges={edges as any[]}                   // the current edge array from useEdgesState — React Flow reads this to draw the connecting lines
						onNodesChange={handleNodesChange as any} // our custom handler that does a two-step update (instant local + deferred global) on every node change
						onEdgesChange={onEdgesChange as any}     // the raw handler from useEdgesState — handles edge selection/deletion in local state only
						onConnect={onConnect}                    // fired when the user drags from one node's handle to another; we build an SCEdge and dispatch it
						onNodeClick={handleNodeClick as any}     // fired when the user clicks a node; we store it in selectedNode to open the editor panel
						onPaneClick={handlePaneClick}            // fired when the user clicks the empty canvas background; clears selectedNode to close the editor panel
						nodeTypes={nodeTypes}                    // the memoized map of type strings → React components; React Flow uses this to decide how to render each node
						fitView                                  // shorthand for fitView={true} — on first render, React Flow zooms/pans so all nodes fit inside the visible canvas area
						attributionPosition="bottom-right"
						proOptions={{ hideAttribution: true }}   // hides the "Powered by React Flow" watermark (permitted under the self-hosted license)
					>
						{/* Background renders the repeating dot-grid pattern behind all nodes and edges.
						    color sets the dot color; gap controls the distance (in pixels) between grid dots. */}
						<Background color={isDark ? "#333" : "#ccc"} gap={16} />

						{/* Controls renders the built-in zoom-in, zoom-out, fit-view, and lock-position buttons
						    in the bottom-left corner of the canvas, styled to match the MUI theme background. */}
						<Controls style={{ backgroundColor: theme.palette.background.paper }} />

						{/* MiniMap renders a small bird's-eye thumbnail of the entire graph in the bottom-right corner.
						    It is useful for navigating large supply chain graphs without losing context. */}
						<MiniMap
							// nodeColor is a function that receives each node and returns a hex color for its dot in the minimap thumbnail
							nodeColor={(n) => {
								if (n.type === "supplierNode") return isDark ? "#1e40af" : "#93c5fd";   // blue shades for supplier nodes
								if (n.type === "warehouseNode") return isDark ? "#86198f" : "#f0abfc"; // purple shades for warehouse nodes
								return isDark ? "#166534" : "#86efac";                                 // green shades for store nodes (the fallback/default)
							}}
							maskColor={isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)"} // semi-transparent overlay that dims the area of the minimap outside the current viewport rectangle
							style={{ backgroundColor: theme.palette.background.paper }} // make the minimap panel background match the MUI theme paper color
						/>
					</ReactFlow>
				</Box>
			</Box>
		</Box>
	);
}
