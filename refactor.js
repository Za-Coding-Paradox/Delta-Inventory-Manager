const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'features', 'admin', 'crud', 'components');

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

// -------------------------
// order-manager.tsx
// -------------------------
fs.writeFileSync(path.join(__dirname, 'src', 'features', 'admin', 'crud', 'order-manager.tsx'), `import { useState, useMemo, useCallback } from "react";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { EditRounded, DeleteRounded } from "@mui/icons-material";
import { format } from "date-fns";
import { useAppContext } from "../../../context/app-context";
import type { Order } from "../../../config/types";
import { PageHeader } from "../../../components/layout/PageHeader";
import { SearchFilterBar } from "../../../components/inputs/SearchFilterBar";
import { DataTable, Column } from "../../../components/data-display/DataTable";
import { StatusChip } from "../../../components/data-display/StatusChip";
import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import OrderFormModal from "./order-form-modal";

export default function OrderManager() {
  const { state, dispatch } = useAppContext();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const statuses = useMemo(() => ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"], []);
  
  const filteredOrders = useMemo(() => state.orders.filter((o) => {
    if (!o) return false;
    const sLower = search.toLowerCase();
    const matchSearch = (o.customerName || "").toLowerCase().includes(sLower) || (o.id || "").toLowerCase().includes(sLower);
    const matchStatus = statusFilter ? o.status === statusFilter : true;
    return matchSearch && matchStatus;
  }), [state.orders, search, statusFilter]);

  const handleOpenForm = useCallback((order: Order | null = null) => { setEditingOrder(order); setFormOpen(true); }, []);
  const handleDeleteRequest = useCallback((order: Order) => setOrderToDelete(order), []);
  const handleConfirmDelete = useCallback(() => {
    if (orderToDelete) { dispatch({ type: "DELETE_ORDER", payload: orderToDelete.id }); setOrderToDelete(null); }
  }, [dispatch, orderToDelete]);

  const columns = useMemo<Column<Order>[]>(() => [
    { key: "id", label: "Order ID", width: "1fr", render: (o) => <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "monospace" }}>#{o.id.slice(-6).toUpperCase()}</Typography> },
    { key: "customer", label: "Customer", width: "1.5fr", render: (o) => <Typography variant="body2" sx={{ fontWeight: 700 }}>{o.customerName}</Typography> },
    { key: "total", label: "Total", width: "1fr", render: (o) => <Typography variant="body2" sx={{ fontWeight: 600 }}>\${o.total.toFixed(2)}</Typography> },
    { key: "status", label: "Status", width: "1fr", render: (o) => <StatusChip status={o.status} /> },
    { key: "date", label: "Date", width: "1.5fr", render: (o) => <Typography variant="body2" color="text.secondary">{format(new Date(o.timestamp), "MMM dd, yyyy HH:mm")}</Typography> },
    { key: "actions", label: "Actions", width: "80px", align: "right", render: (o) => (
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <IconButton size="small" onClick={() => handleOpenForm(o)}><EditRounded fontSize="small" /></IconButton>
        <IconButton size="small" color="error" onClick={() => handleDeleteRequest(o)}><DeleteRounded fontSize="small" /></IconButton>
      </Box>
    ) }
  ], [handleOpenForm, handleDeleteRequest]);

  const filters = useMemo(() => [{ key: "status", label: "All Statuses", options: statuses.map(s => ({ label: s, value: s })), currentValue: statusFilter, onChange: setStatusFilter }], [statuses, statusFilter]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
      <PageHeader title="Order Manager" subtitle="Manage customer orders, track statuses, and issue manual updates." actionLabel="Create Order" onAction={() => handleOpenForm()} />
      <Card variant="widget" sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", p: 0 }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search by customer or ID..." filters={filters} rightContent={<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Showing {filteredOrders.length} of {state.orders.length} orders</Typography>} />
        <DataTable data={filteredOrders} columns={columns} keyExtractor={(o) => o.id} emptyMessage="No orders found matching your search." minWidth={900} />
      </Card>
      <OrderFormModal open={formOpen} order={editingOrder} onClose={() => setFormOpen(false)} />
      <ConfirmDialog open={!!orderToDelete} title="Confirm Deletion" description={<>Are you sure you want to permanently delete order <strong>#{orderToDelete?.id.slice(-6).toUpperCase()}</strong>? This action cannot be undone.</>} confirmLabel="Delete Order" isDestructive onClose={() => setOrderToDelete(null)} onConfirm={handleConfirmDelete} />
    </Box>
  );
}
`);

