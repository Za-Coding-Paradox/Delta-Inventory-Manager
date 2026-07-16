// src/components/product-page/category-section.tsx
import { Box, Typography, Chip } from "@mui/material";
import { useAppContext } from "../../context/app-context";

export default function CategorySection() {
	const { state, dispatch } = useAppContext();

	const categories = Array.from(
		new Set(state.products.map((p) => p.category)),
	);

	return (
		<Box
			sx={{
				maxWidth: 1200,
				mx: "auto",
				py: 6,
				px: { xs: 2, md: 4 },
				textAlign: "center",
			}}
		>
			<Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
				Shop by Category
			</Typography>
			<Box
				sx={{
					display: "flex",
					gap: 1.5,
					flexWrap: "wrap",
					justifyContent: "center",
				}}
			>
				<Chip
					label="All Products"
					clickable
					color={!state.filters.category ? "primary" : "default"}
					onClick={() =>
						dispatch({
							type: "SET_FILTERS",
							payload: { category: null, tags: [] },
						})
					}
					sx={{
						py: 2.5,
						px: 1,
						fontSize: "0.95rem",
						borderRadius: "12px",
						fontWeight: 600,
					}}
				/>
				{categories.map((cat) => (
					<Chip
						key={cat}
						label={cat}
						clickable
						color={
							state.filters.category === cat
								? "primary"
								: "default"
						}
						onClick={() =>
							dispatch({
								type: "SET_FILTERS",
								payload: { category: cat, tags: [] },
							})
						}
						sx={{
							py: 2.5,
							px: 1,
							fontSize: "0.95rem",
							borderRadius: "12px",
							fontWeight: 600,
						}}
					/>
				))}
			</Box>
		</Box>
	);
}
