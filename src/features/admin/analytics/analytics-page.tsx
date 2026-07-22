import { Box } from "@mui/material";
import { useState, useCallback } from "react";
import AnalyticsHeader from "./components/analytics-header";
import ChartsGrid from "./components/charts-grid";
import ExportModal from "./export-modal";

export default function AnalyticsPage() {
	const [exportOpen, setExportOpen] = useState(false);
	
	const handleExportOpen = useCallback(() => setExportOpen(true), []);
	const handleExportClose = useCallback(() => setExportOpen(false), []);

	return (
		<Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3, pb: 10 }}>
			<AnalyticsHeader onExport={handleExportOpen} />
			<ChartsGrid />
			<ExportModal open={exportOpen} onClose={handleExportClose} />
		</Box>
	);
}
