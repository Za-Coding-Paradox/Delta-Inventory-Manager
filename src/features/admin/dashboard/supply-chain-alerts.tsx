import { Box, Typography, Chip } from "@mui/material";
import { useAppContext } from "../../../context/app-context";
import { motion, AnimatePresence } from "framer-motion";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { WidgetCard } from "../../../components/data-display/WidgetCard";
import { AlertItem } from "./components/alert-item";
import { useMemo } from "react";

export default function SupplyChainAlerts() {
	const { state } = useAppContext();

	const alerts = useMemo(() => state.supplyChainNodes.filter(
		(n) => n.data.status === "DELAYED" || n.data.status === "CRITICAL"
	), [state.supplyChainNodes]);

	const headerAction = (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			<WarningRoundedIcon sx={{ color: "warning.main" }} />
			<Chip label={`${alerts.length} Issues`} size="small" color={alerts.length > 0 ? "warning" : "success"} />
		</Box>
	);

	return (
		<WidgetCard title="Supply Chain Alerts" headerAction={headerAction} sx={{ flex: 1, minWidth: 320, height: "100%", maxHeight: 400 }} contentSx={{ overflowY: "auto", pr: 1, display: "flex", flexDirection: "column" }}>
			{alerts.length === 0 ? (
				<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
					All supply chain nodes operating normally.
				</Typography>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
					<AnimatePresence>
						{alerts.map((node, i) => (
							<motion.div key={node.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
								<AlertItem node={node} />
							</motion.div>
						))}
					</AnimatePresence>
				</Box>
			)}
		</WidgetCard>
	);
}
