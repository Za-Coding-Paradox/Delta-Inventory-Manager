import { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "../../../../context/app-context";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";
import { StatusChip } from "../../../../components/data-display/StatusChip";
import { KeyValueRow } from "../../../../components/data-display/KeyValueRow";
import React from "react";

export const SystemHealthWidget = React.memo(function SystemHealthWidget() {
	const { state } = useAppContext();
	const [uptimeSeconds, setUptimeSeconds] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => setUptimeSeconds(prev => prev + 1), 1000);
		return () => clearInterval(interval);
	}, []);

	const formatTime = (totalSeconds: number) => {
		const h = Math.floor(totalSeconds / 3600);
		const m = Math.floor((totalSeconds % 3600) / 60);
		const s = totalSeconds % 60;
		return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
	};

	const { criticalNodes, delayedNodes } = useMemo(() => {
		let c = 0, d = 0;
		state.supplyChainNodes.forEach((n) => {
			if (n.data.status === "CRITICAL") c++;
			if (n.data.status === "DELAYED") d++;
		});
		return { criticalNodes: c, delayedNodes: d };
	}, [state.supplyChainNodes]);

	const { dbLoad, apiLatency, overallStatus } = useMemo(() => {
		const load = Math.min(99, 15 + state.orders.length * 1.5 + state.cart.length * 2 + state.notifications.length * 0.8);
		const latency = 8 + criticalNodes * 6 + delayedNodes * 3;
		const status = criticalNodes >= 2 ? "ERROR" : criticalNodes >= 1 ? "WARNING" : "SUCCESS";
		return { dbLoad: load, apiLatency: latency, overallStatus: status };
	}, [state.orders.length, state.cart.length, state.notifications.length, criticalNodes, delayedNodes]);

	const headerAction = <StatusChip status={overallStatus} label={overallStatus === "ERROR" ? "Degraded" : overallStatus === "WARNING" ? "Warning" : "Optimal"} size="small" />;

	return (
		<WidgetCard title="System Health" headerAction={headerAction} sx={{ flexGrow: 1 }} contentSx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
				<KeyValueRow label="Server Uptime" value={formatTime(uptimeSeconds)} />
				<KeyValueRow label="Database Load" value={`${Math.round(dbLoad)}%`} valueColor={dbLoad > 70 ? "warning.main" : "text.primary"} />
				<KeyValueRow label="API Latency" value={`${apiLatency}ms`} valueColor={apiLatency > 30 ? "warning.main" : "text.primary"} />
			</Box>
		</WidgetCard>
	);
});
