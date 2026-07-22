import React, { useMemo } from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";
import { KeyValueRow } from "../../../../components/data-display/KeyValueRow";
import type { SupplyChainNodeData } from "../../../../config/types";

interface BaseNodeProps {
	data: SupplyChainNodeData;
	selected: boolean;
	icon: React.ReactNode;
	children?: React.ReactNode;
	capacityLabel?: string;
}

export const BaseNode = React.memo(function BaseNode({
	data, selected, icon, children, capacityLabel = "Capacity"
}: BaseNodeProps) {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const dotColor = useMemo(() => {
		if (data.status === "CRITICAL") return theme.palette.error.main;
		if (data.status === "DELAYED") return theme.palette.warning.main;
		return theme.palette.success.main;
	}, [data.status, theme.palette]);

	return (
		<WidgetCard
			noPadding
			sx={{
				minWidth: 160, borderRadius: "16px",
				border: `1px solid ${selected ? theme.palette.text.primary : theme.palette.divider}`,
				boxShadow: selected ? `0 0 0 2px ${alpha(theme.palette.text.primary, 0.2)}` : theme.shadows[isDark ? 4 : 1],
				transition: "all 0.2s ease", position: "relative", overflow: "visible",
			}}
			contentSx={{ p: 2 }}
		>
			{children}
			<Box sx={{ position: "absolute", top: 12, right: 12, width: 10, height: 10, borderRadius: "50%", backgroundColor: dotColor, boxShadow: `0 0 4px ${dotColor}` }} />
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<Box sx={{ width: 32, height: 32, borderRadius: "8px", backgroundColor: alpha(theme.palette.text.primary, 0.05), display: "flex", alignItems: "center", justifyContent: "center", color: "text.primary" }}>
						{icon}
					</Box>
					<Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, flex: 1, pr: 2 }}>{data.label}</Typography>
				</Box>
				{data.capacity !== undefined && (
					<Box sx={{ mt: 1 }}>
						<KeyValueRow label={capacityLabel} value={`${data.stockLevel ?? 0} / ${data.capacity}`} valueVariant="body2" />
					</Box>
				)}
			</Box>
		</WidgetCard>
	);
});
