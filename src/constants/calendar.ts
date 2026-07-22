import { CalendarEventType } from "../config/types";

export const CALENDAR_EVENT_COLORS: Record<CalendarEventType, string> = {
	RESTOCK: "#3b82f6",
	PROMOTION: "#22c55e",
	MEETING: "#94a3b8",
	LAUNCH: "#f59e0b",
};

export const CALENDAR_EVENT_TYPE_LABELS: Record<CalendarEventType, string> = {
	RESTOCK: "Restock",
	PROMOTION: "Promotion",
	MEETING: "Meeting",
	LAUNCH: "Launch",
};