// -------------------------
// order-form-modal.tsx
// -------------------------
fs.writeFileSync(path.join(__dirname, 'src', 'features', 'admin', 'crud', 'order-form-modal.tsx'), `import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, MenuItem, Typography, IconButton, Autocomplete } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { useAppContext } from "../../../context/app-context";
import type { Order, OrderItem, Product, OrderStatus } from "../../../config/types";
import OrderItemsList from "./components/OrderItemsList";

interface OrderFormModalProps { open: boolean; order: Order | null; onClose: () => void; }

export default memo(function OrderFormModal({ open, order, onClose }: OrderFormModalProps) {
  const { state, dispatch } = useAppContext();
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState<OrderStatus>("PENDING");
  const [deliveryType, setDeliveryType] = useState<"standard" | "express">("standard");
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (open) {
      setCustomerName(order?.customerName || "");
      setStatus(order?.status || "PENDING");
      setDeliveryType(order?.deliveryType || "standard");
      setItems(order?.items || []);
    }
  }, [open, order]);

  const total = useMemo(() => items.reduce((acc, item) => acc + item.priceAtOrder * item.quantity, 0), [items]);

  const handleAddItem = useCallback((product: Product | null) => {
    if (!product) return;
    setItems((prev) => [...prev, { productId: product.id, productName: product.name, selectedColorName: product.colors?.[0]?.name || "Default", quantity: 1, priceAtOrder: product.price }]);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || items.length === 0) return;
    const payload = { customerName, status, deliveryType, items, total };
    if (order) dispatch({ type: "UPDATE_ORDER", payload: { ...order, ...payload } });
    else dispatch({ type: "PLACE_ORDER", payload: { id: \`ord_\${Date.now().toString(36)}\`, ...payload, timestamp: new Date().toISOString(), deliveryDate: null } });
    onClose();
  }, [customerName, status, deliveryType, items, total, order, dispatch, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ "& .MuiDialog-paper": { borderRadius: "16px" } }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 800 }}>{order ? "Edit Order" : "Create New Order"}</DialogTitle>
        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField label="Customer Name" fullWidth required value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField select label="Status" fullWidth value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}>
              {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField select label="Delivery Type" fullWidth value={deliveryType} onChange={(e) => setDeliveryType(e.target.value as any)}>
              <MenuItem value="standard">Standard</MenuItem><MenuItem value="express">Express</MenuItem>
            </TextField>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Order Items</Typography>
            <Autocomplete options={state.products} getOptionLabel={(o) => o.name} onChange={(_, v) => handleAddItem(v)} renderInput={(params) => <TextField {...params} label="Add Product..." size="small" />} sx={{ mb: 2 }} />
            <OrderItemsList items={items} setItems={setItems} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Total: \${total.toFixed(2)}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, px: 3 }}>
          <Button onClick={onClose} variant="outlined" sx={{ borderRadius: "8px" }}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!customerName.trim() || items.length === 0} sx={{ borderRadius: "8px" }}>{order ? "Save Changes" : "Create Order"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});
`);

fs.writeFileSync(path.join(componentsDir, 'OrderItemsList.tsx'), `import { memo, useCallback } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import type { OrderItem } from "../../../../../config/types";

export default memo(function OrderItemsList({ items, setItems }: { items: OrderItem[], setItems: React.Dispatch<React.SetStateAction<OrderItem[]>> }) {
  const handleUpdateItemQty = useCallback((index: number, quantity: number) => {
    setItems((prev) => { const n = [...prev]; n[index].quantity = Math.max(1, quantity); return n; });
  }, [setItems]);

  const handleRemoveItem = useCallback((index: number) => setItems((prev) => { const n = [...prev]; n.splice(index, 1); return n; }), [setItems]);

  if (items.length === 0) return <Typography variant="caption" color="error">Must add at least one item.</Typography>;

  return (
    <>
      {items.map((item, idx) => (
        <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="body2" sx={{ flex: 1, fontWeight: 600 }}>{item.productName}</Typography>
          <TextField type="number" size="small" sx={{ width: 80 }} value={item.quantity} onChange={(e) => handleUpdateItemQty(idx, parseInt(e.target.value) || 1)} slotProps={{ htmlInput: { min: 1 } }} />
          <Typography variant="body2" sx={{ width: 80, textAlign: "right" }}>\${(item.priceAtOrder * item.quantity).toFixed(2)}</Typography>
          <IconButton size="small" color="error" onClick={() => handleRemoveItem(idx)}><DeleteRounded fontSize="small" /></IconButton>
        </Box>
      ))}
    </>
  );
});
`);

