// @ts-nocheck
import { memo, useState, useCallback } from "react";
import { Grid, Box, TextField, Button, Chip, Typography, IconButton, alpha, useTheme } from "@mui/material";
import { AddRounded, DeleteRounded } from "@mui/icons-material";
import type { Product, ProductColor } from "../../../../config/types";

export default memo(function ProductFormTagsColors({ form, setForm, handleChange }: { form: Omit<Product, "id">, setForm: any, handleChange: (f: keyof Omit<Product, "id">, v: any) => void }) {
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
            <Box key={i} sx={{ p: 2, borderRadius: "12px", border: `1px solid ${theme.palette.divider}`, backgroundColor: alpha(theme.palette.background.paper, 0.5), display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Grid container spacing={2}>
                {/* @ts-ignore */}
                <Grid item xs={12} md={3}><TextField label="Color Name" size="small" fullWidth value={c.name} onChange={(e) => handleUpdateColor(i, "name", e.target.value)} /></Grid>
                {/* @ts-ignore */}
                <Grid item xs={12} md={3}><TextField label="Hex Code" size="small" fullWidth value={c.hex} onChange={(e) => handleUpdateColor(i, "hex", e.target.value)} slotProps={{ input: { startAdornment: <Box sx={{ width: 20, height: 20, borderRadius: "4px", backgroundColor: c.hex, border: `1px solid ${theme.palette.divider}`, mr: 1 }} /> } }} /></Grid>
                {/* @ts-ignore */}
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
