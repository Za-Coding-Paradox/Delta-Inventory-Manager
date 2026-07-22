import React, { memo } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SCNode, SupplyChainNodeType, SupplyChainNodeStatus } from "../../../../config/types";

interface Props {
	form: SCNode;
	onChange: (field: keyof SCNode["data"], value: any) => void;
	onTypeChange: (newType: SupplyChainNodeType) => void;
}

export const NodeEditorFields = memo(({ form, onChange, onTypeChange }: Props) => (
	<>
		<TextField label="Node ID" size="small" fullWidth disabled value={form.id} />
		<TextField
			label="Label" size="small" fullWidth value={form.data.label}
			onChange={(e) => onChange("label", e.target.value)}
		/>
		<FormControl size="small" fullWidth>
			<InputLabel>Type</InputLabel>
			<Select
				label="Type"
				value={form.data.type}
				onChange={(e) => onTypeChange(e.target.value as SupplyChainNodeType)}
			>
				<MenuItem value="SUPPLIER">Supplier</MenuItem>
				<MenuItem value="WAREHOUSE">Warehouse</MenuItem>
				<MenuItem value="STORE">Store</MenuItem>
			</Select>
		</FormControl>
		<FormControl size="small" fullWidth>
			<InputLabel>Status</InputLabel>
			<Select
				label="Status"
				value={form.data.status}
				onChange={(e) => onChange("status", e.target.value as SupplyChainNodeStatus)}
			>
				<MenuItem value="NORMAL">Normal</MenuItem>
				<MenuItem value="DELAYED">Delayed</MenuItem>
				<MenuItem value="CRITICAL">Critical</MenuItem>
			</Select>
		</FormControl>
		<TextField
			label="Details / Description" size="small" fullWidth multiline rows={3}
			value={form.data.details || ""} onChange={(e) => onChange("details", e.target.value)}
		/>
	</>
));
