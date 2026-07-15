// src/components/user/ProductGrid.tsx
import { Grid, Box, Typography } from "@mui/material";
import { useAppContext } from "../../context/app-context";
import ProductCard from "./product-card";
import FilterSidebar from "./filter-sidebar";

export default function ProductGrid() {
	const { state } = useAppContext();
	const { products, filters } = state;

	const filteredProducts = products.filter((p) => {
		// In Stock filter
		if (filters.showInStockOnly && p.status !== "IN_STOCK") return false;

		// Price filter (handle null case)
		if (filters.priceRange) {
			if (
				p.price < filters.priceRange[0] ||
				p.price > filters.priceRange[1]
			)
				return false;
		}

		// Tags filter (if tags are selected, product must have at least one of them)
		if (
			filters.tags.length > 0 &&
			!filters.tags.some((tag) => p.tags.includes(tag))
		)
			return false;

		return true;
	});

	return (
		<Box
			id="products"
			sx={{ maxWidth: 1400, mx: "auto", p: { xs: 2, md: 4 } }}
		>
			<Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
				Our Collection
			</Typography>

			<Grid container spacing={4}>
				{/* Sidebar - spans 3 columns on large screens */}
				<Grid size={{ xs: 12, md: 3 }}>
					<FilterSidebar />
				</Grid>

				{/* Product Grid - spans 9 columns on large screens */}
				<Grid size={{ xs: 12, md: 9 }}>
					<Grid container spacing={3}>
						{filteredProducts.map((product) => (
							<Grid
								size={{ xs: 12, sm: 6, lg: 4 }}
								key={product.id}
							>
								<ProductCard product={product} />
							</Grid>
						))}
					</Grid>

					{filteredProducts.length === 0 && (
						<Box sx={{ textAlign: "center", py: 10 }}>
							<Typography variant="h6" color="text.secondary">
								No products match your filters.
							</Typography>
						</Box>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}
