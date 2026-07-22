import { useState, useMemo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { format, parseISO } from "date-fns";
import { useAppContext } from "../../../context/app-context";
import type { CalendarEventType } from "../../../config/types";
import CalendarModal from "./calendar-modal";
import { WidgetCard } from "../../../components/data-display/WidgetCard";
import { CustomDay } from "./components/calendar-custom-day";

export default function CalendarWidget() {
	const { state } = useAppContext();
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const eventDates = useMemo(() => {
		const map = new Map<string, CalendarEventType[]>();
		state.calendarEvents.forEach((evt) => {
			const key = format(parseISO(evt.date), "yyyy-MM-dd");
			const existing = map.get(key) ?? [];
			existing.push(evt.type);
			map.set(key, existing);
		});
		return map;
	}, [state.calendarEvents]);

	const handleDayClick = useCallback((date: Date | null) => {
		if (date) { setSelectedDate(date); setModalOpen(true); }
	}, []);

	const headerAction = useMemo(() => (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			<CalendarMonthRoundedIcon sx={{ color: "primary.main" }} />
			<Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Event Planner</Typography>
		</Box>
	), []);

	return (
		<>
			<WidgetCard headerAction={headerAction} sx={{ height: "100%" }} contentSx={{ display: "flex", alignItems: "center", justifyContent: "center", pb: 2, pt: 0 }}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateCalendar
						onChange={handleDayClick}
						slots={{ day: (props: any) => <CustomDay {...props} eventDates={eventDates} /> }}
						sx={{ width: "100%", "& .MuiDateCalendar-root": { width: "100%" } }}
					/>
				</LocalizationProvider>
			</WidgetCard>
			<CalendarModal open={modalOpen} onClose={() => setModalOpen(false)} selectedDate={selectedDate} />
		</>
	);
}
