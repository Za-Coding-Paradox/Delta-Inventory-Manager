import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { ExportContentBody } from "./components/export-content-body";

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
			sx={{ "& .MuiDialog-paper": { borderRadius: "16px", minWidth: { xs: 300, sm: 400 } } }}
		>
			<DialogTitle sx={{ fontWeight: 800 }}>Export Analytics</DialogTitle>
			<DialogContent>
				<ExportContentBody
					isExporting={isExporting}
					isSuccess={isSuccess}
					format={format}
					setFormat={setFormat}
				/>
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
