// src/components/admin-page/crud/product-manager.tsx
import { useState } from "react";
import {
	Box,
	Card,
	Typography,
	Button,
	IconButton,
	TextField,
	Menu,
	MenuItem,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
	SearchRounded as SearchRoundedIcon,
	FilterListRounded as FilterListRoundedIcon,
	AddRounded as AddRoundedIcon,
	EditRounded as EditRoundedIcon,
	DeleteRounded as DeleteRoundedIcon,
} from "@mui/icons-material";
import { useAppContext } from "../../../context/app-context";
import type { Product } from "../../../config/types";
import ProductFormModal from "./product-form-modal";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductManager() {
	const { state, dispatch } = useAppContext();
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const [search, setSearch] = useState("");
	const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
	const [tagFilter, setTagFilter] = useState<string | null>(null);
	const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
	const [tagAnchorEl, setTagAnchorEl] = useState<null | HTMLElement>(null);

	const [formOpen, setFormOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [productToDelete, setProductToDelete] = useState<Product | null>(null);

	const categories = Array.from(new Set(state.products.map((p) => p.category)));
	const availableTags = Array.from(new Set(state.products.filter(p => !categoryFilter || p.category === categoryFilter).flatMap(p => p.tags)));

	const filteredProducts = state.products.filter((p) => {
		if (!p) return false;
		const name = p.name || "";
		const id = p.id || "";
		const searchLower = search.toLowerCase();
		const matchesSearch = name.toLowerCase().includes(searchLower) || 
							  id.toLowerCase().includes(searchLower);
		const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
		const matchesTag = tagFilter ? p.tags?.includes(tagFilter) : true;
		return matchesSearch && matchesCategory && matchesTag;
	});

	const handleOpenForm = (product: Product | null = null) => {
		setEditingProduct(product);
		setFormOpen(true);
	};

	const handleDeleteRequest = (product: Product) => {
		setProductToDelete(product);
		setDeleteConfirmOpen(true);
	};

	const handleConfirmDelete = () => {
		if (productToDelete) {
			dispatch({ type: "DELETE_PRODUCT", payload: productToDelete.id });
			setDeleteConfirmOpen(false);
			setProductToDelete(null);
		}
	};

	return (
		<Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
			<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
				<Box>
					<Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
						Product Manager
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Manage your inventory, pricing, and product variations.
					</Typography>
				</Box>
				<Button
					variant="contained"
					startIcon={<AddRoundedIcon />}
					onClick={() => handleOpenForm()}
					sx={{ borderRadius: "10px", px: 3, py: 1 }}
				>
					Add Product
				</Button>
			</Box>

			<Card variant="widget" sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", p: 0 }}>
				{/* Toolbar */}
				<Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, display: "flex", gap: 2, alignItems: "center" }}>
					<TextField
						placeholder="Search products..."
						size="small"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						sx={{ width: 280 }}
						slotProps={{
							input: {
								startAdornment: <SearchRoundedIcon color="action" fontSize="small" sx={{ mr: 1 }} />,
							}
						}}
					/>
					<Button
						variant="outlined"
						size="small"
						startIcon={<FilterListRoundedIcon />}
						onClick={(e) => setFilterAnchorEl(e.currentTarget)}
						sx={{ borderRadius: "10px", borderColor: categoryFilter ? theme.palette.primary.main : undefined }}
					>
						{categoryFilter || "All Categories"}
					</Button>
					<Menu
						anchorEl={filterAnchorEl}
						open={Boolean(filterAnchorEl)}
						onClose={() => setFilterAnchorEl(null)}
					>
						<MenuItem onClick={() => { setCategoryFilter(null); setFilterAnchorEl(null); }}>
							All Categories
						</MenuItem>
						{categories.map((cat) => (
							<MenuItem key={cat} onClick={() => { setCategoryFilter(cat); setFilterAnchorEl(null); }}>
								{cat}
							</MenuItem>
						))}
					</Menu>
					<Button
						variant="outlined"
						size="small"
						onClick={(e) => setTagAnchorEl(e.currentTarget)}
						sx={{ borderRadius: "10px", borderColor: tagFilter ? theme.palette.primary.main : undefined }}
					>
						{tagFilter || "All Tags"}
					</Button>
					<Menu
						anchorEl={tagAnchorEl}
						open={Boolean(tagAnchorEl)}
						onClose={() => setTagAnchorEl(null)}
					>
						<MenuItem onClick={() => { setTagFilter(null); setTagAnchorEl(null); }}>
							All Tags
						</MenuItem>
						{availableTags.map((cat) => (
							<MenuItem key={cat} onClick={() => { setTagFilter(cat); setTagAnchorEl(null); }}>
								{cat}
							</MenuItem>
						))}
					</Menu>
					<Box sx={{ flexGrow: 1 }} />
					<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
						Showing {filteredProducts.length} of {state.products.length} products
					</Typography>
				</Box>

				{/* Custom Table */}
				<Box sx={{ flex: 1, overflow: "auto" }}>
					<Box sx={{ minWidth: 800 }}>
						<Box sx={{ display: "grid", gridTemplateColumns: "60px 2fr 1fr 1fr 1fr 1fr 80px", p: 2, borderBottom: `1px solid ${theme.palette.divider}`, backgroundColor: isDark ? "#141414" : "#F8F8F8" }}>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Img</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Product</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Category</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Price</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Stock</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">Status</Typography>
							<Typography variant="caption" sx={{ fontWeight: 700 }} color="text.secondary" align="right">Actions</Typography>
						</Box>

						<AnimatePresence>
							{filteredProducts.map((product) => (
								<motion.div
									key={product.id}
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Box
										sx={{
											display: "grid",
											gridTemplateColumns: "60px 2fr 1fr 1fr 1fr 1fr 80px",
											p: 2,
											alignItems: "center",
											borderBottom: `1px solid ${theme.palette.divider}`,
											"&:hover": {
												backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.05 : 0.02),
											},
										}}
									>
										<Box
											component="img"
											src={product.defaultImageUrl}
											sx={{ width: 40, height: 40, borderRadius: "8px", objectFit: "cover", backgroundColor: theme.palette.divider }}
										/>
										<Box>
											<Typography variant="body2" noWrap sx={{ fontWeight: 700, maxWidth: 250 }}>
												{product.name}
											</Typography>
											<Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
												ID: {product.id}
											</Typography>
										</Box>
										<Typography variant="body2">{product.category}</Typography>
										<Typography variant="body2" sx={{ fontWeight: 600 }}>${product.price.toFixed(2)}</Typography>
										<Typography variant="body2">{product.stockQuantity}</Typography>
										<Box>
											<Chip
												variant="status"
												color={
													product.status === "IN_STOCK" ? "success" :
													product.status === "COMING_SOON" ? "warning" : "error"
												}
												label={product.status.replace(/_/g, " ")}
											/>
										</Box>
										<Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
											<IconButton size="small" onClick={() => handleOpenForm(product)}>
												<EditRoundedIcon fontSize="small" />
											</IconButton>
											<IconButton size="small" color="error" onClick={() => handleDeleteRequest(product)}>
												<DeleteRoundedIcon fontSize="small" />
											</IconButton>
										</Box>
									</Box>
								</motion.div>
							))}
						</AnimatePresence>

						{filteredProducts.length === 0 && (
							<Box sx={{ p: 8, textAlign: "center" }}>
								<Typography variant="body1" color="text.secondary">
									No products found matching your search.
								</Typography>
							</Box>
						)}
					</Box>
				</Box>
			</Card>

			<ProductFormModal
				open={formOpen}
				product={editingProduct}
				onClose={() => setFormOpen(false)}
			/>

			{/* Delete Confirmation */}
			<Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} sx={{ '& .MuiDialog-paper': { borderRadius: "16px" } }}>
				<DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete <strong>{productToDelete?.name}</strong>? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ p: 2, px: 3 }}>
					<Button onClick={() => setDeleteConfirmOpen(false)} variant="outlined" sx={{ borderRadius: "8px" }}>Cancel</Button>
					<Button onClick={handleConfirmDelete} color="error" variant="contained" sx={{ borderRadius: "8px" }}>Delete Product</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