// -------------------------
// product-manager.tsx
// -------------------------
fs.writeFileSync(path.join(__dirname, 'src', 'features', 'admin', 'crud', 'product-manager.tsx'), `import { useState, useMemo, useCallback } from "react";
import { Box, Card, IconButton, Typography, Chip } from "@mui/material";
import { EditRounded, DeleteRounded } from "@mui/icons-material";
import { useAppContext } from "../../../context/app-context";
import type { Product } from "../../../config/types";
import { PageHeader } from "../../../components/layout/PageHeader";
import { SearchFilterBar } from "../../../components/inputs/SearchFilterBar";
import { DataTable, Column } from "../../../components/data-display/DataTable";
import { StatusChip } from "../../../components/data-display/StatusChip";
import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import ProductFormModal from "./product-form-modal";

export default function ProductManager() {
  const { state, dispatch } = useAppContext();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const categories = useMemo(() => Array.from(new Set(state.products.map((p) => p.category))), [state.products]);
  const availableTags = useMemo(() => Array.from(new Set(state.products.filter(p => !categoryFilter || p.category === categoryFilter).flatMap(p => p.tags))), [state.products, categoryFilter]);

  const filteredProducts = useMemo(() => state.products.filter((p) => {
    if (!p) return false;
    const sLower = search.toLowerCase();
    const matchSearch = (p.name || "").toLowerCase().includes(sLower) || (p.id || "").toLowerCase().includes(sLower);
    const matchCategory = categoryFilter ? p.category === categoryFilter : true;
    const matchTag = tagFilter ? p.tags?.includes(tagFilter) : true;
    return matchSearch && matchCategory && matchTag;
  }), [state.products, search, categoryFilter, tagFilter]);

  const handleOpenForm = useCallback((product: Product | null = null) => { setEditingProduct(product); setFormOpen(true); }, []);
  const handleDeleteRequest = useCallback((product: Product) => setProductToDelete(product), []);
  const handleConfirmDelete = useCallback(() => {
    if (productToDelete) { dispatch({ type: "DELETE_PRODUCT", payload: productToDelete.id }); setProductToDelete(null); }
  }, [dispatch, productToDelete]);

  const columns = useMemo<Column<Product>[]>(() => [
    { key: "img", label: "Img", width: "60px", render: (p) => <Box component="img" src={p.defaultImageUrl} sx={{ width: 40, height: 40, borderRadius: "8px", objectFit: "cover" }} /> },
    { key: "product", label: "Product", width: "2fr", render: (p) => <Box><Typography variant="body2" noWrap sx={{ fontWeight: 700, maxWidth: 250 }}>{p.name}</Typography><Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>ID: {p.id}</Typography></Box> },
    { key: "category", label: "Category", width: "1fr", render: (p) => <Typography variant="body2">{p.category}</Typography> },
    { key: "price", label: "Price", width: "1fr", render: (p) => <Typography variant="body2" sx={{ fontWeight: 600 }}>\${p.price.toFixed(2)}</Typography> },
    { key: "stock", label: "Stock", width: "1fr", render: (p) => <Typography variant="body2">{p.stockQuantity}</Typography> },
    { key: "status", label: "Status", width: "1fr", render: (p) => <StatusChip status={p.status} /> },
    { key: "actions", label: "Actions", width: "80px", align: "right", render: (p) => (
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <IconButton size="small" onClick={() => handleOpenForm(p)}><EditRounded fontSize="small" /></IconButton>
        <IconButton size="small" color="error" onClick={() => handleDeleteRequest(p)}><DeleteRounded fontSize="small" /></IconButton>
      </Box>
    ) }
  ], [handleOpenForm, handleDeleteRequest]);

  const filters = useMemo(() => [
    { key: "cat", label: "All Categories", options: categories.map(c => ({ label: c, value: c })), currentValue: categoryFilter, onChange: setCategoryFilter },
    { key: "tag", label: "All Tags", options: availableTags.map(t => ({ label: t, value: t })), currentValue: tagFilter, onChange: setTagFilter }
  ], [categories, availableTags, categoryFilter, tagFilter]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
      <PageHeader title="Product Manager" subtitle="Manage your inventory, pricing, and product variations." actionLabel="Add Product" onAction={() => handleOpenForm()} />
      <Card variant="widget" sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", p: 0 }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search products..." filters={filters} rightContent={<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Showing {filteredProducts.length} of {state.products.length} products</Typography>} />
        <DataTable data={filteredProducts} columns={columns} keyExtractor={(p) => p.id} emptyMessage="No products found matching your search." minWidth={800} />
      </Card>
      <ProductFormModal open={formOpen} product={editingProduct} onClose={() => setFormOpen(false)} />
      <ConfirmDialog open={!!productToDelete} title="Confirm Deletion" description={<>Are you sure you want to delete <strong>{productToDelete?.name}</strong>? This action cannot be undone.</>} confirmLabel="Delete Product" isDestructive onClose={() => setProductToDelete(null)} onConfirm={handleConfirmDelete} />
    </Box>
  );
}
`);

