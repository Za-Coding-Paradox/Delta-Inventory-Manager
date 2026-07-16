import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../../../context/app-context";
import { useMemo } from "react";

interface ReviewsModalProps {
	open: boolean;
	onClose: () => void;
}

export default function ReviewsModal({ open, onClose }: ReviewsModalProps) {
	const theme = useTheme();
	const { state } = useAppContext();

	// Build weekly ratings chart from state.reviews (last 8 weeks)
	const weeklyData = useMemo(() => {
		return Array.from({ length: 8 }, (_, i) => {
			const weekLabel = `Week ${i + 1}`;
			// Calculate week boundaries (week i, going back from current week)
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

			// If no reviews for this week, use the overall average as baseline
			const overallAvg = state.reviews.length > 0
				? state.reviews.reduce((sum, r) => sum + r.rating, 0) / state.reviews.length
				: 4.5; // sensible fallback

			const weekAvg = weekReviews.length > 0
				? parseFloat((weekReviews.reduce((sum, r) => sum + r.rating, 0) / weekReviews.length).toFixed(2))
				: parseFloat(overallAvg.toFixed(2));

			return { name: weekLabel, rating: weekAvg, count: weekReviews.length };
		});
	}, [state.reviews]);

	const totalReviews = state.reviews.length;
	const avgRating = totalReviews > 0
		? (state.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(2)
		: "0.00";

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
				<Box sx={{ height: 300, width: "100%" }}>
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
							<defs>
								<linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={theme.palette.warning.main} stopOpacity={0.8}/>
									<stop offset="95%" stopColor={theme.palette.warning.main} stopOpacity={0}/>
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
							<XAxis
								dataKey="name"
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
							/>
							<YAxis
								domain={[0, 5]}
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
							/>
							<Tooltip
								contentStyle={{
									borderRadius: "12px",
									border: `1px solid ${theme.palette.divider}`,
									backgroundColor: theme.palette.background.paper,
									boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
								}}
								formatter={(value: any, _name: any, props: any) => [
									`${value} ★ (${props.payload?.count || 0} reviews)`,
									"Avg Rating",
								]}
							/>
							<Area type="monotone" dataKey="rating" stroke={theme.palette.warning.main} strokeWidth={3} fillOpacity={1} fill="url(#colorRating)" />
						</AreaChart>
					</ResponsiveContainer>
				</Box>
			</DialogContent>
		</Dialog>
	);
}
