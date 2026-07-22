import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import type { CalendarEvent, CalendarEventType } from "../../../../config/types";
import { EVENT_COLORS, EVENT_TYPE_LABELS } from "./calendar-constants";
import React from "react";

export type FormState = { title: string; type: CalendarEventType; description: string };

interface Props {
	form: FormState;
	setForm: React.Dispatch<React.SetStateAction<FormState>>;
	editingEvent: CalendarEvent | null;
	onSave: () => void;
	onCancel: () => void;
}

export const CalendarEventForm = React.memo(({ form, setForm, editingEvent, onSave, onCancel }: Props) => {
	return (
		<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>{editingEvent ? "Edit Event" : "Add New Event"}</Typography>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
				<TextField label="Event Title" fullWidth value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
				<FormControl fullWidth>
					<InputLabel>Event Type</InputLabel>
					<Select value={form.type} label="Event Type" onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CalendarEventType }))}>
						{(Object.keys(EVENT_TYPE_LABELS) as CalendarEventType[]).map((t) => (
							<MenuItem key={t} value={t}>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
									<Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: EVENT_COLORS[t] }} />
									{EVENT_TYPE_LABELS[t]}
								</Box>
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField label="Description (Optional)" fullWidth multiline rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
				<Box sx={{ display: "flex", gap: 2, mt: "auto", pt: 2 }}>
					{editingEvent && <Button variant="outlined" fullWidth onClick={onCancel} sx={{ borderRadius: "10px" }}>Cancel Edit</Button>}
					<Button variant="contained" fullWidth onClick={onSave} disabled={!form.title.trim()} sx={{ borderRadius: "10px" }}>{editingEvent ? "Save Changes" : "Add Event"}</Button>
				</Box>
			</Box>
		</Box>
	);
});
CalendarEventForm.displayName = "CalendarEventForm";