// -------------------------
// product-form-modal.tsx
// -------------------------
fs.writeFileSync(path.join(__dirname, 'src', 'features', 'admin', 'crud', 'product-form-modal.tsx'), `import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from "@mui/material";
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
    else dispatch({ type: "ADD_PRODUCT", payload: { ...form, id: \`prod_\${Date.now()}\` } });
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
`);

fs.writeFileSync(path.join(componentsDir, 'ProductFormBasicInfo.tsx'), `import { memo, useCallback } from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import type { Product, ProductStatus } from "../../../../../config/types";

export default memo(function ProductFormBasicInfo({ form, handleChange }: { form: Omit<Product, "id">, handleChange: (f: keyof Product, v: any) => void }) {
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
`);

fs.writeFileSync(path.join(componentsDir, 'ProductFormTagsColors.tsx'), `import { memo, useState, useCallback } from "react";
import { Grid, Box, TextField, Button, Chip, Typography, IconButton, alpha, useTheme } from "@mui/material";
import { AddRounded, DeleteRounded } from "@mui/icons-material";
import type { Product, ProductColor } from "../../../../../config/types";

export default memo(function ProductFormTagsColors({ form, setForm, handleChange }: { form: Omit<Product, "id">, setForm: any, handleChange: (f: keyof Product, v: any) => void }) {
  const theme = useTheme();
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) setForm((f: any) => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
    setTagInput("");
  }, [tagInput, form.tags, setForm]);

  const handleRemoveTag = useCallback((tag: string) => setForm((f: any) => ({ ...f, tags: f.tags.filter((t: string) => t !== tag) })), [setForm]);
  const handleAddColor = useCallback(() => setForm((f: any) => ({ ...f, colors: [...f.colors, { name: "", hex: "#000000", imageUrl: "" }] })), [setForm]);
  const handleUpdateColor = useCallback((idx: number, field: keyof ProductColor, val: string) => setForm((f: any) => { const c = [...f.colors]; c[idx] = { ...c[idx], [field]: val }; return { ...f, colors: c }; }), [setForm]);
  const handleRemoveColor = useCallback((idx: number) => setForm((f: any) => ({ ...f, colors: f.colors.filter((_: any, i: number) => i !== idx) })), [setForm]);

  return (
    <>
      <Grid item xs={12} sx={{ mt: 2 }}><Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Tags & Media</Typography></Grid>
      <Grid item xs={12} md={6}><TextField label="Default Image URL" fullWidth size="small" value={form.defaultImageUrl} onChange={(e) => handleChange("defaultImageUrl", e.target.value)} /></Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", gap: 1 }}><TextField label="Add Tag" fullWidth size="small" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())} /><Button variant="outlined" onClick={handleAddTag}>Add</Button></Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>{form.tags.map(t => <Chip key={t} label={t} size="small" onDelete={() => handleRemoveTag(t)} />)}</Box>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}><Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Colors / Variations</Typography><Button startIcon={<AddRounded />} size="small" variant="outlined" onClick={handleAddColor} sx={{ borderRadius: "8px" }}>Add Color</Button></Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {form.colors.map((c, i) => (
            <Box key={i} sx={{ p: 2, borderRadius: "12px", border: \`1px solid \${theme.palette.divider}\`, backgroundColor: alpha(theme.palette.background.paper, 0.5), display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}><TextField label="Color Name" size="small" fullWidth value={c.name} onChange={(e) => handleUpdateColor(i, "name", e.target.value)} /></Grid>
                <Grid item xs={12} md={3}><TextField label="Hex Code" size="small" fullWidth value={c.hex} onChange={(e) => handleUpdateColor(i, "hex", e.target.value)} slotProps={{ input: { startAdornment: <Box sx={{ width: 20, height: 20, borderRadius: "4px", backgroundColor: c.hex, border: \`1px solid \${theme.palette.divider}\`, mr: 1 }} /> } }} /></Grid>
                <Grid item xs={12} md={6}><TextField label="Image URL" size="small" fullWidth value={c.imageUrl} onChange={(e) => handleUpdateColor(i, "imageUrl", e.target.value)} /></Grid>
              </Grid>
              <IconButton color="error" onClick={() => handleRemoveColor(i)} sx={{ mt: 0.5 }}><DeleteRounded /></IconButton>
            </Box>
          ))}
          {form.colors.length === 0 && <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>No colors added yet.</Typography>}
        </Box>
      </Grid>
    </>
  );
});
`);
