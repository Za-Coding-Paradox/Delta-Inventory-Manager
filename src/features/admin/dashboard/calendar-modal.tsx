import { useState, useMemo, useCallback } from "react";
import { Box, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import { isSameDay, parseISO } from "date-fns";
import { useAppContext } from "../../../context/app-context";
import type { CalendarEvent } from "../../../config/types";
import { CalendarEventList } from "./components/calendar-event-list";
import { CalendarEventForm, FormState } from "./components/calendar-event-form";
import React from "react";

const EMPTY_FORM: FormState = { title: "", type: "MEETING", description: "" };

interface Props { open: boolean; onClose: () => void; selectedDate: Date | null; }

export default React.memo(function CalendarModal({ open, onClose, selectedDate }: Props) {
	const { state, dispatch } = useAppContext();
	const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
	const [form, setForm] = useState<FormState>(EMPTY_FORM);

	const eventsForDay = useMemo(() => selectedDate ? state.calendarEvents.filter(e => isSameDay(parseISO(e.date), selectedDate)) : [], [selectedDate, state.calendarEvents]);

	const handleSave = useCallback(() => {
		if (!selectedDate || !form.title.trim()) return;
		if (editingEvent) {
			dispatch({ type: "UPDATE_CALENDAR_EVENT", payload: { ...editingEvent, title: form.title, type: form.type, description: form.description, date: selectedDate.toISOString() } });
			dispatch({ type: "ADD_NOTIFICATION", payload: { id: `notif_${Date.now()}`, type: "SUCCESS", message: "Event updated successfully", read: false, timestamp: new Date().toISOString() } });
		} else {
			dispatch({ type: "ADD_CALENDAR_EVENT", payload: { id: `evt_${Date.now()}`, date: selectedDate.toISOString(), title: form.title, type: form.type, description: form.description } });
			dispatch({ type: "ADD_NOTIFICATION", payload: { id: `notif_${Date.now()}`, type: "SUCCESS", message: "Event scheduled successfully", read: false, timestamp: new Date().toISOString() } });
		}
		setForm(EMPTY_FORM); setEditingEvent(null);
	}, [selectedDate, form, editingEvent, dispatch]);

	const handleEdit = useCallback((evt: CalendarEvent) => { setEditingEvent(evt); setForm({ title: evt.title, type: evt.type, description: evt.description }); }, []);
	const handleDelete = useCallback((id: string) => {
		dispatch({ type: "DELETE_CALENDAR_EVENT", payload: id });
		dispatch({ type: "ADD_NOTIFICATION", payload: { id: `notif_${Date.now()}`, type: "ALERT", message: "Event removed", read: false, timestamp: new Date().toISOString() } });
	}, [dispatch]);
	const handleCancel = useCallback(() => { setEditingEvent(null); setForm(EMPTY_FORM); }, []);
	const handleClose = useCallback(() => { handleCancel(); onClose(); }, [handleCancel, onClose]);

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ "& .MuiDialog-paper": { borderRadius: "20px" } }}>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><EventNoteRoundedIcon color="primary" /><Box sx={{ fontWeight: 800 }}>Event Planner</Box></Box>
				<IconButton onClick={handleClose} size="small"><CloseRoundedIcon /></IconButton>
			</DialogTitle>
			<DialogContent sx={{ minHeight: 400, display: "flex", gap: 3, p: 3 }}>
				<CalendarEventList eventsForDay={eventsForDay} selectedDate={selectedDate} onEdit={handleEdit} onDelete={handleDelete} />
				<CalendarEventForm form={form} setForm={setForm} editingEvent={editingEvent} onSave={handleSave} onCancel={handleCancel} />
			</DialogContent>
		</Dialog>
	);
});
