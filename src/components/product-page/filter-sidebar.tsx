// src/components/product-page/filter-sidebar.tsx
import {
	Paper,
	Typography,
	Slider,
	Box,
	Switch,
	FormControlLabel,
	Button,
	Divider,
	Stack,
	Chip,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAppContext } from "../../context/app-context";

const useUniqueTags = () => {
	const { state } = useAppContext();
	const tags = new Set<string>();
	state.products.forEach((p) => p.tags.forEach((t) => tags.add(t)));
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
					borderRadius: "16px",
					position: "sticky",
					top: 24,
					border: 1,
					borderColor: "divider",
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
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						Filters
					</Typography>
					<Button
						size="small"
						onClick={() => dispatch({ type: "RESET_FILTERS" })}
					>
						Clear All
					</Button>
				</Box>

				<Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
					Availability
				</Typography>
				<FormControlLabel
					control={
						<Switch
							checked={filters.showInStockOnly}
							onChange={(e) =>
								dispatch({
									type: "SET_FILTERS",
									payload: {
										showInStockOnly: e.target.checked,
									},
								})
							}
							color="primary"
						/>
					}
					label="In Stock Only"
					sx={{ mb: 3, ml: 0 }}
				/>

				<Divider sx={{ mb: 3 }} />

				<Typography variant="subtitle2" gutterBottom>
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
					min={0}
					max={250}
					step={10}
					sx={{ mt: 2 }}
				/>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 3 }}
				>
					${filters.priceRange ? filters.priceRange[0] : 0} - $
					{filters.priceRange ? filters.priceRange[1] : 250}
				</Typography>

				<Divider sx={{ mb: 3 }} />

				<Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
					Date Added
				</Typography>
				<Stack spacing={2} sx={{ mb: 3 }}>
					<DatePicker
						label="Start Date"
						value={startDate}
						onChange={handleStartDateChange}
						slotProps={{
							textField: { size: "small", fullWidth: true },
						}}
					/>
					<DatePicker
						label="End Date"
						value={endDate}
						onChange={handleEndDateChange}
						slotProps={{
							textField: { size: "small", fullWidth: true },
						}}
					/>
				</Stack>

				<Divider sx={{ mb: 3 }} />

				{/* Tags converted to clickable Chip buttons */}
				<Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
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
								onClick={() => handleTagToggle(tag)}
								sx={{
									textTransform: "capitalize",
									fontWeight: 600,
								}}
							/>
						);
					})}
				</Box>
			</Paper>
		</LocalizationProvider>
	);
}
