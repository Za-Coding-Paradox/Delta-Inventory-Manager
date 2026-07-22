import { memo, useCallback } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import type { OrderItem } from "../../../../config/types";

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
          <Typography variant="body2" sx={{ width: 80, textAlign: "right" }}>${(item.priceAtOrder * item.quantity).toFixed(2)}</Typography>
          <IconButton size="small" color="error" onClick={() => handleRemoveItem(idx)}><DeleteRounded fontSize="small" /></IconButton>
        </Box>
      ))}
    </>
  );
});
