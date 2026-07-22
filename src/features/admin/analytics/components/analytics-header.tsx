import { Box, Typography, Button } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import React from "react";

export interface AnalyticsHeaderProps {
	onExport: () => void;
}

const AnalyticsHeader = React.memo(function AnalyticsHeader({ onExport }: AnalyticsHeaderProps) {
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
			<Box>
				<Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
					Business Analytics
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Comprehensive overview of your store's performance.
				</Typography>
			</Box>
			<Box sx={{ display: "flex", gap: 1 }}>
				<Button variant="outlined" startIcon={<DateRangeRoundedIcon />} sx={{ borderRadius: "10px" }}>
					Last 30 Days
				</Button>
				<Button
					variant="outlined"
					startIcon={<RefreshRoundedIcon />}
					sx={{ borderRadius: "10px" }}
					onClick={() => window.location.reload()}
				>
					Refresh
				</Button>
				<Button
					variant="contained"
					startIcon={<DownloadRoundedIcon />}
					sx={{ borderRadius: "10px" }}
					onClick={onExport}
				>
					Export Report
				</Button>
			</Box>
		</Box>
	);
});

export default AnalyticsHeader;
