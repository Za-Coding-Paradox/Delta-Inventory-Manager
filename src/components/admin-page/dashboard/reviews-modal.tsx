import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ReviewsModalProps {
	open: boolean;
	onClose: () => void;
}

const data = [
	{ name: "Week 1", rating: 4.2 },
	{ name: "Week 2", rating: 4.4 },
	{ name: "Week 3", rating: 4.3 },
	{ name: "Week 4", rating: 4.6 },
	{ name: "Week 5", rating: 4.5 },
	{ name: "Week 6", rating: 4.8 },
	{ name: "Week 7", rating: 4.7 },
	{ name: "Week 8", rating: 4.9 },
];

export default function ReviewsModal({ open, onClose }: ReviewsModalProps) {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ "& .MuiDialog-paper": { borderRadius: "20px" } }}>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1, fontWeight: 800 }}>
				Store Rating Over Time
				<IconButton onClick={onClose} size="small"><CloseRoundedIcon /></IconButton>
			</DialogTitle>
			<DialogContent>
				<Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
					Detailed view of customer satisfaction and average store ratings over the past 8 weeks.
				</Typography>
				<Box sx={{ height: 300, width: "100%" }}>
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
							<defs>
								<linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
									<stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
							<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
							<YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
							<Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
							<Area type="monotone" dataKey="rating" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorRating)" />
						</AreaChart>
					</ResponsiveContainer>
				</Box>
			</DialogContent>
		</Dialog>
	);
}
