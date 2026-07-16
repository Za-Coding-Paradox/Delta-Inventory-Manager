// src/components/product-page/filter-sidebar.tsx
import {
	Paper,
	Typography,
	Slider,
	Box,
	Button,
	Divider,
	Stack,
	Chip,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAppContext } from "../../../context/app-context";

const AVAILABILITY_OPTIONS = [
	{ label: "All Items", value: false },
	{ label: "In Stock", value: true },
] as const;

const useUniqueTags = () => {
	const { state } = useAppContext();
	const tags = new Set<string>();
	state.products.forEach((p) => {
		if (state.filters.category && p.category !== state.filters.category) return;
		p.tags.forEach((t) => tags.add(t));
	});
	return Array.from(tags);
};

export default function FilterSidebar() {
	const { state, dispatch } = useAppContext();
	const allTags = useUniqueTags();
	const { filters } = state;

	const handleTagToggle = (tag: string) => {
		const newTags = filters.tags.includes(tag)
			? filters.tags.filter((t) => t !== tag)
			: [...filters.tags, tag];
		dispatch({ type: "SET_FILTERS", payload: { tags: newTags } });
	};

	const handleStartDateChange = (newDate: Date | null) => {
		const isoDate = newDate ? newDate.toISOString() : "";
		const newEnd = filters.dateRange ? filters.dateRange[1] : "";
		const newRange =
			isoDate || newEnd ? ([isoDate, newEnd] as [string, string]) : null;
		dispatch({ type: "SET_FILTERS", payload: { dateRange: newRange } });
	};

	const handleEndDateChange = (newDate: Date | null) => {
		const isoDate = newDate ? newDate.toISOString() : "";
		const newStart = filters.dateRange ? filters.dateRange[0] : "";
		const newRange =
			newStart || isoDate
				? ([newStart, isoDate] as [string, string])
				: null;
		dispatch({ type: "SET_FILTERS", payload: { dateRange: newRange } });
	};

	const startDate =
		filters.dateRange && filters.dateRange[0]
			? new Date(filters.dateRange[0])
			: null;
	const endDate =
		filters.dateRange && filters.dateRange[1]
			? new Date(filters.dateRange[1])
			: null;

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Paper
				elevation={0}
				sx={{
					p: 3,
					borderRadius: "20px",
					position: "sticky",
					top: 88,
					border: 1,
					borderColor: "divider",
					background: (t) =>
						t.palette.mode === "light"
							? "linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)"
							: "linear-gradient(180deg, #0F0F0F 0%, #0A0A0A 100%)",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 3,
					}}
				>
					<Typography variant="h6" sx={{ fontWeight: 800 }}>
						Filters
					</Typography>
					<Button
						size="small"
						variant="outlined"
						color="inherit"
						onClick={() => dispatch({ type: "RESET_FILTERS" })}
						sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 700 }}
					>
						Clear All
					</Button>
				</Box>

				<Divider sx={{ mb: 3, borderStyle: "dashed" }} />

				<Box sx={{ mb: 3 }}>
					<Typography
						variant="subtitle2"
						gutterBottom
						sx={{ mb: 1.5, fontWeight: 600 }}
					>
						Availability
					</Typography>
					<Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
						{AVAILABILITY_OPTIONS.map((opt) => {
							const isSelected = filters.showInStockOnly === opt.value;
							return (
								<Chip
									key={opt.label}
									label={opt.label}
									onClick={() =>
										dispatch({
											type: "SET_FILTERS",
											payload: { showInStockOnly: opt.value },
										})
									}
									color={isSelected ? "primary" : "default"}
									variant={isSelected ? "filled" : "outlined"}
									sx={{
										fontWeight: isSelected ? 700 : 500,
										borderRadius: "8px",
										transition: "all 0.2s ease",
										"&:hover": { transform: "translateY(-1px)" }
									}}
								/>
							);
						})}
					</Stack>
				</Box>

				<Divider sx={{ mb: 3, borderStyle: "dashed" }} />

				<Typography
					variant="subtitle2"
					gutterBottom
					sx={{ fontWeight: 600 }}
				>
					Price Range
				</Typography>
				<Slider
					value={filters.priceRange || [0, 250]}
					onChange={(_, newValue) =>
						dispatch({
							type: "SET_FILTERS",
							payload: {
								priceRange: newValue as [number, number],
							},
						})
					}
					valueLabelDisplay="auto"
					valueLabelFormat={(v) => `$${v}`}
					min={0}
					max={250}
					step={10}
					sx={{ mt: 2, mb: 1 }}
				/>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 3 }}
				>
					${filters.priceRange ? filters.priceRange[0] : 0} – $
					{filters.priceRange ? filters.priceRange[1] : 250}
				</Typography>

				<Divider sx={{ mb: 3 }} />

				<Typography
					variant="subtitle2"
					gutterBottom
					sx={{ mb: 1.5, fontWeight: 600 }}
				>
					Date Added
				</Typography>
				<Stack spacing={2} sx={{ mb: 3 }}>
					<DatePicker
						label="Start Date"
						value={startDate}
						onChange={handleStartDateChange}
						slotProps={{
							textField: {
								size: "small",
								fullWidth: true,
								sx: {
									"& .MuiOutlinedInput-root": {
										borderRadius: "14px",
									},
								},
							},
							popper: {
								sx: { zIndex: 1400 },
							},
						}}
					/>
					<DatePicker
						label="End Date"
						value={endDate}
						onChange={handleEndDateChange}
						slotProps={{
							textField: {
								size: "small",
								fullWidth: true,
								sx: {
									"& .MuiOutlinedInput-root": {
										borderRadius: "14px",
									},
								},
							},
							popper: {
								sx: { zIndex: 1400 },
							},
						}}
					/>
				</Stack>

				<Divider sx={{ mb: 3 }} />

				<Typography
					variant="subtitle2"
					gutterBottom
					sx={{ mb: 1.5, fontWeight: 600 }}
				>
					Tags
				</Typography>
				<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
					{allTags.map((tag) => {
						const selected = filters.tags.includes(tag);
						return (
							<Chip
								key={tag}
								label={tag}
								clickable
								color={selected ? "primary" : "default"}
								variant={selected ? "filled" : "outlined"}
								onClick={() => handleTagToggle(tag)}
								sx={{ textTransform: "capitalize" }}
							/>
						);
					})}
				</Box>
			</Paper>
		</LocalizationProvider>
	);
}
