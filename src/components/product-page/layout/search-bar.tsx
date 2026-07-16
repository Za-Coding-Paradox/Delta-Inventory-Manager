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
import { useAppContext } from "../../../context/app-context";
import type { Product } from "../../../config/types";

/* ==========================================================================
 * CONFIGURATION — Replace the value below with your Gemini API key.
 * You can also set it via a .env file as VITE_GEMINI_API_KEY.
 * ========================================================================== */
const GEMINI_API_KEY =
	import.meta.env.VITE_GEMINI_API_KEY ?? "AQ.Ab8RN6LYajT8RJ7FfHuyi5KC--Abm-CiNrmnBLF3yZCoEHfv6Q";

const GEMINI_MODEL = "gemini-1.5-flash-latest"; // fast & cheap for search tasks
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const AI_DEBOUNCE_MS = 600;

/* ==========================================================================
 * Gemini AI Search
 * Sends the user's query + product list to Gemini and asks it to return
 * a ranked JSON array of matching product IDs.
 * ========================================================================== */
async function runGeminiSearch(
	query: string,
	products: Product[],
): Promise<string[]> {
	const productList = products.map((p) => ({
		id: p.id,
		name: p.name,
		description: p.description,
		tags: p.tags,
		category: p.category,
		price: p.price,
		status: p.status,
	}));

	const prompt = `You are a smart product search assistant for an e-commerce store called AURA.

User query: "${query}"

Product catalog:
${JSON.stringify(productList, null, 2)}

Task: Return a JSON array of product IDs from the catalog that best match the user's query, ranked by relevance (best match first). Only include products that are genuinely relevant. If nothing matches, return an empty array [].

Rules:
- Understand natural language intent (e.g. "warm clothes for cold weather" → coats/outerwear)
- Consider name, description, tags, and category
- Do NOT include unrelated products
- Return ONLY a raw JSON array of IDs with no explanation or markdown. Example: ["prod_3", "prod_1"]`;

	const response = await fetch(GEMINI_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			contents: [{ parts: [{ text: prompt }] }],
			generationConfig: {
				temperature: 0.1, // low temperature for deterministic results
				maxOutputTokens: 2048,
			},
		}),
	});

	if (!response.ok) {
		const err = await response.json().catch(() => ({}));
		throw new Error(
			`Gemini API error ${response.status}: ${JSON.stringify(err)}`,
		);
	}

	const data = await response.json();
	const parts: any[] = data.candidates?.[0]?.content?.parts ?? [];
	let text = parts.filter((p: any) => !p.thought).map((p: any) => p.text).join("");
	if (!text) text = parts.map((p: any) => p.text).join("");

	// Extract JSON array from the response
	const start = text.indexOf("[");
	const end = text.lastIndexOf("]");
	if (start === -1 || end <= start) return [];

	const parsed: string[] = JSON.parse(text.slice(start, end + 1));
	return parsed.filter((id) => products.some((p) => p.id === id));
}

/* ==========================================================================
 * Fallback: Local fuzzy/semantic search (used when AI is disabled or fails)
 * ========================================================================== */
function diceCoefficient(a: string, b: string): number {
	if (a === b) return 1.0;
	if (a.length < 2 || b.length < 2) return 0.0;
	const aBigrams = new Map<string, number>();
	for (let i = 0; i < a.length - 1; i++) {
		const bg = a.slice(i, i + 2);
		aBigrams.set(bg, (aBigrams.get(bg) ?? 0) + 1);
	}
	let intersection = 0;
	for (let i = 0; i < b.length - 1; i++) {
		const bg = b.slice(i, i + 2);
		const c = aBigrams.get(bg) ?? 0;
		if (c > 0) { aBigrams.set(bg, c - 1); intersection++; }
	}
	return (2.0 * intersection) / (a.length + b.length - 2);
}

function scoreProduct(product: Product, query: string): number {
	const q = query.toLowerCase().trim();
	if (!q) return 0;
	const tokens = q.split(/\s+/).filter((t) => t.length > 1);
	const name = product.name.toLowerCase();
	const desc = product.description.toLowerCase();
	const cat = product.category.toLowerCase();
	const tags = product.tags.map((t) => t.toLowerCase());
	let score = 0;

	// Name (40pts)
	if (name.includes(q)) score += 40;
	else {
		const s = tokens.reduce((a, t) => {
			const best = Math.max(...name.split(/\s+/).map((w) => diceCoefficient(t, w)));
			return a + best * 30;
		}, 0);
		score += Math.min(30, s / Math.max(1, tokens.length));
	}

	// Tags (25pts)
	const tagScore = tokens.reduce((a, t) => {
		const best = Math.max(...tags.map((tag) => tag.includes(t) ? 1 : diceCoefficient(t, tag)));
		return a + best * 25;
	}, 0);
	score += Math.min(25, tagScore / Math.max(1, tokens.length));

	// Description (20pts)
	if (desc.includes(q)) score += 20;
	else {
		const s = tokens.reduce((a, t) => a + (desc.includes(t) ? 15 : diceCoefficient(t, desc) * 10), 0);
		score += Math.min(20, s / Math.max(1, tokens.length));
	}

	// Category (15pts)
	if (cat.includes(q)) score += 15;
	else {
		const s = tokens.reduce((a, t) => a + (cat.includes(t) ? 12 : diceCoefficient(t, cat) * 8), 0);
		score += Math.min(15, s / Math.max(1, tokens.length));
	}

	return score;
}

