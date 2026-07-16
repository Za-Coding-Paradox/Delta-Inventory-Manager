// src/components/product-page/search-bar.tsx
import { useState, useRef, useCallback } from "react";
import {
	Autocomplete,
	TextField,
	InputAdornment,
	IconButton,
	Tooltip,
	Box,
	CircularProgress,
	Paper,
	Typography,
	Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SearchIcon from "@mui/icons-material/Search";
import { useAppContext } from "../../context/app-context";
import type { Product } from "../../config/types";

const LLM_DEBOUNCE_MS = 600;

function ProductAvatar({ name }: { name: string }) {
	const initials = name
		.split(" ")
		.slice(0, 2)
		.map((w) => w[0])
		.join("")
		.toUpperCase();

	const colors = [
		{ bg: "#E8F0FE", text: "#1A56DB" },
		{ bg: "#E3F9E5", text: "#1E8A2E" },
		{ bg: "#FDE8FF", text: "#9333EA" },
		{ bg: "#FFF3E0", text: "#E65100" },
		{ bg: "#E0F7FA", text: "#00695C" },
	];
	const color = colors[name.charCodeAt(0) % colors.length];

	return (
		<Box
			sx={{
				width: 40,
				height: 40,
				borderRadius: "50%",
				backgroundColor: color.bg,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "13px",
				fontWeight: 600,
				color: color.text,
				flexShrink: 0,
			}}
		>
			{initials}
		</Box>
	);
}

function CustomPaper({ children }: { children?: React.ReactNode }) {
	return (
		<Paper
			elevation={0}
			sx={{
				mt: 0.5,
				border: "0.5px solid",
				borderColor: "divider",
				borderRadius: "12px",
				overflow: "hidden",
				boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
			}}
		>
			{children}
		</Paper>
	);
}

export default function SearchBar() {
	const { state, dispatch } = useAppContext();
	const [isLLM, setIsLLM] = useState(false);
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleStandardSearch = useCallback(
		(query: string) => {
			dispatch({
				type: "SET_FILTERS",
				payload: { searchQuery: query, aiMatchedIds: null },
			});
		},
		[dispatch],
	);

	const handleLLMSearch = useCallback(
		async (query: string) => {
			setLoading(true);
			const productList = state.products.map((p) => ({
				id: p.id,
				name: p.name,
				description: p.description,
				tags: p.tags,
				category: p.category,
			}));

			const prompt = `User query: "${query}".
Based on this query, return a JSON array of product IDs from this list that best match the user's intent.
Product list: ${JSON.stringify(productList)}
Return ONLY a raw JSON array of matching IDs, no explanation, no markdown. Example: ["prod_1", "prod_3"]`;

			try {
				const res = await fetch("https://api.cohere.com/v2", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						model: "claude-sonnet-4-6",
						max_tokens: 1000,
						messages: [{ role: "user", content: prompt }],
					}),
				});

				const data = await res.json();
				const textResponse: string =
					data.content
						?.filter((b: { type: string }) => b.type === "text")
						.map((b: { text: string }) => b.text)
						.join("") ?? "";

				const start = textResponse.indexOf("[");
				const end = textResponse.lastIndexOf("]");

				if (start !== -1 && end > start) {
					const matchedIds: string[] = JSON.parse(
						textResponse.slice(start, end + 1),
					);
					dispatch({
						type: "SET_FILTERS",
						payload: {
							searchQuery: query,
							aiMatchedIds: matchedIds,
						},
					});
				} else {
					dispatch({
						type: "SET_FILTERS",
						payload: { searchQuery: query, aiMatchedIds: null },
					});
				}
			} catch (error) {
				console.error("LLM Search Error:", error);
				dispatch({
					type: "SET_FILTERS",
					payload: { searchQuery: query, aiMatchedIds: null },
				});
			} finally {
				setLoading(false);
			}
		},
		[state.products, dispatch],
	);

	const handleSearch = useCallback(
		(query: string) => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
			if (isLLM && query.length > 3) {
				debounceRef.current = setTimeout(
					() => handleLLMSearch(query),
					LLM_DEBOUNCE_MS,
				);
			} else {
				handleStandardSearch(query);
			}
		},
		[isLLM, handleLLMSearch, handleStandardSearch],
	);

	const handleClear = () => {
		setInputValue("");
		dispatch({
			type: "SET_FILTERS",
			payload: { searchQuery: "", aiMatchedIds: null },
		});
	};

	const handleOptionSelect = useCallback(
		(_e: React.SyntheticEvent, value: string | Product | null) => {
			if (value && typeof value !== "string") {
				dispatch({
					type: "SET_FILTERS",
					payload: {
						searchQuery: value.name,
						aiMatchedIds: [value.id],
					},
				});
			}
		},
		[dispatch],
	);

	return (
		<Box
			sx={{
				flexGrow: 1,
				maxWidth: 560,
				mx: 2,
				display: "flex",
				alignItems: "center",
				gap: 1,
			}}
		>
			{isExpanded && (
				<IconButton
					size="small"
					onClick={() => {
						setIsExpanded(false);
						handleClear();
					}}
					sx={{ color: "text.secondary", flexShrink: 0 }}
				>
					<ArrowBackIcon fontSize="small" />
				</IconButton>
			)}

			<Autocomplete
				freeSolo
				fullWidth
				disableClearable
				options={state.products}
				getOptionLabel={(option) =>
					typeof option === "string" ? option : option.name
				}
				inputValue={inputValue}
				onInputChange={(_e, value) => {
					setInputValue(value);
					handleSearch(value);
				}}
				onChange={handleOptionSelect}
				onFocus={() => setIsExpanded(true)}
				slots={{ paper: CustomPaper }}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={
							isLLM
								? "Describe what you need..."
								: "Search products..."
						}
						size="small"
						slotProps={{
							...params.slotProps,
							input: {
								...params.slotProps?.input,
								startAdornment: (
									<InputAdornment position="start">
										{loading ? (
											<CircularProgress
												size={16}
												sx={{ color: "secondary.main" }}
											/>
										) : (
											<SearchIcon
												sx={{
													fontSize: 18,
													color: "text.secondary",
												}}
											/>
										)}
									</InputAdornment>
								),
								endAdornment: (
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 0.25,
										}}
									>
										{
											(
												params.slotProps
													?.input as React.HTMLAttributes<HTMLInputElement> & {
													endAdornment?: React.ReactNode;
												}
											)?.endAdornment
										}
										{inputValue && (
											<IconButton
												size="small"
												onClick={handleClear}
												sx={{ color: "text.disabled" }}
											>
												<ClearIcon
													sx={{ fontSize: 15 }}
												/>
											</IconButton>
										)}
										<Tooltip
											title={
												isLLM
													? "AI search on – click to disable"
													: "Enable AI search"
											}
										>
											<IconButton
												size="small"
												onClick={() =>
													setIsLLM((p) => !p)
												}
												sx={{
													width: 28,
													height: 28,
													borderRadius: "50%",
													backgroundColor: isLLM
														? "rgba(99,102,241,0.12)"
														: "transparent",
													color: isLLM
														? "#6366f1"
														: "text.disabled",
													"&:hover": {
														backgroundColor: isLLM
															? "rgba(99,102,241,0.2)"
															: "action.hover",
													},
												}}
											>
												<AutoAwesomeIcon
													sx={{ fontSize: 15 }}
												/>
											</IconButton>
										</Tooltip>
									</Box>
								),
							},
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "28px",
								height: 44,
								backgroundColor: (t) =>
									t.palette.mode === "light"
										? "rgba(0,0,0,0.04)"
										: "rgba(255,255,255,0.06)",
								transition: "background 0.2s, box-shadow 0.2s",
								pr: "8px !important",
								"& fieldset": { borderColor: "transparent" },
								"&:hover fieldset": { borderColor: "divider" },
								"&.Mui-focused": {
									backgroundColor: "background.paper",
									boxShadow:
										"0 0 0 2px rgba(99,102,241,0.25)",
									"& fieldset": {
										borderColor: "transparent",
									},
								},
							},
						}}
					/>
				)}
				renderOption={(props, option) => {
					const { key, ...restProps } = props as typeof props & {
						key: React.Key;
					};
					const product = option as Product;
					return (
						<Box
							component="li"
							key={key}
							{...restProps}
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1.5,
								px: 2,
								py: 1.25,
								cursor: "pointer",
								"&:hover": { backgroundColor: "action.hover" },
								borderBottom: "0.5px solid",
								borderColor: "divider",
								"&:last-child": { borderBottom: "none" },
							}}
						>
							<ProductAvatar name={product.name} />
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Typography
									variant="body2"
									sx={{
										fontWeight: 500,
										color: "text.primary",
										lineHeight: 1.3,
									}}
								>
									{product.name}
								</Typography>
								<Typography
									variant="caption"
									sx={{
										color: "text.secondary",
										display: "block",
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{product.category}
								</Typography>
							</Box>
							<Typography
								variant="caption"
								sx={{
									fontWeight: 500,
									color: "text.secondary",
									flexShrink: 0,
								}}
							>
								${product.price}
							</Typography>
						</Box>
					);
				}}
			/>

			{isLLM && (
				<Chip
					label="AI"
					size="small"
					sx={{
						height: 22,
						fontSize: 11,
						fontWeight: 600,
						backgroundColor: "rgba(99,102,241,0.12)",
						color: "#6366f1",
						border: "none",
						flexShrink: 0,
					}}
				/>
			)}
		</Box>
	);
}
