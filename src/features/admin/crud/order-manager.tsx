import { useState, useMemo, useCallback } from "react";
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
import { useOrderMutations } from "./hooks/use-order-mutations";

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
  const { deleteOrder, loading: isDeleting } = useOrderMutations();
  const handleConfirmDelete = useCallback(async () => {
    if (orderToDelete) { 
      await deleteOrder(orderToDelete.id); 
      setOrderToDelete(null); 
    }
  }, [deleteOrder, orderToDelete]);

  const columns = useMemo<Column<Order>[]>(() => [
    { key: "id", label: "Order ID", width: "1fr", render: (o) => <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "monospace" }}>#{o.id.slice(-6).toUpperCase()}</Typography> },
    { key: "customer", label: "Customer", width: "1.5fr", render: (o) => <Typography variant="body2" sx={{ fontWeight: 700 }}>{o.customerName}</Typography> },
    { key: "total", label: "Total", width: "1fr", render: (o) => <Typography variant="body2" sx={{ fontWeight: 600 }}>${o.total.toFixed(2)}</Typography> },
    { key: "status", label: "Status", width: "1fr", render: (o) => <StatusChip status={o.status as any} /> },
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
