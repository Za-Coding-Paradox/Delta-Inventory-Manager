import {
	Typography,
	Box,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	CircularProgress,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export interface ExportContentBodyProps {
	isExporting: boolean;
	isSuccess: boolean;
	format: string;
	setFormat: (v: string) => void;
}

export function ExportContentBody({ isExporting, isSuccess, format, setFormat }: ExportContentBodyProps) {
	if (isSuccess) {
		return (
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4, gap: 2 }}>
				<CheckCircleRoundedIcon color="success" sx={{ fontSize: 64 }} />
				<Typography variant="h6" sx={{ fontWeight: 700 }}>Export Complete!</Typography>
				<Typography variant="body2" color="text.secondary">Your file is downloading.</Typography>
			</Box>
		);
	}

	if (isExporting) {
		return (
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4, gap: 3 }}>
				<CircularProgress />
				<Typography variant="body1" sx={{ fontWeight: 600 }}>Generating {format.toUpperCase()}...</Typography>
			</Box>
		);
	}

	return (
		<>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				Choose a format to export the current analytics view.
			</Typography>
			<FormControl component="fieldset">
				<RadioGroup value={format} onChange={(e) => setFormat(e.target.value)}>
					<FormControlLabel value="pdf" control={<Radio />} label="PDF Report (Visual)" />
					<FormControlLabel value="csv" control={<Radio />} label="CSV Data (Raw)" />
					<FormControlLabel value="xlsx" control={<Radio />} label="Excel Spreadsheet" />
				</RadioGroup>
			</FormControl>
		</>
	);
}
