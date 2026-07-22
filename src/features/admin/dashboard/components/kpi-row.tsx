import { Box, Collapse, alpha, useTheme } from "@mui/material";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { IconStatBox } from "../../../../components/data-display/IconStatBox";

export function KpiRow({ stat, expanded, isLast }: { stat: any; expanded: boolean; isLast: boolean }) {
	const theme = useTheme();
	return (
		<Box sx={{ borderBottom: isLast ? 0 : 1, borderColor: "divider", pb: isLast ? 0 : 2 }}>
			<IconStatBox icon={stat.icon} label={stat.title} value={stat.value} color="primary" />
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Box sx={{ height: 40, width: "100%", mt: 2 }}>
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={stat.sparkData}>
							<defs>
								<linearGradient id={`grad-${stat.title}`} x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={theme.palette.text.primary} stopOpacity={0.3}/>
									<stop offset="95%" stopColor={theme.palette.text.primary} stopOpacity={0}/>
								</linearGradient>
							</defs>
							<Area type="monotone" dataKey="value" stroke={theme.palette.text.primary} strokeWidth={2} fillOpacity={1} fill={`url(#grad-${stat.title})`} />
						</AreaChart>
					</ResponsiveContainer>
				</Box>
			</Collapse>
		</Box>
	);
}
