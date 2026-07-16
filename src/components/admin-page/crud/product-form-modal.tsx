// src/components/admin-page/crud/product-form-modal.tsx
import { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Box,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Typography,
	IconButton,
	Grid,
	Chip,
	alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import type { Product, ProductColor, ProductStatus } from "../../../config/types";
import { useAppContext } from "../../../context/app-context";

interface Props {
	open: boolean;
	product: Product | null;
	onClose: () => void;
}

const DEFAULT_PRODUCT: Omit<Product, "id"> = {
	name: "",
	description: "",
	price: 0,
	tags: [],
	dateAdded: new Date().toISOString(),
	status: "IN_STOCK",
	stockQuantity: 0,
	colors: [],
	defaultImageUrl: "",
	category: "",
};

export default function ProductFormModal({ open, product, onClose }: Props) {
	const { dispatch } = useAppContext();
	const theme = useTheme();

	const [form, setForm] = useState<Omit<Product, "id">>(DEFAULT_PRODUCT);
	const [tagInput, setTagInput] = useState("");

	useEffect(() => {
		if (open) {
			if (product) {
				setForm({ ...product });
			} else {
				setForm({ ...DEFAULT_PRODUCT, dateAdded: new Date().toISOString() });
			}
			setTagInput("");
		}
	}, [open, product]);

	const handleChange = (field: keyof typeof form, value: any) => {
		setForm((f) => ({ ...f, [field]: value }));
	};

	const handleAddTag = () => {
		if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
			setForm((f) => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
		}
		setTagInput("");
	};

	const handleRemoveTag = (tag: string) => {
		setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
	};

	const handleAddColor = () => {
		setForm((f) => ({
			...f,
			colors: [...f.colors, { name: "", hex: "#000000", imageUrl: "" }],
		}));
	};

	const handleUpdateColor = (index: number, field: keyof ProductColor, value: string) => {
		setForm((f) => {
			const newColors = [...f.colors];
			newColors[index] = { ...newColors[index], [field]: value };
			return { ...f, colors: newColors };
		});
	};

	const handleRemoveColor = (index: number) => {
		setForm((f) => ({
			...f,
			colors: f.colors.filter((_, i) => i !== index),
		}));
	};

	const handleSave = () => {
		if (product) {
			dispatch({ type: "UPDATE_PRODUCT", payload: { ...form, id: product.id } });
		} else {
			dispatch({
				type: "ADD_PRODUCT",
				payload: { ...form, id: `prod_${Date.now()}` },
			});
		}
		onClose();
	};

	const isValid = form.name.trim() && form.price > 0 && form.category.trim();

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>{product ? "Edit Product" : "New Product"}</DialogTitle>
			<DialogContent dividers>
				<Grid container spacing={3} sx={{ py: 1 }}>
					{/* Basic Info */}
					<Grid size={{ xs: 12 }}>
						<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
							Basic Information
						</Typography>
					</Grid>
					<Grid size={{ xs: 12, md: 8 }}>
						<TextField
							label="Product Name"
							fullWidth
							size="small"
							value={form.name}
							onChange={(e) => handleChange("name", e.target.value)}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<TextField
							label="Category"
							fullWidth
							size="small"
							value={form.category}
							onChange={(e) => handleChange("category", e.target.value)}
						/>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<TextField
							label="Description"
							fullWidth
							multiline
							rows={3}
							size="small"
							value={form.description}
							onChange={(e) => handleChange("description", e.target.value)}
						/>
					</Grid>

					{/* Pricing & Inventory */}
					<Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
						<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
							Pricing & Inventory
						</Typography>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<TextField
							label="Price ($)"
							type="number"
							fullWidth
							size="small"
							value={form.price}
							onChange={(e) => handleChange("price", parseFloat(e.target.value))}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<TextField
							label="Stock Quantity"
							type="number"
							fullWidth
							size="small"
							value={form.stockQuantity}
							onChange={(e) => handleChange("stockQuantity", parseInt(e.target.value, 10))}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<FormControl fullWidth size="small">
							<InputLabel>Status</InputLabel>
							<Select
								label="Status"
								value={form.status}
								onChange={(e) => handleChange("status", e.target.value as ProductStatus)}
							>
								<MenuItem value="IN_STOCK">In Stock</MenuItem>
								<MenuItem value="OUT_OF_STOCK">Out of Stock</MenuItem>
								<MenuItem value="COMING_SOON">Coming Soon</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					{/* Tags & Images */}
					<Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
						<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
							Tags & Media
						</Typography>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<TextField
							label="Default Image URL"
							fullWidth
							size="small"
							value={form.defaultImageUrl}
							onChange={(e) => handleChange("defaultImageUrl", e.target.value)}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<Box sx={{ display: "flex", gap: 1 }}>
							<TextField
								label="Add Tag"
								fullWidth
								size="small"
								value={tagInput}
								onChange={(e) => setTagInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleAddTag();
									}
								}}
							/>
							<Button variant="outlined" onClick={handleAddTag}>
								Add
							</Button>
						</Box>
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
							{form.tags.map((tag) => (
								<Chip
									key={tag}
									label={tag}
									size="small"
									onDelete={() => handleRemoveTag(tag)}
								/>
							))}
						</Box>
					</Grid>

					{/* Colors */}
					<Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
						<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
							<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
								Colors / Variations
							</Typography>
							<Button
								startIcon={<AddRoundedIcon />}
								size="small"
								variant="outlined"
								onClick={handleAddColor}
								sx={{ borderRadius: "8px" }}
							>
								Add Color
							</Button>
						</Box>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
							{form.colors.map((color, idx) => (
								<Box
									key={idx}
									sx={{
										p: 2,
										borderRadius: "12px",
										border: `1px solid ${theme.palette.divider}`,
										backgroundColor: alpha(theme.palette.background.paper, 0.5),
										display: "flex",
										gap: 2,
										alignItems: "flex-start",
									}}
								>
									<Grid container spacing={2}>
										<Grid size={{ xs: 12, md: 3 }}>
											<TextField
												label="Color Name"
												size="small"
												fullWidth
												value={color.name}
												onChange={(e) => handleUpdateColor(idx, "name", e.target.value)}
											/>
										</Grid>
										<Grid size={{ xs: 12, md: 3 }}>
											<TextField
												label="Hex Code"
												size="small"
												fullWidth
												value={color.hex}
												onChange={(e) => handleUpdateColor(idx, "hex", e.target.value)}
												slotProps={{
													input: {
														startAdornment: (
															<Box
																sx={{
																	width: 20,
																	height: 20,
																	borderRadius: "4px",
																	backgroundColor: color.hex,
																	border: `1px solid ${theme.palette.divider}`,
																	mr: 1,
																}}
															/>
														),
													}
												}}
											/>
										</Grid>
										<Grid size={{ xs: 12, md: 6 }}>
											<TextField
												label="Image URL"
												size="small"
												fullWidth
												value={color.imageUrl}
												onChange={(e) => handleUpdateColor(idx, "imageUrl", e.target.value)}
											/>
										</Grid>
									</Grid>
									<IconButton
										color="error"
										onClick={() => handleRemoveColor(idx)}
										sx={{ mt: 0.5 }}
									>
										<DeleteRoundedIcon />
									</IconButton>
								</Box>
							))}
							{form.colors.length === 0 && (
								<Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
									No colors added yet.
								</Typography>
							)}
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions sx={{ p: 2, px: 3 }}>
				<Button onClick={onClose} variant="outlined" sx={{ borderRadius: "8px" }}>
					Cancel
				</Button>
				<Button
					onClick={handleSave}
					variant="contained"
					disabled={!isValid}
					sx={{ borderRadius: "8px" }}
				>
					Save Product
				</Button>
			</DialogActions>
		</Dialog>
	);
}
