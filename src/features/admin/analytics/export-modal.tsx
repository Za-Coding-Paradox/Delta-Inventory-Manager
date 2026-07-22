// src/components/admin-page/analytics/export-modal.tsx
import { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Box,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	CircularProgress,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

interface ExportModalProps {
	open: boolean;
	onClose: () => void;
}

export default function ExportModal({ open, onClose }: ExportModalProps) {
	const [format, setFormat] = useState("pdf");
	const [isExporting, setIsExporting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleExport = () => {
		setIsExporting(true);
		// Simulate network request
		setTimeout(() => {
			setIsExporting(false);
			setIsSuccess(true);
			setTimeout(() => {
				setIsSuccess(false);
				onClose();
			}, 2000);
		}, 1500);
	};

	return (
		<Dialog
			open={open}
			onClose={!isExporting ? onClose : undefined}
			sx={{ '& .MuiDialog-paper': { borderRadius: "16px", minWidth: { xs: 300, sm: 400 } } }}
		>
			<DialogTitle sx={{ fontWeight: 800 }}>Export Analytics</DialogTitle>
			<DialogContent>
				{!isExporting && !isSuccess ? (
					<>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
							Choose a format to export the current analytics view.
						</Typography>
						<FormControl component="fieldset">
							<RadioGroup
								value={format}
								onChange={(e) => setFormat(e.target.value)}
							>
								<FormControlLabel value="pdf" control={<Radio />} label="PDF Report (Visual)" />
								<FormControlLabel value="csv" control={<Radio />} label="CSV Data (Raw)" />
								<FormControlLabel value="xlsx" control={<Radio />} label="Excel Spreadsheet" />
							</RadioGroup>
						</FormControl>
					</>
				) : isSuccess ? (
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4, gap: 2 }}>
						<CheckCircleRoundedIcon color="success" sx={{ fontSize: 64 }} />
						<Typography variant="h6" sx={{ fontWeight: 700 }}>Export Complete!</Typography>
						<Typography variant="body2" color="text.secondary">Your file is downloading.</Typography>
					</Box>
				) : (
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4, gap: 3 }}>
						<CircularProgress />
						<Typography variant="body1" sx={{ fontWeight: 600 }}>Generating {format.toUpperCase()}...</Typography>
					</Box>
				)}
			</DialogContent>
			{!isExporting && !isSuccess && (
				<DialogActions sx={{ px: 3, pb: 3 }}>
					<Button onClick={onClose} color="inherit" sx={{ borderRadius: "10px" }}>Cancel</Button>
					<Button
						variant="contained"
						startIcon={<DownloadRoundedIcon />}
						onClick={handleExport}
						sx={{ borderRadius: "10px" }}
					>
						Export
					</Button>
				</DialogActions>
			)}
		</Dialog>
	);
}
