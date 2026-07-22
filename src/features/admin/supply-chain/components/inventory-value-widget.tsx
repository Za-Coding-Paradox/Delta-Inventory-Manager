import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Product } from "../../../../config/types";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";

export interface InventoryValueWidgetProps {
	products: Product[];
}

export const InventoryValueWidget = React.memo(function InventoryValueWidget({ products }: InventoryValueWidgetProps) {
	const totalValueStr = useMemo(() => {
		const total = products.reduce((acc, p) => acc + (p.price * p.stockQuantity), 0);
		return (total / 1000).toFixed(1);
	}, [products]);

	return (
		<WidgetCard title="Inventory Value" contentSx={{ pb: 1 }}>
			<Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
				${totalValueStr}k
			</Typography>
			<Typography variant="caption" color="text.secondary">Across all warehouses</Typography>
		</WidgetCard>
	);
});
