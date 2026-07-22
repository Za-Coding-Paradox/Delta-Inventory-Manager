// src/components/product-page/product-grid.tsx
import { useState, useEffect } from "react";
import { Grid, Box, Typography, Pagination, Stack } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../../../context/app-context";
import ProductCard from "./product-card";
import FilterSidebar from "../layout/filter-sidebar";
import type { Product } from "../../../config/types";

// How many product cards to show on a single page before adding pagination
const ITEMS_PER_PAGE = 6;

export default function ProductGrid() {
	const { state } = useAppContext(); // pull the global app state (products, filters, cart, etc.)
	const { products, filters } = state; // destructure just the two pieces we need here

	// useOutletContext is React Router's way to receive data passed down from the parent layout (UserLayout).
	// The generic type <{ onQuickView: (p: Product) => void }> tells TypeScript exactly
	// what shape of data to expect, so we get proper type checking and autocomplete.
	const { onQuickView } = useOutletContext<{
		onQuickView: (p: Product) => void;
	}>();

	const [page, setPage] = useState(1); // tracks which page number the user is currently on

	// When the user changes any filter, jump back to page 1.
	// Without this, the user could be on page 3, apply a filter that only has
	// 4 results, and end up staring at an empty page because page 3 doesn't exist anymore.
	useEffect(() => {
		setPage(1);
	}, [filters]); // re-run whenever the filters object changes

	// --- FILTERING ENGINE ---
	// Goes through every product and decides whether it passes all active filters.
	// A product is kept only if it passes EVERY condition below (they all chain with &&).
	const filteredProducts = products.filter((p) => {
		// -- Step 1: AI Search override --
		// If the AI search returned a specific list of matching IDs, ONLY show those products.
		// This completely overrides the normal text search so AI results take priority.
		if (filters.aiMatchedIds) {
			if (!filters.aiMatchedIds.includes(p.id)) return false; // product is not in the AI result set, exclude it
		} else {
			// -- Step 2: Standard keyword search --
			// Check if the search query appears in the product name, description, or any of its tags.
			// We use toLowerCase() on both sides so the search is case-insensitive.
			const query = filters.searchQuery.toLowerCase();
			if (
				query && // only run this check if the user actually typed something
				!p.name.toLowerCase().includes(query) && // name doesn't match
				!p.description.toLowerCase().includes(query) && // description doesn't match
				!p.tags.some((t) => t.toLowerCase().includes(query)) // none of the tags match
			)
				return false; // none of name/description/tags matched the query, so exclude this product
		}

		// -- Step 3: In-stock filter --
		// If the user enabled "Show in-stock only", skip products that are not IN_STOCK
		if (filters.showInStockOnly && p.status !== "IN_STOCK") return false;

		// -- Step 4: Price range filter --
		// filters.priceRange is a [min, max] tuple; skip the product if its price falls outside that range
		if (filters.priceRange) {
			if (
				p.price < filters.priceRange[0] || // price is below the minimum
				p.price > filters.priceRange[1]    // price is above the maximum
			)
				return false;
		}

		// -- Step 5: Tag filter --
		// If the user selected specific tags, the product must have at least one of them.
		// .some() returns true as soon as it finds one matching tag, so this is an OR match (not AND).
		if (
			filters.tags.length > 0 &&
			!filters.tags.some((tag) => p.tags.includes(tag))
		)
			return false; // product shares none of the selected tags

		// -- Step 6: Category filter --
		if (filters.category && p.category !== filters.category) return false; // product is in a different category

		// -- Step 7: Date range filter --
		// Convert date strings to millisecond timestamps for easy numeric comparison
		if (filters.dateRange) {
			const [start, end] = filters.dateRange;
			if (start && end) { // only apply if both endpoints of the range are set
				const productDate = new Date(p.dateAdded).getTime(); // when this product was added (ms)
				const startDate = new Date(start).getTime();          // range start (ms)
				const endDate = new Date(end).getTime();              // range end (ms)
				if (productDate < startDate || productDate > endDate)
					return false; // product was added outside the selected date window
			}
		}

		return true; // product passed every active filter -- include it
	});

	// --- PAGINATION MATH ---
	// Math.ceil rounds up so that leftover items get their own final page
	// e.g. 13 products / 6 per page = 2.16 -> ceil -> 3 pages
	const count = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

	// Slice the full filtered array down to just the current page's products.
	// Page 1 -> slice(0, 6), Page 2 -> slice(6, 12), Page 3 -> slice(12, 18), etc.
	const paginatedProducts = filteredProducts.slice(
		(page - 1) * ITEMS_PER_PAGE, // start index of the current page
		page * ITEMS_PER_PAGE,        // end index (exclusive) of the current page
	);

	return (
		<Box
			id="products" // HTML anchor so the navbar "Products" link can scroll directly here
			sx={{ maxWidth: 1400, mx: "auto", p: { xs: 2, md: 4 } }} // center the content and add responsive padding
		>
			<Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
				Our Collection
			</Typography>
			<Grid container spacing={4}> {/* outer grid: sidebar + product area side by side */}
				<Grid size={{ xs: 12, md: 3 }}> {/* sidebar takes full width on mobile, 3/12 columns on desktop */}
					<FilterSidebar /> {/* the panel on the left with all filter controls */}
				</Grid>
				<Grid size={{ xs: 12, md: 9 }}> {/* product area takes full width on mobile, 9/12 columns on desktop */}
					<Grid container spacing={3}> {/* inner grid: lays out individual product cards */}
						{paginatedProducts.map((product) => (
							<Grid
								size={{ xs: 12, sm: 6, lg: 4 }} // 1 column on mobile, 2 on tablet, 3 on large screen
								key={product.id} // stable key so React can efficiently update the list
							>
								<ProductCard
									product={product}
									onQuickView={onQuickView} // passes the modal-opener down so the card can trigger it
								/>
							</Grid>
						))}
					</Grid>

					{/* Show this empty-state message only when no products survive the filters */}
					{filteredProducts.length === 0 && (
						<Box sx={{ textAlign: "center", py: 10 }}>
							<Typography variant="h6" color="text.secondary">
								No products match your filters.
							</Typography>
						</Box>
					)}

					{/* Show the pagination bar only when there is at least one result */}
					{filteredProducts.length > 0 && (
						<Stack spacing={2} sx={{ mt: 6, alignItems: "center" }}> {/* centers the pagination horizontally */}
							<Pagination
								count={count}    // total number of pages (calculated above with Math.ceil)
								page={page}      // the currently active page number (controlled by our state)
								onChange={(_e, value) => setPage(value)} // called when user clicks a page number; _e is the event (unused)
								color="primary"  // uses the theme's primary color for the active page button
								size="large"     // renders bigger buttons for easier clicking
							/>
						</Stack>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}
