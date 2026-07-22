import { useCallback, useEffect, useMemo } from "react";
import { useNodesState, useEdgesState, Connection, Edge, NodeChange } from "@xyflow/react";
import { useAppContext } from "../../../../context/app-context";
import { SCNode, SCEdge, SupplyChainNodeType } from "../../../../config/types";
import { DUMMY_SUPPLY_CHAIN_NODES, DUMMY_SUPPLY_CHAIN_EDGES } from "../../../../constants";
import { useTheme } from "@mui/material/styles";

export function useSupplyChainGraph(setSelectedNode: (n: SCNode | null) => void) {
	const { state, dispatch } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";
	const [nodes, setNodes, onNodesChange] = useNodesState(state.supplyChainNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(state.supplyChainEdges);

	useEffect(() => {
		setNodes(state.supplyChainNodes);
		const dynamicEdges = state.supplyChainEdges.map((edge) => {
			const sourceNode = state.supplyChainNodes.find(n => n.id === edge.source);
			const targetNode = state.supplyChainNodes.find(n => n.id === edge.target);
			const isDisrupted = (sourceNode && (sourceNode.data.status === "DELAYED" || sourceNode.data.status === "CRITICAL")) ||
								(targetNode && (targetNode.data.status === "DELAYED" || targetNode.data.status === "CRITICAL"));
			return {
				...edge,
				animated: !isDisrupted,
				style: { 
					stroke: isDisrupted ? "#ef4444" : (isDark ? "#60a5fa" : "#3b82f6"),
					strokeWidth: isDisrupted ? 3 : 2,
					strokeDasharray: isDisrupted ? "5,5" : "none"
				}
			};
		});
		setEdges(dynamicEdges);
	}, [state.supplyChainNodes, state.supplyChainEdges, setNodes, setEdges, isDark]);

	const onConnect = useCallback((params: Connection | Edge) => {
		const newEdge: SCEdge = {
			...params,
			id: `e${params.source}-${params.target}`,
			animated: true,
			style: { stroke: isDark ? "#60a5fa" : "#3b82f6", strokeWidth: 2 },
		} as unknown as SCEdge;
		dispatch({ type: "ADD_SUPPLY_CHAIN_EDGE", payload: newEdge });
	}, [dispatch, isDark]);

	const handleNodesChange = useCallback((changes: NodeChange<any>[]) => {
		onNodesChange(changes as any);
		changes.forEach((change) => {
			if (change.type === "position" && change.position && !change.dragging) {
				const node = state.supplyChainNodes.find((n) => n.id === change.id);
				if (node) {
					dispatch({ type: "UPDATE_SUPPLY_CHAIN_NODE", payload: { ...node, position: change.position } });
				}
			}
		});
	}, [onNodesChange, state.supplyChainNodes, dispatch]);

	const handleAddNode = useCallback((type: SupplyChainNodeType) => {
		const newNode: SCNode = {
			id: `node_${Date.now()}`,
			type: type === "SUPPLIER" ? "supplierNode" : type === "WAREHOUSE" ? "warehouseNode" : "storeNode",
			position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
			data: { label: `New ${type}`, type, status: "NORMAL", details: "Newly added node.", stockLevel: 50, capacity: 100 },
		};
		dispatch({ type: "ADD_SUPPLY_CHAIN_NODE", payload: newNode });
		setSelectedNode(newNode);
	}, [dispatch, setSelectedNode]);

	const handleReset = useCallback(() => {
		dispatch({ type: "SET_SUPPLY_CHAIN_NODES", payload: DUMMY_SUPPLY_CHAIN_NODES });
		dispatch({ type: "SET_SUPPLY_CHAIN_EDGES", payload: DUMMY_SUPPLY_CHAIN_EDGES });
		setSelectedNode(null);
	}, [dispatch, setSelectedNode]);

	return { nodes, edges, onNodesChange, onEdgesChange, onConnect, handleNodesChange, handleAddNode, handleReset, isDark };
}
