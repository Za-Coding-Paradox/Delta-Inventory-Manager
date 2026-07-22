import { Box, Typography, Chip, IconButton, alpha, useTheme } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import type { CalendarEvent } from "../../../../config/types";
import { CALENDAR_EVENT_COLORS, CALENDAR_EVENT_TYPE_LABELS } from "../../../../constants/calendar";
import React from "react";

interface Props {
	eventsForDay: CalendarEvent[];
	selectedDate: Date | null;
	onEdit: (evt: CalendarEvent) => void;
	onDelete: (id: string) => void;
}

export const CalendarEventList = React.memo(({ eventsForDay, selectedDate, onEdit, onDelete }: Props) => {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	return (
		<Box sx={{ flex: 1, display: "flex", flexDirection: "column", borderRight: `1px solid ${theme.palette.divider}`, pr: 3 }}>
			{selectedDate && (
				<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: "text.secondary" }}>
					{selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
				</Typography>
			)}
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flex: 1, overflowY: "auto" }}>
				{eventsForDay.length === 0 && (
					<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
						No events scheduled for this day.
					</Typography>
				)}
				{eventsForDay.map((evt) => (
					<Box
						key={evt.id}
						sx={{
							p: 2, borderRadius: "12px",
							backgroundColor: alpha(CALENDAR_EVENT_COLORS[evt.type], isDark ? 0.15 : 0.08),
							border: `1px solid ${alpha(CALENDAR_EVENT_COLORS[evt.type], 0.25)}`,
							display: "flex", alignItems: "flex-start", gap: 1.5,
						}}
					>
						<Box sx={{ width: 4, borderRadius: "2px", backgroundColor: CALENDAR_EVENT_COLORS[evt.type], alignSelf: "stretch", flexShrink: 0 }} />
						<Box sx={{ flex: 1, minWidth: 0 }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
								<Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>{evt.title}</Typography>
								<Chip label={CALENDAR_EVENT_TYPE_LABELS[evt.type]} size="small" sx={{ height: 20, fontSize: "0.7rem", backgroundColor: alpha(CALENDAR_EVENT_COLORS[evt.type], 0.2), color: CALENDAR_EVENT_COLORS[evt.type], fontWeight: 800 }} />
							</Box>
							{evt.description && (
								<Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>{evt.description}</Typography>
							)}
						</Box>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
							<IconButton size="small" onClick={() => onEdit(evt)}><EditRoundedIcon sx={{ fontSize: "1rem" }} /></IconButton>
							<IconButton size="small" color="error" onClick={() => onDelete(evt.id)}><DeleteRoundedIcon sx={{ fontSize: "1rem" }} /></IconButton>
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	);
});
CalendarEventList.displayName = "CalendarEventList";
