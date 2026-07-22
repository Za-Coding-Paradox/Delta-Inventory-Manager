import React from "react";
import { Handle, Position } from "@xyflow/react";
import { useTheme } from "@mui/material/styles";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import type { SupplyChainNodeData } from "../../../config/types";
import { BaseNode } from "./components/base-node";

interface Props {
	data: SupplyChainNodeData;
	selected: boolean;
}

export default React.memo(function StoreNode({ data, selected }: Props) {
	const theme = useTheme();

	return (
		<BaseNode data={data} selected={selected} icon={<StoreRoundedIcon fontSize="small" />} capacityLabel="Stock">
			<Handle type="target" position={Position.Left} style={{ width: 8, height: 8, backgroundColor: theme.palette.text.secondary, border: "none" }} />
		</BaseNode>
	);
});
