// src/components/user/FilterSidebar.tsx
import {
	Paper,
	Typography,
	Slider,
	Box,
	Switch,
	FormControlLabel,
	Button,
} from "@mui/material";
import { useAppContext } from "../../context/app-context";

// Extract all unique tags from products for the filter buttons
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

	return (
		<Paper
			elevation={0}
			sx={{ p: 3, borderRadius: "16px", position: "sticky", top: 90 }}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 2,
				}}
			>
				<Typography variant="h6" sx={{ fontWeight: 700 }}>
					Filters
				</Typography>
				<Button
					size="small"
					onClick={() => dispatch({ type: "RESET_FILTERS" })}
				>
					Clear
				</Button>
			</Box>

			{/* In Stock Switch */}
			<FormControlLabel
				control={
					<Switch
						checked={filters.showInStockOnly}
						onChange={(e) =>
							dispatch({
								type: "SET_FILTERS",
								payload: { showInStockOnly: e.target.checked },
							})
						}
						color="primary"
					/>
				}
				label="In Stock Only"
				sx={{ mb: 3 }}
			/>

			{/* Price Slider */}
			<Typography variant="subtitle2" gutterBottom>
				Price Range
			</Typography>
			<Slider
				value={filters.priceRange || [0, 250]}
				onChange={(_, newValue) =>
					dispatch({
						type: "SET_FILTERS",
						payload: { priceRange: newValue as [number, number] },
					})
				}
				valueLabelDisplay="auto"
				min={0}
				max={250}
				step={10}
				sx={{ color: "primary.main" }}
			/>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				${filters.priceRange ? filters.priceRange[0] : 0} - $
				{filters.priceRange ? filters.priceRange[1] : 250}
			</Typography>

			{/* Tags */}
			<Typography variant="subtitle2" gutterBottom>
				Tags
			</Typography>
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
				{allTags.map((tag) => {
					const selected = filters.tags.includes(tag);
					return (
						<Box
							key={tag}
							onClick={() => handleTagToggle(tag)}
							sx={{
								px: 1.5,
								py: 0.5,
								borderRadius: "6px",
								fontSize: "0.75rem",
								fontWeight: 600,
								cursor: "pointer",
								textTransform: "capitalize",
								backgroundColor: (t) =>
									selected
										? t.palette.primary.main
										: t.palette.mode === "light"
											? "#F0F0F0"
											: "#333",
								color: (t) =>
									selected
										? "#fff"
										: t.palette.text.secondary,
								"&:hover": {
									backgroundColor: (t) =>
										selected
											? t.palette.primary.dark
											: t.palette.action.hover,
								},
							}}
						>
							{tag}
						</Box>
					);
				})}
			</Box>
		</Paper>
	);
}
