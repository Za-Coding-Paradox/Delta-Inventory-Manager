import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "../../../context/app-context";
import { SCNode } from "../../../config/types";
import { SupplyChainSidebar } from "./components/supply-chain-sidebar";
import { SupplyChainCanvas } from "./components/supply-chain-canvas";
import { SupplyChainHeader } from "./components/supply-chain-header";
import { useSupplyChainGraph } from "./hooks/use-supply-chain-graph";

export default function SupplyChainViewer() {
	const { state } = useAppContext();
	const [selectedNode, setSelectedNode] = useState<SCNode | null>(null);

	const {
		nodes, edges, onEdgesChange, onConnect,
		handleNodesChange, handleAddNode, handleReset, isDark
	} = useSupplyChainGraph(setSelectedNode);

	const handleNodeClick = useCallback((_: React.MouseEvent, node: SCNode) => setSelectedNode(node), []);
	const handlePaneClick = useCallback(() => setSelectedNode(null), []);
	const handleAddWarehouse = useCallback(() => handleAddNode("WAREHOUSE"), [handleAddNode]);

	return (
		<Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3, flex: 1, minHeight: 0 }}>
			<SupplyChainHeader onReset={handleReset} onAddNode={handleAddWarehouse} />
			<Box sx={{ display: "flex", gap: 3, flex: 1, minHeight: 0 }}>
				<SupplyChainSidebar 
					nodes={state.supplyChainNodes} 
					products={state.products} 
					orders={state.orders} 
					selectedNode={selectedNode} 
					onClosePanel={handlePaneClick} 
				/>
				<SupplyChainCanvas 
					nodes={nodes as any[]} 
					edges={edges as any[]} 
					onNodesChange={handleNodesChange as any} 
					onEdgesChange={onEdgesChange as any} 
					onConnect={onConnect} 
					onNodeClick={handleNodeClick as any} 
					onPaneClick={handlePaneClick} 
					isDark={isDark} 
				/>
			</Box>
		</Box>
	);
}
