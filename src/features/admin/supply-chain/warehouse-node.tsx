import React from "react";
import { Handle, Position } from "@xyflow/react";
import { useTheme } from "@mui/material/styles";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import type { SupplyChainNodeData } from "../../../config/types";
import { BaseNode } from "./components/base-node";

interface Props {
	data: SupplyChainNodeData;
	selected: boolean;
}

export default React.memo(function WarehouseNode({ data, selected }: Props) {
	const theme = useTheme();

	return (
		<BaseNode data={data} selected={selected} icon={<Inventory2RoundedIcon fontSize="small" />} capacityLabel="Capacity">
			<Handle type="target" position={Position.Left} style={{ width: 8, height: 8, backgroundColor: theme.palette.text.secondary, border: "none" }} />
			<Handle type="source" position={Position.Right} style={{ width: 8, height: 8, backgroundColor: theme.palette.text.secondary, border: "none" }} />
		</BaseNode>
	);
});
