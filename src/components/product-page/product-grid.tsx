// src/components/product-page/product-grid.tsx
import { useState } from "react";
import { Grid, Box, Typography, Pagination, Stack } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../../context/app-context";
import ProductCard from "./product-card";
import FilterSidebar from "./filter-sidebar";
import type { Product } from "../../config/types";

const ITEMS_PER_PAGE = 6;

export default function ProductGrid() {
	const { state } = useAppContext();
	const { products, filters } = state;
	const { onQuickView } = useOutletContext<{
		onQuickView: (p: Product) => void;
	}>();

	const [page, setPage] = useState(1);
	const [prevFilters, setPrevFilters] = useState(filters);

	if (filters !== prevFilters) {
		setPrevFilters(filters);
		setPage(1);
	}

	const filteredProducts = products.filter((p) => {
		// 1. If AI Search returns specific IDs, ONLY show those IDs
		if (filters.aiMatchedIds) {
			if (!filters.aiMatchedIds.includes(p.id)) return false;
		} else {
			// 2. Otherwise, use standard Grep Search
			const query = filters.searchQuery.toLowerCase();
			if (
				query &&
				!p.name.toLowerCase().includes(query) &&
				!p.description.toLowerCase().includes(query) &&
				!p.tags.some((t) => t.toLowerCase().includes(query))
			)
				return false;
		}

		// Apply remaining filters
		if (filters.showInStockOnly && p.status !== "IN_STOCK") return false;
		if (filters.priceRange) {
			if (
				p.price < filters.priceRange[0] ||
				p.price > filters.priceRange[1]
			)
				return false;
		}
		if (
			filters.tags.length > 0 &&
			!filters.tags.some((tag) => p.tags.includes(tag))
		)
			return false;
		if (filters.category && p.category !== filters.category) return false;

		if (filters.dateRange) {
			const [start, end] = filters.dateRange;
			if (start && end) {
				const productDate = new Date(p.dateAdded).getTime();
				const startDate = new Date(start).getTime();
				const endDate = new Date(end).getTime();
				if (productDate < startDate || productDate > endDate)
					return false;
			}
		}

		return true;
	});

	const count = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
	const paginatedProducts = filteredProducts.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE,
	);

	return (
		<Box
			id="products"
			sx={{ maxWidth: 1400, mx: "auto", p: { xs: 2, md: 4 } }}
		>
			<Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
				Our Collection
			</Typography>
			<Grid container spacing={4}>
				<Grid size={{ xs: 12, md: 3 }}>
					<FilterSidebar />
				</Grid>
				<Grid size={{ xs: 12, md: 9 }}>
					<Grid container spacing={3}>
						{paginatedProducts.map((product) => (
							<Grid
								size={{ xs: 12, sm: 6, lg: 4 }}
								key={product.id}
							>
								<ProductCard
									product={product}
									onQuickView={onQuickView}
								/>
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

					{filteredProducts.length > 0 && (
						<Stack spacing={2} sx={{ mt: 6, alignItems: "center" }}>
							<Pagination
								count={count}
								page={page}
								onChange={(_e, value) => setPage(value)}
								color="primary"
								size="large"
							/>
						</Stack>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}
