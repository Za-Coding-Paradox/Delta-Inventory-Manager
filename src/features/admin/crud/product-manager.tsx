import { useState, useMemo, useCallback } from "react";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { EditRounded, DeleteRounded } from "@mui/icons-material";
import { useAppContext } from "../../../context/app-context";
import type { Product } from "../../../config/types";
import { PageHeader } from "../../../components/layout/PageHeader";
import { SearchFilterBar } from "../../../components/inputs/SearchFilterBar";
import { DataTable, Column } from "../../../components/data-display/DataTable";
import { StatusChip } from "../../../components/data-display/StatusChip";
import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import ProductFormModal from "./product-form-modal";
import { useProductMutations } from "./hooks/use-product-mutations";

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
  const { deleteProduct, loading: isDeleting } = useProductMutations();
  const handleConfirmDelete = useCallback(async () => {
    if (productToDelete) { 
      await deleteProduct(productToDelete.id); 
      setProductToDelete(null); 
    }
  }, [deleteProduct, productToDelete]);

  const columns = useMemo<Column<Product>[]>(() => [
    { key: "img", label: "Img", width: "60px", render: (p) => <Box component="img" src={p.defaultImageUrl} sx={{ width: 40, height: 40, borderRadius: "8px", objectFit: "cover" }} /> },
    { key: "product", label: "Product", width: "2fr", render: (p) => <Box><Typography variant="body2" noWrap sx={{ fontWeight: 700, maxWidth: 250 }}>{p.name}</Typography><Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>ID: {p.id}</Typography></Box> },
    { key: "category", label: "Category", width: "1fr", render: (p) => <Typography variant="body2">{p.category}</Typography> },
    { key: "price", label: "Price", width: "1fr", render: (p) => <Typography variant="body2" sx={{ fontWeight: 600 }}>${p.price.toFixed(2)}</Typography> },
    { key: "stock", label: "Stock", width: "1fr", render: (p) => <Typography variant="body2">{p.stockQuantity}</Typography> },
    { key: "status", label: "Status", width: "1fr", render: (p) => <StatusChip status={p.status as any} /> },
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
