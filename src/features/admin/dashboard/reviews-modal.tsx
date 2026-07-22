import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppContext } from "../../../context/app-context";
import { useMemo } from "react";
import React from "react";
import { WeeklyChart } from "./components/weekly-chart";

interface ReviewsModalProps {
	open: boolean;
	onClose: () => void;
}

export default React.memo(function ReviewsModal({ open, onClose }: ReviewsModalProps) {
	const { state } = useAppContext();

	const weeklyData = useMemo(() => {
		return Array.from({ length: 8 }, (_, i) => {
			const weekLabel = `Week ${i + 1}`;
			const weekEnd = new Date();
			weekEnd.setDate(weekEnd.getDate() - (7 - i) * 7);
			weekEnd.setHours(23, 59, 59, 999);
			const weekStart = new Date(weekEnd);
			weekStart.setDate(weekStart.getDate() - 6);
			weekStart.setHours(0, 0, 0, 0);

			const weekReviews = state.reviews.filter((r) => {
				const ts = new Date(r.timestamp);
				return ts >= weekStart && ts <= weekEnd;
			});

			const overallAvg = state.reviews.length > 0 ? state.reviews.reduce((sum, r) => sum + r.rating, 0) / state.reviews.length : 4.5;
			const weekAvg = weekReviews.length > 0 ? parseFloat((weekReviews.reduce((sum, r) => sum + r.rating, 0) / weekReviews.length).toFixed(2)) : parseFloat(overallAvg.toFixed(2));
			return { name: weekLabel, rating: weekAvg, count: weekReviews.length };
		});
	}, [state.reviews]);

	const { totalReviews, avgRating } = useMemo(() => {
		const total = state.reviews.length;
		const avg = total > 0 ? (state.reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(2) : "0.00";
		return { totalReviews: total, avgRating: avg };
	}, [state.reviews]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ "& .MuiDialog-paper": { borderRadius: "20px" } }}>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1, fontWeight: 800 }}>
				Store Rating Over Time
				<IconButton onClick={onClose} size="small"><CloseRoundedIcon /></IconButton>
			</DialogTitle>
			<DialogContent>
				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					{totalReviews} total reviews · Average rating: {avgRating} / 5.0
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
					Weekly average customer satisfaction over the past 8 weeks.
				</Typography>
				<WeeklyChart weeklyData={weeklyData} />
			</DialogContent>
		</Dialog>
	);
});
