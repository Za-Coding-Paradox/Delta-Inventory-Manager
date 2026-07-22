import { useState, useEffect, useCallback, memo } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from "@mui/material";
import type { Product } from "../../../config/types";
import { useAppContext } from "../../../context/app-context";
import ProductFormBasicInfo from "./components/ProductFormBasicInfo";
import ProductFormTagsColors from "./components/ProductFormTagsColors";

const DEFAULT_PRODUCT: Omit<Product, "id"> = { name: "", description: "", price: 0, tags: [], dateAdded: "", status: "IN_STOCK", stockQuantity: 0, colors: [], defaultImageUrl: "", category: "" };

export default memo(function ProductFormModal({ open, product, onClose }: { open: boolean; product: Product | null; onClose: () => void; }) {
  const { dispatch } = useAppContext();
  const [form, setForm] = useState<Omit<Product, "id">>(DEFAULT_PRODUCT);

  useEffect(() => {
    if (open) setForm(product ? { ...product } : { ...DEFAULT_PRODUCT, dateAdded: new Date().toISOString() });
  }, [open, product]);

  const handleChange = useCallback((field: keyof typeof form, value: any) => setForm(f => ({ ...f, [field]: value })), []);

  const handleSave = useCallback(() => {
    if (product) dispatch({ type: "UPDATE_PRODUCT", payload: { ...form, id: product.id } });
    else dispatch({ type: "ADD_PRODUCT", payload: { ...form, id: `prod_${Date.now()}` } });
    onClose();
  }, [form, product, dispatch, onClose]);

  const isValid = form.name.trim() && form.price > 0 && form.category.trim();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product ? "Edit Product" : "New Product"}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3} sx={{ py: 1 }}>
          <ProductFormBasicInfo form={form} handleChange={handleChange} />
          <ProductFormTagsColors form={form} setForm={setForm} handleChange={handleChange} />
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2, px: 3 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: "8px" }}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={!isValid} sx={{ borderRadius: "8px" }}>Save Product</Button>
      </DialogActions>
    </Dialog>
  );
});
