import { useState } from "react";
import { Stack, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { WidgetCard } from "../../../components/data-display/WidgetCard";
import { useKpiStats } from "./components/use-kpi-stats";
import { KpiRow } from "./components/kpi-row";

export default function AggregatesWidget() {
	const [expanded, setExpanded] = useState(false);
	const stats = useKpiStats();

	return (
		<WidgetCard
			title="Store Aggregates"
			headerAction={
				<IconButton size="small">
					{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</IconButton>
			}
			onClick={() => setExpanded(!expanded)}
			sx={{ cursor: "pointer", transition: "0.3s" }}
		>
			<Stack spacing={2}>
				{stats.map((stat, idx) => (
					<KpiRow key={idx} stat={stat} expanded={expanded} isLast={idx === stats.length - 1} />
				))}
			</Stack>
		</WidgetCard>
	);
}
