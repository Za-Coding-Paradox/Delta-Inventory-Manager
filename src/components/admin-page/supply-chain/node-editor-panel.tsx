// src/components/admin-page/supply-chain/node-editor-panel.tsx
import { useState, useEffect } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	IconButton,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Slider,
	alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { motion, AnimatePresence } from "framer-motion";
import type { SCNode, SupplyChainNodeType, SupplyChainNodeStatus } from "../../../config/types";
import { useAppContext } from "../../../context/app-context";

interface Props {
	node: SCNode | null;
	onClose: () => void;
}

export default function NodeEditorPanel({ node, onClose }: Props) {
	const { dispatch } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const [form, setForm] = useState<SCNode | null>(null);

	useEffect(() => {
		if (node) {
			setForm({ ...node, data: { ...node.data } });
		} else {
			setForm(null);
		}
	}, [node]);

	const handleChange = (field: keyof SCNode["data"], value: any) => {
		if (!form) return;
		setForm({ ...form, data: { ...form.data, [field]: value } });
	};

	const handleSave = () => {
		if (form) {
			dispatch({ type: "UPDATE_SUPPLY_CHAIN_NODE", payload: form });
			onClose();
		}
	};

	const handleDelete = () => {
		if (form) {
			dispatch({ type: "DELETE_SUPPLY_CHAIN_NODE", payload: form.id });
			onClose();
		}
	};

	return (
		<AnimatePresence>
			{form && (
				<Box
					component={motion.div}
					initial={{ x: "100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: "100%", opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					sx={{
						width: "100%",
						flex: 1,
						backgroundColor: alpha(theme.palette.background.paper, 0.95),
						border: `1px solid ${theme.palette.divider}`,
						borderRadius: "16px",
						boxShadow: theme.shadows[1],
						display: "flex",
						flexDirection: "column",
						minHeight: 300,
					}}
				>
					<Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${theme.palette.divider}` }}>
						<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
							Edit Node
						</Typography>
						<IconButton size="small" onClick={onClose}>
							<CloseRoundedIcon />
						</IconButton>
					</Box>
					
					<Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
						<TextField
							label="Node ID"
							size="small"
							fullWidth
							disabled
							value={form.id}
						/>
						
						<TextField
							label="Label"
							size="small"
							fullWidth
							value={form.data.label}
							onChange={(e) => handleChange("label", e.target.value)}
						/>
						
						<FormControl size="small" fullWidth>
							<InputLabel>Type</InputLabel>
							<Select
								label="Type"
								value={form.data.type}
								onChange={(e) => {
									const newType = e.target.value as SupplyChainNodeType;
									handleChange("type", newType);
									setForm((f) => f ? { ...f, type: newType === "SUPPLIER" ? "supplierNode" : newType === "WAREHOUSE" ? "warehouseNode" : "storeNode" } : null);
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
								onChange={(e) => handleChange("status", e.target.value as SupplyChainNodeStatus)}
							>
								<MenuItem value="NORMAL">Normal</MenuItem>
								<MenuItem value="DELAYED">Delayed</MenuItem>
								<MenuItem value="CRITICAL">Critical</MenuItem>
							</Select>
						</FormControl>
						
						<TextField
							label="Details / Description"
							size="small"
							fullWidth
							multiline
							rows={3}
							value={form.data.details || ""}
							onChange={(e) => handleChange("details", e.target.value)}
						/>
						
						<Box sx={{ mt: 1 }}>
							<Typography variant="caption" color="text.secondary" gutterBottom>
								Stock Level: {form.data.stockLevel || 0} / {form.data.capacity || 100}
							</Typography>
							<Slider
								value={form.data.stockLevel || 0}
								max={form.data.capacity || 100}
								onChange={(_, v) => handleChange("stockLevel", v as number)}
								valueLabelDisplay="auto"
								color={form.data.stockLevel! < 20 ? "error" : "primary"}
							/>
						</Box>
						<Box>
							<Typography variant="caption" color="text.secondary" gutterBottom>
								Capacity: {form.data.capacity || 100}
							</Typography>
							<Slider
								value={form.data.capacity || 100}
								min={10}
								max={500}
								onChange={(_, v) => handleChange("capacity", v as number)}
								valueLabelDisplay="auto"
								color="secondary"
							/>
						</Box>
					</Box>
					
					<Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, display: "flex", gap: 1 }}>
						<Button
							variant="contained"
							fullWidth
							startIcon={<SaveRoundedIcon />}
							onClick={handleSave}
							sx={{ borderRadius: "8px" }}
						>
							Save
						</Button>
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
