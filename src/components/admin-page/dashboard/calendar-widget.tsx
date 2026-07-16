import { useState } from "react";
import {
	Box,
	Card,
	Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickerDay } from "@mui/x-date-pickers";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { format, parseISO } from "date-fns";
import { useAppContext } from "../../../context/app-context";
import type { CalendarEventType } from "../../../config/types";
import CalendarModal from "./calendar-modal";

const EVENT_COLORS: Record<CalendarEventType, string> = {
	RESTOCK: "#3b82f6",
	PROMOTION: "#22c55e",
	MEETING: "#94a3b8",
	LAUNCH: "#f59e0b",
};

function EventDot({ color }: { color: string }) {
	return (
		<Box
			sx={{
				width: 5,
				height: 5,
				borderRadius: "50%",
				backgroundColor: color,
				flexShrink: 0,
			}}
		/>
	);
}

interface CustomDayProps {
	eventDates: Map<string, CalendarEventType[]>;
	[key: string]: any;
}

function CustomDay({ eventDates, day, ...props }: CustomDayProps) {
	const dateKey = format(day, "yyyy-MM-dd");
	const types = eventDates.get(dateKey) ?? [];

	return (
		<Box sx={{ position: "relative" }}>
			<PickerDay day={day} {...props as any} />
			{types.length > 0 && (
				<Box
					sx={{
						position: "absolute",
						bottom: 2,
						left: "50%",
						transform: "translateX(-50%)",
						display: "flex",
						gap: 0.3,
					}}
				>
					{types.slice(0, 3).map((t, i) => (
						<EventDot key={i} color={EVENT_COLORS[t]} />
					))}
				</Box>
			)}
		</Box>
	);
}

export default function CalendarWidget() {
	const { state } = useAppContext();

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	// Build a map of date string → event types
	const eventDates = new Map<string, CalendarEventType[]>();
	state.calendarEvents.forEach((evt) => {
		const key = format(parseISO(evt.date), "yyyy-MM-dd");
		const existing = eventDates.get(key) ?? [];
		existing.push(evt.type);
		eventDates.set(key, existing);
	});

	const handleDayClick = (date: Date | null) => {
		if (date) {
			setSelectedDate(date);
			setModalOpen(true);
		}
	};

	return (
		<>
			<Card
				elevation={0}
				sx={{
					borderRadius: "20px",
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				{/* Header */}
				<Box
					sx={{
						px: 2.5,
						pt: 2.5,
						pb: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<CalendarMonthRoundedIcon sx={{ color: "primary.main" }} />
						<Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
							Event Planner
						</Typography>
					</Box>
				</Box>

				<Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", pb: 2 }}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateCalendar
							onChange={handleDayClick}
							slots={{
								day: (dayProps: any) => (
									<CustomDay {...dayProps} eventDates={eventDates} />
								),
							}}
							sx={{
								width: "100%",
								"& .MuiDateCalendar-root": { width: "100%" },
							}}
						/>
					</LocalizationProvider>
				</Box>
			</Card>
			<CalendarModal open={modalOpen} onClose={() => setModalOpen(false)} selectedDate={selectedDate} />
		</>
	);
}
