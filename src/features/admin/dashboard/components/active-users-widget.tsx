import { useState, useEffect } from "react";
import { Box, Typography, Chip } from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";
import React from "react";

function useLiveUserCount(baseCount: number): number {
	const [jitter, setJitter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setJitter(Math.floor(Math.random() * 3) - 1);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	return Math.max(1, baseCount + jitter);
}

export const ActiveUsersWidget = React.memo(function ActiveUsersWidget() {
	const liveCount = useLiveUserCount(1);
	
	const headerAction = <Chip label="Live" color="success" size="small" sx={{ fontWeight: 700 }} />;

	return (
		<WidgetCard title="Active Users" headerAction={headerAction}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
					<PeopleAltRoundedIcon sx={{ fontSize: 40, color: "primary.main", opacity: 0.8 }} />
					<Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
						{liveCount}
					</Typography>
				</Box>
				<Typography variant="body2" color="text.secondary">
					Currently browsing the store
				</Typography>
			</Box>
		</WidgetCard>
	);
});
