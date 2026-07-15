// src/App.jsx
import { useState } from "react";
import {
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Paper,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import "./App.css";

// Create a custom MUI theme to make it look premium
const theme = createTheme({
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h6: {
			fontWeight: 600,
			letterSpacing: "-0.025em",
			color: "#1e293b",
		},
	},
	palette: {
		background: {
			default: "transparent", // Let our CSS background show through
		},
		primary: {
			main: "#3b82f6",
			dark: "#2563eb",
		},
	},
	shape: {
		borderRadius: 12, // Rounded corners for all MUI components
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					boxShadow:
						"0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05)",
					transition: "transform 0.2s ease, box-shadow 0.2s ease",
					"&:hover": {
						transform: "translateY(-2px)",
						boxShadow:
							"0 10px 20px -5px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.05)",
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none", // Removes the default ALL CAPS
					fontWeight: 600,
					padding: "10px 24px",
					boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
				},
			},
		},
	},
});

export default function App() {
	const [muiCategory, setMuiCategory] = useState("");
	const [nativeCategory, setNativeCategory] = useState("");

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<div className="comparison-container">
				{/* ==========================================
            1. THE MATERIAL UI APPROACH
            ========================================== */}
				<Paper
					sx={{
						p: 4,
						minWidth: 320,
						display: "flex",
						flexDirection: "column",
						gap: 3,
					}}
				>
					<Typography variant="h6" component="h3">
						MUI Components
					</Typography>

					<FormControl fullWidth variant="outlined">
						<InputLabel id="mui-dropdown-label">
							Category
						</InputLabel>
						<Select
							labelId="mui-dropdown-label"
							value={muiCategory}
							label="Category"
							onChange={(e) => setMuiCategory(e.target.value)}
						>
							<MenuItem value="electronics">Electronics</MenuItem>
							<MenuItem value="furniture">Furniture</MenuItem>
							<MenuItem value="clothing">Clothing</MenuItem>
						</Select>
					</FormControl>

					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={() => alert(`MUI Submitted: ${muiCategory}`)}
						sx={{ mt: 1 }}
					>
						Submit
					</Button>
				</Paper>

				{/* ==========================================
            2. THE NATIVE HTML/CSS APPROACH
            ========================================== */}
				<div className="native-card">
					<h3>Native HTML / CSS</h3>

					<div className="native-form-group">
						<label
							className="native-label"
							htmlFor="native-dropdown"
						>
							Category
						</label>
						<select
							id="native-dropdown"
							className="native-select"
							value={nativeCategory}
							onChange={(e) => setNativeCategory(e.target.value)}
						>
							<option value="" disabled>
								Select a category
							</option>
							<option value="electronics">Electronics</option>
							<option value="furniture">Furniture</option>
							<option value="clothing">Clothing</option>
						</select>
					</div>

					<button
						className="native-button"
						onClick={() =>
							alert(`Native Submitted: ${nativeCategory}`)
						}
					>
						Submit
					</button>
				</div>
			</div>
		</ThemeProvider>
	);
}
