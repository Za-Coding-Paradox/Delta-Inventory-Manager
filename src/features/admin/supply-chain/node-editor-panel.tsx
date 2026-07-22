import { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Typography, IconButton, alpha, useTheme, SxProps, Theme } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence } from "framer-motion";
import type { SCNode, SupplyChainNodeType } from "../../../config/types";
import { useAppContext } from "../../../context/app-context";
import { NodeEditorFields } from "./components/node-editor-fields";
import { NodeEditorSliders } from "./components/node-editor-sliders";
import { NodeEditorActions } from "./components/node-editor-actions";

interface Props { node: SCNode | null; onClose: () => void; }

export default function NodeEditorPanel({ node, onClose }: Props) {
	const { dispatch } = useAppContext();
	const theme = useTheme();
	const [form, setForm] = useState<SCNode | null>(null);

	useEffect(() => { setForm(node ? { ...node, data: { ...node.data } } : null); }, [node]);

	const handleChange = useCallback((field: keyof SCNode["data"], val: any) => {
		setForm((f) => (f ? { ...f, data: { ...f.data, [field]: val } } : null));
	}, []);

	const handleTypeChange = useCallback((newType: SupplyChainNodeType) => {
		setForm((f) => {
			if (!f) return null;
			const t = newType === "SUPPLIER" ? "supplierNode" : newType === "WAREHOUSE" ? "warehouseNode" : "storeNode";
			return { ...f, type: t, data: { ...f.data, type: newType } };
		});
	}, []);

	const handleSave = useCallback(() => {
		if (form) { dispatch({ type: "UPDATE_SUPPLY_CHAIN_NODE", payload: form }); onClose(); }
	}, [form, dispatch, onClose]);

	const handleDelete = useCallback(() => {
		if (form) { dispatch({ type: "DELETE_SUPPLY_CHAIN_NODE", payload: form.id }); onClose(); }
	}, [form, dispatch, onClose]);

	const sx = useMemo<SxProps<Theme>>(() => ({
		width: "100%", flex: 1, backgroundColor: alpha(theme.palette.background.paper, 0.95),
		border: `1px solid ${theme.palette.divider}`, borderRadius: "16px", boxShadow: theme.shadows[1],
		display: "flex", flexDirection: "column", minHeight: 300,
	}), [theme]);

	return (
		<AnimatePresence>
			{form && (
				<Box component={motion.div} initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ duration: 0.3 }} sx={sx}>
					<Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${theme.palette.divider}` }}>
						<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Edit Node</Typography>
						<IconButton size="small" onClick={onClose}><CloseRoundedIcon /></IconButton>
					</Box>
					<Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
						<NodeEditorFields form={form} onChange={handleChange} onTypeChange={handleTypeChange} />
						<NodeEditorSliders form={form} onChange={handleChange} />
					</Box>
					<NodeEditorActions onSave={handleSave} onDelete={handleDelete} />
				</Box>
			)}
		</AnimatePresence>
	);
}
