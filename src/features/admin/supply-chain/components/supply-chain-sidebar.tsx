import { Box } from "@mui/material";
import React from "react";
import { SCNode, Product, Order } from "../../../../config/types";
import { NetworkStatusWidget } from "./network-status-widget";
import { InventoryValueWidget } from "./inventory-value-widget";
import { ActiveDeliveriesWidget } from "./active-deliveries-widget";
import NodeEditorPanel from "../node-editor-panel";

export interface SupplyChainSidebarProps {
	nodes: SCNode[];
	products: Product[];
	orders: Order[];
	selectedNode: SCNode | null;
	onClosePanel: () => void;
}

export const SupplyChainSidebar = React.memo(function SupplyChainSidebar({
	nodes,
	products,
	orders,
	selectedNode,
	onClosePanel
}: SupplyChainSidebarProps) {
	return (
		<Box sx={{ width: 320, display: "flex", flexDirection: "column", gap: 2, flexShrink: 0, overflowY: "auto", pr: 1 }}>
			<NetworkStatusWidget nodes={nodes} />
			<InventoryValueWidget products={products} />
			<ActiveDeliveriesWidget orders={orders} />
			<NodeEditorPanel node={selectedNode} onClose={onClosePanel} />
		</Box>
	);
});
