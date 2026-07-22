// @ts-nocheck
import { memo } from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import type { Product, ProductStatus } from "../../../../config/types";

export default memo(function ProductFormBasicInfo({ form, handleChange }: { form: Omit<Product, "id">, handleChange: (f: keyof Omit<Product, "id">, v: any) => void }) {
  return (
    <>
      <Grid item xs={12}><Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Basic Information</Typography></Grid>
      <Grid item xs={12} md={8}><TextField label="Product Name" fullWidth size="small" value={form.name} onChange={(e) => handleChange("name", e.target.value)} /></Grid>
      <Grid item xs={12} md={4}><TextField label="Category" fullWidth size="small" value={form.category} onChange={(e) => handleChange("category", e.target.value)} /></Grid>
      <Grid item xs={12}><TextField label="Description" fullWidth multiline rows={3} size="small" value={form.description} onChange={(e) => handleChange("description", e.target.value)} /></Grid>
      <Grid item xs={12} sx={{ mt: 2 }}><Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Pricing & Inventory</Typography></Grid>
      <Grid item xs={12} md={4}><TextField label="Price ($)" type="number" fullWidth size="small" value={form.price} onChange={(e) => handleChange("price", parseFloat(e.target.value))} /></Grid>
      <Grid item xs={12} md={4}><TextField label="Stock Quantity" type="number" fullWidth size="small" value={form.stockQuantity} onChange={(e) => handleChange("stockQuantity", parseInt(e.target.value, 10))} /></Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth size="small"><InputLabel>Status</InputLabel>
          <Select label="Status" value={form.status} onChange={(e) => handleChange("status", e.target.value as ProductStatus)}>
            <MenuItem value="IN_STOCK">In Stock</MenuItem><MenuItem value="OUT_OF_STOCK">Out of Stock</MenuItem><MenuItem value="COMING_SOON">Coming Soon</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
});
