// src/components/admin-page/supply-chain/node-editor-panel.tsx
// This panel slides in from the right side when the user clicks a node in the React Flow diagram.
// It provides a form to edit that node's data (label, type, status, stock, capacity).
import { useState, useEffect } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	IconButton,
	MenuItem, // a dropdown option inside a Select component
	Select,
	FormControl, // wrapper that groups a label + input for proper accessibility
	InputLabel, // the floating label above a Select or TextField
	Slider, // a draggable slider for numeric values (stock level, capacity)
	alpha, // MUI utility to add transparency to a color
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { motion, AnimatePresence } from "framer-motion"; // framer-motion: AnimatePresence enables exit animations; motion.div applies enter/exit transitions
import type { SCNode, SupplyChainNodeType, SupplyChainNodeStatus } from "../../../config/types";
import { useAppContext } from "../../../context/app-context";

// Props for this component:
// - node: the currently selected React Flow node (or null if nothing is selected)
// - onClose: called when the panel should be closed (X button, save, or delete)
interface Props {
	node: SCNode | null;
	onClose: () => void;
}

export default function NodeEditorPanel({ node, onClose }: Props) {
	const { dispatch } = useAppContext(); // we only need dispatch — no need to read state here
	const theme = useTheme();

	// Local form state: a copy of the selected node's data that the user can edit freely
	// without affecting global state until they press Save
	const [form, setForm] = useState<SCNode | null>(null);

	// Whenever the selected node changes (user clicks a different node),
	// reset the form with fresh data from the newly selected node.
	// We use spread ({...node, data: {...node.data}}) to make a SHALLOW COPY —
	// this ensures editing the form doesn't mutate the original node object in global state.
	useEffect(() => {
		if (node) {
			setForm({ ...node, data: { ...node.data } }); // copy both the node and its nested data object
		} else {
			setForm(null); // no node selected — hide the form
		}
	}, [node]); // re-run this effect whenever the `node` prop changes

	// Updates a single field in the form's data object.
	// field is typed as keyof SCNode["data"] — TypeScript ensures only valid data fields can be passed.
	const handleChange = (field: keyof SCNode["data"], value: any) => {
		if (!form) return;
		setForm({ ...form, data: { ...form.data, [field]: value } }); // [field] is computed property syntax — dynamically sets the key
	};

	// Pushes the updated node to global state and closes the panel
	const handleSave = () => {
		if (form) {
			dispatch({ type: "UPDATE_SUPPLY_CHAIN_NODE", payload: form }); // sends the updated node to the reducer
			onClose(); // close the panel after saving
		}
	};

	// Removes the node from global state and closes the panel
	const handleDelete = () => {
		if (form) {
			dispatch({ type: "DELETE_SUPPLY_CHAIN_NODE", payload: form.id }); // only needs the node ID to delete it
			onClose();
		}
	};

	return (
		// AnimatePresence from framer-motion watches for child components being added/removed.
		// Without it, the exit animation would not play — the component would just vanish instantly.
		<AnimatePresence>
			{form && ( // only render the panel when a node is selected
				<Box
					// component={motion.div} makes this MUI Box into a framer-motion animated element
					component={motion.div}
					initial={{ x: "100%", opacity: 0 }} // starts fully off-screen to the right and invisible
					animate={{ x: 0, opacity: 1 }} // slides into its natural position and becomes fully visible
					exit={{ x: "100%", opacity: 0 }} // slides back off-screen when the panel closes
					transition={{ duration: 0.3, ease: "easeOut" }} // controls the speed and acceleration curve
					sx={{
						width: "100%",
						flex: 1,
						backgroundColor: alpha(theme.palette.background.paper, 0.95), // slightly transparent background (95% opaque)
						border: `1px solid ${theme.palette.divider}`,
						borderRadius: "16px",
						boxShadow: theme.shadows[1],
						display: "flex",
						flexDirection: "column",
						minHeight: 300,
					}}
				>
					{/* Panel header with title and close button */}
					<Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${theme.palette.divider}` }}>
						<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
							Edit Node
						</Typography>
						<IconButton size="small" onClick={onClose}>
							<CloseRoundedIcon />
						</IconButton>
					</Box>

					{/* Scrollable form area */}
					<Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
						{/* Node ID field — read-only so the user can see it but can't accidentally change it */}
						<TextField
							label="Node ID"
							size="small"
							fullWidth
							disabled // the 'disabled' prop makes the field uneditable and grayed out
							value={form.id}
						/>

						<TextField
							label="Label"
							size="small"
							fullWidth
							value={form.data.label}
							onChange={(e) => handleChange("label", e.target.value)} // updates only the label field in the form state
						/>

						{/* FormControl wraps Select with a proper floating label (required for MUI accessibility) */}
						<FormControl size="small" fullWidth>
							<InputLabel>Type</InputLabel>
							<Select
								label="Type"
								value={form.data.type}
								onChange={(e) => {
									const newType = e.target.value as SupplyChainNodeType; // cast to the specific allowed type union
									handleChange("type", newType); // update the data.type field
									// Also update the node's 'type' string used by React Flow to pick the correct node renderer component
									setForm((f) => f ? {
										...f,
										// Map our data type ("SUPPLIER", "WAREHOUSE", "STORE") to React Flow node type strings
										type: newType === "SUPPLIER" ? "supplierNode" : newType === "WAREHOUSE" ? "warehouseNode" : "storeNode"
									} : null);
								}}
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
								// Cast the selected value to the SupplyChainNodeStatus type so TypeScript accepts it
								onChange={(e) => handleChange("status", e.target.value as SupplyChainNodeStatus)}
							>
								<MenuItem value="NORMAL">Normal</MenuItem>
								<MenuItem value="DELAYED">Delayed</MenuItem>
								<MenuItem value="CRITICAL">Critical</MenuItem>
							</Select>
						</FormControl>

						{/* multiline + rows={3} turns the TextField into a textarea */}
						<TextField
							label="Details / Description"
							size="small"
							fullWidth
							multiline
							rows={3}
							value={form.data.details || ""} // use empty string if details is undefined
							onChange={(e) => handleChange("details", e.target.value)}
						/>

						{/* MUI Slider for stock level — more intuitive than typing a number for a visual stock indicator */}
						<Box sx={{ mt: 1 }}>
							<Typography variant="caption" color="text.secondary" gutterBottom>
								Stock Level: {form.data.stockLevel || 0} / {form.data.capacity || 100}
							</Typography>
							<Slider
								value={form.data.stockLevel || 0} // current slider position
								max={form.data.capacity || 100} // slider max matches the node's capacity
								onChange={(_, v) => handleChange("stockLevel", v as number)} // _ is the event (we don't need it); v is the new value
								valueLabelDisplay="auto" // shows the numeric value in a tooltip when the slider is being dragged
								color={form.data.stockLevel! < 20 ? "error" : "primary"} // turns red when stock is critically low (< 20)
							/>
						</Box>

						{/* Slider for capacity (the total possible storage this node can hold) */}
						<Box>
							<Typography variant="caption" color="text.secondary" gutterBottom>
								Capacity: {form.data.capacity || 100}
							</Typography>
							<Slider
								value={form.data.capacity || 100}
								min={10} // minimum capacity is 10 units
								max={500} // maximum capacity is 500 units
								onChange={(_, v) => handleChange("capacity", v as number)}
								valueLabelDisplay="auto"
								color="secondary"
							/>
						</Box>
					</Box>

					{/* Footer action buttons */}
					<Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, display: "flex", gap: 1 }}>
						<Button
							variant="contained"
							fullWidth
							startIcon={<SaveRoundedIcon />} // icon appears to the left of the button text
							onClick={handleSave}
							sx={{ borderRadius: "8px" }}
						>
							Save
						</Button>
						{/* Icon-only delete button — minWidth: 48 prevents it shrinking too small; p: 0 removes default padding */}
						<Button
							variant="outlined"
							color="error"
							onClick={handleDelete}
							sx={{ minWidth: 48, p: 0, borderRadius: "8px" }}
						>
							<DeleteRoundedIcon />
						</Button>
					</Box>
				</Box>
			)}
		</AnimatePresence>
	);
}