function runLocalSearch(query: string, products: Product[]): string[] {
	return products
		.map((p) => ({ id: p.id, score: scoreProduct(p, query) }))
		.filter((x) => x.score >= 8)
		.sort((a, b) => b.score - a.score)
		.map((x) => x.id);
}

/* ==========================================================================
 * ProductAvatar — displays product image
 * ========================================================================== */
function ProductAvatar({ product }: { product: Product }) {
	const imageUrl = product.colors && product.colors.length > 0 ? product.colors[0].imageUrl : "https://placehold.co/400x400?text=No+Image";
	return (
		<Box
			component="img"
			src={imageUrl}
			alt={product.name}
			sx={{
				width: 40, height: 40, borderRadius: "50%",
				objectFit: "cover", flexShrink: 0
			}}
		/>
	);
}

/* ==========================================================================
 * CustomPaper — dropdown container
 * ========================================================================== */
function CustomPaper({ children }: { children?: React.ReactNode }) {
	return (
		<Paper
			elevation={0}
			sx={{
				mt: 0.5, border: "1px solid", borderColor: "divider",
				borderRadius: "14px", overflow: "hidden",
				boxShadow: (t) =>
					t.palette.mode === "light"
						? "0 8px 32px rgba(0,0,0,0.12)"
						: "0 8px 32px rgba(0,0,0,0.6)",
			}}
		>
			{children}
		</Paper>
	);
}

/* ==========================================================================
 * SearchBar — Main component
 * ========================================================================== */
