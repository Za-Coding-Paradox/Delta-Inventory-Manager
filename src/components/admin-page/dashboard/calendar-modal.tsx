import { useState } from "react";
import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	Button,
	IconButton,
	Chip,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import { format, isSameDay, parseISO } from "date-fns";
import { useAppContext } from "../../../context/app-context";
import type { CalendarEvent, CalendarEventType } from "../../../config/types";

const EVENT_COLORS: Record<CalendarEventType, string> = {
	RESTOCK: "#3b82f6",
	PROMOTION: "#22c55e",
	MEETING: "#94a3b8",
	LAUNCH: "#f59e0b",
};

const EVENT_TYPE_LABELS: Record<CalendarEventType, string> = {
	RESTOCK: "Restock",
	PROMOTION: "Promotion",
	MEETING: "Meeting",
	LAUNCH: "Launch",
};

type FormState = {
	title: string;
	type: CalendarEventType;
	description: string;
};

const EMPTY_FORM: FormState = { title: "", type: "MEETING", description: "" };

interface CalendarModalProps {
	open: boolean;
	onClose: () => void;
	selectedDate: Date | null;
}

export default function CalendarModal({ open, onClose, selectedDate }: CalendarModalProps) {
	const { state, dispatch } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
	const [form, setForm] = useState<FormState>(EMPTY_FORM);

	const eventsForDay = selectedDate
		? state.calendarEvents.filter((e) =>
				isSameDay(parseISO(e.date), selectedDate),
		  )
		: [];

	const handleAddEvent = () => {
		if (!selectedDate || !form.title.trim()) return;

		if (editingEvent) {
			dispatch({
				type: "UPDATE_CALENDAR_EVENT",
				payload: {
					...editingEvent,
					title: form.title,
					type: form.type,
					description: form.description,
					date: selectedDate.toISOString(),
				},
			});
			dispatch({
				type: "ADD_NOTIFICATION",
				payload: { id: `notif_${Date.now()}`, type: "SUCCESS", message: "Event updated successfully", read: false, timestamp: new Date().toISOString() }
			});
		} else {
			dispatch({
				type: "ADD_CALENDAR_EVENT",
				payload: {
					id: `evt_${Date.now()}`,
					date: selectedDate.toISOString(),
					title: form.title,
					type: form.type,
					description: form.description,
				},
			});
			dispatch({
				type: "ADD_NOTIFICATION",
				payload: { id: `notif_${Date.now()}`, type: "SUCCESS", message: "Event scheduled successfully", read: false, timestamp: new Date().toISOString() }
			});
		}
		setForm(EMPTY_FORM);
		setEditingEvent(null);
	};

	const handleEditEvent = (evt: CalendarEvent) => {
		setEditingEvent(evt);
		setForm({ title: evt.title, type: evt.type, description: evt.description });
	};

	const handleDeleteEvent = (id: string) => {
		dispatch({ type: "DELETE_CALENDAR_EVENT", payload: id });
	};

	const handleClose = () => {
		setEditingEvent(null);
		setForm(EMPTY_FORM);
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ "& .MuiDialog-paper": { borderRadius: "20px" } }}>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<EventNoteRoundedIcon color="primary" />
					<Box sx={{ fontWeight: 800 }}>
						Event Planner
					</Box>
				</Box>
				<IconButton onClick={handleClose} size="small"><CloseRoundedIcon /></IconButton>
			</DialogTitle>
			<DialogContent sx={{ minHeight: 400, display: "flex", gap: 3, p: 3 }}>
				{/* Left Side: Events List */}
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
									p: 2,
									borderRadius: "12px",
									backgroundColor: alpha(EVENT_COLORS[evt.type], isDark ? 0.15 : 0.08),
									border: `1px solid ${alpha(EVENT_COLORS[evt.type], 0.25)}`,
									display: "flex",
									alignItems: "flex-start",
									gap: 1.5,
								}}
							>
								<Box
									sx={{
										width: 4,
										borderRadius: "2px",
										backgroundColor: EVENT_COLORS[evt.type],
										alignSelf: "stretch",
										flexShrink: 0,
									}}
								/>
								<Box sx={{ flex: 1, minWidth: 0 }}>
									<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
										<Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
											{evt.title}
										</Typography>
										<Chip
											label={EVENT_TYPE_LABELS[evt.type]}
											size="small"
											sx={{
												height: 20,
												fontSize: "0.7rem",
												backgroundColor: alpha(EVENT_COLORS[evt.type], 0.2),
												color: EVENT_COLORS[evt.type],
												fontWeight: 800,
											}}
										/>
									</Box>
									{evt.description && (
										<Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
											{evt.description}
										</Typography>
									)}
								</Box>
								<Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
									<IconButton size="small" onClick={() => handleEditEvent(evt)}>
										<EditRoundedIcon sx={{ fontSize: "1rem" }} />
									</IconButton>
									<IconButton size="small" color="error" onClick={() => handleDeleteEvent(evt.id)}>
										<DeleteRoundedIcon sx={{ fontSize: "1rem" }} />
									</IconButton>
								</Box>
							</Box>
						))}
					</Box>
				</Box>

				{/* Right Side: Add/Edit Form */}
				<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
					<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
						{editingEvent ? "Edit Event" : "Add New Event"}
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
						<TextField
							label="Event Title"
							fullWidth
							value={form.title}
							onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
						/>
						<FormControl fullWidth>
							<InputLabel>Event Type</InputLabel>
							<Select
								value={form.type}
								label="Event Type"
								onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CalendarEventType }))}
							>
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
						<TextField
							label="Description (Optional)"
							fullWidth
							multiline
							rows={3}
							value={form.description}
							onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
						/>
						<Box sx={{ display: "flex", gap: 2, mt: "auto", pt: 2 }}>
							{editingEvent && (
								<Button variant="outlined" fullWidth onClick={() => { setEditingEvent(null); setForm(EMPTY_FORM); }} sx={{ borderRadius: "10px" }}>
									Cancel Edit
								</Button>
							)}
							<Button variant="contained" fullWidth onClick={handleAddEvent} disabled={!form.title.trim()} sx={{ borderRadius: "10px" }}>
								{editingEvent ? "Save Changes" : "Add Event"}
							</Button>
						</Box>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
}
