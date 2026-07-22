import { useState, useMemo, useCallback } from "react";
import { Box, Typography, Button, alpha } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../../../context/app-context";
import { WidgetCard } from "../../../../components/data-display/WidgetCard";
import ReviewsModal from "../reviews-modal";
import React from "react";

export const ReviewsWidget = React.memo(function ReviewsWidget() {
	const [modalOpen, setModalOpen] = useState(false);
	const theme = useTheme();
	const { state } = useAppContext();

	const handleOpen = useCallback(() => setModalOpen(true), []);
	const handleClose = useCallback(() => setModalOpen(false), []);

	const { avgRating, sparklineData, total } = useMemo(() => {
		const totalReviews = state.reviews.length;
		const avg = totalReviews > 0 ? (state.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) : 0;
		const sparkData = Array.from({ length: 7 }, (_, i) => {
			const dayStart = new Date();
			dayStart.setDate(dayStart.getDate() - (6 - i));
			dayStart.setHours(0, 0, 0, 0);
			const dayEnd = new Date(dayStart);
			dayEnd.setHours(23, 59, 59, 999);
			const dayReviews = state.reviews.filter((r) => {
				const ts = new Date(r.timestamp);
				return ts >= dayStart && ts <= dayEnd;
			});
			const dayAvg = dayReviews.length > 0 ? dayReviews.reduce((sum, r) => sum + r.rating, 0) / dayReviews.length : null;
			return { day: i, rating: dayAvg ?? avg };
		});
		return { avgRating: avg, sparklineData: sparkData, total: totalReviews };
	}, [state.reviews]);

	return (
		<>
			<WidgetCard sx={{ height: "100%" }} contentSx={{ display: "flex", flexDirection: "column", height: "100%", p: 0 }} noPadding>
				<Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
						<Box>
							<Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>Store Reviews</Typography>
							<Typography variant="body2" color="text.secondary">{total} total · Avg: {avgRating.toFixed(1)} / 5.0</Typography>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, backgroundColor: (t) => alpha(t.palette.warning.main, 0.1), p: 1, borderRadius: "12px" }}>
							<StarRoundedIcon color="warning" />
							<Typography variant="h6" sx={{ fontWeight: 800, color: "warning.dark" }}>{avgRating.toFixed(1)}</Typography>
						</Box>
					</Box>
					<Box sx={{ flex: 1, minHeight: 60, mt: 1, mb: 2 }}>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={sparklineData}>
								<Line type="monotone" dataKey="rating" stroke={theme.palette.warning.main} strokeWidth={3} dot={false} />
							</LineChart>
						</ResponsiveContainer>
					</Box>
					<Button variant="outlined" fullWidth color="inherit" onClick={handleOpen} sx={{ borderRadius: "10px", fontWeight: 700 }}>
						View Detailed Chart
					</Button>
				</Box>
			</WidgetCard>
			<ReviewsModal open={modalOpen} onClose={handleClose} />
		</>
	);
});