export default function SearchBar() {
	const { state, dispatch } = useAppContext();
	const [isAI, setIsAI] = useState(false);
	const [loading, setLoading] = useState(false);
	const [aiError, setAiError] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleStandardSearch = useCallback(
		(query: string) => {
			dispatch({ type: "SET_FILTERS", payload: { searchQuery: query, aiMatchedIds: null } });
		},
		[dispatch],
	);

	const handleAISearch = useCallback(
		async (query: string) => {
			setLoading(true);
			setAiError(null);
			try {
				const matchedIds = await runGeminiSearch(query, state.products);
				dispatch({
					type: "SET_FILTERS",
					payload: {
						searchQuery: query,
						aiMatchedIds: matchedIds.length > 0 ? matchedIds : null,
					},
				});
				// If Gemini returned nothing, fall back to local fuzzy search
				if (matchedIds.length === 0) {
					const localIds = runLocalSearch(query, state.products);
					if (localIds.length > 0) {
						dispatch({
							type: "SET_FILTERS",
							payload: { searchQuery: query, aiMatchedIds: localIds },
						});
					}
				}
			} catch (error) {
				console.error("Gemini Search Error:", error);
				setAiError("AI search failed — using smart local search instead");
				// Graceful fallback to local fuzzy search
				const localIds = runLocalSearch(query, state.products);
				dispatch({
					type: "SET_FILTERS",
					payload: {
						searchQuery: query,
						aiMatchedIds: localIds.length > 0 ? localIds : null,
					},
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
			if (isAI && query.length > 2) {
				debounceRef.current = setTimeout(() => handleAISearch(query), AI_DEBOUNCE_MS);
			} else {
				handleStandardSearch(query);
			}
		},
		[isAI, handleAISearch, handleStandardSearch],
	);

	const handleClear = () => {
		setInputValue("");
		setAiError(null);
		dispatch({ type: "SET_FILTERS", payload: { searchQuery: "", aiMatchedIds: null } });
	};

	const handleOptionSelect = useCallback(
		(_e: React.SyntheticEvent, value: string | Product | null) => {
			if (value && typeof value !== "string") {
				dispatch({
					type: "SET_FILTERS",
					payload: { searchQuery: value.name, aiMatchedIds: [value.id] },
				});
			}
		},
		[dispatch],
	);

	const isApiKeyMissing = GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE";

	return (
		<Box sx={{ flexGrow: 1, maxWidth: 560, mx: 2, display: "flex", alignItems: "center", gap: 1 }}>
			{isExpanded && (
				<IconButton
					size="small"
					onClick={() => { setIsExpanded(false); handleClear(); }}
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
				getOptionLabel={(option) => typeof option === "string" ? option : option.name}
				inputValue={inputValue}
				onInputChange={(_e, value) => { setInputValue(value); handleSearch(value); }}
				onChange={handleOptionSelect}
				onFocus={() => setIsExpanded(true)}
				slots={{ paper: CustomPaper }}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={isAI ? "Describe what you're looking for..." : "Search products..."}
						size="small"
						slotProps={{
							...params.slotProps,
							formHelperText: { sx: { color: "warning.main", fontSize: "0.7rem", mx: 0 } },
							input: {
								...params.slotProps?.input,
								startAdornment: (
									<InputAdornment position="start">
										{loading ? (
											<CircularProgress size={16} sx={{ color: "text.secondary" }} />
										) : (
											<SearchIcon
												sx={{
													fontSize: 18,
													color: isAI ? "text.primary" : "text.secondary",
													transition: "color 0.2s ease",
												}}
											/>
										)}
									</InputAdornment>
								),
								endAdornment: (
									<Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
										{(params.slotProps?.input as React.HTMLAttributes<HTMLInputElement> & {
											endAdornment?: React.ReactNode;
										})?.endAdornment}
										{inputValue && (
											<IconButton size="small" onClick={handleClear} sx={{ color: "text.disabled" }}>
												<ClearIcon sx={{ fontSize: 15 }} />
											</IconButton>
										)}
										<Tooltip
											title={
												isApiKeyMissing
													? "Add your Gemini API key to enable AI search"
													: isAI
														? "Gemini AI search enabled — click to disable"
														: "Enable Gemini AI search"
											}
											arrow
										>
											<span>
												<IconButton
													size="small"
													onClick={() => !isApiKeyMissing && setIsAI((p) => !p)}
													disabled={isApiKeyMissing}
													sx={{
														width: 28, height: 28, borderRadius: "50%",
														backgroundColor: isAI
															? (t) => t.palette.mode === "light"
																? "rgba(17,17,17,0.1)"
																: "rgba(240,240,240,0.12)"
															: "transparent",
														color: isApiKeyMissing
															? "text.disabled"
															: isAI
																? "text.primary"
																: "text.disabled",
														transition: "all 0.2s ease",
														"&:hover:not(:disabled)": {
															backgroundColor: isAI
																? (t) => t.palette.mode === "light"
																	? "rgba(17,17,17,0.18)"
																	: "rgba(240,240,240,0.2)"
																: "action.hover",
														},
													}}
												>
													<AutoAwesomeIcon sx={{ fontSize: 15 }} />
												</IconButton>
											</span>
										</Tooltip>
									</Box>
								),
							},
						}}
						helperText={aiError ?? undefined}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "28px",
								height: 44,
								backgroundColor: (t) =>
									t.palette.mode === "light"
										? isAI ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.04)"
										: isAI ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.06)",
								transition: "background 0.2s, box-shadow 0.2s",
								pr: "8px !important",
								"& fieldset": { borderColor: "transparent" },
								"&:hover fieldset": { borderColor: "divider" },
								"&.Mui-focused": {
									backgroundColor: "background.paper",
									boxShadow: (t) =>
										t.palette.mode === "light"
											? "0 0 0 2px rgba(17,17,17,0.12)"
											: "0 0 0 2px rgba(240,240,240,0.12)",
									"& fieldset": { borderColor: "transparent" },
								},
							},
						}}
					/>
				)}
				renderOption={(props, option) => {
					const { key, ...restProps } = props as typeof props & { key: React.Key };
					const product = option as Product;
					return (
						<Box
							component="li"
							key={key}
							{...restProps}
							sx={{
								display: "flex", alignItems: "center", gap: 1.5,
								px: 2, py: 1.25, cursor: "pointer",
								"&:hover": { backgroundColor: "action.hover" },
								borderBottom: "1px solid", borderColor: "divider",
								"&:last-child": { borderBottom: "none" },
							}}
						>
							<ProductAvatar product={product} />
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", lineHeight: 1.3 }}>
									{product.name}
								</Typography>
								<Typography
									variant="caption"
									sx={{ color: "text.secondary", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
								>
									{product.category}
								</Typography>
							</Box>
							<Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", flexShrink: 0, fontSize: "0.82rem" }}>
								${product.price}
							</Typography>
						</Box>
					);
				}}
			/>

			{isAI && !isApiKeyMissing && (
				<Chip
					label="Gemini"
					size="small"
					icon={<AutoAwesomeIcon sx={{ fontSize: "12px !important" }} />}
					sx={{
						height: 24, fontSize: 11, fontWeight: 700,
						backgroundColor: (t) =>
							t.palette.mode === "light" ? "rgba(17,17,17,0.08)" : "rgba(240,240,240,0.1)",
						color: "text.primary",
						border: "1px solid", borderColor: "divider",
						flexShrink: 0,
						"& .MuiChip-icon": { color: "text.secondary" },
					}}
				/>
			)}
		</Box>
	);
}
