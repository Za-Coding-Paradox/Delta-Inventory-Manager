import { Box } from "@mui/material";
import { PickerDay } from "@mui/x-date-pickers";
import { format } from "date-fns";
import type { CalendarEventType } from "../../../../config/types";
import { CALENDAR_EVENT_COLORS } from "../../../../constants/calendar";
import React from "react";

const EventDot = React.memo(({ color }: { color: string }) => (
	<Box sx={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
));
EventDot.displayName = "EventDot";

interface CustomDayProps {
	eventDates: Map<string, CalendarEventType[]>;
	day: Date;
	[key: string]: any;
}

export const CustomDay = React.memo(({ eventDates, day, ...props }: CustomDayProps) => {
	const dateKey = format(day, "yyyy-MM-dd");
	const types = eventDates.get(dateKey) ?? [];
	return (
		<Box sx={{ position: "relative" }}>
			<PickerDay day={day} {...props as any} />
			{types.length > 0 && (
				<Box sx={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 0.3 }}>
					{types.slice(0, 3).map((t, i) => <EventDot key={i} color={CALENDAR_EVENT_COLORS[t]} />)}
				</Box>
			)}
		</Box>
	);
});
CustomDay.displayName = "CustomDay";
