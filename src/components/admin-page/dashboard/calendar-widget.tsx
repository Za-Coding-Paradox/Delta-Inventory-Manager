// src/components/admin-page/dashboard/calendar-widget.tsx
import { useState } from "react";
import {
	Box,
	Card,
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
	Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickerDay } from "@mui/x-date-pickers";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { motion, AnimatePresence } from "framer-motion";
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

type FormState = {
	title: string;
	type: CalendarEventType;
	description: string;
};

const EMPTY_FORM: FormState = { title: "", type: "MEETING", description: "" };

export default function CalendarWidget() {
	const { state, dispatch } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [expanded, setExpanded] = useState(false);
	const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState<FormState>(EMPTY_FORM);

	// Build a map of date string → event types
	const eventDates = new Map<string, CalendarEventType[]>();
	state.calendarEvents.forEach((evt) => {
		const key = format(parseISO(evt.date), "yyyy-MM-dd");
		const existing = eventDates.get(key) ?? [];
		existing.push(evt.type);
		eventDates.set(key, existing);
	});

	const eventsForDay = selectedDate
		? state.calendarEvents.filter((e) =>
				isSameDay(parseISO(e.date), selectedDate),
			)
		: [];

	const handleDayClick = (date: Date | null) => {
		if (date) setSelectedDate(date);
		setExpanded(true);
		setShowForm(false);
		setEditingEvent(null);
	};

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
		}
		setForm(EMPTY_FORM);
		setShowForm(false);
		setEditingEvent(null);
	};

	const handleEditEvent = (evt: CalendarEvent) => {
		setEditingEvent(evt);
		setForm({ title: evt.title, type: evt.type, description: evt.description });
		setShowForm(true);
	};

	const handleDeleteEvent = (id: string) => {
		dispatch({ type: "DELETE_CALENDAR_EVENT", payload: id });
	};

	return (
		<Card
			component={motion.div}
			layout
			sx={{
				overflow: "hidden",
				flex: expanded ? 2 : 1,
				minWidth: expanded ? 560 : 320,
				transition: "all 0.3s ease",
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
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						Event Planner
					</Typography>
				</Box>
				{expanded && (
					<IconButton
						size="small"
						onClick={() => {
							setExpanded(false);
							setShowForm(false);
							setSelectedDate(null);
						}}
					>
						<CloseRoundedIcon fontSize="small" />
					</IconButton>
				)}
			</Box>

			<Box sx={{ display: "flex", gap: 0, alignItems: "flex-start" }}>
				{/* Calendar */}
				<Box sx={{ flex: "0 0 auto" }}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateCalendar
							value={selectedDate}
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

				{/* Event Panel */}
				<AnimatePresence>
					{expanded && selectedDate && (
						<motion.div
							key="event-panel"
							initial={{ opacity: 0, width: 0, x: 20 }}
							animate={{ opacity: 1, width: "auto", x: 0 }}
							exit={{ opacity: 0, width: 0, x: 20 }}
							transition={{ duration: 0.25, ease: "easeOut" }}
							style={{ overflow: "hidden", flexShrink: 0, minWidth: 280 }}
						>
							<Box
								sx={{
									px: 2.5,
									pb: 2.5,
									borderLeft: `1px solid ${theme.palette.divider}`,
									minWidth: 280,
									maxWidth: 320,
									ml: 0,
									height: "100%",
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5, pt: 1 }}>
									<Typography variant="subtitle2" sx={{ fontWeight: 600 }} color="text.secondary">
										{selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
									</Typography>
									<Button
										size="small"
										startIcon={<AddRoundedIcon />}
										variant="contained"
										onClick={() => {
											setShowForm(true);
											setEditingEvent(null);
											setForm(EMPTY_FORM);
										}}
										sx={{ borderRadius: "8px", fontSize: "0.75rem" }}
									>
										Add
									</Button>
								</Box>

								{/* Events List */}
								<Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 1.5, maxHeight: 180, overflowY: "auto" }}>
									{eventsForDay.length === 0 && !showForm && (
										<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 3 }}>
											No events. Click Add to create one.
										</Typography>
									)}
									{eventsForDay.map((evt) => (
										<Box
											key={evt.id}
											sx={{
												p: 1.5,
												borderRadius: "10px",
												backgroundColor: alpha(
													EVENT_COLORS[evt.type],
													isDark ? 0.15 : 0.08,
												),
												border: `1px solid ${alpha(EVENT_COLORS[evt.type], 0.25)}`,
												display: "flex",
												alignItems: "flex-start",
												gap: 1,
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
												<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.3 }}>
													<Typography variant="caption" sx={{ fontWeight: 600 }} noWrap>
														{evt.title}
													</Typography>
													<Chip
														label={EVENT_TYPE_LABELS[evt.type]}
														size="small"
														sx={{
															height: 18,
															fontSize: "0.65rem",
															backgroundColor: alpha(EVENT_COLORS[evt.type], 0.2),
															color: EVENT_COLORS[evt.type],
															fontWeight: 700,
														}}
													/>
												</Box>
												{evt.description && (
													<Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
														{evt.description}
													</Typography>
												)}
											</Box>
											<Box>
												<IconButton size="small" onClick={() => handleEditEvent(evt)}>
													<EditRoundedIcon sx={{ fontSize: "0.9rem" }} />
												</IconButton>
												<IconButton
													size="small"
													color="error"
													onClick={() => handleDeleteEvent(evt.id)}
												>
													<DeleteRoundedIcon sx={{ fontSize: "0.9rem" }} />
												</IconButton>
											</Box>
										</Box>
									))}
								</Box>

								{/* Add/Edit Form */}
								<AnimatePresence>
									{showForm && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.2 }}
										>
											<Divider sx={{ mb: 1.5 }} />
											<Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary", mb: 0.5, display: "block" }}>
												{new Date(selectedDate).toLocaleDateString()}
											</Typography>
											<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
												<TextField
													label="Title"
													size="small"
													fullWidth
													value={form.title}
													onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
												/>
												<FormControl size="small" fullWidth>
													<InputLabel>Type</InputLabel>
													<Select
														value={form.type}
														label="Type"
														onChange={(e) =>
															setForm((f) => ({
																...f,
																type: e.target.value as CalendarEventType,
															}))
														}
													>
														{(Object.keys(EVENT_TYPE_LABELS) as CalendarEventType[]).map(
															(t) => (
																<MenuItem key={t} value={t}>
																	<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
																		<Box
																			sx={{
																				width: 8,
																				height: 8,
																				borderRadius: "50%",
																				backgroundColor: EVENT_COLORS[t],
																			}}
																		/>
																		{EVENT_TYPE_LABELS[t]}
																	</Box>
																</MenuItem>
															),
														)}
													</Select>
												</FormControl>
												<TextField
													label="Description"
													size="small"
													fullWidth
													multiline
													rows={2}
													value={form.description}
													onChange={(e) =>
														setForm((f) => ({ ...f, description: e.target.value }))
													}
												/>
												<Box sx={{ display: "flex", gap: 1 }}>
													<Button
														variant="contained"
														size="small"
														onClick={handleAddEvent}
														disabled={!form.title.trim()}
														sx={{ flex: 1, borderRadius: "8px" }}
													>
														{editingEvent ? "Save" : "Add Event"}
													</Button>
													<Button
														variant="outlined"
														size="small"
														onClick={() => {
															setShowForm(false);
															setEditingEvent(null);
															setForm(EMPTY_FORM);
														}}
														sx={{ borderRadius: "8px" }}
													>
														Cancel
													</Button>
												</Box>
											</Box>
										</motion.div>
									)}
								</AnimatePresence>
							</Box>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Card>
	);
}
