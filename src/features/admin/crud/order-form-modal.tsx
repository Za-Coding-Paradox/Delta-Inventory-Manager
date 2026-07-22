import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, MenuItem, Typography, Autocomplete } from "@mui/material";
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
    else dispatch({ type: "PLACE_ORDER", payload: { id: `ord_${Date.now().toString(36)}`, ...payload, timestamp: new Date().toISOString(), deliveryDate: null } });
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
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Total: ${total.toFixed(2)}</Typography>
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
