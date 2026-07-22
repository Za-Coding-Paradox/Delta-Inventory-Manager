import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { SCNode } from "../../../../config/types";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";
import { KeyValueRow } from "../../../../components/data-display/KeyValueRow";

export interface NetworkStatusWidgetProps {
	nodes: SCNode[];
}

export const NetworkStatusWidget = React.memo(function NetworkStatusWidget({ nodes }: NetworkStatusWidgetProps) {
	const counts = useMemo(() => {
		let normal = 0, delayed = 0, critical = 0;
		nodes.forEach(n => {
			const status = (n.data as any)?.status;
			if (status === "NORMAL") normal++;
			else if (status === "DELAYED") delayed++;
			else if (status === "CRITICAL") critical++;
		});
		return { normal, delayed, critical };
	}, [nodes]);

	return (
		<WidgetCard title="Network Status" contentSx={{ display: "flex", flexDirection: "column", gap: 1, pb: 2 }}>
			<KeyValueRow label="Healthy Nodes" value={counts.normal} valueColor="success.main" valueVariant="body2" />
			<KeyValueRow label="Delayed" value={counts.delayed} valueColor="warning.main" valueVariant="body2" />
			<KeyValueRow label="Critical" value={counts.critical} valueColor="error.main" valueVariant="body2" />
		</WidgetCard>
	);
});
