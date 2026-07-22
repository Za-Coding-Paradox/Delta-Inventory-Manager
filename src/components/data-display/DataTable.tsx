import { Box, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export interface Column<T> {
	key: string;
	label: string;
	/** e.g. "1fr", "60px", "2fr" */
	width: string;
	align?: "left" | "center" | "right";
	render: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
	data: T[];
	columns: Column<T>[];
	keyExtractor: (item: T) => string;
	emptyMessage?: string;
	minWidth?: number | string;
}

export function DataTable<T>({
	data,
	columns,
	keyExtractor,
	emptyMessage = "No items found.",
	minWidth = 800,
}: DataTableProps<T>) {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	const gridTemplateColumns = columns.map((c) => c.width).join(" ");

	return (
		<Box sx={{ flex: 1, overflow: "auto" }}>
			<Box sx={{ minWidth }}>
				{/* Header */}
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns,
						p: 2,
						borderBottom: `1px solid ${theme.palette.divider}`,
						backgroundColor: isDark ? "#141414" : "#F8F8F8",
					}}
				>
					{columns.map((col) => (
						<Typography
							key={col.key}
							variant="caption"
							sx={{ fontWeight: 700 }}
							color="text.secondary"
							align={col.align || "left"}
						>
							{col.label}
						</Typography>
					))}
				</Box>

				{/* Body */}
				<AnimatePresence>
					{data.map((item) => (
						<motion.div
							key={keyExtractor(item)}
							layout
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<Box
								sx={{
									display: "grid",
									gridTemplateColumns,
									p: 2,
									alignItems: "center",
									borderBottom: `1px solid ${theme.palette.divider}`,
									"&:hover": {
										backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.05 : 0.02),
									},
								}}
							>
								{columns.map((col) => (
									<Box
										key={col.key}
										sx={{
											display: "flex",
											justifyContent:
												col.align === "right"
													? "flex-end"
													: col.align === "center"
													? "center"
													: "flex-start",
										}}
									>
										{col.render(item)}
									</Box>
								))}
							</Box>
						</motion.div>
					))}
				</AnimatePresence>

				{/* Empty State */}
				{data.length === 0 && (
					<Box sx={{ p: 8, textAlign: "center" }}>
						<Typography variant="body1" color="text.secondary">
							{emptyMessage}
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
}
